<template>
  <main>
    <div class="dashboard">
      <div class="dashboard__widget">
        <span class="widget-name">Speed</span>
        <div class="widget-value">
          <span class="widget-value-number">{{ typingSpeed }}</span>
          <span>wpm</span>
        </div>
      </div>
      <div class="dashboard__widget">
        <span class="widget-name">Errors</span>
        <div class="widget-value">
          <span class="widget-value-number">{{ totalErrors }}</span>
        </div>
      </div>
    </div>
    <text-input />
  </main>
</template>

<script>
import TextInput from "./components/TextInput";

export default {
  name: "App",
  components: {
    TextInput,
  },
  computed: {
    tokens: function() {
      return this.$store.state.tokens;
    },
    seconds: function() {
      return this.$store.state.seconds;
    },
    amountTyped: function() {
      return this.$store.state.amountTyped;
    },
    amountUncorrectedErrors: function() {
      return this.tokens.reduce(
        (total, { status }) => (status === "error" ? total + 1 : total),
        0
      );
    },
    typingSpeed: function() {
      let wordsTyped = (this.amountTyped - this.amountUncorrectedErrors) / 5;
      let minutes = this.seconds / 60;
      let netWPM = Math.round(wordsTyped / minutes);
      netWPM = (isFinite(netWPM) && netWPM) || 0;
      return netWPM;
    },

    totalErrors: function() {
      return this.$store.state.totalErrors;
    },
  },
  mounted: async function() {
    const json = await import("./assets/character_dump.json");
    const LOWER_CASE = "eaonirsldtcumpgbyvfhqzjkñwx ";
    // const UPPER_CASE = "ECASLMPBTDRFIGNHJVUOKWQXYZ";
    const NUMBERS = "1025938476";
    const ACCENTS = "óíáéúü";
    const SYMBOLS1 = ",.";
    const SYMBOLS2 = '/=)(:-?;"!';
    const SYMBOLS3 = "%+*#_¿¡<>[]{}&";

    const VOCALS = "oiaeuu";
    const LENGTH = 5;
    const text = json.default.text;
    let newText = "";
    for (let i = 0; i < text.length; i++) {
      let character = text[i];
      // Remove numbers and symbols
      if (NUMBERS.includes(character)) {
        continue;
      }
      if (SYMBOLS1.includes(character)) {
        continue;
      }
      if (SYMBOLS2.includes(character)) {
        continue;
      }
      if (SYMBOLS3.includes(character)) {
        continue;
      }
      // Remove accents
      for (let i = 0; i < ACCENTS.length; i++) {
        const c = ACCENTS[i];
        if (c === character) {
          character = VOCALS[i];
        }
      }
      // Remove weird symbols
      if (!LOWER_CASE.includes(character.toLowerCase())) {
        continue;
      }
      newText += character;
    }
    // Get sequences
    const sequences = new Set();
    let buffer = "";
    for (let i = 0; i < newText.length; i++) {
      const character = newText[i];
      buffer += character;
      if (buffer.length > LENGTH) {
        buffer = buffer.substring(1);
      }
      if (buffer.length == LENGTH) {
        sequences.add(buffer);
      }
    }
    const arraySequences = Array.from(sequences);

    // Make predictor
    const predictor = {};
    for (let i = 0; i < arraySequences.length; i++) {
      const seq = arraySequences[i];
      const pre = seq.slice(0, -1);
      if (predictor[pre] === undefined) {
        predictor[pre] = new Set();
      }
      predictor[pre].add(seq.slice(-1));
    }
    // Use arrays again
    for (pre in predictor) {
      predictor[pre] = Array.from(predictor[pre]);
    }

    // Generate sequence
    const keys = Object.keys(predictor);
    const presNumber = keys.length;
    const start = keys[(presNumber * Math.random()) << 0];

    let pre = start;
    let sequence = pre;
    for (let _ = 0; _ < 100; _++) {
      sequence += predictor[pre][(predictor[pre].length * Math.random()) << 0];
      pre = sequence.slice(1).slice(-LENGTH + 1); // get last LENGTH-1 characters
    }
    this.$store.commit("setTokens", sequence.toLowerCase().trim());
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap");

main {
  margin: 0 auto;
  width: 75%;
  font-family: "Source Sans Pro", sans-serif;
}

.dashboard {
  display: flex;
  padding: 2em 0;
}

.dashboard__widget {
  display: flex;
  flex-direction: column;

  margin-right: 12px;
  padding: 0.5em;

  box-sizing: border-box;
  width: 110px;
  height: 110px;

  border-radius: 4px;
  border: 1px solid gray;
}

.widget-name {
  font-weight: bold;
  text-transform: uppercase;
}

.widget-value {
  display: flex;
  flex-direction: column;
}

.widget-value-number {
  font-size: 2.5em;
}
</style>

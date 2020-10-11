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
import TextInput from './components/TextInput'

export default {
  name: 'App',
  components: {
    TextInput
  },
  computed: {
    tokens: function () {
      return this.$store.state.tokens
    },
    seconds: function () {
      return this.$store.state.seconds
    },
    amountTyped: function () {
      return this.$store.state.amountTyped
    },
    amountUncorrectedErrors: function () {
      return this.tokens.reduce((total, { status }) => (status === 'error') ? total + 1 : total, 0)
    },
    typingSpeed: function () {
      let wordsTyped = (this.amountTyped - this.amountUncorrectedErrors)/5
      let minutes = this.seconds / 60
      let netWPM = Math.round(wordsTyped / minutes)
      netWPM = isFinite(netWPM) && netWPM || 0
      return netWPM
    },

    totalErrors: function () {
      return this.$store.state.totalErrors
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap');

main {
  margin: 0 auto;
  width: 75%;
  font-family: 'Source Sans Pro', sans-serif;
}

.dashboard {
  display: flex;
  padding: 2em 0;

}

.dashboard__widget {
  display: flex;
  flex-direction: column;

  margin-right: 12px;
  padding: .5em;

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

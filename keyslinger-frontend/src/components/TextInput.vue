<template>
  <div>
    <div class="textinput">
      <div class="items">
        <token
          v-for="(token, index) in displayTokens"
          :key="index"
          :token="token"
          :class="[
            currentIndex === index ? ['cursor', 'cursor--blinking'] : '',
            token.status ? `token--${token.status}` : '',
          ]"
        />
      </div>
    </div>
    <div class="actions">
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script>
import Token from './Token'

export default {
  name: 'text-input',
  components: {
    Token,
  },
  data: function() {
    return {
      timer: null,
      specialChars: {
        '\n': '↩',
        ' ': '␣',
      },
    }
  },
  created: function() {
    window.addEventListener('keydown', this.checkCharacter)
  },
  computed: {
    tokens: function() {
      return this.$store.state.tokens
    },
    displayTokens: function() {
      let displayTokens = this.tokens.map(token => {
        token.char = this.specialChars[token.key] || token.key
        return token
      })
      return displayTokens
    },
    active: function() {
      return this.$store.state.active
    },
    completed: function() {
      return this.$store.state.completed
    },
    currentIndex: function() {
      return this.$store.state.currentIndex
    },
  },
  methods: {
    checkCharacter: function(event) {
      let key = event.key
      if (!this.active && key === this.tokens[0].key && !this.completed) {
        this.$store.dispatch('activate')
        this.timer = setInterval(() => {
          this.$store.dispatch('addSecond')
        }, 1000)
      }

      if (this.active && !this.completed) {
        if (key === 'Backspace') {
          this.$store.dispatch('decrementIndex')
          this.$store.dispatch('decrementTyped')
          this.$store.dispatch('setTokenStatus', {
            index: this.currentIndex,
            status: '',
          })
        }
        // TODO: check special keys (enter, esq, shift, option)
        else if (key === this.tokens[this.currentIndex].key) {
          this.$store.dispatch('setTokenStatus', {
            index: this.currentIndex,
            status: 'ok',
          })
          this.$store.dispatch('incrementIndex')
        } else {
          this.$store.dispatch('setTokenStatus', {
            index: this.currentIndex,
            status: 'error',
          })
          this.$store.dispatch('incrementErrors')
          this.$store.dispatch('incrementIndex')
        }
        this.$store.dispatch('incrementTyped')
      }
      if (this.currentIndex === this.tokens.length && !this.completed) {
        this.$store.dispatch('deactivate')
        this.$store.dispatch('complete')
        clearInterval(this.timer)
        console.log('Done!')
      }
    },
    reset: function() {
      this.$store.dispatch('deactivate')
      this.$store.dispatch('unComplete')
      this.$store.dispatch('resetIndex')
      this.$store.dispatch('resetErrors')
      this.$store.dispatch('resetAmountTyped')
      this.tokens.forEach((token, index) => {
        this.$store.dispatch('setTokenStatus', {
          index: index,
          status: null,
        })
      })
      clearInterval(this.timer)
      this.$store.dispatch('resetSeconds')
      console.log('Reset!')
    },
  },
  beforeUnmount: function() {
    clearInterval(this.timer) // in case of emergency?
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

.textinput {
  position: relative;
  padding: 2em 0;

  line-height: 1.5em;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.8em;
  color: #27253e;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  overflow-wrap: break-word;
}

.actions {
  display: flex;
  justify-content: center;

  padding: 2em;
}
</style>

<template>
  <span class="token">{{ token.char }}</span>
</template>

<script>
export default {
  name: 'token',
  props: ['token'],
}
</script>

<style scoped>
.token {
  /* display: inline-block;s */
  margin-right: 2px;
  height: 1.2em;
  line-height: 1.2em;
  border-radius: 2px;
}

.token--special {
  color: #363639;
}

.token--ok {
  color: rgb(140, 140, 140);
}

.token--error {
  color: rgb(240, 100, 100);
}

.cursor {
  /* TODO: Not being used. Use when inactive or stopped */
  background: black;
}

.cursor--blinking {
  animation: blink 0.8s infinite;
}

@keyframes blink {
  /* TODO: check animation tutorial and best practices */
  50% {
    background: transparent;
  }
}
</style>

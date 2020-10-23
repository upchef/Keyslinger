import { createStore } from 'vuex'

let state = {
  active: false,
  completed: false,
  currentIndex: 0,
  seconds: 0,
  amountTyped: 0,
  totalErrors: 0,
  tokens: [
    // {
    //   char: '↩',
    //   key: 'r',
    //   status: null
    // },
  ],
}

let mutations = {
  setTokens: function(state, string) {
    state.tokens = [...string].map(s => ({ key: s, status: null }))
  },
  resetIndex: function(state) {
    state.currentIndex = 0
  },
  incrementIndex: function(state) {
    state.currentIndex++
  },
  decrementIndex: function(state) {
    state.currentIndex = Math.max(0, state.currentIndex - 1)
  },
  setTokenStatus: function(state, { index, status }) {
    state.tokens[index].status = status
  },
  activate: function(state) {
    state.active = true
  },
  deactivate: function(state) {
    state.active = false
  },
  complete: function(state) {
    state.completed = true
  },
  unComplete: function(state) {
    state.completed = false
  },
  incrementTyped: function(state) {
    state.amountTyped++
  },
  decrementTyped: function(state) {
    state.amountTyped--
  },
  resetAmountTyped: function(state) {
    state.amountTyped = 0
  },
  incrementErrors: function(state) {
    state.totalErrors++
  },
  resetErrors: function(state) {
    state.totalErrors = 0
  },
  addSecond: function(state) {
    state.seconds++
  },
  resetSeconds: function(state) {
    state.seconds = 0
  },
}

let actions = {
  incrementIndex: function(context) {
    context.commit('incrementIndex')
  },
  decrementIndex: function(context) {
    context.commit('decrementIndex')
  },
  resetIndex: function(context) {
    context.commit('resetIndex')
  },
  setTokenStatus: function(context, { index, status }) {
    context.commit('setTokenStatus', { index, status })
  },
  activate: function(context) {
    context.commit('activate')
  },
  deactivate: function(context) {
    context.commit('deactivate')
  },
  complete: function(context) {
    context.commit('complete')
  },
  unComplete: function(context) {
    context.commit('unComplete')
  },
  incrementTyped: function(context) {
    context.commit('incrementTyped')
  },
  decrementTyped: function(context) {
    context.commit('decrementTyped')
  },
  resetAmountTyped: function(context) {
    context.commit('resetAmountTyped')
  },
  incrementErrors: function(context) {
    context.commit('incrementErrors')
  },
  resetErrors: function(context) {
    context.commit('resetErrors')
  },
  addSecond: function(context) {
    context.commit('addSecond')
  },
  resetSeconds: function(context) {
    context.commit('resetSeconds')
  },
}

// let getters = {}

export default createStore({
  state,
  mutations,
  actions,
})

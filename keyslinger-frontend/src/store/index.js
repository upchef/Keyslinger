import { createStore } from "vuex";

let state = {
  active: false,
  completed: false,
  currentIndex: 0,
  seconds: 0,
  amountTyped: 0,
  totalErrors: 0,
  tokens: [
    {
      char: 'c',
      key: 'c',
      status: null
    },
    {
      char: 'v',
      key: 'v',
      status: null
    },
    {
      char: 'i',
      key: 'i',
      status: null
    },
    {
      char: 'o',
      key: 'o',
      status: null
    },
    {
      char: 'n',
      key: 'n',
      status: null
    },
    {
      char: '␣',
      key: ' ',
      status: null
    },
    {
      char: 'p',
      key: 'p',
      status: null
    },
    {
      char: 'r',
      key: 'r',
      status: null
    },
    {
      char: 'e',
      key: 'e',
      status: null
    },
    {
      char: 't',
      key: 't',
      status: null
    },
    {
      char: 'y',
      key: 'y',
      status: null
    },
    {
      char: '␣',
      key: ' ',
      status: null
    },
    {
      char: 'o',
      key: 'o',
      status: null
    },
    {
      char: 'r',
      key: 'r',
      status: null
    },
    // {
    //   char: '↩',
    //   key: 'r',
    //   status: null
    // },
  ]
}

let mutations = {
  incrementIndex: function (state) {
    state.currentIndex++
  },
  decrementIndex: function (state) {
    state.currentIndex = Math.max(0, state.currentIndex - 1);
  },
  setTokenStatus: function (state, { index, status }) {
    state.tokens[index].status = status
  },
  activate: function (state) {
    state.active = true
  },
  deactivate: function (state) {
    state.active = false
  },
  complete: function (state) {
    state.completed = true
  },
  incrementTyped: function (state) {
    state.amountTyped++
  },
  decrementTyped: function (state) {
    state.amountTyped--
  },
  incrementErrors: function (state) {
    state.totalErrors++
  },
  addSecond: function (state) {
    state.seconds++
  },
  subtractSecond: function (state) {
    state.seconds--
  },
}

let actions = {
  incrementIndex: function (context) {
    context.commit('incrementIndex')
  },
  decrementIndex: function (context) {
    context.commit('decrementIndex')
  },
  setTokenStatus: function (context, { index, status }) {
    context.commit('setTokenStatus', { index, status })
  },
  activate: function (context) {
    context.commit('activate')
  },
  deactivate: function (context) {
    context.commit('deactivate')
  },
  complete: function (context) {
    context.commit('complete')
  },
  incrementTyped: function (context) {
    context.commit('incrementTyped')
  },
  decrementTyped: function (context) {
    context.commit('decrementTyped')
  },
  incrementErrors: function (context) {
    context.commit('incrementErrors')
  },
  addSecond: function (context) {
    context.commit('addSecond')
  },
  subtractSecond: function (context) {
    context.commit('subtractSecond')
  }
}

// let getters = {}

export default createStore({
  state,
  mutations,
  actions,
});

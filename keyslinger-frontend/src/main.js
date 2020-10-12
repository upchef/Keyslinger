import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App)
  .use(store)
  .mount('#app')

// if (module.hot) {
//   module.hot.accept() // already had this init code

//   module.hot.addStatusHandler(status => {
//       if (status === 'prepare') console.clear()
//   })
// }

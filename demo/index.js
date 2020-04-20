import Vue from 'vue'
import Router from 'vue-router'
import cui from '@cci/cui'
import '@cci/cui/packages/theme-default/src/index.scss'

import router from './router.js'
import App from './src/App'
Vue.use(cui)
Vue.use(Router)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

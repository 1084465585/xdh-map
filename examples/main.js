import Vue from 'vue'
import App from './App.vue'
import router from './router'
import XdhMap from '../packages/index'

Vue.use(XdhMap)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

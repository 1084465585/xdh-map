import Vue from 'vue'
import router from './router'
import App from './App.vue'
import '../lib/xdhmap.css'
import * as XdhMap from '../lib/xdhmap.common'
Vue.use(XdhMap)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

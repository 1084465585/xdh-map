import Vue from 'vue'
import App from './App.vue'
import XdhMap from '../packages/index'

Vue.use(XdhMap)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

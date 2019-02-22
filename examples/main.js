import Vue from 'vue'
import App from './App.vue'
import router from './router'
import XdhMap from '../packages/index'
import Example from './components/example'

Vue.use(XdhMap)
Vue.component('Example', Example)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


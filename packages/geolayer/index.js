import Geolayer from './src/geolayer'

Geolayer.install = function (Vue) {
  Vue.component(Geolayer.name, Geolayer)
}

export default Geolayer
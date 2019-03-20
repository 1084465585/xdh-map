import Geo from './src/geo'

Geo.install = function (Vue) {
  Vue.component(Geo.name, Geo)
}

export default Geo
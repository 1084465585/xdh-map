import Map from './src/map'

Map.install = function (Vue) {
  Vue.component(Map.name, Map)
}
export default Map

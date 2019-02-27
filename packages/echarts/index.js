import Echarts from './src/echarts'

Echarts.install = function (Vue) {
  Vue.component(Echarts.name, Echarts)
}
export default Echarts

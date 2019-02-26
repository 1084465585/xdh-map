import Heat from './src/heat'

Heat.install = function (Vue) {
  Vue.component(Heat.name, Heat)
}
export default Heat

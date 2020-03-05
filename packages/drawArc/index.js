import DrawArc from './src/drawArc'

DrawArc.install = function (Vue) {
  Vue.component(DrawArc.name, DrawArc)
}
export default DrawArc
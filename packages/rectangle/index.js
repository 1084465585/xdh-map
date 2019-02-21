import Rectangle from './src/rectangle'

Rectangle.install = function (Vue) {
  Vue.component(Rectangle.name, Rectangle)
}
export default Rectangle

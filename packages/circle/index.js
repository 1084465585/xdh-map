import Circle from './src/circle'

Circle.install = function (Vue) {
  Vue.component(Circle.name, Circle)
}
export default Circle

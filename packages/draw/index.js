import Draw from './src/draw'

Draw.install = function (Vue) {
  Vue.component(Draw.name, Draw)
}
export default Draw

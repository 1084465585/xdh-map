import DrawPanel from './src/drawPanel'

DrawPanel.install = function (Vue) {
  Vue.component(DrawPanel.name, DrawPanel)
}
export default DrawPanel
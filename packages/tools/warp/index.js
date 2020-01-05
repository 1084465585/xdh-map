import Warp from './src/warp'

Warp.install = function (Vue) {
  Vue.component(Warp.name, Warp)
}
export default Warp
import Drawdown from './src/drawdown'

Drawdown.install = function (Vue) {
  Vue.component(Drawdown.name, Drawdown)
}
export default Drawdown
import Map from './map'
import Text from './text'
import Rectangle from './rectangle'
import Polygon from './polygon'
import '../theme/index.scss'

const components = [
  Map,
  Text,
  Rectangle,
  Polygon
]

const install = function (Vue) {
  if (install.installed) return
  
  components.forEach(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}

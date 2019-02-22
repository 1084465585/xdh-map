import Map from './map'
import Text from './text'
import Rectangle from './rectangle'
import Polygon from './polygon'
import Circle from './circle'
import Line from './line'
import Placement from './placement'
import Pointer from './pointer'
import '../theme/index.scss'

const components = [
  Map,
  Text,
  Rectangle,
  Polygon,
  Circle,
  Line,
  Placement,
  Pointer
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

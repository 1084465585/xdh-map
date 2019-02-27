import Map from './map'
import Text from './text'
import Rectangle from './rectangle'
import Polygon from './polygon'
import Circle from './circle'
import Line from './line'
import Placement from './placement'
import Pointer from './pointer'
import Image from './image'
import Html from './html'
import Icon from './icon'
import Popup from './popup'
import Heat from './heat'
import Echarts from './echarts'
import '../theme/index.scss'

const components = [
  Map,
  Text,
  Rectangle,
  Polygon,
  Circle,
  Line,
  Placement,
  Pointer,
  Image,
  Html,
  Icon,
  Popup,
  Heat,
  Echarts
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

import Map from './map'
import Text from './text'
import Rectangle from './rectangle'
import '../theme/index.scss'

const components = [
  Map,
  Text,
  Rectangle
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

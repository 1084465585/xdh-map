import {parse} from '../utils/style'
import Map from './map'
import Text from './text'
import Rectangle from './rectangle'
import Polygon from './polygon'
import Circle from './circle'
import Line from './line'
import Placement from './placement'
import Pointer from './pointer'
import Image from './image'
import Overview from './overview'
import Zoom from './zoom'
import Scale from './scale'
import Html from './html'
import Icon from './icon'
import Popup from './popup'
import Heat from './heat'
import Echarts from './echarts'
import Track from './track'
import Type from './type'
import Draw from './draw'
import Scatter from './scatter'
import Measure from './measure'
import Tooltip from './tooltip'
import Mask from './mask'
import Geo from './geo'
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
  Overview,
  Zoom,
  Scale,
  Html,
  Icon,
  Popup,
  Heat,
  Echarts,
  Track,
  Type,
  Draw,
  Scatter,
  Measure,
  Tooltip,
  Mask,
  Geo
]

const install = function (Vue) {
  if (install.installed) return
  
  components.forEach(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}


export const XdhMap = Map
export const XdhMapText = Text
export const XdhMapRectangle = Rectangle
export const XdhMapPolygon = Polygon
export const XdhMapCircle = Circle
export const XdhMapLine = Line
export const XdhMapPlacement = Placement
export const XdhMapPointer = Pointer
export const XdhMapOverview = Overview
export const XdhMapZoom = Zoom
export const XdhMapScale = Scale
export const XdhMapImage = Image
export const XdhMapHtml = Html
export const XdhMapIcon = Icon
export const XdhMapPopup = Popup
export const XdhMapHeat = Heat
export const XdhMapEcharts = Echarts
export const XdhMapTrack = Track
export const XdhMapType = Type
export const XdhMapDraw = Draw
export const XdhMapScatter = Scatter
export const XdhMapMeasure = Measure
export const XdhMapTooltip = Tooltip
export const XdhMapMask = Mask
export const XdhMapGeo = Geo
export const parseStyle = parse

export default {
  version: '1.0.3',
  install,
  parseStyle,
  Map,
  Text,
  Rectangle,
  Polygon,
  Circle,
  Line,
  Placement,
  Pointer,
  Overview,
  Zoom,
  Scale,
  Image,
  Html,
  Icon,
  Popup,
  Heat,
  Echarts,
  Track,
  Type,
  Draw,
  Scatter,
  Measure,
  Tooltip,
  Mask,
  Geo
}



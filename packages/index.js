/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-21 10:14:35
 * @LastEditTime: 2019-10-02 16:29:22
 * @LastEditors: Please set LastEditors
 */
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
import Geolayer from './geolayer'
import Group from './group'

// html工具
import Panel from './tools/panel'
import Dialog from './tools/dialog'
import Drawdown from './tools/drawdown'
import Warp from './tools/warp'
import Zoom from './zoom'
import ZoomPanel from './zoom/panel'

// 交互插件
import Drag from '../utils/interactions/drag'
import AreaSelect from '../utils/interactions/area-select'

// 特殊图形绘制
import DrawArc from './drawArc'

import * as utils from '../utils/util'
import * as plotutils from '../utils/plot-utils'
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
  Geo,
  Geolayer,
  Group,
  Zoom,
  ZoomPanel,
  // ---纯html组件----
  Panel,
  Dialog,
  Drawdown,
  Warp,
  // -----特殊图形绘制------
  DrawArc
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
export const XdhMapGeoLayer = Geolayer
export const XdhMapGroup = Group
export const XdhMapZoom = Zoom
export const XdhMapZoomPanel = ZoomPanel
// ---------------
export const XdhMapPanel = Panel
export const XdhMapDialog = Dialog
export const XdhMapDrawdown = Drawdown
export const XdhMapWarp = Warp
// ----------------
export const XdhMapDrawArc = DrawArc

export const parseStyle = parse
export const DragClass = Drag
export const AreaSelectClass = AreaSelect
export const mapUtils = utils
export const plotUtils = plotutils


export default {
  version: '1.1.15',
  install,
  parseStyle,
  mapUtils,
  plotUtils,  
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
  ZoomPanel,
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
  Geo,
  Geolayer,
  Group,
  Panel,
  Dialog,
  Drawdown,
  Warp,
  Drag,
  AreaSelect,

  DrawArc
}



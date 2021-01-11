// import './index.scss'
import MyMap from '@xdh/my/ui/lib/map/packages/my-map'
import MyMapCircle from '@xdh/my/ui/lib/map/packages/my-map-circle'
import MyMapCluster from '@xdh/my/ui/lib/map/packages/my-map-cluster'
import MyMapDraw from '@xdh/my/ui/lib/map/packages/my-map-draw'
import MyMapDrawer from '@xdh/my/ui/lib/map/packages/my-map-drawer'
import MyMapFlight from '@xdh/my/ui/lib/map/packages/my-map-flight'
import MyMapGeo from '@xdh/my/ui/lib/map/packages/my-map-geo'
import MyMapHeat from '@xdh/my/ui/lib/map/packages/my-map-heat'
import MyMapHtml from '@xdh/my/ui/lib/map/packages/my-map-html'
import MyMapIcon from '@xdh/my/ui/lib/map/packages/my-map-icon'
import MyMapImage from '@xdh/my/ui/lib/map/packages/my-map-image'
import MyMapLayers from '@xdh/my/ui/lib/map/packages/my-map-layers'
import MyMapLine from '@xdh/my/ui/lib/map/packages/my-map-line'
import MyMapLink from '@xdh/my/ui/lib/map/packages/my-map-link'
import MyMapMarker from '@xdh/my/ui/lib/map/packages/my-map-marker'
import MyMapMeasure from '@xdh/my/ui/lib/map/packages/my-map-measure'
import MyMapOverview from '@xdh/my/ui/lib/map/packages/my-map-overview'
import MyMapPalette from '@xdh/my/ui/lib/map/packages/my-map-palette'
import MyMapPanel from '@xdh/my/ui/lib/map/packages/my-map-panel'
import MyMapPlacement from '@xdh/my/ui/lib/map/packages/my-map-placement'
import MyMapPointer from '@xdh/my/ui/lib/map/packages/my-map-pointer'
import MyMapPolygon from '@xdh/my/ui/lib/map/packages/my-map-polygon'
import MyMapPopup from '@xdh/my/ui/lib/map/packages/my-map-popup'
import MyMapRectangle from '@xdh/my/ui/lib/map/packages/my-map-rectangle'
import MyMapScale from '@xdh/my/ui/lib/map/packages/my-map-scale'
import MyMapScatter from '@xdh/my/ui/lib/map/packages/my-map-scatter'
import MyMapText from '@xdh/my/ui/lib/map/packages/my-map-text'
import MyMapTrack from '@xdh/my/ui/lib/map/packages/my-map-track'
import MyMapZoom from '@xdh/my/ui/lib/map/packages/my-map-zoom'

import style from '@xdh/my/ui/lib/map/utils/style'
import * as util from '@xdh/my/ui/lib/map/utils/util'

const XdhMap = MyMap
const XdhMapCircle = MyMapCircle
const XdhMapCluster = MyMapCluster
const XdhMapDraw = MyMapDraw
const XdhMapDrawer = MyMapDrawer
const XdhMapFlight = MyMapFlight
const XdhMapGeo = MyMapGeo
const XdhMapHeat = MyMapHeat
const XdhMapHtml = MyMapHtml
const XdhMapIcon = MyMapIcon
const XdhMapImage = MyMapImage
const XdhMapLayers = MyMapLayers
const XdhMapLine = MyMapLine
const XdhMapLink = MyMapLink
const XdhMapMarker = MyMapMarker
const XdhMapMeasure = MyMapMeasure
const XdhMapOverview = MyMapOverview
const XdhMapPalette = MyMapPalette
const XdhMapPanel = MyMapPanel
const XdhMapPlacement = MyMapPlacement
const XdhMapPointer = MyMapPointer
const XdhMapPolygon = MyMapPolygon
const XdhMapPopup = MyMapPopup
const XdhMapRectangle = MyMapRectangle
const XdhMapScale = MyMapScale
const XdhMapScatter = MyMapScatter
const XdhMapText = MyMapText
const XdhMapTrack = MyMapTrack
const XdhMapZoom = MyMapZoom

const components = [
  MyMap,
  MyMapCircle,
  MyMapCluster,
  MyMapDraw,
  MyMapDrawer,
  MyMapFlight,
  MyMapGeo,
  MyMapHeat,
  MyMapHtml,
  MyMapIcon,
  MyMapImage,
  MyMapLayers,
  MyMapLine,
  MyMapLink,
  MyMapMarker,
  MyMapMeasure,
  MyMapOverview,
  MyMapPalette,
  MyMapPanel,
  MyMapPlacement,
  MyMapPointer,
  MyMapPolygon,
  MyMapPopup,
  MyMapRectangle,
  MyMapScale,
  MyMapScatter,
  MyMapText,
  MyMapTrack,
  MyMapZoom
]

const install = function (Vue) {
  components.forEach(n => {
    Vue.use(n)
    Vue.component(n.name.replace('MyMap', 'XdhMap'), n)
  })
}

export {
  MyMap,
  MyMapCircle,
  MyMapCluster,
  MyMapDraw,
  MyMapDrawer,
  MyMapFlight,
  MyMapGeo,
  MyMapHeat,
  MyMapHtml,
  MyMapIcon,
  MyMapImage,
  MyMapLayers,
  MyMapLine,
  MyMapLink,
  MyMapMarker,
  MyMapMeasure,
  MyMapOverview,
  MyMapPalette,
  MyMapPanel,
  MyMapPlacement,
  MyMapPointer,
  MyMapPolygon,
  MyMapPopup,
  MyMapRectangle,
  MyMapScale,
  MyMapScatter,
  MyMapText,
  MyMapTrack,
  MyMapZoom,

  XdhMap,
  XdhMapCircle,
  XdhMapCluster,
  XdhMapDraw,
  XdhMapDrawer,
  XdhMapFlight,
  XdhMapGeo,
  XdhMapHeat,
  XdhMapHtml,
  XdhMapIcon,
  XdhMapImage,
  XdhMapLayers,
  XdhMapLine,
  XdhMapLink,
  XdhMapMarker,
  XdhMapMeasure,
  XdhMapOverview,
  XdhMapPalette,
  XdhMapPanel,
  XdhMapPlacement,
  XdhMapPointer,
  XdhMapPolygon,
  XdhMapPopup,
  XdhMapRectangle,
  XdhMapScale,
  XdhMapScatter,
  XdhMapText,
  XdhMapTrack,
  XdhMapZoom,
  style,
  util,
  install
}

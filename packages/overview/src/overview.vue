<template>
<xdh-map-placement :placement="placement" v-bind="$attrs" >
  <div ref="warp" :class="{'xdh-map-overview': true, 'close': close}" >
    <div :class="{'xdh-map-overview__map': true}" :style="mapWarpSize">
      <xdh-map ref="overviewMap" class="overview-map" v-bind="overviewProp" v-if="overviewInit" @ready="overviewReady" @on-dragUp="overviewDragUpHandle">
         <xdh-map-rectangle v-if="rectangleProp" v-bind="rectangleProp" ></xdh-map-rectangle>
      </xdh-map>
    </div>
    
    <div :class="[{'xdh-map-overview__trigger': true}, placement, `is-${this.theme}`]" @click="close = !close">
      <i class="iconfont" :class="iconClass"></i>
    </div>
  </div>
</xdh-map-placement>
</template>

<script>
  /**
   * 鹰眼控件
   * @module xdh-map-overview
   */
 
  import XdhMapPlacement from '../../placement'
  import XdhMapRectangle from '../../rectangle'
  import XdhMap from '../../map'
  import {getParent, mapReady} from 'utils/util'
  import {getWidth, getHeight, getTopLeft} from 'ol/extent'
  import {DragClass as Drag} from 'packages/index'
  import {addResizeListener, removeResizeListener} from 'utils/resize-event' 
  const ZoomGap = 4 // .5
  /**
   * 参数属性
   * @member props
   * @property {string} [placement] 停泊位置，可选值'left-top', 'right-top', 'left-bottom', 'right-bottom'
   * @property {string} [theme] 主题 可选值 'default', 'light', 'dark'
   * @property {object} [boxStyle] 选择框样式
   * @property {number} [boxStyle.strokeWidth] 边框厚度
   * @property {string} [boxStyle.strokeColor] 边框颜色
   * @property {string} [boxStyle.strokeLineCap] 虚线样式
   * @property {string} [boxStyle.strokeLineJoin] 虚线样式
   * @property {number} [boxStyle.strokeLineDash] 虚线样式
   * @property {number} [boxStyle.strokeLineDashOffset]
   * @property {number} [boxStyle.strokeMiterLimit]
   */
   

  export default {
    name: 'XdhMapOverview',
    components: {
      XdhMapPlacement,
      XdhMap,
      XdhMapRectangle
    },
    props: {
      placement: {
        type: String,
        default: 'left-bottom',
        validator(val) {
          return [
            'left-top', 'right-top', 'left-bottom', 'right-bottom'
          ].includes(val)
        }
      },
      boxStyle: {
        type: Object,
        default: () => {
          return {
            strokeWidth: 3, // 边框厚度
            strokeColor: 'green', // 边框颜色
            strokeLineCap: '', // 虚线样式
            strokeLineJoin: '', // 虚线样式
            strokeLineDash: [], // 虚线样式
            strokeLineDashOffset: 0,
            strokeMiterLimit: 0
          }
        }
        
      },
      theme: {
        type: String,
        default: 'light',
        validator() {
          return ['dark', 'light']
        }
      }
    },
    data() {
      return {
        close: false,
        mapWarpSize: {
          width: '100%',
          height: '100%'
        },
        parent: null,
        parentView: null,
        map: null,
        parentTimer: null,
        parentExtent: null,

        overviewMap: null,
        overviewView: null,
        overviewProp: {},
        overviewInit: false,
        overviewTimer: null
      }
    },
    computed: {
      btnClass() {
        return ['xdh-map-overview__triggr', this.placement]
      }, 
      iconClass() {
        if (this.placement.includes('bottom')) {
          return this.close ? 'icon-up' : 'icon-down'
        }
        return this.close ? 'icon-left' : 'icon-right'
      },
      rectangleProp() {
        if (!this.parentExtent) {
          return null
        } else {
          let width = getWidth(this.parentExtent)
          let height = getHeight(this.parentExtent)
          let position = getTopLeft(this.parentExtent) 
          return {
            width: width,
            height: height,
            position: position,
            fill: 'transparent',
            ...this.boxStyle
            // strokeWidth: 2,
            // strokeColor: 'green'
          }
        }
      }
    },
    methods: {
      ready(map) {
        this.map = map 
        this.parentView = this.map.getView()
        this.parentExtent = this.parentView.calculateExtent() 

        this.parentView.on('change', this.parentViewChange)
        addResizeListener(this.parent.$el, this.listenParentSize)
        this.initOverview()
      },
      parentViewChange(e) {
        if (this.parentTimer) {
          window.clearTimeout(this.parentTimer)
          this.parentTimer = null
        }
        this.parentTimer = window.setTimeout(() => {
          let newCenter = e.target.getCenter()
          let newZoom = e.target.getZoom() 
          
          this.overviewView.setCenter(newCenter)
          this.overviewView.setZoom(Math.max(newZoom - ZoomGap, 1)) 
          this.overviewView.setMaxZoom(Math.max(newZoom - ZoomGap, 1)) 
          this.overviewView.setMinZoom(Math.max(newZoom - ZoomGap, 1)) 
          
          this.parentExtent = e.target.calculateExtent()
          
        }, 500)
      },
      listenParentSize() {
        this.parentExtent = this.parentView.calculateExtent()  
      },
      initOverview() {
        let zoom = Math.max(this.parent.zoom - ZoomGap, 1)
        let prop = {
          coordType: this.parent.coordType, 
          type: this.parent.type,
          layerConfig: this.parent.layConfig,
          zoom: zoom,
          maxZoom: zoom,
          minZoom: zoom
        } 
        this.overviewProp = prop
        this.overviewInit = true
      },
      overviewReady(map, overview) {
        this.overviewMap = map
        this.overviewView = map.getView()
        let inters = map.getInteractions()
        
        inters.getArray().forEach((inter) => { 
          this.overviewMap.removeInteraction(inter)
        })  
        let dragInteraction = new Drag(overview, {
          featureDefine: (feature) => {
            return feature 
          }
        })  
        this.overviewMap.addInteraction(dragInteraction) 
         
      },
      overviewDragUpHandle(feature, e) {
        let center = feature.getGeometry().getInteriorPoint().getCoordinates()
        this.parentView.setCenter([center[0], center[1]])
      },
      setOverViewWarpSize() {
        this.close = false
        this.mapWarpSize.width = this.$refs.warp.offsetWidth + 'px'
        this.mapWarpSize.height = this.$refs.warp.offsetHeight + 'px'
        this.close = true 
      }
    },
    created() {
      // 获取地图组件实例
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    mounted() {
      this.setOverViewWarpSize()
    },
    beforeDestroy() {
      removeResizeListener(this.parent.$el, this.listenParentSize)
      this.parentView.un('change', this.parentViewChange)
      if (this.parentTimer) {
        window.clearTimeout(this.parentTimer)
        this.parentTimer = null
      }
    }
  }
</script>


<template>
  <div class="xdh-map-measure">
    <!--   -->
    <xdh-map-draw ref="draw" :style-json="drawStyle" :type="drawType" @drawend="drawEnd" @change="changeHandle"></xdh-map-draw>
    <xdh-map-html style="pointer-events: none;" ref="tips" :position="tipsPos" :offset="[0, -4]">
      <div class="xdh-map-measure__tooltips" v-show="isStart && tipsShow">
        <div class="help">{{helpMsg}}</div>
        <div class="range" :class="type" v-show="drawing" v-html="currentOutput"></div>
      </div>
    </xdh-map-html>

    <template v-for="(item, index) in marks">
      <xdh-map-html  :key="`close_${index}`" :position="item.pos" :offset="[10, 10]" >
        <div class="xdh-map-measure__close dark" v-if="item" @click="removeMark(index)">
          <i class="iconfont icon-close"></i>  
        </div>
      </xdh-map-html>

      <xdh-map-tooltip :key="`mark_${index}`" :position="item.pos" :offset="[0, -3]" direction="top" >
        <div class="xdh-map-measure__output">
          <span v-html="item.output"></span>
        </div>
      </xdh-map-tooltip>
    </template>
     
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
  /**
   * 测量距离组件
   * @module xdh-map-measure
   */
  import {getParent, mapReady} from 'utils/util'
  import XdhMapDraw from '../../draw'
  import XdhMapHtml from '../../html'
  import XdhMapTooltip from '../../tooltip'
  import {getLength, getArea} from 'ol/sphere.js'
  import {parse} from 'utils/style'
  /**
   * 参数属性
   * @member props
   * @property {string} type 画图类型，可选值：'length'(距离), 'area'（范围）
   * @property {string} pendingMsg 悬停状态下提示语
   * @property {string} drawMsg 测绘状态下提示语
   */

  // const vueProps = {}
  // 默认标记样式
  const DEFAULT_MARK_STYLE = {
    className: 'Style',
    fill: {
      className: 'Fill',
      color: 'rgba(0,0,0,.3)'
    },
    stroke: {
      className: 'Stroke',
      color: 'rgba(255,165,0,0.8)',
      width: 3
    }
  }

  // 默认绘图样式
  const DEFAULT_DRAW_STYLE = {
    className: 'Style',
    fill: {
      className: 'Fill',
      color: 'rgba(255, 255, 255, 0.2)'
    },
    stroke: {
      className: 'Stroke',
      color: 'rgba(0, 0, 0, 0.5)',
      lineDash: [10, 10],
      width: 2
    },
    image: {
      className: 'CircleStyle',
      radius: 5,
      stroke: {
        className: 'Stroke',
        color: 'rgba(0, 0, 0, 1)',
        width: 2
      },
      fill: {
        className: 'Fill',
        color: 'rgba(255, 255, 255, 1)'
      }
    }
  }

  // 换算测量结果
  const _calcOutPut = function(feature) {
    let sourceProj = this.map.getView().getProjection() // 地图投影模式
    let output
    if (this.type === 'length') {
      let length = getLength(feature, {projection: sourceProj})
      if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) +
          ' ' + 'km'
      } else {
        output = (Math.round(length * 100) / 100) +
          ' ' + 'm'
      }
    } else {
      let area = getArea(feature, {projection: sourceProj})
      if(area > 10000) {
        output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2<sup>';
      }else{
        output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2<sup>';
      }
    }
    return output
  }


  export default {
    name: 'XdhMapMeasure',
    components: {
      XdhMapDraw,
      XdhMapHtml,
      XdhMapTooltip
    },
    mixins: [],
    props: {
      type: {
        type: String,
        default: 'length', // area
        validator(val) {
          return ['length', 'area'].includes(val)
        }
      },
      drawStyle: {
        type: Object,
        default: () => {
          return DEFAULT_DRAW_STYLE
        }
      },
      markStyle: {
        type: Object,
        default: () => {
          return DEFAULT_MARK_STYLE
        }
      },
      pendingMsg: {
        type: String,
        default: '点击开始测量'
      },
      drawMsg: {
        type: String,
        default: '双击结束测量'
      }
    },
    data() {
      return {
        isStart: false, // 可以测量状态
        drawing: false, // 是否绘画测量当中
        tipsShow: false, // 鼠标提示显示
        tipsPos: [40, 40], // 鼠标提示的位置
        currentOutput: '', // 当前测距
        currentMarkPos: [0, 0], // 当前测距位置（距离标签定位）
        
        marks: [] // 测距结果数组
      }
    },
    computed: {
      drawType() {
        if (this.type === 'area') {
          return 'Polygon' 
        } else {
          return 'LineString'
        }
      },
      helpMsg() {
        return this.drawing ? this.drawMsg : this.pendingMsg
      }
    },
    watch: {
      drawType(val) {
        if (this.isStart) {
          this.$refs.draw.finish()
          this.$nextTick(() => {
            this.$refs.draw.draw()
          })
        }
      }
    },
    methods: {
      ready(map) {
        this.map = map
        this.map.on('pointermove', this._setTipsPos)
        this._toggleTipsShowOpen = this._toggleTipsShow.bind(this, true)
        this._toggleTipsShowClose = this._toggleTipsShow.bind(this, false)

        this.viewport = this.map.getViewport()
        this.viewport.addEventListener('mouseover', this._toggleTipsShowOpen)
        this.viewport.addEventListener('mouseleave', this._toggleTipsShowClose)
      },
      _setTipsPos(e) { // 说明标签跟随鼠标移动
        this.tipsPos = e.coordinate
      },
      _toggleTipsShow(flag) { // 说明标签显示隐藏（鼠标在视口范围内）
        this.tipsShow = flag
      },

      start() { // 开启测量功能
        if (this.isStart) return
        this.isStart = true
        this.$refs.draw.draw()
      },
      
      stop() { // 关闭测量功能
        if (!this.isStart) return
        this.isStart = false
        this.$refs.draw.finish()
      },
      
      drawEnd(e) {
        const feature = e.feature
        let currentMark = {}
        currentMark.output = this.currentOutput
        if (this.type === 'length') {
          currentMark.pos = feature.getGeometry().getLastCoordinate()
        } else {
          currentMark.pos = feature.getGeometry().getInteriorPoint().getCoordinates()
        }
        this.marks.push(currentMark)

        const style = parse(this.markStyle)
        feature.setStyle(style)
        currentMark.feature = feature
        this.drawing = false
        this.currentOutput = ''
      },

      changeHandle(e) {
        this.drawing = true
        let geom = e.target.getGeometry()
        this.currentOutput = _calcOutPut.call(this, geom)
      },

      removeMark(index) {
        this.$refs.draw.remove(this.marks[index].feature)
        this.marks.splice(index, 1)
      }
       
    },
    created() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    mounted() {
    },
    beforeDestroy() {
      this.map.un('pointermove', this._setTipsPos)
      this.viewport.removeEventListener('mouseover', this._toggleTipsShowOpen)
      this.viewport.removeEventListener('mouseleave', this._toggleTipsShowColse)
      if (this.map && this.marks.length) {
        this.map.removeOverlay(this.$refs.tips.overlay)
        this.marks = []
      }
    }
  }
</script>


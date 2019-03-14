<template>
  <div class="xdh-map-measure">
    <xdh-map-draw ref="draw" :type="drawType" @drawend="drawEnd" @change="changeHandle"></xdh-map-draw>
    <xdh-map-html ref="tips" :position="tipsPos" :offset="[5, 5]">
      <div class="xdh-map-measure__tooltips" v-show="isStart && tipsShow">
        <div class="help">点击开始测量</div>
        <div class="range" :class="type" v-show="drawing" v-html="currentOutput"></div>
      </div>
    </xdh-map-html>
     
    <xdh-map-html  v-for="(item, index) in marks" :key="index" :position="item.pos" :offset="[0, -30]" ref="marks">
      <div class="xdh-map-measure__mark" :style="markStyle" v-if="item" >
        <span v-html="item.output"></span>
        <em :style="{'border-top': `10px solid ${stroke}`}"></em>
      </div>
    </xdh-map-html>

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
  import {getLength, getArea} from 'ol/sphere.js'
  import {parse} from 'utils/style'
  /**
   * 参数属性
   * @member props
   * @property {string} type 画图类型，可选值：'direction'(距离), 'area'（范围） 
   */

  const vueProps = {
    
  }


  export default {
    name: 'XdhMapMeasure',
    components: {
      XdhMapDraw,
      XdhMapHtml
    },
    mixins: [],
    props: {
      type: {
        type: String,
        default: 'direction', // area
        validator(val) {
          return ['direction', 'area'].includes(val)
        }
      },
      fill: {
        type: String,
        default: 'rgba(0,0,0,.3)'
      },
      stroke: {
        type: String,
        default: 'orange'
      },
      color: {
        type: String,
        default: 'white'
      },
      ...vueProps
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
      markStyle() {
        return {
          'background': this.stroke,
          'color': this.color
        }
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
        this.map.getViewport().addEventListener('mouseover', this._toggleTipsShowOpen)
        this.map.getViewport().addEventListener('mouseleave', this._toggleTipsShowClose)
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
        if (this.type === 'direction') {
          currentMark.pos = feature.getGeometry().getLastCoordinate()
        } else {
          currentMark.pos = feature.getGeometry().getInteriorPoint().getCoordinates()
        }
        this.marks.push(currentMark)

        const style = parse({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: this.fill // 'rgba(0,0,0,.3)'
          },
          stroke: {
            className: 'Stroke',
            color: this.stroke, // 'orange',
            width: 3
          }
        })
        feature.setStyle(style)

        this.drawing = false
        this.currentOutput = ''
      },

      changeHandle(e) {
        this.drawing = true
        let geom = e.target.getGeometry()
        
        this.currentOutput = this._calcOutPut(geom)
      },

      // 换算测量结果
      _calcOutPut(feature) {
        let sourceProj = this.map.getView().getProjection() // 地图投影模式
        let output
        if (this.type === 'direction') {
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
       
    },
    created() {
      this.features = []
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    mounted() {
    },
    beforeDestroy() {
      this.map.un('pointermove', this._setTipsPos)
      this.map.getViewport().removeEventListener('mouseover', this._toggleTipsShowOpen)
      this.map.getViewport().removeEventListener('mouseleave', this._toggleTipsShowColse)
      if (this.map) {
        this.map.removeOverlay(this.$refs.tips.overlay)
        this.marks = []
        this.$refs.draw.finish()
        this.$refs.draw.clear()
      }
      
    }
  }
</script>


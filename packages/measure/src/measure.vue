<template>
  <div class="xdh-map-measure">
    <xdh-map-draw ref="draw" :type="drawType" @drawend="drawEnd" @change="changeHandle"></xdh-map-draw>
    <xdh-map-html :position="tipsPos" :offset="[5, 5]">
      <div class="xdh-map-measure__tooltips" v-show="isStart && tipsShow">
        <div class="help">点击开始测量</div>
        <div class="range" v-show="drawing" v-html="currentOutput"></div>
      </div>
    </xdh-map-html>
     
    <xdh-map-html  v-for="(item, index) in marks" :key="index" :position="item.pos" :offset="[0, -30]" ref="marks">
      <div class="xdh-map-measure__mark" v-if="item" v-html="item.output"></div>
    </xdh-map-html>

  </div>
</template>
<style lang="scss" scoped>
.xdh-map-measure{
  &__tooltips{
    position: relative;
    width:5px;
    height: 5px;
    background:blue;
    &>div{
      display:inline-block;
      position: absolute;
      width: max-content;
      padding: 0 3px;
      
      font-size: 12px;
      color: white;
      border-radius: 3px;
      background: rgba(0,0,0,0.6);
    }
    .help{
      // height: 30px;
      line-height: 24px;
      left: 10px;
      top: -3px;
    }
    .range{
      height: 30px;
      top: -40px;
      left: 0;
      transform:translateX(-50%);
    }
  } 
  &__mark {
    position: relative;
    line-height: 24px;
    border-radius: 3px;
    padding: 0 5px;
    color: white;
    background: orange;
    &:before{
      content: '';
      position: absolute;
      display: block;
      width: 0;height: 0;
      border-top: 10px solid orange;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      bottom: -10px;
      left: 50%;
      margin-left: -10px;
    }
  }
}
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
   * @property {string} type 画图类型，可选值：'LineString', 'Polygon', 
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
      ...vueProps
    },
    data() {
      return {
        test: [119.972076416015621, 30.254974365234375],
        isStart: false, // 可以测量状态
        drawing: false, // 是否测量当中
        tipsShow: false, // 鼠标提示显示
        tipsPos: [40, 40], // 鼠标提示的位置
        currentOutput: '',
        currentMarkPos: [0, 0],

        marks: []
      }
    },
    computed: {
      drawType() {
        if (this.type === 'area') {
          return 'Polygon' 
        } else {
          return 'LineString'
        }
      }
    },
    methods: {
      ready(map) {
        this.map = map
        this.map.on('pointermove', (e) => {
          this.tipsPos = e.coordinate
        })
        this.map.getViewport().addEventListener('mouseover', (e) => {
          this.tipsShow = true
        })
        this.map.getViewport().addEventListener('mouseleave', (e) => {
          this.tipsShow = false
        })
      },

      start() {
        this.isStart = true
        this.$refs.draw.draw()
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
        // console.log('marks', this.marks)
        // this.$nextTick(() => {
        //   this.$refs.marks[this.marks.length - 1].show(currentMark.pos)
          
        // })
        
        this.drawing = false
        this.currentOutput = ''

        const style = parse({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'rgba(0,0,0,.3)'
          },
          stroke: {
            className: 'Stroke',
            color: 'orange',
            width: 3
          }
        })
        feature.setStyle(style)
      },

      changeHandle(e) {
        this.drawing = true
        let geom = e.target.getGeometry()
        
        this.currentOutput = this._calcOutPut(geom)
      },

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
    }
  }
</script>


<template>
<xdh-map-placement :placement="placement" :margin="[10]" theme="light" >
  <div class="xdh-map-draw-panel">
    <slot name="type-buttons">
      <div  class="type-btns-warp clearfix" :style="{'width': `${width * 50}px`}">
        <div class="button" v-for="(item, index) in buttonList" :key="index" :title="item.name" @click="draw(item.type)">
          <img class="icon" :src="item.img" />
          <div class="name">{{item.name}}</div>
        </div>
      </div>
    </slot>
    <slot name="tool-buttons">
      <div class="tools-btns-warp clearfix">
        <div :class="{'button': true, 'active': editingFeature}" @click="deleteClickHandle">
          删除
        </div>
        <div v-if="isDrawing" :class="{'button': true, 'active': isDrawing}" @click="cancleClickHandle">
          取消
        </div>
        <!-- <div class="button" @click="resetClickHandle">
          重置
        </div> -->
        <div v-if="!isDrawing" :class="{'button': true, 'active': editingFeature}" @click="finishClickHandle">
          完结
        </div>
        <div :class="{'button': true, 'active': true}" @click="clearClickHandle">
          清空
        </div>
      </div>
    </slot>
  </div> 
</xdh-map-placement>
</template>
<style scoped lang="scss">
.xdh-map-draw-panel{
  box-sizing: border-box;
  padding: 5px;
  * {
    box-sizing: border-box;
  }
  .type-btns-warp{
    // width: 200px;
    .button{
      width: 50px;
      border: 1px solid transparent;
      float: left;
      cursor: pointer;
      .icon{
        display: block;
        margin: 2px auto;
      }
      .name{
        font-size: 12px;
        line-height: 2;
        width: 100%;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:hover{
        border: 1px solid skyblue;
      }
    }
  }
  .tools-btns-warp{
    margin-top: 5px;
    border-top: 1px solid #C5C4C1;
  
    .button{
      float: left; 
      padding: 3px 5px;
      border-radius: 3px;
      border: 1px solid #C5C4C1;
      margin-top: 5px;
      font-size: 14px;
      margin-right: 8px;
      color: #C5C4C1;
      pointer-events: none;
      &.active{
        color: #818181;
        cursor: pointer;
        pointer-events: auto;
      }
    }
  }
} 
 
 
</style> 
<script>
  /**
   * 地图描绘控件
   * @module xdh-map-draw-panel
   */  
  
  import { getParent, mapReady } from 'utils/util'
  import { parse } from 'utils/style' 
  import OlPlot from 'ol-plot'
  import 'ol-plot/dist/ol-plot.css'
  import { getLayerByLayerName } from 'ol-plot/src/Utils/layerUtils'
   
  const style = parse({
    className: 'Style',
    fill: {
      className: 'Fill',
      color: 'rgba(0,0,0,.3)'
    },
    stroke: {
      className: 'Stroke',
      color: 'red',
      width: 5
    }
  })

  const TYPES_ARR = [
    // {type: 'TextArea', name: '文本标绘'},
    {type: 'Point', name: '点'},
    {type: 'Polyline', name: '线'},
    {type: 'Curve', name: '曲线'},
    {type: 'Arc', name: '弓形'},
    {type: 'Circle', name: '圆'},
    {type: 'FreeHandLine', name: '自由线'},
    {type: 'RectAngle', name: '矩形'},
    {type: 'Ellipse', name: '椭圆'},
    {type: 'Lune', name: '弓形'},
    {type: 'Sector', name: '扇形'},
    {type: 'ClosedCurve', name: '闭合曲面'},
    {type: 'Polygon', name: '多边形'},
    {type: 'FreePolygon', name: '自由面'},
    {type: 'GatheringPlace', name: '集结地'},
    {type: 'DoubleArrow', name: '双箭头'},
    {type: 'StraightArrow', name: '细直箭头'},
    {type: 'FineArrow', name: '粗单尖头箭头'},
    {type: 'AttackArrow', name: '进攻方向'},
    {type: 'AssaultDirection', name: '粗单直箭头'},
    {type: 'TailedAttackArrow', name: '进攻方向（尾）'},
    {type: 'SquadCombat', name: '分队战斗行动'},
    {type: 'TailedSquadCombat', name: '分队战斗行动（尾）'},
    {type: 'RectFlag', name: '矩形标志旗'},
    {type: 'TriangleFlag', name: '三角标志旗'},
    {type: 'CurveFlag', name: '曲线标志旗'}
  ]

  export default {
    name: 'XdhMapDrawPanel',
    mixins: [],
    components: { 
    },
    /**
     * 参数属性 
     * @member props
     */
    props: {
      types: {
        type: Array,
        default: () => { return [] }
      },
      placement: {
        type: String,
        default: 'right-center'
      },
      width: {
        type: Number,
        default: 4
      },
      showTools: {
        type: Boolean,
        default: true
      },
      options: {
        type: Object,
        default: () => {
          return {}
        }
      },
      editAfterDraw: {
        type: Boolean,
        default: true
      } 

    },
    data() {
      const initBtnList = () => {
        if (!this.types.length) {
          return TYPES_ARR.map((item) => {
            return {
              ...item,
              img: require(`../../../sources/draw-panel/icon/${item.type}.png`)
            }
          })
        } else {
          let arr = []
          this.types.forEach((item) => {
            if (typeof item === 'string') {
              let target = TYPES_ARR.find((obj) => {
                return obj.type === item
              })
              if (target) {
                arr.push({
                  ...target, 
                  img: require(`../../../sources/draw-panel/icon/${target.type}.png`)
                })
              }
            } else {
              let target = TYPES_ARR.find((obj) => {
                return obj.type === item.type
              })
              if (target) {
                arr.push({
                  ...target, 
                  ...{img: ''},
                  ...{img: require(`../../../sources/draw-panel/icon/${target.type}.png`)}, 
                  ...item
                })
              }
            }
          })
          return arr
        }
      }
      return {
        buttonList: initBtnList(),
        map: null,
        style: style,
        plot: null, 
        
        isDrawing: false,
        isEditing: false,

        editingFeature: null,
        
        lastVersion: null,

        isChange: false
      }
    },
    computed: {
      
    },
    methods: {
      
      ready(map) {
        this.map = map
         
        this.plot = new OlPlot(this.map, {
          zoomToExtent: false
        })

        this.plotLayer = getLayerByLayerName(this.map, this.plot.plotUtils.layerName)
        this.$emit('on-inited', this.plot) 
          
      },
      draw(type) {
        this.isDrawing = true
        this.$emit('on-draw')
        this.plot.plotEdit.deactivate()
        this.isEditing = false 
        this.plot.plotDraw.active(type)
        this.plot.plotDraw.on('drawEnd', this.drawEndHandle)
      },
      drawEndHandle(e) {
        this.isDrawing = false
        const feature = e.feature 
        this.$emit('on-draw-end', feature)
        if (this.editAfterDraw) {
          this.editingFeature = feature
          this.plot.plotEdit.activate(feature)
          this.isEditing = true
          this.$emit('on-edit-start', feature) 
        } 

        
      },
      cancleClickHandle() {
        this.finishDraw()
        this.finishEdit()
      },
      /*
      resetClickHandle() {
        // console.log(this.currentFeatures)
        this.plot.plotEdit.deactivate()
        this.isEditing = false
        this.editingFeature = null
        if (this.currentFeatures) {
          this.plot.plotUtils.removeAllFeatures()
          this.$nextTick(() => {
            this.plot.plotUtils.addFeatures(this.currentFeatures)
          })
        }
        
      },
      */
      deleteClickHandle() {
        if (this.editingFeature) {
          this.plot.plotEdit.deactivate()
          this.isEditing = false
          this.plotLayer.getSource().removeFeature(this.editingFeature)
          this.editingFeature = null 

          
        }
      },
      finishClickHandle() {
        if (this.editingFeature) {
          this.finishEdit()
        } 
      },
      clearClickHandle() {
        this.plot.plotUtils.removeAllFeatures()
        this.editingFeature = null
        this.isEditing = false
        this.isDrawing = false
      },

      finishDraw() {
        if (this.plot.plotDraw.isDrawing()) {
          this.isDrawing = false
          this.plot.plotDraw.disActive()
          this.$emit('on-finish-draw')
        }
      },
      finishEdit() {
        this.plot.plotEdit.deactivate()
        this.$emit('on-finish-edit')
        this.editingFeature = null
        this.isEditing = false
      },
      editFeature(feature) { 
        if (feature && feature.get('isPlot') && !this.plot.plotDraw.isDrawing()) {
          if (!this.isEditing) {
            this.editingFeature = feature
            this.plot.plotEdit.activate(feature)
            this.isEditing = true
            this.$emit('on-edit-start', feature)
          } else {
            this.finishEdit()
          }
        } else {
          console.log('无法编辑此图形')
        }
      }
    },
    created() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    mounted() {
       
       
    },
    beforeDestroy() {
       
    }
  }
</script>

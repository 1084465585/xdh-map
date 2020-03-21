<template>
<xdh-map-placement :placement="placement" :margin="[10]" theme="light" >
  <div class="xdh-map-draw-panel">
    <div class="inner-warp" :style="{'width': `${width * 50}px`}">
      <slot name="type-buttons">
        <div  class="type-btns-warp clearfix" >
          <div class="button" v-for="(item, index) in buttonList" :key="index" :title="item.name" @click="draw(item.type)">
            <img class="icon" :src="item.img" />
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </slot>
      <slot name="tool-buttons">
        <div v-if="useTools" class="tools-btns-warp clearfix">
          <div :class="{'button': true, 'active': editingFeature}" @click="deleteClickHandle">
            删除
          </div>
          <div v-if="isDrawing" :class="{'button': true, 'active': isDrawing}" @click="cancleClickHandle">
            取消
          </div>
          <div v-if="!isDrawing && !isEditing" :class="{'button': true, 'active': oldVersions.length}" @click="resetClickHandle">
            重置
          </div>
          <div v-if="!isDrawing" :class="{'button': true, 'active': editingFeature}" @click="finishClickHandle">
            完结
          </div>
          <div :class="{'button': true, 'active': true}" @click="clearClickHandle">
            清空
          </div>
        
        </div>
      </slot>
      <slot name="style-tools clearfix">
        <div class="style-btns-warp" v-if="useStyle">
          <div class="color-input-item">
            背景色：<input class="color-select" type="color" v-model="editStyle.fillColor" @change="styleInputChange"  />  
          </div> 
          <div class="color-input-item">
            背景透明度：
            <!-- <em class="num-btn" @click="editStyle.fillOpacity -= 0.1">-</em> -->
            <input  class="num-select" type="number" :min="0" :max="1" :step="0.1" v-model="editStyle.fillOpacity" @change="styleInputChange"  />  
            <!-- <em class="num-btn" @click="editStyle.fillOpacity += 0.1">+</em> -->
          </div> 

          <div class="color-input-item">
            边框色：<input class="color-select" type="color" v-model="editStyle.strokeColor" @change="styleInputChange"  />  
          </div> 
          <div class="color-input-item">
            边框宽度：
            <!-- <em class="num-btn" @click="editStyle.strokeWidth -= 1">-</em> -->
            <input  class="num-select" type="number" :min="0" :max="10" :step="1" v-model="editStyle.strokeWidth" @change="styleInputChange"  />  
            <!-- <em class="num-btn" @click="editStyle.strokeWidth += 1">+</em> -->
          </div>
          <div class="color-input-item">
            透明度：
            <!-- <em class="num-btn" @click="editStyle.opacity -= 0.1">-</em> -->
            <input  class="num-select" type="number" :min="0" :max="1" :step="0.1" v-model="editStyle.opacity" @change="styleInputChange"  />  
            <!-- <em class="num-btn" @click="editStyle.opacity += 0.1">+</em> -->
          </div> 
          <!-- <div @click="setStyleOpt">test</div> -->
        </div>
      </slot>
    </div>
    
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
  .style-btns-warp{
    display: block;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    margin-top: 5px;
    border-top: 1px solid #C5C4C1;
    .color-input-item{
      flex: 0 0 150px;
      width: 150px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      font-size: 12px;
      margin: 3px;
      .color-select{
        appearance: normal;
        width: 24px;
        height:24px;
        padding: 0;
        border: 0; 
        outline:none; 
      }
      .num-select{
        line-height: 1;
        height: 20px;
        width: 36px;
        text-align: center;

      }
      .num-btn{
        display: block;
        width: 16px;
        height: 16px;
        text-align: center;
        line-height: 12px;
        font-size:16px;
        font-style: normal;
        border-radius: 50%;
        margin: 0 2px;
        border: 1px solid skyblue;
        color: skyblue; 
        cursor: pointer;
      }
      
    }
  }
} 
::-webkit-color-swatch-wrapper{
  background-color:white;
}
::-webkit-color-swatch{
  position: relative;
}
// input::-webkit-outer-spin-button,
// input::-webkit-inner-spin-button {
//     -webkit-appearance: none;
// }

</style> 
<script>
  /**
   * 地图描绘控件
   * @module xdh-map-draw-panel
   */  
  
  import { getParent, mapReady } from 'utils/util'
  import { parse, colorRgba } from 'utils/style' 
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
     * @property {array} types 画板功能类型，默认为空时表示激活全部功能
     * @property {string} placement 控件在地图的放置方位
     * @property {number} width 长度单位（此width值为按钮的横向排列个数，按钮宽为50px, 控件宽度为 50*width）
     * @property {object} options ol-plot 的 配置项 （略）
     * @property {boolean} editAfterDraw 添加图形后是否直接进入编辑模式（默认true）
     * @property {boolean} isMemory 是否开启记忆功能
     * @property {boolean} useTools 显示工具按钮
     * @property {boolean} useText 使用添加文字功能 （默认false,体验一般）
     * @property {boolean} useStyle 使用样式修改工具 
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
      options: {
        type: Object,
        default: () => {
          return {}
        }
      },
      editAfterDraw: {
        type: Boolean,
        default: true
      },
      isMemory: {
        type: Boolean,
        default: true
      },
      useTools: {
        type: Boolean,
        default: true
      },
      useText: {
        type: Boolean,
        default: false
      },
      useStyle: {
        type: Boolean,
        default: true
      } 

    },
    data() {
      const initBtnList = () => {
        let _TYPES_ARR = []
        if (this.useText) {
          _TYPES_ARR = _TYPES_ARR.concat(TYPES_ARR).concat([{type: 'TextArea', name: '文本标绘'}])
        } else {
          _TYPES_ARR = _TYPES_ARR.concat(TYPES_ARR)
        }
        if (!this.types.length) {
          return _TYPES_ARR.map((item) => {
            return {
              ...item,
              img: require(`../../../sources/draw-panel/icon/${item.type}.png`)
            }
          })
        } else {
          let arr = []
          this.types.forEach((item) => {
            if (typeof item === 'string') {
              let target = _TYPES_ARR.find((obj) => {
                return obj.type === item
              })
              if (target) {
                arr.push({
                  ...target, 
                  img: require(`../../../sources/draw-panel/icon/${target.type}.png`)
                })
              }
            } else {
              let target = _TYPES_ARR.find((obj) => {
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
        
        oldVersions: [],

        // ----------------
        editStyle: {
          fillColor: '#cccccc',
          fillOpacity: 1,
          fill: '',
          strokeColor: '#000000',
          strokeWidth: 2,
          opacity: 1
        }
      }
    },
    computed: {
      
    },
    
    methods: {
      
      ready(map) {
        this.map = map
         
        this.plot = new OlPlot(this.map, {
          zoomToExtent: false,
          ...this.options
        })

        this.plotLayer = getLayerByLayerName(this.map, this.plot.plotUtils.layerName)
        /**
         * 画图工具初始化完成事件
         * @event on-inited
         * @param {Object} plot
         */
        this.$emit('on-inited', this.plot)
      },
      draw(type) {
        if (this.isMemory) {
          this.saveCurrent()
        }

        this.isDrawing = true
        /**
         * 开始添加图形
         * @event on-draw
         */
        this.$emit('on-draw')
        this.plot.plotEdit.deactivate()
        this.isEditing = false 
        this.plot.plotDraw.active(type)
        this.plot.plotDraw.on('drawEnd', this.drawEndHandle)
        
      },
      drawEndHandle(e) {
        this.isDrawing = false
        const feature = e.feature 
        if (this.useStyle) {
          let styleOpt = this.setStyleOpt()
          let style = this.styleInit(styleOpt)
          feature.setStyle(style)
        }
        /**
         * 当前画图完结事件
         * @event on-draw-end
         * @param {Object} feature
         */
        this.$emit('on-draw-end', feature) 

        if (this.editAfterDraw) {
          this.editingFeature = feature
          this.plot.plotEdit.activate(feature)
          this.isEditing = true
          /**
           * 开始修改图形
           * @event on-edit-start
           * @param {Object} feature
           */
          this.$emit('on-edit-start', feature) 
        } 
      },
      cancleClickHandle() {
        this.finishDraw()
        this.finishEdit()
      },
      
      resetClickHandle() {
        if (this.oldVersions.length) {
          let version = this.oldVersions.pop()
          this.plot.plotUtils.removeAllFeatures()
          this.plot.plotUtils.addFeatures(version)
        }
      }, 
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
          /**
           * 添加图形结束事件（不是完结，强制结束）
           * @event on-finish-draw
           */
          this.$emit('on-finish-draw')
        }
      },
      finishEdit() {
        this.plot.plotEdit.deactivate()
        /**
         * 完成修改图形
         * @event on-finish-edit
         */
        this.$emit('on-finish-edit')
        this.editingFeature = null
        this.isEditing = false 
      },
      editFeature(feature) { 
        if (feature && feature.get('isPlot') && !this.plot.plotDraw.isDrawing()) {
          if (!this.isEditing) {
            if (this.isMemory) {
              this.saveCurrent()
            }
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
      },
      saveCurrent() {
        let version = this.plot.plotUtils.getFeatures()
        if (version.length) {
          this.saveVersion(version)
        }
        return version 
      },
      saveVersion(version) {
        if (this.oldVersions.length < 5) {
          this.oldVersions.push(version)
        } else {
          this.oldVersions.shift()
          this.oldVersions.push(version)
        }
        // console.log('save success', this.oldVersions)
      },
      clearVerson() {
        this.oldVersions = []
      },
      setStyleOpt() {
        let style = {}
        let fillOpacity = Math.max(0, Math.min(this.editStyle.fillOpacity, 1))
        let strokeWidth = Math.max(1, Math.min(this.editStyle.strokeWidth, 10))
        let opacity = Math.max(0, Math.min(this.editStyle.opacity, 1))
        style.fill = colorRgba(this.editStyle.fillColor, fillOpacity)
        style.strokeWidth = strokeWidth
        style.strokeColor = this.editStyle.strokeColor
        style.opacity = opacity

        // console.log('style', style)
        return style 
      },
      styleInit(styleOpt) {
        return parse({
          className: 'Style',
          opacity: styleOpt.opacity,
          fill: {
            className: 'Fill',
            color: styleOpt.fill
          },
          stroke: {
            className: 'Stroke',
            color: styleOpt.strokeColor,
            width: styleOpt.strokeWidth
          }
        })
      },
      styleInputChange() {
        if (this.editingFeature) {
          let styleOpt = this.setStyleOpt()
          let style = this.styleInit(styleOpt)
          this.editingFeature.setStyle(style)
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

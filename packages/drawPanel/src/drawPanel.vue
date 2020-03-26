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
          <div v-if="!isDrawing" :class="{'button': true, 'active': editingFeature}" @click="finishClickHandle">
            完结
          </div>
          <div :class="{'button': true, 'active': true}" @click="clearClickHandle">
            清空
          </div>
          <div :class="{'button': true, 'active': true}" @click="getClickHandle">
            获取
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

<script>
  /**
   * 地图描绘控件
   * @module xdh-map-draw-panel
   */  

   /**
   * 插槽
   * @member slots
   * @property {string} type-buttons 类型按钮容器
   * @property {string} tool-buttons 工具按钮容器
   * @property {string} style-tools 样式工具容器
   * 
   */
  import XdhMapPlacement from 'packages/placement'
  import { getParent, mapReady } from 'utils/util'
  import { parse, colorRgba } from 'utils/style' 
  import OlPlot from 'ol-plot'
  import 'ol-plot/dist/ol-plot.css'
  import { getLayerByLayerName } from 'ol-plot/src/Utils/layerUtils'
   

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

  const initBtnList = function(vue) {
    let _TYPES_ARR = []
    if (vue.useText) {
      _TYPES_ARR = _TYPES_ARR.concat(TYPES_ARR).concat([{type: 'TextArea', name: '文本标绘'}])
    } else {
      _TYPES_ARR = _TYPES_ARR.concat(TYPES_ARR)
    }
    if (!vue.types.length) {
      return _TYPES_ARR.map((item) => {
        return {
          ...item,
          img: require(`../../../sources/draw-panel/icon/${item.type}.png`)
        }
      })
    } else {
      let arr = []
      vue.types.forEach((item) => {
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

  export default {
    name: 'XdhMapDrawPanel',
    mixins: [],
    components: {
      XdhMapPlacement 
    },
    /**
     * 参数属性 
     * @member props
     * @property {array} types 画板功能类型，默认为空时表示激活全部功能
     * @property {string} placement 控件在地图的放置方位
     * @property {number} width 长度单位（此width值为按钮的横向排列个数，按钮宽为50px, 控件宽度为 50*width）
     * @property {object} options ol-plot 的 配置项 （略）
     * @property {boolean} editAfterDraw 添加图形后是否直接进入编辑模式（默认true）
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
      return {
        buttonList: initBtnList(this),
        map: null,
         
        plot: null, 
        
        isDrawing: false,
        isEditing: false,

        editingFeature: null, 

        // ----------------
        editStyle: {
          fillColor: '#cccccc',
          fillOpacity: 1,
          fill: '',
          strokeColor: '#000000',
          strokeWidth: 2,
          opacity: 1
        },
        featuresMap: {}
      }
    },
    computed: {
    },
    watch: {
      types() {
        this.buttonList = initBtnList(this)
      },
      useText() {
        this.buttonList = initBtnList(this)
      }
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
        this.plot.plotDraw.on('drawEnd', this.drawEndHandle)
      },
      draw(type) {
        this.isDrawing = true
        /**
         * 开始添加图形
         * @event on-draw
         */
        this.$emit('on-draw')
        this.plot.plotEdit.deactivate()
        this.isEditing = false 
        this.plot.plotDraw.active(type) 
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
        
        let currentId = new Date().getTime()
        feature.setId(currentId)
        this.featuresMap[currentId] = feature
         
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
        } else {
          this.finishDraw()
        }
      },
      clearClickHandle() {
        this.plot.plotUtils.removeAllFeatures()
        this.editingFeature = null
        this.isEditing = false
        this.isDrawing = false
      },
      getClickHandle() {
        this.$emit('on-getAll', this.featuresMap)
        return this.featuresMap
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
        // console.log('editNow', feature)
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

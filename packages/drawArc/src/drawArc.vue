<template>
  <div> </div>
</template>

<script>
  /**
   * 地图图层类型切换控件
   * @module xdh-map-draw-arc
   */
  import Collection from 'ol/Collection'
  import CleanMixin from 'utils/mixins/clean'
  import { Draw, Modify } from 'ol/interaction.js'
  import { getParent, mapReady } from 'utils/util'
  import Feature from 'ol/Feature'
  import Point from 'ol/geom/Point'
  import LineString from 'ol/geom/LineString'
  import { 
    // getCircleCenterOfThreePoints, MathDistance, getAzimuth, isClockWise, getArcPoints 
    getArcLine
  } from 'utils/plot-utils'
  import {parseStyle} from '../../../packages'
  const pointStyle = function (color) {
    return parseStyle({
      className: 'Style',
      zIndex: 2,
      image: {
        className: 'Circle',
        radius: 5,
        stroke: {
          className: 'Stroke',
          width: 2,
          color: 'red'
        },
        fill: {
          className: 'Fill',
          color: color
        }
      } 
    })
  }
  

  export default {
    name: 'XdhMapDrawArc',
    mixins: [CleanMixin],
    components: { 
    },
    /**
     * 参数属性 
     */
    props: {
      // Delay in milliseconds after pointerdown before the current vertex can be dragged to its exact position.
      dragVertexDelay: {
        type: Number,
        default: 500
      },
      // Pixel distance for snapping to the drawing finish.
      snapTolerance: {
        type: Number,
        default: 12
      },
      wrapX: Boolean,
      lineStyle: null

    },
    data() {
      return {
        parent: null,
        map: null,
        source: null,
        currentArcLine: null,
        currentFeature: null,
        pointStyle: pointStyle('white'),

        features: [], 

       
        tempPoints: [],
        allPoints: [],

        isDraw: false,
        isModify: false,

        drawer: null
      }
    },
    computed: {
      
    },
    methods: {
      ready(map) {
        this.map = map
      },
      // 创建画弧交互
      draw() {
        if (!this.map || !this.parent) return
        if (this.isDraw) return
        if (!this.source) {
          const layer = this.parent.createVectorLayer()
          this.source = layer.getSource() 
        }
        
        this.isDraw = true
        
        this.drawer = new Draw({
          source: this.source,
          type: 'Point',
          style: null,
          ...this.$props
        })
        this.map.addInteraction(this.drawer) 
        this.drawer.on('drawend', this.handleDraw)
      },
      // 每个点画完后回调 
      handleDraw(e) { 
        // console.log('drawPoint', e)
        let point = e.feature  
        e.feature.setProperties({'type': 'removable'})
        this.map.on('pointermove', this.drawPointerMove) 
        this.tempPoints.push(point) 

        if (this.tempPoints.length === 3) {
          this.collectData()
          this.stopDraw()
        } 
        
        if (this.tempPoints.length === 1) {
          let start = this.tempPoints[0].getGeometry().getCoordinates()
          this.addLine(start, start)
        } 
      }, 
      // 画点过程中 
      drawPointerMove(e) { 
        if (this.tempPoints.length === 1) {
          let start = this.tempPoints[0].getGeometry().getCoordinates()
          this.currentArcLine.setCoordinates([start, e.coordinate])
        } else if (this.tempPoints.length === 2) {
          let start = this.tempPoints[0].getGeometry().getCoordinates()
          let end = this.tempPoints[1].getGeometry().getCoordinates()
          let inside = e.coordinate
          let archLine = this.getArcLine(start, end, inside)
          this.currentArcLine.setCoordinates(archLine)
        } 
      }, 
      // 收集弧线feature 数据
      collectData() {
        let coorLength = this.currentFeature.getGeometry().getCoordinates().length
        if (coorLength <= 2) {
          this.currentFeature.setProperties({'type': 'removable'})
          return
        } 
        let id = `arc${new Date().getTime()}` 
        this.currentFeature.setId(id) 
        this.features.push(this.currentFeature) 
        this.$emit('drawend', this.currentFeature, this.features)
      },
      // 暂停 当前弧线 绘制
      stopDraw() { 
        this.map.un('pointermove', this.drawPointerMove)  
        this.currentArcLine = null
        this.currentFeature = null
        this.tempPoints = []
        // console.log('tempP', this.tempPoints, this.features) 
      },

      // 结束 绘制 弧形
      finishDraw() {
        // console.log('isFinish')
        let features = this.source.getFeatures()
        features.forEach((p) => { 
          let props = p.getProperties('type')
          if (props.type === 'removable') {
            this.source.removeFeature(p)
          }
        })  

        this.drawer.un('drawend', this.handleDraw)
        this.map.removeInteraction(this.drawer)
        this.drawer = null 
 

        this.currentArcLine = null
        this.currentFeature = null
        this.tempPoints = []
        this.isDraw = false
 
      },
       

      // 开始创建编辑交互
      modify() {
        if (!this.features.length) return
        if (this.isModify) return
        this.finish()
        this.$nextTick(() => {
          this.isModify = true
          this.createModify()
        })
      },

      // 将所有 弧形 的作用点 创建 Modify() 交互对象
      createModify() {
        let allPoints = []
        this.features.forEach((feature) => {
          let id = feature.getId()
          let coords = feature.getGeometry().getCoordinates()
          // console.log('coords', coords) 
          let length = coords.length
          let handleCoords = [coords[0], coords[length - 1], coords[Math.floor(length / 2)]]
          
          
          let points = handleCoords.map((coord, index) => {
            let p = this.addPoint(coord)
            p.setId(`${id}_${index + 1}`)
            p.setProperties({'type': 'handlePoint'})
            return p
          })
          allPoints = allPoints.concat(points)
        })
        
        this.allPoints = allPoints
        this.drawer = new Modify({
          features: new Collection(allPoints),
          style: null,
          wrapX: this.wrapX
        })
        this.drawer.on('modifystart', this.handleModifyStart)
        this.drawer.on('modifyend', this.handleModifyEnd)
        this.map.addInteraction(this.drawer)
      },

      // 修改开始 点击 事件 回调函数
      handleModifyStart(e) {
         
        let dragFeature = e.target.dragSegments_.length ? e.target.dragSegments_[0][0].feature : null
     
        if (!dragFeature) return
        // console.log(dragFeature)
        let arcId = dragFeature.getId().split('_')[0]
        this.currentFeature = this.features.find((item) => {
          return item.getId() === arcId
        })
        this.tempPoints = e.features.getArray().reduce((total, item) => {
          let mainId = item.getId().split('_')[0]
          if (mainId === arcId) {
            total.push(item)
          } 
          return total
        }, [])
        
        // console.log(this.currentFeature, this.tempPoints)
        this.modifyPointerMoveProxy = this.modifyPointerMove.bind(this, dragFeature)
        this.map.on('pointermove', this.modifyPointerMoveProxy)

      }, 

      // 修改过程中 鼠标移动 回调函数
      modifyPointerMove(dragFeature, e) {
        let index = dragFeature.getId().split('_')[1]
        let pointCoor = this.tempPoints.map((item) => {
          return item.getGeometry().getCoordinates()
        })
        // console.log(index)
        let points 
        if (index === '1') {
          points = [e.coordinate, pointCoor[1], pointCoor[2]] 
        } else if (index === '2') {
          points = [pointCoor[0], e.coordinate, pointCoor[2]]  
        } else if (index === '3') {
          points = [pointCoor[0], pointCoor[1], e.coordinate]   
        }
        let path = this.getArcLine(...points) 
        this.currentFeature.getGeometry().setCoordinates(path)
      },

      // 修改过程中 鼠标放开后 回调函数
      handleModifyEnd(e) {
        this.map.un('pointermove', this.modifyPointerMoveProxy)
      },

      // 结束修改
      finishModify() {
        this.allPoints.forEach((p) => {
          this.source.removeFeature(p)
        }) 
        this.drawer.un('modifystart', this.handleModifyStart)
        this.drawer.un('modifyend', this.handleModifyEnd)
        this.map.removeInteraction(this.drawer) 
        this.drawer = null
        this.currentFeature = null
        this.tempPoints = []
        this.allPoints = []
        this.isModify = false
      },

      // 结束当前 绘制 / 编辑 状态
      finish() { 
        if (this.isDraw) {
          this.stopDraw()
          this.finishDraw()
        }
        if (this.isModify) {
          this.finishModify()
        }
      }, 

      clear() {
        if (this.isModify || this.isDraw) {
          this.finish()
        }
        this.features.forEach((f) => {
          this.source.removeFeature(f)
        })
        this.features = []
      },

      addPoint(coor) {
        let feature = new Feature({
          geometry: new Point(coor)
        }) 
        feature.setStyle(this.pointStyle)
        this.source.addFeature(feature) 
        return feature
      },  
      addLine(start, end) { 
        this.currentArcLine = new LineString([start, end])
        this.currentFeature = new Feature({
          geometry: this.currentArcLine
        })
        this.currentFeature.setStyle(this.lineStyle) 
        this.source.addFeature(this.currentFeature) 
      },
      getArcLine(p1, p2, p3) {
        return getArcLine(p1, p2, p3)
        
      } 
    },
    created() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      if (this.map) {
        this.finish()
        this.clear()
      }
    }
  }
</script>

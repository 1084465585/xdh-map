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
  import { Modify } from 'ol/interaction.js'
  import { getParent, mapReady } from 'utils/util'
  import Feature from 'ol/Feature'
  import Point from 'ol/geom/Point'
  import LineString from 'ol/geom/LineString'
  import { getCircleCenterOfThreePoints, MathDistance, getAzimuth, isClockWise, getArcPoints } from 'utils/plot-utils'
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
  const pointHideStyle = function () {
    return parseStyle({
      className: 'Style', 
      image: {
        className: 'Circle',
        radius: 0,
        fill: {
          className: 'Fill',
          color: 'transparent'
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

        featuresData: [], 

       
        tempPoints: [],
        allPoints: [],

        isDraw: false
        // isModify: false
      }
    },
    computed: {
      features() {
        return this.featuresData.map((item) => {
          return item.line
        })
      } 
    },
    methods: {
      ready(map) {
        this.map = map
      },
      draw() {
        if (!this.map || !this.parent) return
        if (!this.source) {
          const layer = this.parent.createVectorLayer()
          this.source = layer.getSource() 
        }
        
        this.isDraw = true
        this.map.on('click', this.handleDraw)  
        
      },
      addPoint(coor) {
        let feature = new Feature({
          geometry: new Point(coor)
        }) 
        feature.setStyle(this.pointStyle)
        this.source.addFeature(feature)
        
        return feature
      },
      handleDraw(e) {
        let point = this.addPoint(e.coordinate)
        this.map.on('pointermove', this.listenPointerMove) 
        this.tempPoints.push(point) 

        if (this.tempPoints.length === 3) {
          this.finish()
        } 
        
        if (this.tempPoints.length === 1) {
          let start = this.tempPoints[0].getGeometry().getCoordinates()
          this.addLine(start, start)
        } 
         
      },
      
      finish() {
        this.isDraw = false 
        
        if (this.tempPoints.length === 3) {
          this.collectFeature()
        } else {
           this.tempPoints.forEach((p) => {
            this.source.removeFeature(p)
          })
          this.source.removeFeature(this.currentFeature)
        }
        
         this.currentArcLine = null
        this.currentFeature = null
        this.tempPoints = []
        
        this.map.un('pointermove', this.listenPointerMove)
        this.map.un('click', this.handleDraw) 
     
      },
      
      collectFeature() {
        let id = `arc${new Date().getTime()}`
        let obj = {id: id}
        this.currentFeature.setId(id)
        obj.line = this.currentFeature

        const hideStyle = pointHideStyle()
        this.tempPoints.forEach((p, index) => {
          p.setId(`${id}_${index + 1}`) 
          p.setStyle(hideStyle) 
        })

        obj.points = this.tempPoints.concat([])
        this.featuresData.push(obj)  

        this.$emit('drawend', obj.line, obj, this.features, this.featuresData) 
      },
      edit() {
        this.isModify = true
        let allPoints = []
        this.featuresData.forEach((data) => {
          data.points.forEach((p) => {
            p.setStyle(this.pointStyle)

            allPoints.push(p)
          })

        })
        console.log(allPoints)
        
        this.drawer = new Modify({
          features: new Collection(allPoints),
          style: null,
          wrapX: this.wrapX
        })
        this.drawer.on('modifystart', this.handleModifyStart)
        this.drawer.on('modifyend', this.handleModifyEnd)
        this.map.addInteraction(this.drawer)
      }, 
      handleModifyStart(e) {
        
        let dragFeature = e.target.dragSegments_.length ? e.target.dragSegments_[0][0].feature : null
     
        if (!dragFeature) return
        
        let {line, startP, endP, insideP, index} = {...this.getRelateFeatures(dragFeature)}
        
        this.modifyPointerMoveProxy = this.modifyPointerMove.bind(this, line, startP, endP, insideP, index)
        this.map.on('pointermove', this.modifyPointerMoveProxy)
      },
      handleModifyEnd(e) {
         this.map.un('pointermove', this.modifyPointerMoveProxy)
      },
      getRelateFeatures(dragFeature) {
        
        let arcId = dragFeature.getId().split('_')[0]
        let index = dragFeature.getId().split('_')[1]
        let target = this.featuresData.find((data) => {
          return data.id === arcId
        })
        let startP
        let endP
        let insideP
        if (index === '1') {
          startP = dragFeature
          endP = target.points[1]
          insideP = target.points[2]
        } else if (index === '2') {
          startP = target.points[0]
          endP = dragFeature
          insideP = target.points[2]
        } else if (index === '3') {
          startP = target.points[0]
          endP = target.points[1]
          insideP = dragFeature 
        }
        // console.log(arcId, target, startP, endP, insideP)
        return {
          line: target.line, 
          startP: startP, 
          endP: endP, 
          insideP: insideP,
          index: index
        }
      },
      modify(feature) {
         
      },
      clear() {
         
      },
       
      listenPointerMove(e) { 
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
      modifyPointerMove(line, startP, endP, insideP, index, e) {
        console.log('modify', arguments)
        let start = startP.getGeometry().getCoordinates()
        let end = endP.getGeometry().getCoordinates()
        let inside = insideP.getGeometry().getCoordinates()
        // let move = e.coordinate
        let points 
        if (index === '1') {
          points = [e.coordinate, end, inside] 
        } else if (index === '2') {
          points = [start, e.coordinate, inside] 
        } else if (index === '3') {
          points = [start, end, e.coordinate]  
        }
        let path = this.getArcLine(...points)
        // line.getGeomerty().setCoordinates(path) 
        line.getGeometry().setCoordinates(path)

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
        let [pnt1, pnt2, pnt3, startAngle, endAngle] = [p1, p2, p3, null, null]

        let center = getCircleCenterOfThreePoints(pnt1, pnt2, pnt3)
        let radius = MathDistance(pnt1, center)
        let angle1 = getAzimuth(pnt1, center)
        let angle2 = getAzimuth(pnt2, center)  

        if (isClockWise(pnt1, pnt2, pnt3)) {
          startAngle = angle2
          endAngle = angle1
        } else {
          startAngle = angle1
          endAngle = angle2
        }
        
        return getArcPoints(center, radius, startAngle, endAngle)
      } 
    },
    created() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      // if (this.map) {
      //   this.finish()
      //   this.clear()
      // }
    }
  }
</script>

<template>
  <xdh-map-draw ref="pointDraw" type="Point" @drawend="drawend" @drawstart="drawstart" @modifystart="handleModifyStart" @modifyend="handleModifyEnd"></xdh-map-draw>
</template>

<script>
  /**
   * 地图图层类型切换控件
   * @module xdh-map-draw-arc
   */

  import XdhMapDraw from 'packages/draw'
  import { getParent, mapReady } from 'utils/util'
  import Feature from 'ol/Feature'
  import LineString from 'ol/geom/LineString'
  import { getCircleCenterOfThreePoints, MathDistance, getAzimuth, isClockWise, getArcPoints } from 'utils/plot-utils'

  export default {
    name: 'XdhMapDrawArc',
    components: {
      XdhMapDraw
    },
    /**
     * 参数属性 
     */
    props: {
      ...XdhMapDraw.props
      // 线的Style描述JSON
      // lineStyle: Object
    },
    data() {
      return {
        parent: null,
        map: null,
        currentArcLine: null,
        currentFeature: null,
        currentStart: [],
        currentEnd: [],
        features: []
      }
    },
    computed: {
       
    },
    methods: {
      ready(map) {
        this.map = map
      },
      draw() {
        this.$refs.pointDraw.draw()
      },
      finish() {
        this.$refs.pointDraw.finish()
      },
      clear() {
        this.$refs.pointDraw.clear()
      },
      drawend(e) {  
        
        let length = this.$refs.pointDraw.features.length
        // e.feature.setId(`arcPoint_${new Date().getTime()}_${length - 1}`)
        if ((length % 2 === 0 && length < 3) || length % 3 === 2) {
          this.currentStart = this.$refs.pointDraw.features[length - 2].getGeometry().getCoordinates()
          this.currentEnd = this.$refs.pointDraw.features[length - 1].getGeometry().getCoordinates()
          // console.log(this.currentStart, this.currentEnd)
          this.addLine(this.currentStart, this.currentEnd)
          this.map.on('pointermove', this.listenPointMove)
        }
        if (length % 3 === 0) { 
          this.$refs.pointDraw.finish()
          this.map.un('pointermove', this.listenPointMove)
          this.features.push(this.currentFeature)
          this.clearCurrent()
          // console.log(this.features)
        }
        this.$refs.pointDraw.features[length - 1].setId(`arcPoint_${new Date().getTime()}_${length - 1}`)
      },
      modify() {
        this.$refs.pointDraw.modify()
      },

      listenPointMove(e) { 
        this.addLine(this.currentStart, e.coordinate, this.currentEnd)
      },
      
      drawstart(e) {
      },

      handleModifyEnd(e) {
        // console.log(e)
        let points = e.features.getArray()  
        console.log(points)
        if (e.target.dragSegments_[0][0] && e.target.dragSegments_[0][0].feature) {
          let editPoint = e.target.dragSegments_[0][0].feature
          let pointCoor = editPoint.getGeometry().getCoordinates()
          let _index = parseInt(editPoint.getId().split('_')[2])
          let index = Math.floor(_index / 3)
          let offset = (_index + 1) % 3
          // console.log(index, offset)
          let start
          let end
          let inside 
          if (offset === 0) { // inside 
            console.log('handle inside', points[_index - 2], points[_index - 1])
            inside = pointCoor
            start = points[_index - 2].getGeometry().getCoordinates()
            end = points[_index - 1].getGeometry().getCoordinates() 
          } else if(offset === 1) { // start
           console.log('handle start', offset, _index)
            inside = points[_index + 2].getGeometry().getCoordinates()
            start = pointCoor
            end = points[_index + 1].getGeometry().getCoordinates()
          } else if (offset === 2) { // end 
           console.log('handle end', offset, _index)
            inside = points[_index + 1].getGeometry().getCoordinates()
            start = points[_index - 1].getGeometry().getCoordinates()
            end = pointCoor
          }
         
          let path = this.getArcLine(start, end, inside)
          // console.log(this.features, this.features[index], index, start, inside, end)
          this.features[index].getGeometry().setCoordinates(path)  
           
        }

      },
      handleModifyStart(e) {

      },

      addLine(start, end, inside) { 
        if (!this.currentFeature) {
          this.currentArcLine = new LineString([start, end])
          this.currentFeature = new Feature({
            geometry: this.currentArcLine
          })
         
          this.parent.addFeature(this.currentFeature) 
        } else {
          let arcLine = this.getArcLine(start, inside, end)
          this.currentArcLine.setCoordinates(arcLine)
        } 
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
      },
      clearCurrent() {
        this.currentArcLine = null
        this.currentFeature = null
        this.currentStart = []
        this.currentEnd = []
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

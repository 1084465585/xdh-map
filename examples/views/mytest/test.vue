<template>
  <example class="flex"> 
    <xdh-map ref="map" type="Baidu" id="map3"  :zoom="9" :center="target" @ready="mapReady"  > 
      <xdh-map-placement>
        <button @click="drawPoint">画点</button> 
        <button @click="drawModify">编辑</button> 
        <button @click="drawFinish">完成</button>
        <button @click="drawClear">清除</button>
      </xdh-map-placement>

      <xdh-map-draw-arc ref="arcDraw"></xdh-map-draw-arc>
    </xdh-map>
 
   
 
  </example>
</template>

<script> 

import {parseStyle} from '../../../packages'
import Feature from 'ol/Feature'
import LineString from 'ol/geom/LineString'
import * as PlotUtils from '../../../utils/plot-utils'
 
// import Point from 'ol/geom/Point'

// import {Vector as VectorLayer} from 'ol/layer';
// import VectorSource from 'ol/source/Vector';

 
const pathStyle = parseStyle({
  className: 'Style',
  fill: {
    className: 'Fill',
    color: 'rgba(0,0,0,.3)'
  },
  stroke: {
    className: 'Stroke',
    color: 'red',
    width: 4
  }
})

 
export default {
  
  data() {
    return {
      path: [[113, 23], [112.4, 23.4], [112.4, 23.9]],
      map: null,
      view: null,  
      target: [113, 23],

      style: pathStyle
    }
  },
  computed: {
      
  },
  methods: {
      
    mapReady(map) {
      this.map = map
      this.view = this.map.getView()
     
      // this.setArc()
    },
    addLine() {
      let arcLine = this.setArc() 
      let geo = new LineString(arcLine)
      // console.log(geo)
      let feature = new Feature({
        geometry: geo
      })

      this.$refs.map.addFeature(feature)
    },

    setArc() {
      let [pnt1, pnt2, pnt3, startAngle, endAngle] = [this.path[0], this.path[1], this.path[2], null, null]

      let center = PlotUtils.getCircleCenterOfThreePoints(pnt1, pnt2, pnt3)
      let radius = PlotUtils.MathDistance(pnt1, center)
      let angle1 = PlotUtils.getAzimuth(pnt1, center)
      let angle2 = PlotUtils.getAzimuth(pnt2, center)  

      if (PlotUtils.isClockWise(pnt1, pnt2, pnt3)) {
        startAngle = angle2
        endAngle = angle1
      } else {
        startAngle = angle1
        endAngle = angle2
      }
       
      return PlotUtils.getArcPoints(center, radius, startAngle, endAngle)
    },
    
    clickHandle(e) {
      console.log(e)
    },

    drawPoint() {
      this.$refs.arcDraw.draw()
    },
    drawFinish() {
      this.$refs.arcDraw.finish()
    },
    drawModify() {
      this.$refs.arcDraw.modify()
    },
    drawClear() {
      this.$refs.arcDraw.clear()
    },
    drawend(e) {

      console.log('drawend', e, this.$refs.pointDraw)
    
    
      // this.map.on('pointermove', this.listenPointMove)
        // this.$refs.pointDraw.finish()
        // this.map.un('pointermove', this.listenPointMove)
    },
    listenPointMove(e) {
      console.log(e.coordinate)
    },
    drawstart(e) {
      let coords = e.feature.getGeometry().getCoordinates()
      console.log('drawstart', coords)
      if (coords.length === 3) {
        this.$refs.pointDraw.finish()
      }

    }
     
    
  },
  created() {
    
  },
  mounted() {
    // console.log('ccc', VectorContext)
  }
}
</script>

<style scoped lang="scss">
 
 
 
</style>

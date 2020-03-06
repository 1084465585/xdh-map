<template>
  <example class="flex"> 
    <xdh-map ref="map" type="Baidu" id="map3"  :zoom="9" :center="target" @ready="mapReady"   > 
      <xdh-map-placement>
        <button @click="drawPoint">开始</button> 
        <button @click="drawModify">编辑</button>
        <button @click="drawFinish">完成</button>
        <button @click="drawClear">清除</button>
      </xdh-map-placement>

      <xdh-map-draw-arc ref="arcDraw" @drawend="handleDrawEnd" :line-style="style"></xdh-map-draw-arc>
    </xdh-map>
 
   
 
  </example>
</template>

<script> 

import {parseStyle} from '../../../packages'

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
    width: 2
  }
})

 
export default {
  
  data() {
    return {
      path: [[113, 23], [112.4, 23.4], [112.4, 23.9]],
      map: null,
      view: null,  
      target: [113, 23],

      style: pathStyle,
      arr: []
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
    handleDrawEnd(arc, arcs) {
      // console.log(arc)
      this.arr.push(arc)
      console.log('arr', this.arr)
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

<template>
  <example> 
    <xdh-map ref="map"  :zoom="zoom" :center="target" @ready="mapReady"  > 
      <xdh-map-scatter v-for="(item, index) in scatters" :key="`point_${index}`" :position="item.position" :inner="item.inner" :color="item.color" @click="scatterClick"></xdh-map-scatter>

      <!-- <xdh-map-line v-for="(item, index) in lines" ref="line" :key="`line_${index}`"
                      :routes="item"
                      :arrow="false"
                      :arrow-each="false"
                      stroke-color="red"
                      :stroke-width="1" ></xdh-map-line> -->

      
    </xdh-map>  
  </example>
</template>
<style scoped lang="scss">
 
</style>

<script>
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import LineString from 'ol/geom/LineString'   
import Feature from 'ol/Feature'
import {parseStyle, mapUtils} from '../../../packages'

const random = function (start, end) {
  return start + Math.round((end - start) * Math.random())
}
const lineStyle = parseStyle({
  className: 'Style',
  stroke: {
    className: 'Stroke',
    width: 1,
    color: 'red'
  }
})
export default {
  
  data() {
    return {
      target: [120, 30],
      map: null,
      view: null,  
      zoom: 7,

      total: 30,
      lineStyle: lineStyle,

      // arrow: require('../../../sources/arrows/black.png'),
      scatters: [],
      
      linesData: [],
      lines: [],
      vectorLayer: null
       
       
    }
  },
  computed: {
      
  },
  methods: {
    mapReady(map) {
      this.map = map
      this.view = this.map.getView() 
      this.scatters = this.createScatter() 
      setTimeout(() => {
        this.createLines()
        this.createLineLayer()
        this.map.addLayer(this.vectorLayer)
      }, 500)
      
    },
    createScatter() {
      let arr = []
      for (let i = 0; i < this.total; i++) {
        arr.push({
          position: [120 + (1 - Math.random()), 30 + (1 - Math.random())],
          inner: random(5, 20),
          color: `${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}`
        })
      }
      return arr
    },
    createLines() {
      let pos = this.scatters.map((item) => {
        return item.position
      }) 
      this.linesData = pos.reduce((total, item, index) => {
        let start = pos[0]
        if (index > 0) {
          let line = mapUtils.createCurve(start, item, 0.08)
          total.push(line)
        }
        return total
      }, [])
      this.lines = this.linesData.map((item) => {
        let lineGeo = new LineString(item)
        let lineFeature = new Feature({
          geometry: lineGeo
        })
        lineFeature.setStyle([lineStyle])
        return lineFeature
      })
       
    },
    createLineLayer() {
      let source = new VectorSource({
        features: this.lines
      })

      this.vectorLayer = new VectorLayer({
        source: source
      }) 
    },
    scatterClick(e) {
      console.log(e)
    }
  },
  created() { 
    console.log(mapUtils)
     
  },
  mounted() {
    
    
    
   
    
  },
  beforeDestroy() {
     
  }
}
</script>



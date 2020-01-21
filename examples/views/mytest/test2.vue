<template>
  <example>
    <div style="height: 400px">
      <xdh-map ref="map" @on-zoomed="zoomHandle" type="Baidu" :zoom="zoom" :center="target" @ready="mapReady"  @pointermove="handleMove" >
        <xdh-map-scale units="metric" placement="left-bottom"></xdh-map-scale>   
        <xdh-map-zoom placement="left-top" theme="dark" :margin="[10]" ></xdh-map-zoom>
        <xdh-map-text v-for="(item,index) in textArray"
                    :key="index"
                    v-bind="item"
        ></xdh-map-text>
      </xdh-map>
    </div> 
    <div>
      <button @click="updateExtent">getExtent</button>
    </div>
    <div>坐标： <span>{{coordinate}}</span></div> 
    <div>extent: <span>{{extent}}</span></div>
    <div>zoom: <span>{{zoom}}</span></div>
    
  </example>
</template>
<style scoped lang="scss">
 
 
 
</style>
<script> 
import * as olExtent from 'ol/extent'; // getCenter, getHeight
import * as olSphere from 'ol/sphere';
const random = function(x, y) {
  return (y - x) * Math.random() + x
}

const clot = function(points, distance, arr = []) {
  // let arr = []
  let _points = points.concat()
  let first = _points.splice(0, 1)[0]
  let _arr = [first]
  if (_points.length) {
    for (let index = 0; index < _points.length; index++) {
      if (olSphere.getDistance(first.position, _points[index].position) <= distance) {
        _arr.push(_points.splice(index, 1)[0])
      }
    }
  }
  arr.push(_arr)
  // console.log(_points)
  if (_points.length) {
    clot(_points, distance, arr)
  }
}

 



// zoomLayer = [7, 8, 9, 10]
export default {
  
  data() {
    return {
      test: true, 
      map: null,
      view: null, 
      fill: null,
      zoom: 7,
      target: [113, 23],
      coordinate: [0, 0],
      extent: [0, 0],

      total: 80,
      textArray: []
    }
  },
  computed: {
      
  },
  methods: {
    mapReady(map) {
      this.map = map
      this.view = this.map.getView()
      this.extent = this.view.calculateExtent() 

      let unit = this.getScale(this.extent)
      let distance = unit * 120
      
      let arr = []
      clot(this.textArray, distance, arr)
      console.log('arr', arr)
      
    },
    updateExtent() {
      this.extent = this.view.calculateExtent()
    },
    handleMove(e) {
      this.coordinate = e.coordinate
    },
    zoomHandle(view, level) {
      // console.log(view, level)
      this.zoom = level
    },
    createTexts() {
      let texts = []
      for (let i = 0; i < this.total; i++) {
        // let n = 0.5 - Math.random() > 0 ? 1 : -1
        // let m = 0.5 - Math.random() > 0 ? 1 : -1
        texts.push({
          position: [random(107, 119), random(20.8, 25.2)],
          text: `${i}`,
          font: '12px',
          background: '#fff',
          strokeColor: 'red',
          padding: [5, 5, 5, 5],
          color: 'blue'
        })
      }
      return texts
    },
    getScale(extent) {
      let mapWidth = this.$refs.map.$el.offsetWidth
      let bottomLeft = olExtent.getBottomLeft(extent)
      let bottomRight = olExtent.getBottomRight(extent)
      let distance = olSphere.getDistance(bottomLeft, bottomRight)
      // console.log('unit', distance / mapWidth)
      let unit = distance / mapWidth
      return unit
    }
    
    
  },
  created() { 
    this.textArray = this.createTexts()
  },
  mounted() {
     
  },
  beforeDestroy() {
     
  }
}
</script>



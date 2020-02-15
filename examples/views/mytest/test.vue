<template>
  <example class="flex"> 
    <xdh-map ref="map" id="map3"  :zoom="12" :center="target" @ready="mapReady" > 
     <xdh-map-placement>
        <button @click="startAnimation">start</button>
      </xdh-map-placement>
    </xdh-map>
 
   
 
  </example>
</template>

<script> 
import Feature from 'ol/Feature'
// import VectorContext from 'ol/render/VectorContext';
import {parseStyle} from '../../../packages'
import LineString from 'ol/geom/LineString'
import Circle from 'ol/geom/Circle'
import Point from 'ol/geom/Point'

import {Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';

import {path} from './route'
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

const pointStyle = parseStyle({
  className: 'Style',
  fill: {
    className: 'Fill',
    color: 'rgba(0,0,0,1)'
  }
  
})
export default {
  
  data() {
    return {
      path: path,
      map: null,
      view: null,  
      target: [113.38542938232422, 23.040218353271484],

      point: null,
      route: null,
      vectorLayer: null,
      animating: false,
      now: null,
      speed: 3
    }
  },
  computed: {
      
  },
  methods: {
      
    mapReady(map) {
      this.map = map
      this.view = this.map.getView()
      this.registerRoute()

      this.createPoint()
    },
    registerRoute() {
      
      this.route = new Feature({
        type: 'route',
        geometry: new LineString(this.path)
      })
       
      this.route.setStyle(pathStyle)

      this.point = new Feature({
        type: 'point',
        geometry: new Circle(this.path[0], 0.01)
      })

      this.point.setStyle(pointStyle)
 
      this.vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [this.route, this.point]
        })
      })
      this.map.addLayer(this.vectorLayer)
      
    },
    startAnimation() {
      if (this.animating) {
        this.stopAnimation(false);
      } else {
      
        this.animating = true;
        this.now = new Date().getTime(); 
      
       
        // this.point.setStyle(null); 
        this.view.setCenter(this.target);
       
         
        // this.vectorLayer.on('postcompose', this.moveFeature);
        // this.map.render(); 
        window.requestAnimationFrame(this.moveFeature)
      }
    },
    moveFeature(e) { 
      // let vectorContext = e.context
      // let frameState = e.frameState; 
      let current = new Date().getTime()
      if (this.animating) {
        let elapsedTime = current - this.now;
         
        let index = Math.round(this.speed * elapsedTime / 1000);

        if (index >= this.path.length) {
          this.stopAnimation(true);
          return;
        }
        this.point.getGeometry().setCenter(this.path[index])  
      } 
      window.requestAnimationFrame(this.moveFeature)
      // this.map.render();
    },
    stopAnimation(end) {
      this.animating = false
      let coord = end ? this.path[this.path.length - 1] : this.path[0]
      this.point.getGeometry().setCenter(coord)
      // this.vectorLayer.un('postcompose', this.moveFeature); 
    },

    createPoint() {
      let scater = new Feature({
        geometry: new Point(this.target)
      })
      let out1 = new Feature({
        geometry: new Point(this.target)
      })
      let coreStyle = parseStyle({
        className: 'Style',
        image: {
          className: 'Circle',
          radius: 8,
          fill: {
            className: 'Fill',
            color: 'red'
          }
        } 
      })

      let out1Style = parseStyle({
        className: 'Style',
        image: {
          className: 'Circle',
          radius: 10,
          fill: {
            className: 'Fill',
            color: 'transparent'
          },
          stroke: {
            className: 'Stroke',
            color: 'red',
            width: 1
          }
        } 
      })
       
      scater.setStyle(coreStyle)
      out1.setStyle(out1Style)
      this.$refs.map.addFeature(scater)
      this.$refs.map.addFeature(out1)
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

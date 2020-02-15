<template>
  <example class="flex"> 
    <xdh-map ref="map" id="map3"  :zoom="12" :center="target" @ready="mapReady" > 
     <xdh-map-placement>
        <!-- <button @click="startAnimation">start</button> -->
      </xdh-map-placement>
    </xdh-map>
 
   
 
  </example>
</template>

<script> 
import Feature from 'ol/Feature'
import {parseStyle} from '../../../packages'
import {easeOut} from 'ol/easing'; 
import Point from 'ol/geom/Point'

// import {Vector as VectorLayer} from 'ol/layer';
// import VectorSource from 'ol/source/Vector';

 
export default {
  
  data() {
    return { 
      map: null,
      view: null,  
      target: [113.38542938232422, 23.040218353271484],

      now1: null,
      now2: null,
      now3: null,

      scater: null,
      out1: null,
      out2: null,
      out3: null
    }
  },
  computed: {
      
  },
  methods: {
      
    mapReady(map) {
      this.map = map
      this.view = this.map.getView() 
      this.createPoint(this.target)
      
      
    },

    createPoint(target) {
      this.scatter = new Feature({
        geometry: new Point(target)
      })
      this.out1 = new Feature({
        geometry: new Point(target)
      })
      this.out2 = new Feature({
        geometry: new Point(target)
      })
      this.out3 = new Feature({
        geometry: new Point(target)
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

      let outStyle = parseStyle({
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
       
      this.scatter.setStyle(coreStyle)
      this.out1.setStyle(outStyle)
      this.out2.setStyle(outStyle)
      this.out3.setStyle(outStyle)
      
      this.$refs.map.addFeature(this.out1)
      this.$refs.map.addFeature(this.out2)
      this.$refs.map.addFeature(this.out3)
      this.$refs.map.addFeature(this.scatter)
      this.animateStart()
    },
    animateStart() {
      this.now1 = new Date().getTime();
      const expandout = () => {
        this.expand('now1', 'out1')
      }
      window.requestAnimationFrame(expandout)
      setTimeout(() => {
        this.now2 = new Date().getTime();
        const expandin = () => {
          this.expand('now2', 'out2')
        }
        window.requestAnimationFrame(expandin)
      }, 400)
      setTimeout(() => {
        this.now3 = new Date().getTime();
        const expandin = () => {
          this.expand('now3', 'out3')
        }
        window.requestAnimationFrame(expandin)
      }, 800)
    },
    expand(now, out) {
      let current = new Date().getTime()
      let elapsed = current - this[now]
      let elapsedRatio = elapsed / 1500
      let radius = easeOut(elapsedRatio) * 20 + 8
      let opacity = easeOut(elapsedRatio)
      const _style = this._outerStyle(radius, opacity) 
      if (elapsed > 1500) { 
        this[now] = new Date().getTime() 
      }
      this[out].setStyle(_style) 
      const expand = () => {
        this.expand(now, out)
      }
      window.requestAnimationFrame(expand)
    },
    _outerStyle(radius, opacity) {
      return parseStyle({
        className: 'Style',
        image: {
          className: 'Circle',
          radius: radius,
          fill: {
            className: 'Fill',
            color: `rgba(255, 0, 0, ${(1 - opacity) * 0.6})`
          },
          stroke: {
            className: 'Stroke',
            color: `rgba(255, 0, 0, ${1 - opacity})`,
            width: 1
          } 
        }
      })
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

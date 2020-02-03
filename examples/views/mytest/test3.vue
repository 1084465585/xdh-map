<template>
  <example> 
    <xdh-map ref="map"  :zoom="zoom" :center="target" @ready="mapReady" > 
    </xdh-map>  
  </example>
</template>
<style scoped lang="scss">
 
</style>

<script>  
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature'; 
import {easeOut} from 'ol/easing'; 
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {getVectorContext} from 'ol/render';
import {parseStyle} from '../../../packages'
// import {unByKey} from 'ol/Observable';
const random = function(x, y) {
  return (y - x) * Math.random() + x
}
export default {
  
  data() {
    return {
      target: [113, 23],
      map: null,
      view: null,  
      zoom: 7,

      source: null,
      vectorLayer: null,
      points: []
       
    }
  },
  computed: {
      
  },
  methods: {
    mapReady(map) {
      this.map = map
      this.view = this.map.getView() 
      
      this.source = new VectorSource({})
      this.vectorLayer = new VectorLayer({
        source: this.source
      })
      this.map.addLayer(this.vectorLayer) 

      console.log(this.points)

      
      this.points.forEach((point) => {

        let geom = new Point(point.position);
        let feature = new Feature(geom);
        setTimeout(() => {  
          this.source.addFeature(feature)
        }, Math.random() * 2000)
      })
       
      
      

      this.source.on('addfeature', (e) => { 
        let feature = e.feature
        this.start = new Date().getTime();
        this.listenerKey = this.vectorLayer.on('postrender', e => {
         
          this.runAnimate(e, feature) 
        }) 
      });
    },
    runAnimate(e, feature) {
      let vectorContext = getVectorContext(e);
      let frameState = e.frameState;
      let flashGeom = feature.getGeometry().clone();
      let elapsed = frameState.time - this.start;  
      this._animate(vectorContext, flashGeom, elapsed, '0, 255, 0') 
      
        this._animate(vectorContext, flashGeom, elapsed, '0, 0, 250')
      
       
      
      if (elapsed > 1500) {
        this.start = new Date().getTime(); 
        let elapsed = frameState.time - this.start; 
        this._animate(vectorContext, flashGeom, elapsed, '0, 255, 0')
        this._animate(vectorContext, flashGeom, elapsed, '0, 0, 250')
        
        // unByKey(this.listenerKey)
        // return
      }

      // tell OpenLayers to continue postrender animation
      this.map.render();
    },
    _animate(vectorContext, flashGeom, elapsed, color = '255, 0, 0') { 
      
      let elapsedRatio = elapsed / 1500 
      let radius = easeOut(elapsedRatio) * 25 + 3; 
      let opacity = easeOut(1 - elapsedRatio * 1.9)
      const _style = function (color) {
        return parseStyle({
          className: 'Style',
          image: {
            className: 'Circle',
            radius: radius,
            fill: {
              className: 'Fill',
              color: `rgba(${color}, ${opacity})`
            } 
          }
        })
      }
      // vectorContext.setStyle(_style());
      // vectorContext.drawGeometry(flashGeom);
      // setTimeout(() => {
      //   vectorContext.setStyle(_style('0, 0, 0')); 
      //   vectorContext.drawGeometry(flashGeom) 
      // }, 200) 
      vectorContext.setStyle(_style(color));  
      vectorContext.drawGeometry(flashGeom) 
       
    },

    createPoints(total) {
      let points = []
      for (let i = 0; i < total; i++) {
        points.push({
          position: [random(107, 119), random(20.8, 25.2)]
        })
      }
      return points
    } 
    
    
  },
  created() {
    
    

    this.points = this.createPoints(2)
  },
  mounted() {
    /*
    
    */
  },
  beforeDestroy() {
     
  }
}
</script>



<template>
  <example>
    <div class="warp"  >
      <xdh-map ref="map" type="Amap" :layer-config="layerConfig"  :zoom="5" :center="[116.23, 39.54]" @ready="mapReady"  >
        <xdh-map-geo :state="state" :draw-define="drawDefineFn" @ready="geoReadyHandle" ></xdh-map-geo>
      </xdh-map>
    </div>
    <button @click="getLayer">test</button> 
    
  </example>
</template>

<script>
  import {boundingExtent} from 'ol/extent'
  import guangdong from '../data/province/guangdong.json'
  import {parseStyle} from '../../packages/index.js'
 
  // import VectorLayer from 'ol/layer/Vector';
  // import VectorSource from 'ol/source/Vector';
  
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  const gradient = function() {
    let grad = context.createLinearGradient(0, 0, 0, 500);
    grad.addColorStop(0, 'red');
    grad.addColorStop(1, 'blue');
    
    // ctx.shadowBlur = 20;
    // ctx.shadowColor = "black";
    // ctx.fillStyle = "blue"
    return grad;
  }
  
  /* 
  const createVector = function () {
    let vector = new VectorLayer({
      source: new VectorSource(),
      style: () => { 
        return parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'yellow'
          }
        })
      }
    })
    return vector
  }
  */
  
  export default {
    
    data() {
      return {
        map: null,
        state: guangdong,
        layerConfig: {
          Amap: {
            title: '高得地图',
            server: ''
          }
        },
        normalStyle: parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'yellow'
          },
          stroke: {
            className: 'Stroke',
            color: 'green',
            width: 4
          },
          shadowBlur: 20,
          shadowColor: 'red'
        }),
        featureOverlay: null
         
      }
    },
    computed: {
       
    },
    methods: {
      mapReady(map) {
        this.map = map
         
        // this.map.addLayer(this.featureOverlay)
      },
      drawDefineFn(feature, obj) {
        // let newFeature = feature.clone()
        feature.setStyle(this.normalStyle)
        
        // let newVector = createVector() 
        // newVector.getSource().addFeature(newFeature)
        // this.map.addLayer(newVector)
       
      },
      geoReadyHandle(features) {
        let arrs = features.reduce((total, item) => {
          total = total.concat(item.coordinates)
          return total
        }, [])
        let arrs2 = arrs.reduce((total, item) => {
          total = total.concat(item)
          return total
        }, [])
        
        let extent = boundingExtent(arrs2)
         
        this.$refs.map.zoomAt(extent, {
          duration: 500,
          padding: [-10, -10, -10, -10]
        })
      },
      hoverHandle(e) {
        console.log(e)
        // let layer = this.map.forEachLayerAtPixel(e.pixel, (layer) => {
        //   return layer;
        // })
        // console.log(layer)
        
      },
      getLayer() {
        console.log(this.map.getLayers().getArray())
      }
    },
    mounted() {
      console.log(this.state)
    }
  }
</script>

<style scoped lang="scss">
.warp{
  width: 80%; 
  height: 500px; 
  margin: 0 auto; 
  // background: black;
  border:1px solid red;
}
.tooltip{
  padding: 5px;
  background: white;
  border-radius: 10px;
  text-align: center;
}
</style>

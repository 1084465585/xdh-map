<template>
  <example>
    <div class="warp"  >
      <xdh-map ref="map" type="Amap" :layer-config="layerConfig"  :zoom="5" :center="[116.23, 39.54]" @ready="mapReady" @pointermove="hoverHandle">
        <xdh-map-geo :state="state" :draw-define="drawDefineFn" @ready="geoReadyHandle" ></xdh-map-geo>
      </xdh-map>
    </div>
     
    
  </example>
</template>

<script>
  import {boundingExtent} from 'ol/extent'
  import guangdong from '../data/province/guangdong.json'
  import {parseStyle} from '../../packages/index.js'
 
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import {Fill} from 'ol/style';
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  const gradient = function() {
    let grad = context.createLinearGradient(0, 0, 500, 500);
    grad.addColorStop(0, 'red');
    grad.addColorStop(1, 'green');
    
    // ctx.shadowBlur = 20;
    // ctx.shadowColor = "black";
    // ctx.fillStyle = "blue"
    return grad;
  }
  const fill = new Fill({
    color: gradient()
  })
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
          fill: fill,
          stroke: {
            className: 'Stroke',
            color: 'red',
            width: 1,
            shadow: 10
          }
        }),
        highLightStyle: parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'yellow'
          }
        }),
        
        featureOverlay: null
         
      }
    },
    computed: {
       
    },
    methods: {
      mapReady(map) {
        this.map = map
        this.featureOverlay = new VectorLayer({
          source: new VectorSource(),
          style: () => { return this.highLightStyle }
        })
        this.map.addLayer(this.featureOverlay)
      },
      drawDefineFn(feature, obj) {
        feature.setStyle(this.normalStyle)
        this.featureOverlay.getSource().addFeature(feature)
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
        let feature = this.map.forEachFeatureAtPixel(e.pixel, (feature) => {
          return feature;
        })
        console.log(feature)
        // if (feature) {
        //   this.featureOverlay.getSource().addFeature(feature)
        // }
        
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="scss">
.warp{
  width: 80%; 
  height: 500px; 
  margin: 0 auto; 
  background: black;
  border:1px solid red;
}
.tooltip{
  padding: 5px;
  background: white;
  border-radius: 10px;
  text-align: center;
}
</style>

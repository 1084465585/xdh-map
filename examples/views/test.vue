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
  /*
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
 
  const heightLight = parseStyle({
    className: 'Style',
    fill: {
      className: 'Fill',
      color: 'rgba(250,0,0,0.5)'
    },
    stroke: {
      className: 'Stroke',
      color: 'blue',
      width: 1,
      shadow: 10
    }
  })
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
            color: 'rgba(0,0,0,0)'
          },
          stroke: {
            className: 'Stroke',
            color: 'red',
            width: 1,
            shadow: 10
          }
        }),
        
        featureOverlay: null
        /*
        new VectorLayer({
          source: new VectorSource(),
          style: heightLight  
        })
        */
      }
    },
    computed: {
       
    },
    methods: {
      mapReady(map) {
        this.map = map
        map.addLayer(this.featureOverlay)
      },
      drawDefineFn(feature, obj) {
        feature.setStyle(this.normalStyle)
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
        console.log(extent)
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

<template>
  <example>
    <div class="warp"  >
      <xdh-map ref="map" type="Amap" :layer-config="layerConfig"  :zoom="5" :center="[116.23, 39.54]" >
        <xdh-map-geo :state="state" :draw-define="drawDefineFn" @ready="geoReadyHandle"></xdh-map-geo>
      </xdh-map>
    </div>
     
    
  </example>
</template>

<script>
  import {boundingExtent} from 'ol/extent'
  import guangdong from '../data/province/guangdong.json'
  import {parseStyle} from '../../packages/index.js'
  /*
   
  */
  
  export default {
    
    data() {
      return {
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
        shadowStyle: parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'rgba(0,0,0,0)'
          },
          stroke: {
            className: 'Stroke',
            color: 'rgba(250,250,250,0.3)',
            width: 8
          }
        })
      }
    },
    computed: {
       
    },
    methods: {
      drawDefineFn(feature, obj) {
        // let newFeature = feature.clone()
        // newFeature.setStyle(this.shadowStyle)
        feature.setStyle(this.normalStyle)
        // this.$refs.map.addFeature(newFeature)
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

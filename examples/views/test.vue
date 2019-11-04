<template>
  <example>
    <div class="warp"  >
      <xdh-map ref="map" type="Amap"  :zoom="5" :center="[116.23, 39.54]" @ready="mapReady"  >
        <xdh-map-image v-bind="options"></xdh-map-image>
      </xdh-map>
    </div>
   
    
  </example>
</template>

<script>
 
  import guangdong from '../data/province/guangdong.json'
 
  const IMG = require('../data/logo.png')
 
  export default {
    
    data() {
      return {
        map: null,
        state: guangdong,
        options: {
          position: [116.23, 39.54],
          src: IMG,
          anchor: [10, 10]
        } 
      }
    },
    computed: {
       
    },
    methods: {
      mapReady(map) {
        this.map = map
         
        // this.map.addLayer(this.featureOverlay)
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

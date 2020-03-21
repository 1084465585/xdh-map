<template>
  <example class="flex"> 
    <xdh-map ref="map" type="Baidu" id="map3"  :zoom="9" :center="center" @ready="mapReady" @dblclick="dblClickHandle" > 
      <xdh-map-draw-panel ref="drawPanel" placement="right-center" :width="4" :types="types"   :use-tools="true" :use-style="true">   
      </xdh-map-draw-panel>  
    </xdh-map>
   
 
  </example>
</template>
<style scoped lang="scss"> 
</style>
<script> 
 
export default {
  
  data() {
    return { 
      map: null, 
      center: [113, 23],
      plot: null,
      types: [],
      isDraw: false
    }
  },
  computed: {
      
  },
  methods: { 
    mapReady(map) {
      this.map = map 
    },
    panelInited(plot) {
      this.plot = plot
    },
    dblClickHandle(e) {
      let feature = this.$refs.map.getFeatureAtPixel(e.pixel) 
      this.$refs.drawPanel.editFeature(feature) 
    }
  },
  created() { 
  },
  mounted() {
  }
}
</script>



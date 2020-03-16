<template>
  
  <example>
    <xdh-map ref="map" type="Amap" @ready="mapReady" :center="[120, 30]" :zoom="5" >
      <xdh-map-overview placement="left-bottom" 
                        :margin="[10]"
                        theme="light"></xdh-map-overview> 

      <!-- <xdh-map-overview placement="left-top" 
                        :margin="[10]"
                        theme="light"></xdh-map-overview> 

      <xdh-map-overview placement="right-top" 
                        :margin="[10]"
                        theme="light"></xdh-map-overview>    

      <xdh-map-overview placement="right-bottom" 
                        :margin="[10]"
                        theme="light"></xdh-map-overview>  -->
    </xdh-map>
    
  </example>
   
</template>

<script>
  
  export default {
    data() {
      return {
        map: null
         
      }
    },
    methods: {
      mapReady(map) {
        this.map = map
        this.view = this.map.getView()
         

      }
    },
    mounted() {
      
    }
  }
</script>

<style scoped>

</style>

<template>
  <example class="flex"> 
    <xdh-map ref="map" id="map3"  :zoom="8" :center="target" @ready="mapReady" > 
      <xdh-map-line ref="line"
                      :routes="croute1" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>

      <xdh-map-line ref="line"
                      :routes="croute2" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>

      <xdh-map-line ref="line"
                      :routes="croute3" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>

      <xdh-map-line ref="line"
                      :routes="croute4" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>
      
      <xdh-map-line ref="line"
                      :routes="croute5" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>

      <xdh-map-line ref="line"
                      :routes="croute6" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>
      
    </xdh-map>
 
   
 
  </example>
</template>

<script> 
// import Feature from 'ol/Feature'
import {mapUtils} from '../../packages'
// import {easeOut} from 'ol/easing'; 
// import Point from 'ol/geom/Point'

// import {Vector as VectorLayer} from 'ol/layer';
// import VectorSource from 'ol/source/Vector';

 
export default {
  
  data() {
    return { 
      map: null,
      view: null, 
      target: [113, 23],
      route1: [[113, 23], [114, 24]],
      route2: [[113, 23], [112, 22]],
      route3: [[113, 23], [114, 22]],
      route4: [[113, 23], [112, 24]],
      route5: [[113, 23], [113, 24]],
      route6: [[113, 23], [114, 23]]
    }
  },
  computed: {
    croute1() {
      return mapUtils.createCurve(this.route1[0], this.route1[1], 0.4)
    },
    croute2() {
      return mapUtils.createCurve(this.route2[0], this.route2[1], 0.4)
    },
    croute3() {
      return mapUtils.createCurve(this.route3[0], this.route3[1], 0.4)
    },
    croute4() {
      return mapUtils.createCurve(this.route4[0], this.route4[1], 0.4)
    },
    croute5() {
      return mapUtils.createCurve(this.route5[0], this.route5[1], 0.4)
    },
    croute6() {
      return mapUtils.createCurve(this.route6[0], this.route6[1], 0.4)
    }
  },
  methods: {
      
    mapReady(map) {
      this.map = map
      this.view = this.map.getView() 
       
      
      
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

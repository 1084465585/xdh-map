<template>
  <example>
    <div class="warp"  >
        <xdh-map slot="map" ref="map" id="map3"  :zoom="12" :center="target" @ready="mapReady" > </xdh-map>
      
    </div>

   <div class="xdh-zoom-tools is-dark show-slider-inside" ref="test"></div>
  </example>
</template>

<script> 
 
  
 import './xdh-zoom-tools.scss'; 
 import {ZoomSlider, Zoom} from 'ol/control'
 import Control from 'ol/control/Control'; 
  
  export default {
    
    data() {
      return {
        map: null,
        view: null, 
        fill: null, 
        
        target: [113.38542938232422, 23.040218353271484]
       
      }
    },
    computed: {
       
    },
    methods: {
       
      mapReady(map) {
        this.map = map
        // let test = document.createElement('DIV')
        // test.className = 'xdh-zoom-tools'
        let control = new Control({ 
          element: this.$refs.test
        })
        console.log(control)
        var zoomslider = new ZoomSlider({
          target: this.$refs.test,
          className: 'xdh-zoom-slider'
        });
        var zoom = new Zoom({
          target: this.$refs.test,
          className: 'xdh-zoom'
        })
         
        // c.addControl(zoomslider);
        zoomslider.setTarget(this.$refs.test)
        this.map.addControl(control);
        this.map.addControl(zoom);
        this.map.addControl(zoomslider);

       
      }
      
    },
    created() {
      
    },
    mounted() {
    }
  }
</script>

<style scoped lang="scss">
.warp{
  width: 80%; 
  height: 600px; 
  margin: 0 auto; 
  // background: black;
  border:1px solid red;
}

.zoom-warp{
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 3px;
  border: 1px solid red;
}

 
.xdh-zoom-tools{
  position: absolute;
  bottom: 10px;
  right: 10px; 
  // padding: 5px;
}
 
 
</style>

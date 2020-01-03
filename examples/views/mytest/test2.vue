<template>
  <example>
    <div class="xdh-map-dialog-warp" ref="warp"> 
      <xdh-map style="z-index: 1" ref="map" type="Baidu" :zoom="12" :center="target" @ready="mapReady"  >  
        <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="light"  >
          <button @click="closed1 = false">窗口1{{closed1}}</button>
          <button @click="closed2 = false">窗口2{{closed2}}</button>
        </xdh-map-placement> 
      </xdh-map> 

      <xdh-map-dialog style="z-index: 2" :width="width" :height="height" :closed.sync="closed1" :map-warp="container" :left="50" :top="50"></xdh-map-dialog>
      <xdh-map-dialog style="z-index: 3" :width="width" :height="height" :closed.sync="closed2" :map-warp="container" :left="50" :top="50"></xdh-map-dialog>
        

    </div>
      

    
  </example>
</template>
<style scoped lang="scss">
.xdh-map-dialog-warp{
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid red;
 
}
</style>
<script> 
// import {DragClass as Drag} from '../../packages/index.js'
// import Overlay from 'ol/Overlay'
export default {
  
  data() {
    return {
      map: null,
      view: null, 
      fill: null,
      target: [113.38542938232422, 23.040218353271484],
      width: '300px',
      height: '300px',
      closed1: false,
      closed2: false,
      container: null
    }
  },
  computed: {
      
  },
  methods: {
      mapReady(map) {
      this.map = map
      // let dialog = new Overlay({
      //   element: this.$refs.dialog,
      //   position: this.target,
      //   positioning: 'top-left',
      //   stopEvent: true
      // })
      // this.map.addOverlay(dialog)
    }
  },
  created() { 
  },
  mounted() {
    this.container = this.$refs.warp
  }
}
</script>



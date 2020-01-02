<template>
  <example>
    <div class="xdh-map-dialog-warp" ref="warp"> 
      <xdh-map  ref="map" type="Baidu" :zoom="12" :center="target" @ready="mapReady"  >  
        <xdh-map-icon icon="iconfont icon-locus" :position="target"></xdh-map-icon> 
      </xdh-map> 

      <xdh-map-dialog :width="width" :height="height" :closed="closed" :map-warp="container"></xdh-map-dialog>
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
      width: '400px',
      height: '400px',
      closed: false,
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



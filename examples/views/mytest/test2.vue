<template>
  <example>
    <xdh-map-warp ref="warp">
    
      <xdh-map slot="map"  ref="map" type="Baidu" :zoom="12" :center="target" @ready="mapReady"  >  
        <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="light"  >
          <button @click="openDialog">打开窗口</button>
          <button @click="closeDialog">关闭窗口</button>
        </xdh-map-placement> 
      </xdh-map> 

      
      <xdh-map-dialog ref="dialog" :key="1" :width="width" :height="height" :closed.sync="closed1" @on-closed="closedHandle"></xdh-map-dialog>
       
    
      
      <!-- <xdh-map-dialog :key="2" :width="width" :height="height" :closed.sync="closed2"  :left="50" :top="50"></xdh-map-dialog> style="width: 50px; height: 50px"-->
     
      
    </xdh-map-warp>
      

    
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
      test: true,

      map: null,
      view: null, 
      fill: null,
      target: [113.38542938232422, 23.040218353271484],
      width: '300px',
      height: '300px',
      closed1: true,
      closed2: false,
      container: null,
      left: 0,
      top: 0
    }
  },
  computed: {
      
  },
  methods: {
    mapReady(map) {
      this.map = map
    },
    openDialog() {
      if (!this.closed1) return
      this.closed1 = false 
      this.$refs.dialog.setPosition(300, 300)
      
    },
    closeDialog() {

      if (this.closed1) return 
      this.$refs.dialog.setPosition(0, 0)
      this.closed1 = true
    },
    closedHandle() {
      this.$refs.dialog.setPosition(0, 0)
    }
  },
  created() { 
  },
  mounted() {
    this.container = this.$refs.warp.$el
  }
}
</script>



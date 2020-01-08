<template>
  <example>
    <xdh-map-warp ref="warp">
    
      <xdh-map slot="map"  ref="map" type="Baidu" :zoom="12" :center="target" @ready="mapReady"  >  
        <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="light"  >
          <button @click="openDialog">打开窗口1</button>
          <button @click="closeDialog">关闭窗口1</button>
          <button @click="closed2 = false">打开窗口2</button>
          <button @click="closed3 = false">打开窗口3</button>
        </xdh-map-placement> 
      </xdh-map> 

      
      <xdh-map-dialog title="弹窗1" ref="dialog" :key="1" :width="width" :height="height" :left.sync="left" :top.sync="top" :closed.sync="closed1" @on-closed="closedHandle" :animate="true" :bottom="true" :is-dark="true" @on-mouseDown="mouseDownHandle">
        <div slot="bottom">ccc</div>
      </xdh-map-dialog>
       
    
      
      <!-- <xdh-map-dialog :key="2" title="弹窗2" :width="width" :height="height" :closed.sync="closed2"></xdh-map-dialog>

       <xdh-map-dialog :key="3" title="弹窗3" :width="width" :height="height" :closed.sync="closed3"></xdh-map-dialog>
      -->
      
    </xdh-map-warp>
      

    
  </example>
</template>
<style scoped lang="scss">
.xdh-map-dialog-warp{
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
 
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
      left: 200,
      top: 200,
      closed1: true, 
      container: null,
      closed2: true,
      closed3: true
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
    },
    closeDialog() {
      if (this.closed1) return
      this.closed1 = true
    },
    closedHandle() {
    
    },
    mouseDownHandle() {
      console.log(this.left, this.top)
    }
  },
  created() { 
  },
  mounted() {
    this.container = this.$refs.warp.$el
  }
}
</script>



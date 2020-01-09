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

      
      <xdh-map-dialog title="弹窗1" ref="dialog" :key="1" :width="width" :height="height"  :closed.sync="closed1" :left.sync="left" :top.sync="top" @on-closed="closedHandle" :animate="true" :bottom="true" :is-dark="true" @on-mouseDown="mouseDownHandle" :from="from">
        <div slot="bottom">ccc</div>
      </xdh-map-dialog>
       
      <div class="side-menu">
        <button ref="startBtn" @click="openDialog">打开窗口1</button> <br/>
        <button @click="closeDialog">关闭窗口1</button> <br/>
        <button @click="closed2 = false">打开窗口2</button> <br/>
        <button @click="closed3 = false">打开窗口3</button>
      </div>
      
      <xdh-map-dialog :key="2" title="弹窗2" :width="width" :height="height" :closed.sync="closed2"></xdh-map-dialog>

      <xdh-map-dialog :key="3" title="弹窗3" :width="width" :height="height" :closed.sync="closed3"></xdh-map-dialog>
     
      <!-- <xdh-map-dialog :key="4" title="" :left="0" :top="0" :header="false" width="450px" height="80px" :closed.sync="test2">
        ffff
      </xdh-map-dialog> -->
    </xdh-map-warp>
      

    
  </example>
</template>
<style scoped lang="scss">
.side-menu{
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px;
  background: white;
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
      closed3: true,
      from: [0, 0]
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
      
    }
  },
  created() { 
  },
  mounted() {
    this.container = this.$refs.warp.$el
    this.from = [this.container.offsetWidth, this.container.offsetHeight / 2]
    console.log('form', this.from, this.$refs.startBtn.getBoundingClientRect())

    
  }
}
</script>



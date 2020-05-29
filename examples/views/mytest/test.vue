<template>
  <example class="flex"> 
    <xdh-map ref="map" type="Baidu" id="map3"  :zoom="9" :center="target" @ready="mapReady" @dblclick="dblClickHandle" > 
      <xdh-map-draw-panel style="display: none" ref="drawPanel" placement="center-top" :width="20" :types="buttons" @on-draw="isDraw = true" @on-draw-finish="isDraw = false" :use-tools="false" :use-style="false">
        <div slot="type-buttons"></div>
      </xdh-map-draw-panel>
    </xdh-map>
  </example>
</template>
<style scoped lang="scss">
.xdh-draw-panel{
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  .type-btns-warp{
    width: 120px;
    .button{
      width: 40px;
      border: 1px solid blue;
      float: left;
    }
  }
} 
 
 
</style>
<script> 
 

 

 
export default {
  
  data() {
    return {
      path: [[113, 23], [112.4, 23.4], [112.4, 23.9]],
      map: null, 
      target: [113, 23], 
      arr: [],
      plot: null,
      buttons: [
        // {type: 'TextArea', name: '文字'},
        // {type: 'Point', name: '轨迹点'},
        // {type: 'Polyline', name: '多边形'},
        // {type: 'Curve', name: '抛物线'},
        // {type: 'Arc', name: '弧形'},
        // {type: 'Circle', name: '圈'},
        // {type: 'FreeHandLine', name: '自由'},
        // {type: 'RectAngle', name: '方形'}
      ],
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



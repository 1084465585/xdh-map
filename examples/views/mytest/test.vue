<template>
  <example class="flex"> 
    <xdh-map ref="map" type="Baidu" id="map3"  :zoom="9" :center="target" @ready="mapReady" @dblclick="a" > 
      <xdh-map-draw-panel ref="drawPanel" :types="buttons" @on-draw="isDraw = true" @on-draw-finish="isDraw = false"></xdh-map-draw-panel>
       
    </xdh-map>
    <button @click="test">finish draw {{isDraw ? '*' : ''}}</button>
   
 
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

import {parseStyle} from '../../../packages'
// import OlPlot from 'ol-plot'

// import Point from 'ol/geom/Point'

// import {Vector as VectorLayer} from 'ol/layer';
// import VectorSource from 'ol/source/Vector';

 
const pathStyle = parseStyle({
  className: 'Style',
  fill: {
    className: 'Fill',
    color: 'rgba(0,0,0,.3)'
  },
  stroke: {
    className: 'Stroke',
    color: 'red',
    width: 2
  }
})

 
export default {
  
  data() {
    return {
      path: [[113, 23], [112.4, 23.4], [112.4, 23.9]],
      map: null,
      view: null,  
      target: [113, 23],

      style: pathStyle,
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
    a(e) {
      console.log(e)
    },  
    mapReady(map) {
      this.map = map
      this.view = this.map.getView()
    },
    panelInited(plot) {
      this.plot = plot
    },
    handleClick(e) {
      let feature = this.$refs.map.getFeatureAtPixel(e.pixel)
      feature && console.log(feature) 
    },
    test() {
      this.$refs.drawPanel.finishDraw()
    } 
  },
  created() {
    
  },
  mounted() {
    // console.log('ccc', VectorContext)
    
  }
}
</script>



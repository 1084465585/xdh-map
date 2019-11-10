<template>
  <example>
    <div class="warp"  >
      <xdh-map ref="map" type="Baidu"  :zoom="12" :center="target" @ready="mapReady" @click="mapClickHandle" >
        
      </xdh-map>
    </div> 
    <div>
      <canvas ref="canvas" id="canvas"></canvas>
    </div> 
    <!-- stylle="width: 200px; height: 200px" -->
  </example>
</template>

<script>
  import GeoJSON from 'ol/format/GeoJSON';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';

  import {parseStyle} from '../../../packages'

  const data = require('./1571536803162.json')
  
  
 
  
  
  export default {
    
    data() {
      return {
        map: null,
        view: null,
        layer: null,
        layerSource: null,
        fill: null,
        style: null,
        target: [113.38542938232422, 23.040218353271484],
        vectorContext: null,
        vectorLayer: null
      }
    },
    computed: {
       
    },
    methods: {
      mapReady(map) {
        this.map = map
        if (this.vectorLayer) {
          this.map.addLayer(this.vectorLayer)
        }
        this.vectorLayer.on('precompose', (e) => {
          // console.log('layer-compose', e)
          let context = e.context
          context.shadowOffsetX = 0
          context.shadowOffsetY = 0
          context.shadowBlur = 10;
          context.shadowColor = 'blue';
        })
      }, 
      mapClickHandle(e) {
        console.log(e)
      },
      composeHandle(e) {
        console.log('compose', e)
      }
    },
    created() {
      this.style = parseStyle({
        className: 'Style',
        fill: {
          className: 'Fill',
          color: 'transparent'
        },
        stroke: {
          className: 'Stroke',
          color: 'red',
          width: 3
        }
      })
      let This = this
      this.vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: (new GeoJSON()).readFeatures(data),
          format: new GeoJSON()
        }),
        style: function(feature) {
          // console.log('this', feature, This.fill)
          // This.fill.setColor(bgGradient())
          return This.style
        }
      })
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
</style>

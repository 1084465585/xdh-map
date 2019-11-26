<template>
  <example>
    <div class="warp"  >
      <xdh-map ref="map" type="Baidu"  :zoom="12" :center="target" @ready="mapReady" @click="mapClickHandle" @precompose="composeHandle"> 
         <xdh-map-geo-layer :state="state" :with-layer="false" :draw-define="drawDefineFn" @click="featureClick"  @mouseEnter="hoverHandle" @mouseLeave="hoverOutHandle"
      ></xdh-map-geo-layer> 
      </xdh-map>
    </div>  
  </example>
</template>

<script>
  // import GeoJSON from 'ol/format/GeoJSON';
  // import VectorLayer from 'ol/layer/Vector';
  // import VectorSource from 'ol/source/Vector';

  import {parseStyle} from '../../../packages'
  // import china from '../../data/china.json'

  const data = require('./1571536803162.json')
  
  
 
  
  
  export default {
    
    data() {
      return {
        map: null,
        view: null, 
        fill: null,
        state: data,
        layerProps: {title: 'myLayer'},
        style: parseStyle({
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
        }),
        target: [113.38542938232422, 23.040218353271484]
       
      }
    },
    computed: {
       
    },
    methods: {
      composeHandle(e) {
        // console.log('mapCompose', e)
        let context = e.context
        // console.log(context)
        context.shadowOffsetX = 0
        context.shadowOffsetY = 0
        context.shadowBlur = 10;
        context.shadowColor = 'blue'
      },
      mapReady(map) {
        this.map = map
      },
      precomposeHandle(e) {
        let context = e.context
        // console.log(context)
        context.shadowOffsetX = 0
        context.shadowOffsetY = 0
        context.shadowBlur = 10;
        context.shadowColor = 'blue'
      },
      mapClickHandle(e) {
        console.log(e)
      },
      featureClick(e) {
        console.log('feature', e)
      },
      
      drawDefineFn(feature) {
        feature.setStyle(this.style)
      },
      hoverHandle() {
        console.log('in')
      },
      hoverOutHandle() {
        console.log('out')
      }
    },
    created() {
      console.log(this.data)
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

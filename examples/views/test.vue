<template>
  <example>
    <xdh-map :zoom="5" :center="[116.23, 39.54]">
      <xdh-map-geo-layer :state="state" :with-layer="true" :draw-define="drawDefineFn" @click="clickHandle" @pointermove="hoverHandle"></xdh-map-geo-layer>
    </xdh-map> 
  </example>
</template>

<script>
  import china from '../data/china.json'
  import {parseStyle} from '../../packages/index.js' 
  export default {
    
    data() {
      return {
        state: china,
        style: parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'blue'
          },
          stroke: {
            className: 'Stroke',
            color: 'green',
            width: 1
          }
        })
      }
    },
    computed: {
       
    },
    methods: {
      drawDefineFn(feature) {
        let prop = feature.getProperties() 
        if (prop.name === '广东省') {
          feature.setStyle(this.style)
        }
      },
      clickHandle(e) {
        console.log('ccc', arguments)
      },
      hoverHandle(e, feature) {
        console.log(feature)
      }
    },
    mounted() {
      
    }
  }
</script>

<style scoped lang="scss">

</style>

<template>
  <example>
    <xdh-map :zoom="5" :center="[116.23, 39.54]" @ready="readyHandle" >
      <xdh-map-geo-layer :state="state" :with-layer="layerProps" :draw-define="drawDefineFn" @click="clickHandle" @mouseEnter="hoverHandle" @mouseLeave="hoverOutHandle"
      @precompose="precomposeLayerHandle" 
      ></xdh-map-geo-layer>
 
    </xdh-map> 
  </example>
</template>

<script>
  import china from '../data/china.json'
  import {parseStyle} from '../../packages/index.js' 
  export default {
    
    data() {
      return {
        map: null,
        state: china,
        layerProps: {title: 'myLayer'},
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
        }),
        hoverStyle: parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'pink'
          }
        }),
        flag: false
      }
    },
    computed: {
       
    },
    methods: {
      readyHandle(map) {
        this.map = map
      },
      drawDefineFn(feature) {
        let prop = feature.getProperties() 
        if (prop.name === '广东省') {
          feature.setStyle(this.style)
        }
      },
      clickHandle(e) {
        console.log('ccc', arguments)
      },
      dblClickHandle() {
        console.log('double click')
      },
      hoverHandle(e, feature) {
        console.log('enter')
      },
      hoverOutHandle(e, feature) {
        console.log('out')
      },
      test() {
        console.log('test')
      },

      
      precomposeLayerHandle(e) {
        console.log('layer', e.target)

        let context = e.context
        context.shadowOffsetX = 0
        context.shadowOffsetY = 0
        context.shadowBlur = 10;
        context.shadowColor = 'blue';
        
      },
      postrenderHandle(e) {
        console.log('render', e)
      }
    },
    mounted() {
      
    }
  }
</script>

<style scoped lang="scss">

</style>

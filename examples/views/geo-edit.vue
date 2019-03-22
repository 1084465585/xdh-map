<template>
  <example>
    <xdh-map :zoom="12" :center="[113.54, 23.06]">
      <xdh-map-geo @click="clickHandle" :state="state" @mouseEnter="hoverHandle" @mouseLeave="hoveroutHandle" :draw-define="drawDefineFn"></xdh-map-geo>

      <!-- <xdh-map-polygon v-if="editPol.length" :coordinates="editPol"
                         fill="transparent"
                         stroke-color="red"
                         :stroke-width="2" :z-index="3"></xdh-map-polygon>

      <xdh-map-draw ref="polygon" type="Polygon" v-if="editPol.length" :default-features="editPol"></xdh-map-draw> -->
    </xdh-map>
  </example>
</template>

<script>
  import china from '../data/test.json'
  import {parseStyle} from '../../packages/index.js'
  // const NAME = '广东省' // 'China'
  export default {
    data() {
      return {
        state: china,
        editPol: [],
        normalStyle: parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'transparent'
          },
          stroke: {
            className: 'Stroke',
            color: 'red',
            width: 2
          }
        })
      }
    },
    methods: {
      clickHandle(obj, e, f) {
        let newFeature = Object.assign({}, f)
        console.log(newFeature, f)
        // this.editPol.push(newFeature)
        // this.$nextTick(() => {
        //   this.$refs.polygon.modify()
        // })
        
        
        // this.editPol = obj.coordinates[0]
      },
      
      setActiveStyle(obj) {
        return parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'pink'
          },
          stroke: {
            className: 'Stroke',
            color: 'yellow',
            width: 2
          },
          text: {
            className: 'Text',
            text: obj.properties.name,
            font: '14px sans-serif',
            fill: {
              className: 'Fill',
              color: 'blue'
            }
          }
        })
      },
      hoverHandle(obj, e, feature) {
        feature.setStyle(this.setActiveStyle(obj))
      },
      hoveroutHandle(obj, e, feature) {
        feature.setStyle(this.normalStyle)
      },
      drawDefineFn(feature, obj) {
        feature.setStyle(this.normalStyle)
      }
    }
  }
</script>

<style scoped>

</style>

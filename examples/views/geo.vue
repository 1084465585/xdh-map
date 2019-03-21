<template>
  <example>
    <xdh-map :zoom="5" :center="[116.23, 39.54]">
      <xdh-map-geo @click="clickHandle" :state="state" @mouseEnter="hoverHandle" @mouseLeave="hoveroutHandle" :draw-define="drawDefineFn"></xdh-map-geo>
    </xdh-map>
  </example>
</template>

<script>
  import china from '../data/china.json'
  import {parseStyle} from '../../packages/index.js'
  const NAME = '广东省' // 'China'
  export default {
    data() {
      return {
        state: china,
        normalStyle: parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'transparent'
          },
          stroke: {
            className: 'Stroke',
            color: 'transparent',
            width: 1
          }
        })
      }
    },
    methods: {
      clickHandle(obj, e, f) {
        console.log(obj, e, f)
      },
      setCantonStyle(obj) {
        return parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'blue'
          },
          stroke: {
            className: 'Stroke',
            color: 'green',
            width: 1
          },
          text: {
            className: 'Text',
            text: obj.properties.name,
            font: '14px sans-serif',
            fill: {
              className: 'Fill',
              color: 'red'
            }
          }
        })
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
        if (obj.properties.name === NAME) {
          feature.setStyle(this.setCantonStyle(obj))
        } else {
          feature.setStyle(this.normalStyle)
        }
      },
      drawDefineFn(feature, obj) {
        if (obj.properties.name === NAME) {
          feature.setStyle(this.setCantonStyle(obj))
        } else {
          feature.setStyle(this.normalStyle)
        }
      }
    }
  }
</script>

<style scoped>

</style>

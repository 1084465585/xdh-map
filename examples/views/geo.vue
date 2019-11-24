<template>
  <example>
    <xdh-map :zoom="5" :center="[116.23, 39.54]">
      <xdh-map-geo-layer @click="clickHandle" :state="state" @mouseEnter="hoverHandle" @mouseLeave="hoveroutHandle" :draw-define="drawDefineFn"></xdh-map-geo-layer>
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
            color: 'rgba(0,0,0,0.5)'
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
      clickHandle(e, f) {
        console.log(e, f)
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
            text: obj.name,
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
            text: obj.name,
            font: '14px sans-serif',
            fill: {
              className: 'Fill',
              color: 'blue'
            }
          }
        })
      },
      hoverHandle(e, feature) {
        let props = feature.getProperties()
        feature.setStyle(this.setActiveStyle(props))
      },
      hoveroutHandle(e, feature) {
        let props = feature.getProperties() 
         
        if (props.name === NAME) {
          feature.setStyle(this.setCantonStyle(props))
        } else {
          feature.setStyle(this.normalStyle)
        }
      },
      drawDefineFn(feature) {
        let props = feature.getProperties() 
        if (props.name === NAME) {
          feature.setStyle(this.setCantonStyle(props))
        } else {
          feature.setStyle(this.normalStyle)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
</style>

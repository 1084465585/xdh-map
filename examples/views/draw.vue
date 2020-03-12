<template>
  <example>
    <xdh-map>
      <xdh-map-placement placement="right-top" :margin="[10]" theme="light">
        <button @click="drawLine">画线</button>
        <button @click="drawCircle">画圆</button>
        <button @click="drawPolygon">多边形</button>
        <button @click="drawArc">弧形</button>
        <button @click="modify">修改</button>
        <button @click="finish">完成</button>
        <button @click="clear">清除</button>
      </xdh-map-placement>
      <xdh-map-draw ref="line" @drawend="drawend" @drawstart="drawstart" :smooth="true"></xdh-map-draw>
      <xdh-map-draw ref="circle" type="Circle" @drawend="drawend" @drawstart="drawstart"></xdh-map-draw>
      <xdh-map-draw ref="polygon" type="Polygon" @drawend="drawend" @drawstart="drawstart"></xdh-map-draw>
      <xdh-map-draw-arc ref="arc"  @drawend="drawend" ></xdh-map-draw-arc>
    </xdh-map>
  </example>
</template>

<script>
  import {parseStyle} from '../../packages'

  export default {
    methods: {
      drawLine() {
        this.finish()
        this.$refs.line.draw()
      },
      drawCircle() {
        this.finish()
        this.$refs.circle.draw()
      },
      drawPolygon() {
        this.finish()
        this.$refs.polygon.draw()
      },
      drawArc() {
        this.finish()
        this.$refs.arc.draw()
      },
      modify() {
        this.$refs.line.modify()
        this.$refs.circle.modify()
        this.$refs.polygon.modify()
        this.$refs.arc.modify()
      },
      finish() {
        this.$refs.line.finish()
        this.$refs.circle.finish()
        this.$refs.polygon.finish()
        this.$refs.arc.finish()
      },
      clear() {
        this.$refs.line.clear()
        this.$refs.circle.clear()
        this.$refs.polygon.clear()
        this.$refs.arc.clear()
      },
      drawend(e) {
        const feature = e.feature
        const style = parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'rgba(0,0,0,.3)'
          },
          stroke: {
            className: 'Stroke',
            color: 'red',
            width: 5
          }
        })
        feature.setStyle(style)
        console.log('drawend', e)
      },
      drawstart(e) {
        console.log('drawstart', e)
      }
    }
  }
</script>

<style scoped>

</style>

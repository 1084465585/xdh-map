<template>
  <example>
    <xdh-map>
      <xdh-map-placement placement="right-top" :margin="[10]">
        <button @click="drawLine">画线</button>
        <button @click="drawCircle">画圆</button>
        <button @click="drawPolygon">多边形</button>
        <button @click="modify">修改</button>
        <button @click="finish">完成</button>
      </xdh-map-placement>
      <xdh-map-draw ref="line" @drawend="drawend"></xdh-map-draw>
      <xdh-map-draw ref="circle" type="Circle" @drawend="drawend"></xdh-map-draw>
      <xdh-map-draw ref="polygon" type="Polygon" @drawend="drawend"></xdh-map-draw>
    </xdh-map>
  </example>
</template>

<script>
  export default {
    methods: {
      drawLine() {
        this.$refs.line.draw()
      },
      drawCircle() {
        this.$refs.circle.draw()
      },
      drawPolygon() {
        this.$refs.polygon.draw()
      },
      modify() {
        this.$refs.line.modify()
        this.$refs.circle.modify()
        this.$refs.polygon.modify()
      },
      finish() {
        this.$refs.line.finish()
        this.$refs.circle.finish()
        this.$refs.polygon.finish()
      },
      drawend(e) {
        console.log(e)

      }
    }
  }
</script>

<style scoped>

</style>

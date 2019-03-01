<template>
  <example>
    <xdh-map>
      <xdh-map-placement placement="right-top" :margin="[10]">
        <button @click="drawLine">画线</button>
        <button @click="drawCircle">画圆</button>
      </xdh-map-placement>
      <xdh-map-draw ref="line" @drawend="drawend"></xdh-map-draw>
      <xdh-map-draw ref="circle" type="Circle" @drawend="drawend"></xdh-map-draw>
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
      drawend(e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped>

</style>

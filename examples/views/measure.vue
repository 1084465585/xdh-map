<template>
  <example>
    <xdh-map>
      <xdh-map-placement placement="right-top" :margin="[10]" theme="light">
        <button @click="start">开始测距</button>
        <!-- <button @click="drawPolygon">多边形</button> 
        <button @click="clear">清除</button> type="area"-->
      </xdh-map-placement>
      <xdh-map-measure ref="measure"  ></xdh-map-measure>
    </xdh-map>
  </example>
</template>

<script>
   

  export default {
    methods: {
      start() {
        this.$refs.measure.start()
      }
    }
  }
</script>

<style scoped>

</style>

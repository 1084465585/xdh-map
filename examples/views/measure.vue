<template>
  <example>
    <xdh-map>
      <xdh-map-placement placement="right-top" :margin="[10]" theme="light">
        <button @click="start">开始测距</button>
        <select v-model="type">
          <option value="length">距离</option>
          <option value="area">面积</option>
        </select>
      </xdh-map-placement>
      <xdh-map-measure ref="measure" :type="type" ></xdh-map-measure>
    </xdh-map>
  </example>
</template>

<script>
  export default {
    data() {
      return {
        type: 'length',
        styleJson: {
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'rgba(255, 255, 255, 0.2)'
          },
          stroke: {
            className: 'Stroke',
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2
          },
          image: {
            className: 'CircleStyle',
            radius: 5,
            stroke: {
              className: 'Stroke',
              color: 'rgba(0, 0, 0, 0.7)'
            },
            fill: {
              className: 'Fill',
              color: 'rgba(255, 255, 255, 0.2)'
            }
          }
        }
      }
    },
    methods: {
      start() {
        this.$refs.measure.start()
      }
    }
  }
</script>

<style scoped>

</style>

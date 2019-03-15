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
    </xdh-map><!-- :cust-style="{'stroke': 'green'}" -->
  </example>
</template>

<script>
   

  export default {
    data() {
      return {
        type: 'length'
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

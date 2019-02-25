<template>
  <div>
    <example>
      <xdh-map>
        <xdh-map-marker v-bind="options"></xdh-map-marker>
      </xdh-map>
    </example>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: {
          position: [120, 30],
          src: require('../../sources/markers/location_blue.png')
        }
      }
    }
  }
</script>

<style scoped>

</style>

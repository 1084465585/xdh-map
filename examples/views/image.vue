<template>
    <example>
      <xdh-map>
        <xdh-map-image v-bind="options"></xdh-map-image>
      </xdh-map>
    </example>
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

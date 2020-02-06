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
          opacity: 1,
          src: require('../../sources/markers/location_blue.png')
        }
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>

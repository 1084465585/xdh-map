<template>
  <div>
    <example>
      <xdh-map :zoom="8">
        <xdh-map-polygon :coordinates="coordinates"
                         fill="#f00"
                         stroke-color="yellow"
                         :stroke-width="3"></xdh-map-polygon>


      </xdh-map>
    </example>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        coordinates: [
          [120, 30],
          [120, 29],
          [119, 29.5],
          [118, 30.5],
          [120, 30]
        ]
      }
    }
  }
</script>

<style scoped>

</style>

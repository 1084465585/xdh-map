<template>
  <div>
    <example>
      <xdh-map :zoom="8">
        <xdh-map-line :coordinates="coordinates"
                      stroke-color="red"
                      :stroke-width="5"></xdh-map-line>


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
          [118, 30.5]
        ]
      }
    }
  }
</script>

<style scoped>

</style>

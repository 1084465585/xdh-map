<template>
  <div>
    <example>
      <xdh-map :zoom="8">
        <xdh-map-line ref="line"
                      :routes="routes"
                      :arrow="arrow"
                      :arrow-each="true"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>
      </xdh-map>
    </example>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        arrow: require('../../sources/arrows/black.png'),
        routes: [
          [120, 30],
          [120, 29],
          [119, 29.5],
          [118, 30.5]
        ]
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>

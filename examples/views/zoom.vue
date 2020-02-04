<template>
  <example> 
    <xdh-map :zoom.sync="zoom" @ready="mapReady">
      <xdh-map-zoom-panel placement="right"></xdh-map-zoom-panel>
      <xdh-map-zoom placement="left-top"></xdh-map-zoom>
      <!-- <xdh-map-zoom placement="right-top" theme="dark" :slider="true"></xdh-map-zoom> 
      <xdh-map-zoom placement="left-bottom" slider="inside"></xdh-map-zoom>
      <xdh-map-zoom placement="right-bottom" theme="dark" :slider="true" horizontal></xdh-map-zoom>   -->
    </xdh-map>
  </example>

</template>

<script>
  export default {
    data() {
      return {
        zoom: 8,
        view: null
      }
    },
    methods: {
      test() {
        this.zoom = 10
      },
      mapReady(map) {
        this.view = map.getView()
      }
    }
  }
</script>

<style scoped>
</style>

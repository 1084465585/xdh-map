<template>

  <example>
    <range-set></range-set>
    <xdh-map>
      <xdh-map-zoom placement="left-top" :simple="false"></xdh-map-zoom>
    </xdh-map>
    <div style="width: 100px; height: 100px; background: red" draggable="true"></div>
  </example>

</template>

<script>
  import RangeSet from '../../packages/zoom/src/range-set.vue'
  export default {
    data() {
      return {
        precent: 30
      }
    },
    components: {
      RangeSet
    },
    methods: {
      changeHandle(e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped>
</style>

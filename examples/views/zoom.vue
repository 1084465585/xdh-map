<template>
  <div>
    <example>
      <xdh-map>
        <xdh-map-zoom placement="left-top" :simple="false"></xdh-map-zoom>
      </xdh-map>
    </example>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        precent: 30
      }
    },
    components: {
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

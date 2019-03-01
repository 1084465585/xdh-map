<template>
  <div>
    <example>
      <xdh-map>
        <xdh-map-overview placement="right-bottom" width="150px" height="300px" :default-closed="true"></xdh-map-overview>
        <xdh-map-overview placement="left-bottom" :default-closed="true" width="150px" height="150px" ></xdh-map-overview>
        <xdh-map-overview placement="left-top" :default-closed="true" width="180px" height="100px" ></xdh-map-overview>
        <xdh-map-overview placement="right-top" :default-closed="true" width="200px" height="100px" ></xdh-map-overview>
      </xdh-map>
    </example>
  </div>
</template>

<script>
  export default {
    // methods: {
    //   handleCopy(coord) {
    //     alert('复制：' + coord)
    //   }
    // }
  }
</script>

<style scoped>

</style>

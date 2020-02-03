<template>
  
  <example>
    <xdh-map>
      <xdh-map-overview placement="left-bottom"
                        :margin="[10]"
                        theme="light"></xdh-map-overview>

      <xdh-map-overview placement="right-bottom"
                        :margin="[10]"
                        theme="dark"></xdh-map-overview>

      <xdh-map-overview placement="right-top"
                        :margin="[10]"
                        theme="dark"></xdh-map-overview>

      <xdh-map-overview placement="left-top"
                        :margin="[10]"
                        theme="light"></xdh-map-overview>

    </xdh-map>
  </example>
   
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

<template>
  <example>
    <xdh-map>
      <xdh-map-placement>
        默认样式容器
      </xdh-map-placement>
      <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="light">
        <div style="padding: 10px">浅色容器</div>
      </xdh-map-placement>

      <xdh-map-placement placement="left-center" :margin="[10, 10]" theme="dark">
        <div style="padding: 10px">深色容器</div>
      </xdh-map-placement>

    </xdh-map>
  </example>
</template>

<script>
  export default {}
</script>

<style scoped>

</style>

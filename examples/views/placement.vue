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

      <xdh-map-placement placement="center-top" :margin="[10, 10]" theme="light">
        <div style="padding: 10px">center-top</div>
      </xdh-map-placement>

      <xdh-map-placement placement="center-center" :margin="[10, 10]" theme="light">
        <div style="padding: 10px">center-center</div>
      </xdh-map-placement>

      <xdh-map-placement placement="center-bottom" :margin="[10, 10]" theme="light">
        <div style="padding: 10px">center-bottom</div>
      </xdh-map-placement>

      <xdh-map-placement placement="right-top" :margin="[10, 10]" theme="light">
        <div style="padding: 10px">right-top</div>
      </xdh-map-placement>

      <xdh-map-placement placement="right-center" :margin="[10, 10]" theme="light">
        <div style="padding: 10px">right-center</div>
      </xdh-map-placement>

      <xdh-map-placement placement="right-bottom" :margin="[10, 10]" theme="light">
        <div style="padding: 10px">right-bottom</div>
      </xdh-map-placement>

    </xdh-map>
  </example>
</template>

<script>
  export default {}
</script>

<style scoped>

</style>

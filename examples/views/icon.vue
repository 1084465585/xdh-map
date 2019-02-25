<template>
  <div>
    <example>
      <xdh-map>
        <xdh-map-icon icon="iconfont icon-location" :position="[120, 30]"></xdh-map-icon>
        <xdh-map-icon icon="iconfont icon-locus" :position="[120, 30.1]"></xdh-map-icon>
        <xdh-map-icon icon="iconfont icon-policeman" :position="[120.1, 30]"></xdh-map-icon>
      </xdh-map>
    </example>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  .iconfont {
    font-size: 36px;
    color: blue;
  }

</style>

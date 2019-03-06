<template>
  <example>
    <xdh-map>
      <xdh-map-icon icon="iconfont icon-location" :position="[120, 30]" @click="handleClick"></xdh-map-icon>
      <xdh-map-icon icon="iconfont icon-locus" :position="[120, 30.1]"></xdh-map-icon>
      <xdh-map-icon icon="iconfont icon-policeman" :position="[120.1, 30]"></xdh-map-icon>
    </xdh-map>
  </example>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        alert('clicked')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .iconfont {
    font-size: 36px;
    color: blue;
  }

</style>

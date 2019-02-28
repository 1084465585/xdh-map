<template>
    <example>
      <xdh-map>
        <xdh-map-html :position="position">
          <div class="htmlInfo">我是<span>html富文本</span></div>
        </xdh-map-html>
      </xdh-map>
    </example>
</template>

<script>
  export default {
    data() {
      return {
        position: [120, 30]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .htmlInfo {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 20px;
    span {
      font-size: 20px;
      color: red;
    }
  }
</style>

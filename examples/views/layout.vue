<template>
  <div class="layout">
    <sidebar></sidebar>
    <div class="content">
      <div class="inner">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import Sidebar from '../components/sidebar'

  export default {
    components: {
      Sidebar
    }
  }
</script>

<style lang="scss" scoped>
  .layout {
    width: 100%;
    height: 100%;
  }

  .content {
    padding-left: 200px;
  }

  .inner {
    padding: 20px;
  }
</style>

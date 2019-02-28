<template>
  <div class="sidebar">
    <dl class="list">
      <dt>
        <router-link to="/">Map</router-link>
      </dt>
      <dt>覆盖物组件</dt>
      <dd>
        <router-link to="/text">Text</router-link>
      </dd>
      <dd>
        <router-link to="/rectangle">Rectangle</router-link>
      </dd>
      <dd>
        <router-link to="/polygon">Polygon</router-link>
      </dd>
      <dd>
        <router-link to="/circle">Circle</router-link>
      </dd>
      <dd>
        <router-link to="/line">Line</router-link>
      </dd>
      <dd>
        <router-link to="/marker">Marker</router-link>
      </dd>
      <dd>
        <router-link to="/html">Html</router-link>
      </dd>
      <dd>
        <router-link to="/icon">Icon</router-link>
      </dd>
      <dd>
        <router-link to="/popup">Popup</router-link>
      </dd>
      <dd>
        <router-link to="/heat">Heat</router-link>
      </dd>
      <dt>控件组件</dt>
      <dd>
        <router-link to="/pointer">Pointer</router-link>
      </dd>
      <dd>
        <router-link to="/overview">Overview</router-link>
      </dd>
      <dd>
        <router-link to="/zoom">Zoom</router-link>
      </dd>
      <dt>动效组件</dt>
      <dt>性能测试</dt>
      <dd>
        <router-link to="/performance">Performance</router-link>
      </dd>
    </dl>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .sidebar {
    float: left;
    width: 200px;
    background: lightgray;
    height: 100%;
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    /deep/ .router-link-active {
      color: red;
    }
  }

  .list {
    padding: 10px 20px;
    margin: 0;
    line-height: 1.8em;
    dt {
      margin-top: 10px;
      font-size: 16px;
      color: #666;
    }
    dd {
      margin: 0;
      padding: 0;
      text-indent: 1em;
    }

  }
</style>

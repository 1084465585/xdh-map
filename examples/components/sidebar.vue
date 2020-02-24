<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 21:57:21
 * @LastEditTime: 2019-10-02 16:32:06
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="sidebar">
    <h3>新德汇地图应用类库</h3>
    <dl class="list">
      <dt>
        <router-link to="/">API文档</router-link>
      </dt>
      <dt>
        <router-link to="/map">Map</router-link>
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
        <router-link to="/image">Image</router-link>
      </dd>
      <dd>
        <router-link to="/html">Html</router-link>
      </dd>
      <dd>
        <router-link to="/icon">Icon</router-link>
      </dd>
      <dd>
        <router-link to="/tooltip">Tooltip</router-link>
      </dd>
      <dd>
        <router-link to="/popup">Popup</router-link>
      </dd>
      <dd>
        <router-link to="/panel">Panel</router-link>
      </dd>
      <dd>
        <router-link to="/heat">Heat</router-link>
      </dd>
      <dd>
        <router-link to="/echarts">ECharts</router-link>
      </dd>
      <dd>
        <router-link to="/mask">Mask</router-link>
      </dd>
      <dd>
        <router-link to="/geo">Geo</router-link>
      </dd>
      <dd>
        <router-link to="/geo-edit">Geo-Edit</router-link>
      </dd>
      <dd>
        <router-link to="/data-layer">Data-Layer</router-link>
      </dd>
      <dd>
        <router-link to="/group">group</router-link>
      </dd>
      <dt>控件组件</dt>
      <dd>
        <router-link to="/placement">Placement</router-link>
      </dd>
      <dd>
        <router-link to="/pointer">Pointer</router-link>
      </dd>
      <dd>
        <router-link to="/overview">Overview</router-link>
      </dd>
      <dd>
        <router-link to="/zoom">Zoom</router-link>
      </dd>
      <dd>
        <router-link to="/scale">Scale</router-link>
      </dd>
      <dd>
        <router-link to="/type">Type</router-link>
      </dd>

      <dt>动效组件</dt>
      <dd>
        <router-link to="/dialog">Dialog</router-link>
      </dd>
      <dd>
        <router-link to="/drawdown">Drawdown</router-link>
      </dd>

      <dt>动效组件</dt>
      <dd>
        <router-link to="/track">Track</router-link>
      </dd>
      <dd>
        <router-link to="/draw">Draw</router-link>
      </dd>
      <dd>
        <router-link to="/scatter">Scatter</router-link>
      </dd>
      <dd>
        <router-link to="/flight">Flight</router-link>
      </dd>
      <dd>
        <router-link to="/measure">Measure</router-link>
      </dd>
      <dt>性能测试</dt>
      <dd>
        <router-link to="/performance">Performance</router-link>
      </dd>
      <dt>其他</dt>
      <dd>
        <router-link to="/coord-transform">coordinate-transform</router-link>
      </dd>
      <dd>
        <router-link to="/drag-object">物件拖动</router-link>
      </dd>
      <dd>
        <router-link to="/area-select">区域选择</router-link>
      </dd>
      <dd>
        <router-link to="/cruve">曲线函数</router-link>
      </dd>
    </dl>
    <div class="copyright">Powered by XDH FE Team.</div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped>
  .sidebar {
    float: left;
    width: 220px;
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
    h3 {
      font-size: 18px;
      text-align: center;
      margin: 10px 0 0 0;
      padding: 0;
    }
  }

  .list {
    padding: 10px 20px;
    margin: 0;
    line-height: 1.8em;
    font-size: 14px;
    height: calc(100% - 90px);
    overflow: auto;
    dt {
      margin-top: 10px;
      color: #666;
    }
    dd {
      margin: 0;
      padding: 0;
      text-indent: 1em;
    }
  }

  .copyright {
    text-align: right;
    font-size: 12px;
    color: #999;
    padding: 10px;
  }
</style>

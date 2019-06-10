# Placement 位置

::: tip 提示
地图占位容器， 用于在地图上放置工具类型组件的容器，相对地图的父容器位置定位
组件[API文档](/api.html?url=/doc/module-xdh-map-placement.html)
:::

## 基础用法

:::demo

```html
<template>
  <xdh-map :zoom="7" :center="[118.21, 29.11]">
      <xdh-map-placement>
        默认样式容器
      </xdh-map-placement>
      <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="light" v-if="active">
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

</template>

<script>
  import {XdhMap, XdhMapPlacement } from 'xdh-map'
  export default {
    components: {
      XdhMap,
      XdhMapPlacement
    },
    data() {
      return {
        active: false
      }
    },
    mounted() {
      setTimeout(() => {
        this.active = true
      }, 100)
    }  
  }
</script>

```

:::

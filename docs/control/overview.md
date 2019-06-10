# Overview 鹰眼

::: tip 提示
 显示鹰眼，使用缩略图查看地图，在四个角点击箭头以查看缩略图， 组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-overview.html)
:::

## 基础用法

:::demo

```html
<template>
  <div>
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
  </div>
</template>

<script>
 import {XdhMap, XdhMapOverview} from 'xdh-map'
  export default {
    components: {
     XdhMap,
     XdhMapOverview
    },
    data() {
        return {}
    }
  }
</script>

```

:::
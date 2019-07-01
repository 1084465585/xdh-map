# Line 线

::: tip 提示
在地图上根据坐标点的路径画线（带方向）， 组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-line.html)
:::

## 基础用法

:::demo

```html
<template>
  <xdh-map :zoom="7" :center="[118.21, 29.11]">
    <xdh-map-line 
      :routes="routes1" 
      stroke-color="#000" 
      :arrow="true"
      :stroke-width="2">
    </xdh-map-line>
  </xdh-map>
</template>

<script>
import {XdhMap, XdhMapLine} from 'xdh-map'
export default {
  components: {
    XdhMap,
    XdhMapLine
  },
  data() {
    return {
      routes1: [
        [120, 30],
        [120, 29],
        [119, 29.5]
        // [118, 30.5]
      ]
    }
  },
  mounted() {
    // console.log(arrow)
  }
}
</script>
```

:::

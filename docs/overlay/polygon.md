# Polygon 多边形

::: tip 提示
在地图中创建多边形， 组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-polygon.html)
:::

## 基础用法

:::demo

```html
<template>
  <xdh-map :zoom="7" :center="[118.21, 29.11]">
    <xdh-map-polygon
      ref="polygon"
      :coordinates="coordinates"
      :fill="color"
      stroke-color="yellow"
      :stroke-width="3"
      text="多边形"
      color="green"
      font="20px"
      @click="clickHandle"
    >
    </xdh-map-polygon>
  </xdh-map>
</template>

<script>
import {XdhMap, XdhMapPolygon} from 'xdh-map'
export default {
  components: {
    XdhMap,
    XdhMapPolygon
  },
  data() {
    return {
      color: '#f00',
      coordinates: [
        [120, 30],
        [120, 29],
        [119, 29.5],
        [118, 30.5],
        [120, 30]
      ]
    }
  },
  methods: {
    clickHandle(e) {
      this.color = 'transparent'
    }
  }  
}
</script>
```

:::

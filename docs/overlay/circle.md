# Circle 圆形

::: tip 提示
圆形组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-circle.html)
:::

## 基础用法
:::demo

```html
<template>
  <xdh-map :zoom="7" :center="[118.21, 29.11]">
    <xdh-map-circle
      :position="[118.21, 29.11]"
      :radius="1"
      fill="green"
      cursor="pointer"
      stroke-color="red"
      :stroke-width="6"
      :stroke-line-dash="[20]"
      stroke-line-cap="square"
    ></xdh-map-circle>  
  </xdh-map>
</template>

<script>
import {XdhMap, XdhMapCircle} from 'xdh-map'
export default {
  components: {
    XdhMap,
    XdhMapCircle
  }
}
</script>
```

:::

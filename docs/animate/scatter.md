# Scatter 涟漪水纹

::: tip 提示
在地图上显示涟漪扩散点， 组件[API 文档](/api.html?url=/xdh-map/doc/module-xdh-map-scatter.html)
:::

## 基础用法

:::demo

```html
<template>
  <xdh-map>
    <xdh-map-scatter :position="[120, 30]"></xdh-map-scatter>
  </xdh-map>
</template>

<script>
  import { XdhMap, XdhMapScatter } from 'xdh-map';
  export default {
    components: {
      XdhMap,
      XdhMapScatter
    }
  };
</script>
```

:::

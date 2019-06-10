# Zoom 缩放

::: tip 提示
地图缩放组件， 组件[API 文档](/api.html?url=/xdh-map/doc/module-xdh-map-zoom.html)
:::

## 基础用法

:::demo

```html
<template>
  <xdh-map>
    <xdh-map-zoom
      placement="left-top"
      theme="dark"
      :margin="[10]"
    ></xdh-map-zoom>
    <xdh-map-zoom
      placement="left-bottom"
      theme="light"
      :margin="[10]"
    ></xdh-map-zoom>
    <xdh-map-zoom
      placement="right-top"
      theme="dark"
      :margin="[10]"
    ></xdh-map-zoom>
    <xdh-map-zoom
      placement="right-bottom"
      theme="light"
      :margin="[10]"
    ></xdh-map-zoom>
  </xdh-map>
</template>

<script>
  import { XdhMap, XdhMapZoom } from 'xdh-map';
  export default {
    components: {
      XdhMap,
      XdhMapZoom
    }
  };
</script>
```

:::

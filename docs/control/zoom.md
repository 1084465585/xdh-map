# Zoom 缩放

::: tip 提示
地图缩放组件， 组件[API 文档](/api.html?url=/xdh-map/doc/module-xdh-map-zoom.html)
:::

## 基础用法

:::demo

```html
<template>
  <div style="height: 500px;">
  <xdh-map>
    <xdh-map-zoom placement="left-top"></xdh-map-zoom>
    <xdh-map-zoom placement="right-top" theme="dark" :slider="true"></xdh-map-zoom>
    <xdh-map-zoom placement="left-bottom" slider="inside"></xdh-map-zoom>
    <xdh-map-zoom placement="right-bottom" theme="dark" :slider="true" horizontal></xdh-map-zoom>
  </xdh-map>
  </div>
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

## zoom-panel

:::demo

```html
<template>
  <div style="height: 500px;">
  <xdh-map>
    <xdh-map-zoom-panel placement="left"></xdh-map-zoom-panel>
    <xdh-map-zoom-panel placement="top"></xdh-map-zoom-panel>
    <xdh-map-zoom-panel placement="bottom"></xdh-map-zoom-panel>
    <xdh-map-zoom-panel placement="right"></xdh-map-zoom-panel>
  </xdh-map>
  </div>
</template>

<script>
  import { XdhMap, XdhMapZoomPanel } from 'xdh-map';
  export default {
    components: {
      XdhMap,
      XdhMapZoomPanel
    }
  };
</script>
```

:::

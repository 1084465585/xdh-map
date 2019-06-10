# Mask 蒙层

::: tip 提示
 在地图上覆盖蒙层， 组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-mask.html)
:::

## 基础用法

:::demo

```html
<template>
    <xdh-map>
      <xdh-map-mask :opacity="0.6"></xdh-map-mask>
    </xdh-map>
</template>

<script>
 import {XdhMap, XdhMapMask} from 'xdh-map'

  export default {
    components: {
     XdhMap,
     XdhMapMask
   }
  }
</script>
```

:::
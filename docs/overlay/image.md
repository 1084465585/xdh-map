# Image 图片

::: tip 提示
在地图上显示图片
组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-image.html)
:::

## 基础用法

:::demo

```html
<template>
      <xdh-map>
        <xdh-map-image v-bind="options"></xdh-map-image>
      </xdh-map>
</template>

<script>
 import {XdhMap, XdhMapImage} from 'xdh-map'
 import posIcon from 'sources/markers/location_blue.png'
  export default {
    components: {
      XdhMap,
      XdhMapImage
    },
    data() {
      return {
        options: {
          position: [120, 30],
          src: posIcon
        }
      }
    }
  }
</script>

```
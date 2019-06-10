# Pointer 经纬度提取器

::: tip 提示
 在地图上拾取经纬度， 组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-pointer.html)
:::

## 基础用法

:::demo

```html
<template>
      <xdh-map>
        <xdh-map-pointer placement="left-bottom"
                         :margin="[0,0,10,10]"
                         @copy="handleCopy"></xdh-map-pointer>

        <xdh-map-pointer placement="left-top"
                         :margin="[10,0,0,10]"
                         @copy="handleCopy"></xdh-map-pointer>

        <xdh-map-pointer placement="right-top"
                         :margin="[10,10,0,0]"
                         @copy="handleCopy"></xdh-map-pointer>

        <xdh-map-pointer placement="right-bottom"
                         :margin="[0,10,10,0]"
                         @copy="handleCopy"></xdh-map-pointer>

      </xdh-map>
</template>

<script>
 import {XdhMap, XdhMapPointer} from 'xdh-map'
  
  export default {
    components: {
     XdhMap,
     XdhMapPointer
   },
    methods: {
      handleCopy(coord) {
        alert('复制：' + coord)
      }
    }
  }
</script>

<style scoped>

</style>

```

:::
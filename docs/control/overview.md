# Overview 鹰眼

::: tip 提示
 显示鹰眼，使用缩略图查看地图，在四个角点击箭头以查看缩略图， 组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-overview.html)
:::

## 基础用法

:::demo

```html
<template>
  <xdh-map type="Amap" :center="[120, 30]" :zoom="14">
     <xdh-map-overview placement="left-bottom" 
                        :margin="[10]"
                        :box-style="boxStyle"></xdh-map-overview>     
  </xdh-map>
   
</template>

<script>
 import {XdhMap, XdhMapOverview} from 'xdh-map'
  export default {
    components: {
     XdhMap, XdhMapOverview
    },
    data() {
      return {
        boxStyle: {
          strokeWidth: 3, // 边框厚度
          strokeColor: 'red', // 边框颜色
          strokeLineCap: 'square', // 虚线样式
          strokeLineJoin: '', // 虚线样式
          strokeLineDash: [5, 5], // 虚线样式
          strokeLineDashOffset: 0,
          strokeMiterLimit: 0
        }
      }
    }
  }
</script>

```

:::
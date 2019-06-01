# Rectangle 矩形

:::tip 提示

在地图上传创建矩形，组件 [API 文档](/api.html?url=/doc/module-xdh-map-rectangle.html)

:::
## 基础用法

:::demo
```html
<template>
  <xdh-map :zoom="7">
    <xdh-map-rectangle 
      :position="[120, 30]"
      :width="1"
      :height="1"
      fill="rgba(0,0,0,0.8)"
      :stroke-width="2"
      stroke-color="red">
     </xdh-map-rectangle>
  </xdh-map>
</template>

<script>
import {XdhMap, XdhMapRectangle} from 'xdh-map'
export default {
  components: {
    XdhMap,
    XdhMapRectangle
  }
}
</script>

```
:::

## 附加文本

:::demo
```html
<template>
  <xdh-map :zoom="7">
    <xdh-map-rectangle 
      :position="[120, 30]"
      :width="2"
      :height="1"
      fill="rgba(0,0,0,0.8)"
      :stroke-width="2"
      stroke-color="red"
      text="文本内容"
      font="30px"
      color="green">
     </xdh-map-rectangle>
  </xdh-map>
</template>

<script>
import {XdhMap, XdhMapRectangle} from 'xdh-map'
export default {
  components: {
    XdhMap,
    XdhMapRectangle
  }
}
</script>

```
:::



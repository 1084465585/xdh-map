# Html 元素

::: tip 提示
在地图上 html 元素， 组件[API 文档](/api.html?url=/xdh-map/doc/module-xdh-map-html.html)
:::

## 基础用法

:::demo

```html
<template>
  <xdh-map>
    <xdh-map-html :position="position">
      <div class="htmlInfo">我是<span>html富文本</span></div>
    </xdh-map-html>
  </xdh-map>
</template>

<script>
  import { XdhMap, XdhMapHtml } from 'xdh-map';

  export default {
    components: {
      XdhMap,
      XdhMapHtml
    },
    data() {
      return {
        position: [120, 30]
      };
    }
  };
</script>

<style lang="scss" scoped>
  .htmlInfo {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 20px;
    span {
      font-size: 20px;
      color: red;
    }
  }
</style>
```

:::

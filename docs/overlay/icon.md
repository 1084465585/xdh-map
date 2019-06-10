# Icon 图标

::: tip 提示
在地图上显示图标
组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-image.html)
:::

## 基础用法

:::demo

```html
<template>
    <xdh-map class="map-icon">
      <xdh-map-icon icon="iconfont icon-location" :position="[120, 30]" @click="handleClick"></xdh-map-icon>
      <xdh-map-icon icon="iconfont icon-locus" :position="[120, 30.1]"></xdh-map-icon>
      <xdh-map-icon icon="iconfont icon-policeman" :position="[120.1, 30]"></xdh-map-icon>
    </xdh-map>
</template>

<script>
 import {XdhMap, XdhMapIcon} from 'xdh-map'
  export default {
    components: {
        XdhMap,
        XdhMapIcon
    },
    methods: {
      handleClick() {
        alert('clicked')
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .map-icon /deep/ .iconfont {
    font-size: 36px;
    color: blue;
  }

</style>

```

:::
# Tooltip 提示

::: tip 提示
 在地图上显示弹出提示， 组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-tooltip.html)
:::

## 基础用法

:::demo

```html
<template>
<div>
    <xdh-map class="map-tooltip">
      <xdh-map-icon key="icon_a" :stop-event="true"  icon="iconfont icon-location" :position="[120, 30]"></xdh-map-icon>
      <xdh-map-tooltip key="a"   :position="[120, 30]" :offset="[0, -15]"   >
        <div slot="content">请点上面的icon</div>
      </xdh-map-tooltip>

      <xdh-map-icon key="icon_b" :stop-event="true"  icon="iconfont icon-locus" :position="[120, 30.1]" @click="a = true"></xdh-map-icon>
      <xdh-map-tooltip key="b" v-show="a"  :position="[120, 30.1]" :offset="[0, -15]"  :tool="true" theme="dark" >
        <div slot="content">请点下右icon</div>
         <i slot="tool" class="iconfont icon-close" style="font-size: 14px;" @click="a = false"></i>
      </xdh-map-tooltip>
      
      <xdh-map-icon key="icon_c" icon="iconfont icon-policeman" :position="[120.1, 30]" @click="b = true"></xdh-map-icon>
      <xdh-map-tooltip key="c" :position="[120.1, 30]" :offset="[0, -15]" :show.sync="b" v-show="b" :auto-close="1000" >
        <div slot="content">这里是icon</div>
      </xdh-map-tooltip>
       
    </xdh-map>
    <p>b is: {{b}}</p>
</div>
</template>

<script>
 import {XdhMap, XdhMapTooltip, XdhMapIcon} from 'xdh-map'
  export default {
    components: {
        XdhMap,
       XdhMapTooltip,
       XdhMapIcon
    },
    data() {
      return {
        a: false,
        b: true
      }
    },
    methods: {
      otherClick() {
        this.other = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .map-tooltip /deep/ .iconfont {
    font-size: 36px;
    color: blue;
  }

</style>
```

:::

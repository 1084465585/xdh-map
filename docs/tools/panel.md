# 内容面板

::: tip 提示
地图悬浮内容框
组件[API文档](/api.html?url=/doc/module-xdh-map-panel.html)
:::

## 基础用法

:::demo

```html
<template>
<div style="height: 500px">
  <xdh-map>
        
    <xdh-map-panel :position="position1"  height="auto" :visible="visible" key="panel_1">
      <button @click="visible = false">关闭</button>
      点击按钮关闭，点击icon 打开  
    </xdh-map-panel>
    <xdh-map-icon class="icon" icon="iconfont icon-locus" :position="position1"  @click="visible = true"  key="icon_1"></xdh-map-icon>

    <xdh-map-panel class="custom-panel" :position="position2"  height="auto" :visible="visible" key="panel_2">
      <div class="custom-panel__body">
        <div>可自定义样式：</div>
          <pre>
                /deep/ .xdh-map-panel {
                  border-bottom: 1px solid green;
                  .box{ border-color: green; background: red;}
                  .bottom-pin:after{border-bottom-color: red;}
                }
          </pre>
      </div>
    </xdh-map-panel>
    <xdh-map-icon class="icon" icon="iconfont icon-locus" :position="position2"  key="icon_2"></xdh-map-icon>
  </xdh-map>
</div>
</template>
<style lang="scss" scoped>
.custom-panel {
  /deep/ .xdh-map-panel{
    border-bottom: 1px solid green;
    .box{
      border-color: green;
      background: red;
    }
    .bottom-pin{
      &:after{
        border-bottom-color: red;
      }
    }
  }
  &__body{
    width: 380px;
    height: 280px;
    color: yellow;
  }
}
.xdh-map-html.icon{
  /deep/ i.iconfont{
    font-size: 34px;
    color: red;
  }
}
</style>
<script>
  import {XdhMap, XdhMapPanel, XdhMapIcon } from 'xdh-map'
  export default {
    components: {
      XdhMap,
      XdhMapPanel,
      XdhMapIcon
    },
    data() {
      return {
        position1: [119.4, 29.6],
        position2: [120, 30],
        visible: true
      }
    },
    methods: {
      panelHandle() {
        this.panelClose = !this.panelClose
      },
      panelClosedHandle() {
        console.log('panel close')
      }
    }
  }
</script>

```

:::

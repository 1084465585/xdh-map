# 内置弹窗

::: tip 提示
地图内置弹窗
组件[API文档](/api.html?url=/doc/module-xdh-map-dialog.html)
:::

## 基础用法

:::demo

```html
<template>
    <div style="height: 600px">
      <xdh-map>
        <xdh-map-placement placement="left-top" :margin="[0,0,0,0]">
          <xdh-map-dialog :closed.sync="closed1" :position="[150, 150]">
            <div style="">
              <h1>测试内容1</h1>
            </div>
            <div class="bottom" slot="bottom">
              这个是底部  
            </div>  
          </xdh-map-dialog>
        </xdh-map-placement>

       

        <xdh-map-placement>
          <button @click="handleClose1">打开</button>
        </xdh-map-placement>
      </xdh-map>
    </div>
</template>
 
<script>
import {XdhMap, XdhMapDialog, XdhMapPlacement } from 'xdh-map'
  export default {
    components: {
      XdhMap,
      XdhMapDialog,
      XdhMapPlacement
    },
    data() {
      return {
        closed1: true
      }
    },
    watch: {
      
    },
    methods: {
      handleClose1() {
        this.closed1 = !this.closed1
      }
    }
  }
</script>

```

:::

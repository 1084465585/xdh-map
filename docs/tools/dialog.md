# 内置弹窗

::: tip 提示
地图内置弹窗
组件[API文档](/api.html?url=/doc/module-xdh-map-dialog.html)
:::

## 基础用法

强烈建议结合 xdh-map-warp 组件使用 组件[API文档](/api.html?url=/doc/module-xdh-map-warp.html)
:::demo

```html
<template>
    <div style="height: 800px">
      <xdh-map-warp ref="warp" :dialog-layer="3">
        <xdh-map slot="map"  ref="map" type="Baidu" :zoom="12" :center="target" @ready="mapReady"  >  
          <xdh-map-placement  placement="right-bottom" :margin="[10, 10]" theme="light">
            <button @click="closed4 = !closed4">打开窗口4</button>
          </xdh-map-placement>
        </xdh-map>
        <div class="side-menu" ref="btnWarp">
          <button @click="closed1 = !closed1">打开窗口1</button> <br/> 
          <button @click="closed2 = !closed2">打开窗口2</button> <br/>
          <button @click="closed3 = !closed3">打开窗口3</button>
        </div>

        <xdh-map-dialog title="弹窗1" ref="dialog1" :key="1"  :closed.sync="closed1" :pos-style="posStyle1"  :animate="true" :hide-at="from1" >
          <div style="padding: 5px">
            <p> 初始样式: {{posStyle1}}</p>
            <p> 隐藏于: {{from1}}</p>
          </div>
        </xdh-map-dialog>
        <xdh-map-dialog title="弹窗2" ref="dialog2" :key="2"  :closed.sync="closed2" :pos-style="posStyle2"  :animate="true" :hide-at="from2">
          <div style="padding: 5px">
            <p> 初始样式: {{posStyle2}}</p>
            <p> 隐藏于: {{from2}}</p>
          </div>
        </xdh-map-dialog>
        <xdh-map-dialog theme="dark" title="弹窗3" ref="dialog3" :key="3"  :closed.sync="closed3" :pos-style="posStyle3"  :animate="true" :hide-at="from3">
          <div style="padding: 5px">
            <p> 初始样式: {{posStyle3}}</p>
            <p> 隐藏于: {{from3}}</p>
          </div>
        </xdh-map-dialog>

        <xdh-map-dialog  ref="dialog4" :key="4"  :closed.sync="closed4" :pos-style="posStyle4"  :animate="true" :header="false" :show-close="false" :hide-at="from4">
          <div style="padding: 10px">
            <div>窗口4</div>
            <div> 这是一个固定位置的dialog</div>
            <div> 初始样式: {{posStyle4}}</div>
            <div> 隐藏于: {{from4}}</div>
          </div>
        </xdh-map-dialog>
      </xdh-map-warp>
    </div>
</template>

<script>
import {XdhMap, XdhMapDialog, XdhMapPlacement, XdhMapWarp } from 'xdh-map'
  export default {
    components: {
      XdhMap,
      XdhMapDialog,
      XdhMapPlacement,
      XdhMapWarp
    },
    data() {
      return {
        test: true,
        map: null,
        view: null,
        fill: null,
        target: [113.38542938232422, 23.040218353271484],

        posStyle1: '',
        posStyle2: '',
        posStyle3: '',
        posStyle4: 'bottom: 20px; left: 25%; width:50%; height: 180px',
        from1: [0, 0],
        from2: [0, 0],
        from3: [0, 0],
        from4: [0, 0],
        closed1: false,
        closed2: true,
        closed3: true,
        closed4: false,

        container: null,
        from: [0, 0]
      }
    },
    methods: {
      mapReady(map) {
        this.map = map
      },
      initDialogsPlace() {
        let warpWidth = this.container.offsetWidth
        let right = warpWidth - this.$refs.btnWarp.offsetLeft + 10
        let tops = [
                    this.$refs.btnWarp.offsetTop - 55, 
                    this.$refs.btnWarp.offsetTop - 15,
                    this.$refs.btnWarp.offsetTop + 25
                  ]
        let posStyles = tops.map((item) => {
          return `right: ${right}px; top:${item}px; width: 300px; height: 300px;`
        })
        this.posStyle1 = posStyles[0]
        this.posStyle2 = posStyles[1]
        this.posStyle3 = posStyles[2]
        this.posStyle4 = `bottom: 20px; left: 25%; width:${warpWidth / 2}px; height: 180px`
        this.from1 = [this.$refs.btnWarp.offsetLeft, tops[0]]
        this.from2 = [this.$refs.btnWarp.offsetLeft, tops[1]]
        this.from3 = [this.$refs.btnWarp.offsetLeft, tops[2]]
        this.from4 = [warpWidth, this.container.offsetHeight]
      }
    },
    mounted() {
      this.container = this.$refs.warp.$el
      this.initDialogsPlace()
      this.rezieProxy = this.initDialogsPlace.bind(this)
      window.addEventListener('resize', this.rezieProxy, false)
    },
    beforeDestroy() {
      window.removeEventListener('onResize', this.rezieProxy, false)
    }
  }
</script>
<style scoped  lang="scss">
.side-menu{
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px;
  background: white;
}
</style>
```

:::

# DrawArc 画图

::: tip 提示
在地图上描绘弧形， 组件[API 文档](/api.html?url=/xdh-map/doc/module-xdh-map-draw-arc.html)
:::

## 基础用法

:::demo

```html
<template>
   <xdh-map ref="map" type="Baidu" id="map3"  :zoom="9" :center="target" @ready="mapReady"   > 
      <xdh-map-placement>
        <button @click="drawArc">开始</button> 
        <button @click="drawModify">编辑</button>
        <button @click="drawFinish">完成</button>
        <button @click="drawClear">清除</button>
      </xdh-map-placement>

      <xdh-map-draw-arc ref="arcDraw" @drawend="handleDrawEnd" :line-style="style"></xdh-map-draw-arc>
    </xdh-map> 
</template>

<script>
  import { parseStyle } from 'packages';
  import { XdhMap, XdhMapDrawArc, XdhMapPlacement } from 'xdh-map';
  const pathStyle = parseStyle({
    className: 'Style',
    fill: {
      className: 'Fill',
      color: 'rgba(0,0,0,.3)'
    },
    stroke: {
      className: 'Stroke',
      color: 'red',
      width: 2
    }
  })
  export default {
    components: {
      XdhMap,
      XdhMapDrawArc,
      XdhMapPlacement
    },
    data() {
      return {
        path: [[113, 23], [112.4, 23.4], [112.4, 23.9]],
        map: null,
        view: null,  
        target: [113, 23],

        style: pathStyle,
        arr: []
      }
    },
    methods: {
      mapReady(map) {
        this.map = map
        this.view = this.map.getView() 
      },
      handleDrawEnd(arc, arcs) { 
        this.arr.push(arc)
        console.log('arr', this.arr)
      },  
      drawArc() {
        this.$refs.arcDraw.draw()
      },
      drawFinish() {
        this.$refs.arcDraw.finish()
      },
      drawModify() {
        this.$refs.arcDraw.modify()
      },
      drawClear() {
        this.$refs.arcDraw.clear()
      }
    }
  };
</script>

<style scoped></style>
```

:::


## 核心函数（plotUtils.getArcLine(start, end, inside)）
::: tip 提示
  plotUtils.getArcLine(start, end, inside) 
:::
:::demo

```html
<template>
  <xdh-map ref="map" type="Baidu" id="map3"  :zoom="9" :center="target" @ready="mapReady"   > 
      <xdh-map-line ref="line"
                      :routes="route" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line> 
  </xdh-map> 
</template>

<script>
  import { plotUtils } from 'packages';
  import { XdhMap, XdhMapLine } from 'xdh-map';
   
  export default {
    components: {
      XdhMap, XdhMapLine
    },
    data() {
      return {
        path: [[113, 23], [112.4, 23.4], [112.4, 23.9]],
        map: null,
        view: null,  
        target: [113, 23],
        route: []
         
         
      }
    },
    methods: {
      mapReady(map) {
        this.map = map
        this.view = this.map.getView() 
        this.route = plotUtils.getArcLine(...this.path)
      } 
       
    }
  };
</script>

<style scoped></style>
```

:::
# Line 线

::: tip 提示
在地图上根据坐标点的路径画线（带方向）， 组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-line.html)
:::

## 基础用法

:::demo

```html
<template>
  <xdh-map :zoom="7" :center="[118.21, 29.11]">
    <xdh-map-line 
      :routes="routes1" 
      stroke-color="#000" 
      :arrow="true"
      :stroke-width="2">
    </xdh-map-line>
  </xdh-map>
</template>

<script>
import {XdhMap, XdhMapLine} from 'xdh-map'
export default {
  components: {
    XdhMap,
    XdhMapLine
  },
  data() {
    return {
      routes1: [
        [120, 30],
        [120, 29],
        [119, 29.5]
        // [118, 30.5]
      ]
    }
  },
  mounted() {
    // console.log(arrow)
  }
}
</script>
```

:::

## 曲线
:::demo

```html
<template>
  <xdh-map :zoom="8" :center="target">
    <xdh-map-line ref="line"
                      :routes="croute1" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>

      <xdh-map-line ref="line"
                      :routes="croute2" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>

      <xdh-map-line ref="line"
                      :routes="croute3" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>

      <xdh-map-line ref="line"
                      :routes="croute4" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>
      
      <xdh-map-line ref="line"
                      :routes="croute5" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>

      <xdh-map-line ref="line"
                      :routes="croute6" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>
  </xdh-map>
</template>

<script>
import {XdhMap, XdhMapLine, mapUtils} from 'xdh-map'
export default {
  components: {
    XdhMap,
    XdhMapLine
  },
  data() {
    return {
      target: [113, 23],
      route1: [[113, 23], [114, 24]],
      route2: [[113, 23], [112, 22]],
      route3: [[113, 23], [114, 22]],
      route4: [[113, 23], [112, 24]],
      route5: [[113, 23], [113, 24]],
      route6: [[113, 23], [114, 23]]
    }
  },
  computed: {
    croute1() {
      return mapUtils.createCurve(this.route1[0], this.route1[1], 0.4)
    },
    croute2() {
      return mapUtils.createCurve(this.route2[0], this.route2[1], 0.4)
    },
    croute3() {
      return mapUtils.createCurve(this.route3[0], this.route3[1], 0.4)
    },
    croute4() {
      return mapUtils.createCurve(this.route4[0], this.route4[1], 0.4)
    },
    croute5() {
      return mapUtils.createCurve(this.route5[0], this.route5[1], 0.4)
    },
    croute6() {
      return mapUtils.createCurve(this.route6[0], this.route6[1], 0.4)
    }
  },
  mounted() {
    // console.log(arrow)
  }
}
</script>
```

:::
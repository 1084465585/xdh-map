# Scatter 涟漪水纹

::: tip 提示
在地图上显示涟漪扩散点， 组件[API 文档](/api.html?url=/xdh-map/doc/module-xdh-map-scatter.html)
:::

## 基础用法

:::demo

```html
<template>
  <xdh-map :center="[120, 30]" :zoom="7" >
     <xdh-map-scatter v-if="arr.length" :data="arr"></xdh-map-scatter>
  </xdh-map>
</template>

<script>
  import { XdhMap, XdhMapScatter } from 'xdh-map';
  const random = function (start, end) {
    return start + Math.round((end - start) * Math.random())
  }
  const createData = function(total) {
    let arr = []
    for (let i = 0; i < total; i++) {
      arr.push({
        position: [120 + (1 - Math.random() * 3), 30 + (1 - Math.random()) * 3],
        inner: random(5, 20),
        outer: random(10, 30),
        color: `${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}`
      })
    }
    return arr
  }
  
  export default {
    components: {
      XdhMap,
      XdhMapScatter
    },
    data() {
      return {
        total: 60,
        arr: [] // createData()
      }
    },
    created() {
      this.arr = createData(this.total)
    }
  };
</script>
```

:::

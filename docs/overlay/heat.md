# Heat 热力图

::: tip 提示
 在地图上热力图， 组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-heat.html)
:::

## 基础用法

:::demo

```html
<template>
      <xdh-map :zoom="9">
        <xdh-map-heat :data="data" :radius="10"></xdh-map-heat>
      </xdh-map>
</template>

<script>
 import {XdhMap, XdhMapHeat} from 'xdh-map'

  export default {
   components: {
     XdhMap,
     XdhMapHeat
   },
    data() {
      return {
        data: []
      }
    },
    methods: {
      getData() {
        let data = []
        for (let i = 0; i < 1000; i++) {
          data.push({
            lon: 120 + Math.random() - Math.random(),
            lat: 30 + Math.random() - Math.random(),
            weight: Math.random()
          })
        }
        return data
      }
    },
    created() {
      this.data = this.getData()

    }
  }
</script>


```

:::
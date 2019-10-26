# Measure 测距

::: tip 提示
 在地图上测量距离及面积， 组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-measure.html)
:::

## 基础用法

:::demo

```html
<template>
    <xdh-map>
      <xdh-map-placement placement="right-top" :margin="[10]" theme="light">
        <button @click="start">开始测距</button>
        <select v-model="type">
          <option value="length">距离</option>
          <option value="area">面积</option>
        </select>
      </xdh-map-placement>
      <xdh-map-measure ref="measure" :type="type"  @on-measureEnd="measureEndHandle"></xdh-map-measure>
    </xdh-map>
</template>

<script>
 import {XdhMap, XdhMapMeasure} from 'xdh-map'
  export default {
    components: {
     XdhMap,
     XdhMapMeasure
    },
    data() {
      return {
        type: 'length',
        styleJson: {
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'rgba(255, 255, 255, 0.2)'
          },
          stroke: {
            className: 'Stroke',
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2
          },
          image: {
            className: 'CircleStyle',
            radius: 5,
            stroke: {
              className: 'Stroke',
              color: 'rgba(0, 0, 0, 0.7)'
            },
            fill: {
              className: 'Fill',
              color: 'rgba(255, 255, 255, 0.2)'
            }
          }
        }
      }
    },
    methods: {
      start() {
        this.$refs.measure.start()
      },
      measureEndHandle(current, all) {
        console.log(current, all)
        this.$refs.measure.stop()
      }
    }
  }
</script>

```

:::
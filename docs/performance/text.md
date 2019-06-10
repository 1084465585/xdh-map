# Text 文字

::: tip 提示
 测试显示大量地图标记物时，操作的流畅程度。本例中有1000个文字标签
:::
:::demo

```html
<template>
    <xdh-map :zoom="12" @mouseenter="handleEnter" @mouseleave="handleLeave">
      <xdh-map-text v-for="(item,index) in textArray"
                    :key="index"
                    v-bind="item"
                    @click="handleClick"></xdh-map-text>
    </xdh-map>
</template>

<script>
 import {XdhMap, XdhMapText} from 'xdh-map'
  export default {
 components: {
    XdhMap,
    XdhMapText
  },
    data() {
      return {
        total: 1000,
        textArray: []
      }
    },
    methods: {
      createTexts() {
        let texts = []
        for (let i = 0; i < this.total; i++) {
          texts.push({
            position: [120 + (0.5 - Math.random()), 30 + (0.5 - Math.random())],
            text: '文本' + i,
            font: '18px',
            background: '#fff',
            strokeColor: 'red',
            padding: [5, 10, 5, 10],
            color: 'blue'
          })
        }
        return texts
      },
      handleClick(e, feature) {
        console.log(feature)
      },
      handleEnter(feature) {
        console.log('mouseenter', feature._vm.text)
      },
      handleLeave(feature) {
        console.log('mouseleave', feature._vm.text)
      }
    },
    created() {
      this.textArray = this.createTexts()
    }
  }
</script>

<style scoped>

</style>

```

:::
# Text 文本

## 基础用法

:::demo
```html
<template>
  <xdh-map>
    <xdh-map-text text="文字内容" :position="[120, 30]" font="40px"></xdh-map-text>
  </xdh-map>
</template>

<script>
  import {XdhMap, XdhMapText} from 'xdh-map'
  export default {
    components: {
      XdhMap,
      XdhMapText
    }
  }
</script>
```
:::

## 定义样式

:::demo
```html
<template>
  <xdh-map>
    <xdh-map-text 
        text="文字内容" 
        :position="[120, 30]" 
        font="20px"
        color="#fff"
        background="rgba(0,0,0,0.6)"
        :padding="[10,20,10,20]"
        :stroke-width="5"
        stroke-color="red"
        :stroke-line-dash="[10]"
        :scale="1.2"
        :rotation="0.3">
     </xdh-map-text>
  </xdh-map>
</template>

<script>
  import {XdhMap, XdhMapText} from 'xdh-map'
  export default {
    components: {
      XdhMap,
      XdhMapText
    }
  }
</script>
```
:::

## 绑定事件

:::demo
```html
<template>
  <xdh-map>
    <xdh-map-text 
      :text="text"
      :position="[120, 30]" 
      font="20px" 
      :padding="[10,20,10,20]"
      color="#fff"  
      background="rgba(0,0,0,0.6)"
      cursor="pointer"
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
        text: '点击我试试'
      }
    },
    methods: {
      handleClick() {
        this.text = 'clicked!'
      }
    }
  }
</script>
```
:::

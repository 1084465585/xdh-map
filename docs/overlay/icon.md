# Icon 图标

::: tip 提示
在地图上显示图标
组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-image.html)
:::

## 基础用法

:::demo

```html
<template>
    <xdh-map class="map-icon">
      <xdh-map-icon icon="iconfont icon-location" :position="[120, 30]" @click="handleClick"></xdh-map-icon>
      <xdh-map-icon icon="iconfont icon-locus" :position="[120, 30.1]"></xdh-map-icon>
      <xdh-map-icon icon="iconfont icon-policeman" :position="[120.1, 30]"></xdh-map-icon>
    </xdh-map>
</template>

<script>
 import {XdhMap, XdhMapIcon} from 'xdh-map'
  export default {
    components: {
        XdhMap,
        XdhMapIcon
    },
    methods: {
      handleClick() {
        alert('clicked')
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .map-icon /deep/ .iconfont {
    font-size: 36px;
    color: blue;
  }

</style>

```

:::

## 大批量数据下使用 icon
> 当坐标数据量过大时，使用 xdh-map-image 组件 性能更优。通过“svgToImg”方法可以充分利用 icon图库中的svg图片
:::demo

```html
<template>
  <xdh-map class="map-icon" :zoom="10">
    <xdh-map-image v-if="arr.length" v-for="(item,index) in arr"
                    :key="index"
                    v-bind="item" ></xdh-map-image>
  </xdh-map>
</template>

<script>
import {XdhMap, XdhMapImage} from 'xdh-map'
const svgToImg = function(fontClass, size, color, fontFamily = 'IconFont') {
  let canvas = document.createElement('CANVAS')
  canvas.width = size
  canvas.height = size
  let ctx = canvas.getContext('2d') 
  let span = document.createElement('SPAN')
  span.className = fontClass
  document.body.appendChild(span) 
  let content = window.getComputedStyle(span, '::before').content

  ctx.fillStyle = color;
  ctx.font = `${size - 2}px ${fontFamily}`;
  ctx.textAlign = 'center'
  ctx.fillText(content, size / 2, size - 4);
  
  let img = canvas.toDataURL('base64')
  document.body.removeChild(span)
  return img 
}

export default {
  components: {
    XdhMap,
    XdhMapImage
  },
  data() {
    return {
      img: '',
      arr: []
    }
  },
  methods: {
    createIcons(total, img) {
      let texts = []
      for (let i = 0; i < total; i++) {
        texts.push({
          position: [120 + (0.5 - Math.random()), 30 + (0.5 - Math.random())],
          src: img,
          crossOrigin: 'anonymous'
        })
      }
      return texts
    }  
  },
  mounted() {
    this.img = svgToImg('iconfont icon-ambulance', 18, 'red')
    console.log('img', this.img)
    this.$nextTick(() => {
      this.arr = this.createIcons(500, this.img)
    })
   
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .map-icon /deep/ .iconfont {
    font-size: 36px;
    color: blue;
  }

</style>

```

:::
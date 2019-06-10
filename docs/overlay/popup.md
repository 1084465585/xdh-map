# Popup 浮层

::: tip 提示
 在地图上弹出浮层，相比tooltips, popup更适合显示复杂内容， 组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-popup.html)
:::

## 基础用法

:::demo

```html
<template>
    <xdh-map>
      <xdh-map-popup ref="popup"
                     :position="[120, 30]"
                     :offset="[0,-30]"
                     title="我是标题文字"
                     :stop-event="true"
                     width="200px">
        <div>内容文本，内容文本，内容文本，内容文本</div>
      </xdh-map-popup>
      <xdh-map-image v-bind="options" @click="showPopup"></xdh-map-image>

      <xdh-map-popup :position="[120.4, 30]"
                     :offset="[0,-30]"
                     title="我是标题文字"
                     :stop-event="false"
                     :closable="false"
                     :close-on-click="false"
                     theme="dark"
                     v-if="active"
                     width="200px">
        <div>内容文本，内容文本，内容文本，内容文本</div>
      </xdh-map-popup>
      <xdh-map-image :position="[120.4, 30]" :src="options.src"></xdh-map-image>
    </xdh-map>
</template>

<script>
 import {XdhMap, XdhMapPopup, XdhMapImage} from 'xdh-map'
  
  export default {
    components: {
     XdhMap,
     XdhMapPopup,
     XdhMapImage
   },
    data() {
      return {
        active: false,
        options: {
          position: [120, 30],
          src: require('sources/markers/location_blue.png')
        }
      }
    },
    methods: {
      showPopup() {
        this.$refs.popup.show()
      }
    },
    mounted() {
      setTimeout(() => {
        this.active = true
      }, 200)
    }
  }
</script>
```

:::
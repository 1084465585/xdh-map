<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-28 10:20:02
 * @LastEditTime: 2019-10-03 10:51:20
 * @LastEditors: Please set LastEditors
 -->

# Drag 拖动交互

::: tip 提示
自定义拖动交互类[API文档](/api.html?url=/xdh-map/doc/ol.interaction.drag.html)
:::

## 基础用法
:::demo

```html
<template>
    <div>
      <div class="map-warp" style="width: 100%; height: 500px;">
        <xdh-map :zoom="9" :center="[120, 30]" ref="map" @ready="readyInit" @on-dragMove="dragMoveHandle"  @pointermove="overLayMouseMove">
          <xdh-map-circle :position="circleRed.point"
                      :radius="0.1"
                      fill="blue"
                      stroke-color="red"
                      :stroke-width="5"
                      :props="{'dragFlag': circleRed.dragFlag, id: 'circleRed'}"
          ></xdh-map-circle>
                       

          <xdh-map-circle :position="circleGreen.point"
                      :radius="0.1"
                      fill="blue"
                      stroke-color="green"
                      :stroke-width="5"
                      :props="{'dragFlag': circleGreen.dragFlag, id: 'circleGreen'}"
          ></xdh-map-circle>

          <xdh-map-html id="test" :position="htmlPoint"   @mousedown="overLayMouseDown"
          @mouseup="overLayMouseUp"
          >
            <div  style="background: red; width: 80px; height: 80px;"></div>
          </xdh-map-html>
        </xdh-map>
      </div>
      <p>绿圈能拖红圈不能拖</p>
      <p>pointGreen: {{circleGreen.point}}</p>
      <p>pointHtml: {{htmlPoint}}</p>
      <p>PS: <br/>
        地图上 图型(feature)物体的拖动事件 作用在 xdh-map 的组件上。引入"Drag" 交互后，可以直接 监听 地图上的 "on-dragDown"/"on-dragMove"/"on-dragUp" 事件 <br/>

        地图上 HTML(overlay)元素的拖动事件，作用在 xdh-html的组件上。因此可以直接监听 xdh-html上的原生html 事件实现拖动效果

      </p>
    </div>  
</template>

<script>
import {XdhMap, XdhMapCircle, XdhMapHtml, DragClass as Drag} from 'xdh-map'
export default {
  components: {
    XdhMap,
    XdhMapCircle,
    XdhMapHtml
  },
  data() {
    return {

      dragOverlay: false,
      htmlPoint: [120.05, 30.05],
      circleGreen: {
        point: [120, 30],
        dragFlag: true
      },
      circleRed: {
        point: [120.08, 30.08],
        dragFlag: false
      }
    }
  },
  methods: {
    readyInit(map, mapComp) {
      let dragInteraction = new Drag(mapComp, {
        featureDefine: (feature) => {
          let feaProps = feature.getProperties()
          if (feaProps.dragFlag) {
            return feature
          }
        }
      })
      map.addInteraction(dragInteraction)
      
    },
    dragMoveHandle(feature, event) {
      // console.log(feature, event)
      if (feature.getProperties().id === 'circleGreen') {
        this[feature.getProperties().id].point = event.coordinate
      }
    },
    overLayMouseDown(htmlVm, overlay, event) {
      this.dragOverlay = overlay
    },
    overLayMouseMove(event) {
      if (this.dragOverlay) {
        this.htmlPoint = event.coordinate
      }
    },
    overLayMouseUp(event) {
      this.dragOverlay = null
    }
  }
}
</script>
```

:::

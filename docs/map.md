# 地图示例

:::tip 提示
XdhMap是主组件，所有组件都要依赖它， [XdhMap API](api.html?url=/xdh-map/doc/module-xdh-map.html)
:::

## 基础用法
:::demo
```html
<template>
    <xdh-map></xdh-map>
</template>
<script>
import {XdhMap} from 'xdh-map'
export default {
  components: {
    XdhMap
  }
}
</script>
```
:::

## 设置中心位置

:::demo 设置 `center` 经纬度
```html
<template>
    <xdh-map :center="[113.23, 23.16]"></xdh-map>
</template>
<script>
import {XdhMap} from 'xdh-map'
export default {
  components: {
    XdhMap
  }
}
</script>
```
:::


## 初始缩放层级

:::demo 设置 `zoom` 属性
```html
<template>
    <xdh-map :zoom="15"></xdh-map>
</template>
<script>
import {XdhMap} from 'xdh-map'
export default {
  components: {
    XdhMap
  }
}
</script>
```
:::

## 设置地图类型

:::demo 设置 `type` 属性, 可选值：OSM、Baidu、Google、Amap、SuperMap、Founder、TDT
```html
<template>
    <xdh-map type="Baidu"></xdh-map>
</template>
<script>
import {XdhMap} from 'xdh-map'
export default {
  components: {
    XdhMap
  }
}
</script>
```
:::


## 绑定事件

点击地图试试

:::demo
```html
<template>
    <xdh-map @click="handleChange"></xdh-map>
</template>
<script>
import {XdhMap} from 'xdh-map'
export default {
  components: {
    XdhMap
  },
  methods: {
    handleChange(e) {
      alert('clicked!')
    }
  }
}
</script>
```
:::

#### 地图支持以下事件：

- change        (module:ol/events/Event~Event)    - Generic change event. Triggered when the revision counter is increased.change:layerGroup (module:ol/Object.ObjectEvent)
- change:size   (module:ol/Object.ObjectEvent)
- change:target (module:ol/Object.ObjectEvent)
- change:view   (module:ol/Object.ObjectEvent)
- click         (module:ol/MapBrowserEvent~MapBrowserEvent) - A click with no dragging. A double click will fire two of this.
- dblclick      (module:ol/MapBrowserEvent~MapBrowserEvent) - A true double click, with no dragging.
- moveend       (module:ol/MapEvent~MapEvent) - Triggered after the map is moved.
- movestart     (module:ol/MapEvent~MapEvent) - Triggered when the map starts moving.
- pointerdrag   (module:ol/MapBrowserEvent~MapBrowserEvent) - Triggered when a pointer is dragged.
- pointermove   (module:ol/MapBrowserEvent~MapBrowserEvent) - Triggered when a pointer is moved. Note that on touch devices this is triggered when the map is panned, so is not the same as mousemove.
- postcompose   (module:ol/render/Event~RenderEvent)
- postrender    (module:ol/MapEvent~MapEvent) - Triggered after a map frame is rendered.
- precompose    (module:ol/render/Event~RenderEvent)
- propertychange (module:ol/Object.ObjectEvent) - Triggered when a property is changed.
- rendercomplete (module:ol/render/Event~RenderEvent) - Triggered when rendering is complete, i.e. all sources and tiles have finished loading for the current viewport, and all tiles are faded in.
- singleclick    (module:ol/MapBrowserEvent~MapBrowserEvent) - A true single click with no dragging and no double click. Note that this event is delayed by 250 ms to ensure that it is not a double click.


## 坐标转换

::: tip 为什么要转换？
  国际经纬度坐标标准为WGS-84,国内必须至少使用国测局制定的GCJ-02,对地理位置进行首次加密。
  百度坐标在此基础上，进行了BD-09二次加密措施,更加保护了个人隐私
  如果数据源提供的坐标是加密后的坐标，需要在使用时进行坐标转换，此时需要设置xdh-map的coord-type参数，参数可选类型为:'WGS84' | 'GCJ02' | 'BD09',默认 'WGS84'
:::

:::demo

```html
<template>
   <div>
       <xdh-map class="float-map" :zoom="14">
           <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="dark">
        <div style="padding: 10px">转换前</div>
      </xdh-map-placement>
      <xdh-map-circle
        :position="[120, 30]"
        :radius="0.0005"
        fill="blue"
        stroke-color="red"
        :stroke-width="5"
      ></xdh-map-circle>
      <xdh-map-scale></xdh-map-scale>
    </xdh-map>
    <xdh-map class="float-map"  :zoom="14" coord-type="BD09">
            <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="dark">
        <div style="padding: 10px">转换后</div>
      </xdh-map-placement>
      <xdh-map-circle
        :position="[120, 30]"
        :radius="0.0005"
        fill="blue"
        stroke-color="red"
        :stroke-width="5"
      ></xdh-map-circle>
      <xdh-map-scale></xdh-map-scale>
    </xdh-map>
   </div>
</template>

<script>
 import {XdhMap, XdhMapPlacement, XdhMapCircle, XdhMapScale} from 'xdh-map'
export default {
  components: {
    XdhMap, XdhMapPlacement, XdhMapCircle, XdhMapScale
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
.desc{
    text-indent: 2em;
}
.float-map{
    width: 45%;
    height: 50%;
    float:left;
    margin:15px;
    border: 2px solid #ccc;
}
</style>
```

:::

## 快速定位

::: tip 快速定位方法
  使用地图组件内部方法进行快速定位, 包括方法 zoomTo, zoomAt, zoomIn, zoomOut, moveTo

  - **zoomTo(level[number])**: 指定地图缩放至某一层级
  - **zoomIn()**: 指定地图在当前层级放大一级
  - **zoomOut()**: 指定地图在当前层级缩小一级
  - **zoomAt(area[ol.extent|ol.geometry], options)**: 指定地图缩放并移动到某一区域， 参数area为 ol.Extent对象 或 ol.Geometry对象， options配置项参考 ol.View.fit() 方法配置项
  - **moveTo(coord[Array])**: 控制地图视图移动到指定经纬度
  
  > ps: 地图移动函数返回 Promise 对象，允许使用 "then" 方法执行地图移动的回调函数
:::

:::demo

```html
<template>
   <div>
    <button @click="zoomIn">zoomIn</button>
    <button @click="zoomOut">zoomOut</button>
    <button @click="zoomTo">zoomTo12</button>
    <xdh-map ref="map" :zoom="10"  type="Baidu" :layer-config="{}"
    >
      <xdh-map-icon icon="iconfont icon-location" :position="hangzhou"></xdh-map-icon>
      <xdh-map-icon icon="iconfont icon-location" :position="guangzhou"></xdh-map-icon>
      <xdh-map-icon icon="iconfont icon-location" :position="shenzhen"></xdh-map-icon>
      <xdh-map-polygon ref="chongQing" :key="2" :coordinates="chongqing"
        fill="rgba(250,0,0,0.5)"
        stroke-color="yellow"
        :stroke-width="3">
      </xdh-map-polygon>
    </xdh-map>
    <button @click="zoomAtGSH">zoomAt广深杭</button>
    <button @click="zoomAtCQ">zoomAt大重庆</button>
   </div>
</template>

<script>

import {boundingExtent} from 'ol/extent'
import {XdhMap, XdhMapIcon, XdhMapPolygon} from 'xdh-map'
const CHONGQING = [[106.31813049316406, 29.674758911132812], [106.31126403808594, 29.643173217773438], [106.28929138183594, 29.612960815429688], [106.27830505371094, 29.586868286132812], [106.29066467285156, 29.548416137695312], [106.29478454589844, 29.505844116210938], [106.29478454589844, 29.478378295898438], [106.30302429199219, 29.463272094726562], [106.34971618652344, 29.482498168945312], [106.36756896972656, 29.518203735351562], [106.40602111816406, 29.515457153320312], [106.44172668457031, 29.514083862304688], [106.44721984863281, 29.477005004882812], [106.47880554199219, 29.461898803710938], [106.51313781738281, 29.452285766601562], [106.54197692871094, 29.413833618164062], [106.58454895019531, 29.389114379882812], [106.64497375488281, 29.350662231445312], [106.68617248535156, 29.368515014648438], [106.71775817871094, 29.445419311523438], [106.71638488769531, 29.493484497070312], [106.75895690917969, 29.563522338867188], [106.79054260253906, 29.632186889648438], [106.80152893066406, 29.652786254882812], [106.75483703613281, 29.710464477539062], [106.71089172363281, 29.764022827148438], [106.65870666503906, 29.765396118164062], [106.60926818847656, 29.762649536132812], [106.57768249511719, 29.762649536132812], [106.56394958496094, 29.773635864257812], [106.53099060058594, 29.773635864257812], [106.51039123535156, 29.791488647460938], [106.46919250488281, 29.770889282226562], [106.40739440917969, 29.791488647460938], [106.38130187988281, 29.784622192382812], [106.34147644042969, 29.748916625976562], [106.31813049316406, 29.674758911132812]]
export default {
  components: {
    XdhMap, XdhMapIcon, XdhMapPolygon
  },
  data() {
    return {
      hangzhou: [120.202789, 30.248795],
      guangzhou: [113.247070, 23.123474],
      shenzhen: [114.054565, 22.552185],
      chongqing: CHONGQING
    }
  },
  methods: {
    changeMap(e) {
      this.$refs.map.changeType(e.target.value)
    },
    zoomIn() {
      this.$refs.map.zoomIn().then((res) => {
        console.log('ccc')
      })
    },
    zoomOut() {
      this.$refs.map.zoomOut().then((res) => {
        console.log('bbb', res)
      })
    },
    zoomTo() {
      this.$refs.map.zoomTo(12).then((res) => {
        console.log('aaa', res)
      })
    },
    zoomAtGSH() {
      let extent = boundingExtent([this.hangzhou, this.guangzhou, this.shenzhen])
      this.$refs.map.zoomAt(extent).then(() => {
        alert('完成')
      })
    },
    zoomAtCQ() {
      let geo = this.$refs.chongQing.feature.getProperties().geometry
      this.$refs.map.zoomAt(geo).then(() => {
        alert('完成')
      })
    },
    handleMove(e) {
      this.coordinate = e.coordinate
    }
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
 
</style>
```

:::

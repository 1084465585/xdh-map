# 地图示例

XdhMap是主组件，所有组件都要依赖它， [XdhMap API](api.html?url=/doc/module-xdh-map.html)

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




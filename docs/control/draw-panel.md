# DrawPanel 综合画板

::: tip 提示
 综合画图控件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-draw-panel.html)
:::

## 基础用法

:::demo

```html
<template>
  <xdh-map ref="map" type="Baidu" :zoom="9" :center="center" @ready="mapReady" @dblclick="dblClickHandle" >
    <xdh-map-draw-panel ref="drawPanel" :placement="placement" :width="width" :types="types" :use-tools="useTools" :use-style="useStyle" :use-text="useText">
    </xdh-map-draw-panel>  

    <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="light">
      <div class="btns-warp" style="padding: 4px">
        <div>
          设置 画图工具 各种参数：
        </div>
        <button @click="types = []">重置画图类型</button>
        <button @click="setTypes">切换画图类型</button>
        <button @click="setCustomTypes">自定义画图类</button><br/>
        <button @click="useTools = !useTools">{{useTools ? '禁用' : '使用'}}工具控件</button>
        <button @click="useStyle = !useStyle">{{useStyle ? '禁用' : '使用'}}样式控件</button>
        <button @click="useText = !useText">{{useText ? '禁用' : '使用'}}文 本 框</button><br/>
        <button @click="setHorizontal">横向</button>
        <button @click="setVertical">纵向</button>
      </div>
    </xdh-map-placement>
  </xdh-map>
</template>
<style scoped lang="scss">
.btns-warp{
  button{
    margin: 5px 5px 0 0;
  }
}
</style>  
<script>
 import {XdhMap, XdhMapPlacement, XdhMapDrawPanel} from 'xdh-map'
  export default {
    components: {
     XdhMap, XdhMapPlacement, XdhMapDrawPanel
    },
    data() {
      return {
        map: null,
        center: [113, 23],
        plot: null,
        types: [],
        isDraw: false,
        useTools: true,
        useStyle: true,
        useText: false,
        width: 15,
        placement: 'center-bottom'
      }
    },
    methods: {
      mapReady(map) {
        this.map = map
      },
      panelInited(plot) {
        this.plot = plot
      },
      dblClickHandle(e) {
        let feature = this.$refs.map.getFeatureAtPixel(e.pixel)
        this.$refs.drawPanel.editFeature(feature)
      },
      setTypes() {
        this.types = [
          'FreeHandLine',
          'RectAngle',
          'Ellipse',
          'Lune',
          'Sector',
          'ClosedCurve',
          'Polygon',
          'FreePolygon',
          'GatheringPlace'
        ]
      },
      setCustomTypes() {
        this.types = [
          {type: 'Point', name: '坐标'},
          {type: 'Polyline', name: '警戒线'},
          {type: 'Circle', name: '范围'},
          {type: 'ClosedCurve', name: '聚集区域'},
          {type: 'Polygon', name: 'geo'},
          {type: 'GatheringPlace', name: '集结地'},
          {type: 'DoubleArrow', name: '包抄路径'},
          {type: 'AttackArrow', name: '进攻方向'},  
          {type: 'RectFlag', name: '敌军'},
          {type: 'TriangleFlag', name: '我军'},
          {type: 'CurveFlag', name: '友军'}
        ]
      },
      setHorizontal() {
        this.width = 15
        this.placement = 'center-bottom'
      },
      setVertical() {
        this.width = 4
        this.placement = 'right-center'
      }
    }
  }
</script>

```

:::

## ol-plot

> draw-panel 组件 基于 ol-plot 矢量画图库实现， draw-panel 组件初始化后会派发一个 on-inited 事件 将 "ol-plot"的实例 “plot” 派发出来。用户可以直接使用 ol-plot 的 API 进行 自定义开发 [ol-plot文档](https://github.com/sakitam-fdd/ol-plot)

### plot 制作图形的类型

| 类型 | 名称  |
| --- | --- |
|'Point'|'点'|
|'Polyline'|'线'|
|'Curve'|'曲线'|
|'Arc'|'弓形'|
|'Circle'|'圆'|
|'FreeHandLine'|'自由线'|
|'RectAngle'|'矩形'|
|'Ellipse'|'椭圆'|
|'Lune'|'弓形'|
|'Sector'|'扇形'|
|'ClosedCurve'|'闭合曲面'|
|'Polygon'|'多边形'|
|'FreePolygon'|'自由面'|
|'GatheringPlace'|'集结地'|
|'DoubleArrow'|'双箭头'|
|'StraightArrow'|'细直箭头'|
|'FineArrow'|'粗单尖头箭头'|
|'AttackArrow'|'进攻方向'|
|'AssaultDirection'|'粗单直箭头'|
|'TailedAttackArrow'|'进攻方向（尾）'|
|'SquadCombat'|'分队战斗行动'|
|'TailedSquadCombat'|'分队战斗行动（尾）'|
|'RectFlag'|'矩形标志旗'|
|'TriangleFlag'|'三角标志旗'|
|'CurveFlag'|'曲线标志旗'|

## 自定义画板

:::demo

```html
<template> 
  <xdh-map ref="map" type="Baidu" id="map3"  :zoom="9" :center="center" @ready="mapReady" @dblclick="dblClickHandle" >
    <xdh-map-draw-panel
      ref="drawPanel" placement="center-bottom" :width="8" :types="types" :use-tools="false" :use-style="false"
      @on-draw-end="drawEndHandle"
    >
      <div class="draw-type" slot="type-buttons">
        <button v-for="(item, index) in buttonList" :key="`btn_${index}`" @click="drawType(item.type)">{{item.name}}</button>  
      </div>
      <div class="tools-warp" slot="tool-buttons">
        <button @click="resetClick">重置</button>
        <button @click="deleteClick">删除</button>
        <button @click="finishClick">完结</button>
        <button @click="clearClick">清空</button>
        <button @click="getClick">获取</button>  
      </div>  
    </xdh-map-draw-panel>  
  </xdh-map>
  
</template>
<style scoped lang="scss">
.tools-warp, .draw-type{
  button{
    margin: 5px 5px 0 0;
  }
}
.tools-warp{
  margin-top: 5px;
  border-top: 1px solid #cccccc;
}

</style>
<script>
 import {XdhMap, XdhMapDrawPanel, XdhPlacement} from 'xdh-map'
 import { parseStyle } from 'packages';
  const CircleStyle = parseStyle({
    className: 'Style',
    fill: {
      className: 'Fill',
      color: 'rgba(0,0,0,.3)'
    },
    stroke: {
      className: 'Stroke',
      color: 'red',
      width: 2
    }
  })
  export default {
    components: {
     XdhMap, XdhMapDrawPanel, XdhPlacement
    },
    data() {
      return {
        map: null,
        center: [113, 23],
        plot: null,
        types: [],
        buttonList: [
          {type: 'Point', name: '坐标'},
          {type: 'Polyline', name: '警戒线'},
          {type: 'Circle', name: '范围'},
          {type: 'ClosedCurve', name: '聚集区域'},
          {type: 'Polygon', name: 'geo'},
          {type: 'GatheringPlace', name: '集结地'},
          {type: 'DoubleArrow', name: '包抄路径'},
          {type: 'AttackArrow', name: '进攻方向'},  
          {type: 'RectFlag', name: '敌军'},
          {type: 'TriangleFlag', name: '我军'},
          {type: 'CurveFlag', name: '友军'}
        ],
        isDraw: false
      }
    },
    methods: {
      mapReady(map) {
        this.map = map
      },
      panelInited(plot) {
        this.plot = plot
      },
      dblClickHandle(e) {
        let feature = this.$refs.map.getFeatureAtPixel(e.pixel)
        this.$refs.drawPanel.editFeature(feature)
      },
      drawType(type) {
        this.$refs.drawPanel.draw(type)
      },
      resetClick() {
        this.$refs.drawPanel.resetClickHandle()
      },
      deleteClick() {
        this.$refs.drawPanel.deleteClickHandle()
      },
      finishClick() {
        this.$refs.drawPanel.finishClickHandle()
      },
      clearClick() {
        this.$refs.drawPanel.clearClickHandle()
      },
      getClick() {
        let arr = this.$refs.drawPanel.getClickHandle()
        console.log(arr)
      },
      drawEndHandle(feature) {
        if (feature.getProperties().plotType === 'Circle') {
          feature.setStyle(CircleStyle)
        }
      }
    }
  }
</script>

```

:::

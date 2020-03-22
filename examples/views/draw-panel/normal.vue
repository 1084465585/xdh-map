<template>
  <example class="flex"> 
    <xdh-map ref="map" type="Baidu"    :zoom="9" :center="center" @ready="mapReady" @dblclick="dblClickHandle" > 
      <xdh-map-draw-panel ref="drawPanel" :placement="placement" :width="width" :types="types" :use-tools="useTools" :use-style="useStyle" :use-text="useText">   
      </xdh-map-draw-panel>  

      <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="light">
        <div style="padding: 4px">
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
     
 
  </example>
</template>
<style scoped lang="scss"> 
</style>
<script> 
 
export default {
  
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
      width: 4,
      placement: 'right-center'
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



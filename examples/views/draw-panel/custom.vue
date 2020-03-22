<template>
  <example class="flex"> 
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
     
 
  </example>
</template>
<style scoped lang="scss"> 
.tools-warp{
  margin-top: 5px;
  border-top: 1px solid #cccccc;
}
</style>
<script> 
import { parse } from 'utils/style'
const CircleStyle = parse({
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
  
  data() {
    return { 
      map: null, 
      center: [113, 23],
      plot: null,
      types: [
      ],
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
  computed: {
      
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

  },
  created() { 
  },
  mounted() {
  }
}
</script>



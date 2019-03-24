<template>
  <example>
    <xdh-map :zoom="12" :center="[113.40, 23.06]"  ref="testMap"  @ready="mapInit">
      <xdh-map-geo  ref="geo" :state="state" :draw-define="drawDefineFn"></xdh-map-geo>

      <xdh-map-popup v-for="(item, index) in popups" ref="popup" :key="index"
                     :position="item.point"
                     :offset="[0,0]"
                     title="我是标题文字"
                     :stop-event="true"
                     width="200px">
        <div>内容文本，内容文本，内容文本，内容文本</div>
      </xdh-map-popup>
    </xdh-map>
  </example>
</template>

<script>
 import china from '../data/test2.json'
import {parseStyle} from '../../packages/index.js'
const Style = function(fill = 'transparent', stroke = 'red') {
  return parseStyle({
    className: 'Style',
    fill: {
      className: 'Fill',
      color: fill
    },
    stroke: {
      className: 'Stroke',
      color: stroke,
      width: 2
    }
  })
}
export default {
  data() {
    return {
      olMap: null,
      state: china,
      popups: []
    }
  },
  methods: {
    moveEndHandle(e) {
      console.log(e)
    },
    mapInit(map, vm) {
      this.olMap = map 
    },
    drawDefineFn(feature, obj) {
      console.log(feature.getGeometry().getInteriorPoint())
      let center = feature.getGeometry().getInteriorPoint()
      this.popups.push({
        point: center.getCoordinates()
      })
    }
  },
  mounted() {
    console.log(Style())     
  }
}
</script>

<style scoped>
.wrap{
  width: 800px;
  height: 800px;
  border: 1px solid red;
}
</style>

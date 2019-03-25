<template>
  <example>
    <xdh-map :zoom="15" :center="[113.5476, 22.2011]"  ref="testMap"  @ready="mapInit" @moveend="moveEndHandle">
      <xdh-map-geo  ref="geo" :state="state" :draw-define="drawDefineFn"></xdh-map-geo>

      <xdh-map-tooltip class="test-map-tooltip"  v-for="(item, index) in popups" :key="index" ref="popup"  :position="item.point"
      :offset="[0,-50]"   >
        <div slot="content" style="padding: 0 10px;">{{item.properties.number}}户</div>
      </xdh-map-tooltip>
    </xdh-map>
  </example>
</template>
<style scpoed lang="scss">
.xdh-map-tooltip.test-map-tooltip.is-light{
  color: white;
  background: #44A4F8;
  &::after{
      border-top: 12px solid #44A4F8;
  }
}
</style>
<script>
 import china from '../data/macau.json'
import {parseStyle} from '../../packages/index.js'
const Style = function(obj) {
  return parseStyle({
    className: 'Style',
    fill: {
      className: 'Fill',
      color: 'transparent'
    },
    stroke: {
      className: 'Stroke',
      lineDash: [5, 5],
      color: 'red',
      width: 1
    },
    text: {
      className: 'Text',
      text: obj.properties.name,
      font: '20px sans-serif',
      stroke: {
        className: 'Stroke',
        width: 2,
        color: 'red'
      },
      fill: {
        className: 'Fill',
        color: 'red'
        // scale: 2,
      }
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
      console.log(e.target.getView().getZoom())
    },
    mapInit(map, vm) {
      this.olMap = map 
    },
    drawDefineFn(feature, obj) {
      // console.log(feature.getGeometry().getInteriorPoint())
      let center = feature.getGeometry().getInteriorPoint()
      this.popups.push({
        point: center.getCoordinates(),
        properties: obj.properties
      })
      feature.setStyle(Style(obj))
    }
  },
  mounted() {   
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

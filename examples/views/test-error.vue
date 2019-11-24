<template>
  <example>
    <xdh-map :zoom="12" :type="type" :center="[116.391284, 39.907107]" @click="mapClick">
      <xdh-map-circle
        :position="circle"
        :radius="0.002"
        fill="blue"
        stroke-color="red"
        :stroke-width="1"
      ></xdh-map-circle>
    </xdh-map>
  </example>
</template>

<script>
import * as func from 'utils/convert'
export default {
  data() {
    return {
      arrow: require('../../sources/arrows/black.png'),
      circle: [116.391284, 39.907107],
      routes: [
        [118.122656, 24.651488],
        [118.222656, 24.751488],
        [118.322656, 24.751488]
      ],
      type: 'Baidu',
      mapType: ['Baidu', 'Amap', 'OSM', 'TDT', 'Google', 'SuperMap', 'Founder']
    }
  },
  methods: {
    mapClick(e) {
      console.log(e)
    }
  },
  created() {
    this.type = this.mapType[0] // Baidu
    this.circle = func.wgs84ToBd09(...this.circle)
    // this.type = this.mapType[1] // 高德
    // this.circle = func.wgs84ToGcj02(...this.circle)
    // this.type = this.mapType[2] // OSM
    // this.type = this.mapType[3] // TDT

    console.log(this.circle)
  }
}
</script>

<style scoped>
</style>

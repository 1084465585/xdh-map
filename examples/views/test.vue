<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 21:57:21
 * @LastEditTime: 2019-10-07 11:26:55
 * @LastEditors: Please set LastEditors
 -->
<template>
    <example>
      
      <div class="map-warp" style="width: 100%; height: 650px;">
        <xdh-map :zoom="9" :center="guangzhou" ref="map" @ready="readyInit" :coord-type="coordType" >
          <xdh-map-icon icon="iconfont icon-location" :position="hangzhou"></xdh-map-icon>
          <xdh-map-icon icon="iconfont icon-location" :position="guangzhou"></xdh-map-icon>
          <xdh-map-icon icon="iconfont icon-location" :position="shenzhen"></xdh-map-icon>

          <xdh-map-polygon ref="chongQing" :key="2" :coordinates="chongqing"
                       fill="rgba(250,0,0,0.5)"
                       stroke-color="yellow"
                       :stroke-width="3"  ></xdh-map-polygon>
        </xdh-map>
      </div>
      <div>
        <button @click="zoomToGSH">对焦广深杭</button>
        <button @click="zoomToCQ">定位大重庆</button>
      </div>
     
    </example>
</template>
<style>
.custom-drag-box{
  border: 2px solid green;
}
</style>
 
<script>
import {boundingExtent} from 'ol/extent'
import {easeIn} from 'ol/easing'
const CHONGQING = [[106.31813049316406, 29.674758911132812], [106.31126403808594, 29.643173217773438], [106.28929138183594, 29.612960815429688], [106.27830505371094, 29.586868286132812], [106.29066467285156, 29.548416137695312], [106.29478454589844, 29.505844116210938], [106.29478454589844, 29.478378295898438], [106.30302429199219, 29.463272094726562], [106.34971618652344, 29.482498168945312], [106.36756896972656, 29.518203735351562], [106.40602111816406, 29.515457153320312], [106.44172668457031, 29.514083862304688], [106.44721984863281, 29.477005004882812], [106.47880554199219, 29.461898803710938], [106.51313781738281, 29.452285766601562], [106.54197692871094, 29.413833618164062], [106.58454895019531, 29.389114379882812], [106.64497375488281, 29.350662231445312], [106.68617248535156, 29.368515014648438], [106.71775817871094, 29.445419311523438], [106.71638488769531, 29.493484497070312], [106.75895690917969, 29.563522338867188], [106.79054260253906, 29.632186889648438], [106.80152893066406, 29.652786254882812], [106.75483703613281, 29.710464477539062], [106.71089172363281, 29.764022827148438], [106.65870666503906, 29.765396118164062], [106.60926818847656, 29.762649536132812], [106.57768249511719, 29.762649536132812], [106.56394958496094, 29.773635864257812], [106.53099060058594, 29.773635864257812], [106.51039123535156, 29.791488647460938], [106.46919250488281, 29.770889282226562], [106.40739440917969, 29.791488647460938], [106.38130187988281, 29.784622192382812], [106.34147644042969, 29.748916625976562], [106.31813049316406, 29.674758911132812]]
export default {
  
  data() {
    
    return {
      coordType: 'WGS84',
      map: null,
      mapComp: null,
      mapView: null,

      hangzhou: [120.202789, 30.248795],
      guangzhou: [113.247070, 23.123474],
      shenzhen: [114.054565, 22.552185],
      chongqing: CHONGQING
    }
  },
  watch: {
    
  },
  methods: {
    readyInit(map, mapComp) {
      this.map = map
      this.mapComp = mapComp
      this.mapView = map.getView()
    },
    zoomToGSH() {
      let extent = boundingExtent([this.hangzhou, this.guangzhou, this.shenzhen])
      this.mapComp.zoomAt(extent, {easing: easeIn}).then(() => {
        alert('完成')
      })
    },
    zoomToCQ() {
      let geo = this.$refs.chongQing.feature.getProperties().geometry
      this.mapComp.zoomAt(geo, {easing: easeIn}).then(() => {
        alert('完成')
      })
    }
  },

  mounted() {
  }
}
</script>


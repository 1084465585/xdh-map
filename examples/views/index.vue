<template>
  <div>
    <select @change="changeMap">
      <option value="Baidu">Baidu</option>
      <option value="Amap">Amap</option>
      <option value="OSM">OSM</option>
      <option value="TDT">TDT</option>
      <option value="Google">Google</option>
      <option value="SuperMap">SuperMap</option>
      <option value="Founder">Founder</option>
    </select>
    <button @click="zoomIn">zoomIn</button>
    <button @click="zoomOut">zoomOut</button>
    <button @click="zoomTo">zoomTo</button>
    坐标： <span>{{coordinate}}</span>
    <example>
      <xdh-map ref="map"
               type="Baidu"
               :zoom="10"
               :min-zoom="5"
               :max-zoom="18"
               @pointermove="handleMove"
               :layer-config="layerConfig"
               @ready="readyHandle"
      >
        <xdh-map-icon icon="iconfont icon-location" :position="hangzhou"></xdh-map-icon>
        <xdh-map-icon icon="iconfont icon-location" :position="guangzhou"></xdh-map-icon>
        <xdh-map-icon icon="iconfont icon-location" :position="shenzhen"></xdh-map-icon>

        <xdh-map-polygon ref="chongQing" :key="2" :coordinates="chongqing"
                      fill="rgba(250,0,0,0.5)"
                      stroke-color="yellow"
                      :stroke-width="3"  ></xdh-map-polygon>
      </xdh-map>
      <button @click="zoomAtGSH">zoomAt广深杭</button>
      <button @click="zoomAtCQ">zoomAt大重庆</button>
      <button @click="getLayer" style="display: none">getLayer</button>
    </example>
  </div>

</template>

<script>
  import {boundingExtent} from 'ol/extent'
  const CHONGQING = [[106.31813049316406, 29.674758911132812], [106.31126403808594, 29.643173217773438], [106.28929138183594, 29.612960815429688], [106.27830505371094, 29.586868286132812], [106.29066467285156, 29.548416137695312], [106.29478454589844, 29.505844116210938], [106.29478454589844, 29.478378295898438], [106.30302429199219, 29.463272094726562], [106.34971618652344, 29.482498168945312], [106.36756896972656, 29.518203735351562], [106.40602111816406, 29.515457153320312], [106.44172668457031, 29.514083862304688], [106.44721984863281, 29.477005004882812], [106.47880554199219, 29.461898803710938], [106.51313781738281, 29.452285766601562], [106.54197692871094, 29.413833618164062], [106.58454895019531, 29.389114379882812], [106.64497375488281, 29.350662231445312], [106.68617248535156, 29.368515014648438], [106.71775817871094, 29.445419311523438], [106.71638488769531, 29.493484497070312], [106.75895690917969, 29.563522338867188], [106.79054260253906, 29.632186889648438], [106.80152893066406, 29.652786254882812], [106.75483703613281, 29.710464477539062], [106.71089172363281, 29.764022827148438], [106.65870666503906, 29.765396118164062], [106.60926818847656, 29.762649536132812], [106.57768249511719, 29.762649536132812], [106.56394958496094, 29.773635864257812], [106.53099060058594, 29.773635864257812], [106.51039123535156, 29.791488647460938], [106.46919250488281, 29.770889282226562], [106.40739440917969, 29.791488647460938], [106.38130187988281, 29.784622192382812], [106.34147644042969, 29.748916625976562], [106.31813049316406, 29.674758911132812]]
  export default {
    data() {
      return {
        olMap: null,
        coordinate: [],
        layerConfig: {},
        hangzhou: [120.202789, 30.248795],
        guangzhou: [113.247070, 23.123474],
        shenzhen: [114.054565, 22.552185],
        chongqing: CHONGQING
      }
    },
    methods: {
      readyHandle(map, mapComp) {
        this.olMap = map
      },
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
      },
      getLayer() {
        
        console.log(this.olMap.getLayers().getArray())
      }
    }
  }
</script>

<style scoped>

</style>

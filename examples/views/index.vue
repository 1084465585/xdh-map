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
    坐标： <span>{{coordinate}}</span>
    <example>
      <xdh-map ref="map"
               type="Baidu"
               :zoom="10"
               :min-zoom="5"
               :max-zoom="18"
               @pointermove="handleMove"
               :layer-config="layerConfig"
      >
        <!--        <xdh-map-type></xdh-map-type>-->
      </xdh-map>
    </example>
  </div>

</template>

<script>

  export default {
    data() {
      return {
        coordinate: [],
        layerConfig: {}
      }
    },
    methods: {
      changeMap(e) {
        this.$refs.map.changeType(e.target.value)
      },
      zoomIn() {
        this.$refs.map.zoomIn()
      },
      zoomOut() {
        this.$refs.map.zoomOut()
      },
      handleMove(e) {
        this.coordinate = e.coordinate
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <xdh-map type="Baidu" :zoom="10" :min-zoom="2" :max-zoom="17" ref="map" v-if="active" @movestart="handleClick">
    <xdh-map-text v-for="(item, index) in locArray"
                  :key="index"
                  :position="item"
                  text="阿迪所发"
                  color="red"
                  font="20px"
                  background="#fff"
                  stroke-color="red"
                  :padding="[4,10,4,10]"
                  :rotation="270"
                  :stroke-width="4"
                  @click="handleClick"></xdh-map-text>

    <!--<xdh-map-rectangle :loc="[120,30]" :width="1" :height="1" background="rgba(0,0,0,0.5)" stroke-color="#000" :z-index="1" :stroke-width="4"></xdh-map-rectangle>-->

    <xdh-map-rectangle ref="rectangle"
                       :position="position"
                       :width="1"
                       :height="1"
                       fill="red"
                       stroke-color="#ad6"
                       text="文字阿萨德飞是否收到"
                       font="20px"
                       color="#fff"
                       :stroke-width="4"></xdh-map-rectangle>

    <xdh-map-polygon></xdh-map-polygon>

    <xdh-map-polygon :coordinates="coordinates" fill="blue" text="测试文字"></xdh-map-polygon>


  </xdh-map>
</template>

<script>

  export default {
    data() {
      return {
        total: 100,
        active: true,
        locArray: [],
        position: [120, 30],
        coordinates: [

        ]
      }
    },
    methods: {
      handleClick(e, f) {
        // console.log('click', e, f)
      }
    },
    mounted() {

      for (let i = 0; i < this.total; i++) {
        this.locArray.push([120 + Math.random(), 30 + Math.random()])
      }
      // console.log(this.$refs.map)

      setTimeout(() => {
        // this.position = [121, 30]
        this.coordinates = [
          [120, 30],
          [120.2, 30.1],
          [120.05, 29],
          [120.1, 29.3],
          [120, 30]
        ]

      }, 2000)
    }
  }
</script>

<style scoped>

</style>

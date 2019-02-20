<template>
  <xdh-map type="Baidu" :zoom="10" :min-zoom="2" :max-zoom="17" ref="map" v-if="active" @movestart="handleClick">
    <xdh-map-text v-for="(item, index) in locArray"
                  :key="index"
                  :loc="item"
                  content="阿迪所发"
                  background="red"
                  border="blue"
                  @click="handleClick"></xdh-map-text>
  </xdh-map>
</template>

<script>

  export default {
    data() {
      return {
        total: 100,
        active: true,
        locArray: []
      }
    },
    methods: {
      handleClick(e, f) {
        console.log('click', e, f)
      }
    },
    mounted() {

      for (let i = 0; i < this.total; i++) {
        this.locArray.push([120 + Math.random(), 30 + Math.random()])
      }
      // console.log(this.$refs.map)

      setTimeout(() => {
        // this.active = false
        // console.log(this.$refs.map)
        console.log(this.$refs.map)
      }, 2000)
    }
  }
</script>

<style scoped>

</style>

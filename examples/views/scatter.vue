<template>
  <example>
    <xdh-map >
      <xdh-map-scatter v-for="(item, index) in arr" :key="index" :position="item.position" :inner="item.inner" :color="item.color" ></xdh-map-scatter>
       <!-- <xdh-map-scatter :position="[120, 30]" :outer="20"></xdh-map-scatter> -->
    </xdh-map>
  </example>
</template>

<script> 
const random = function (start, end) {
  return start + Math.round((end - start) * Math.random())
}
  export default {
    data() {
      return {
        arr: [],
        total: 20
      }
    },
    methods: {
      test(e) {
        console.log(e)
      },
      createTexts() {
        let arr = []
        for (let i = 0; i < this.total; i++) {
          arr.push({
            position: [120 + (1 - Math.random()), 30 + (1 - Math.random())],
            inner: random(5, 20),
            color: `${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}`
          })
        }
        return arr
      }  

    },
    created() {
       this.arr = this.createTexts()
    }
  }
</script>

<style scoped>

</style>

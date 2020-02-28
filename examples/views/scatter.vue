<template>
  <example>
    <xdh-map ref="map" :zoom="7" @ready="mapReady" :center="center">
      <xdh-map-scatter v-if="arr.length" :data="arr"></xdh-map-scatter>
      <!-- <xdh-map-scatter v-for="(item, index) in arr" :key="index" :position="item.position" :inner="item.inner" :color="item.color" @click="scatterClick"></xdh-map-scatter>  -->
    </xdh-map>
  </example>
</template>

<script>
import {pointerMove} from 'ol/events/condition.js'
import Select from 'ol/interaction/Select.js' 
const random = function (start, end) {
  return start + Math.round((end - start) * Math.random())
}
  export default {
    data() {
      return {
        center: [120, 30],
        map: null,
        arr: [],
        total: 80
      }
    },
    methods: {
      mapReady(map) {
        this.map = map

        this.select = new Select({condition: pointerMove})
        this.map.addInteraction(this.select)

        this.select.on('select', (e) => {
          if (e.selected.length) {
            this.$refs.map.$el.style.cursor = 'pointer'
          }
          if (e.deselected.length) {
            this.$refs.map.$el.style.cursor = 'auto'
          }
        })
      },
      createTexts() {
        let arr = []
        for (let i = 0; i < this.total; i++) {
          arr.push({
            position: [120 + (1 - Math.random() * 2), 30 + (1 - Math.random()) * 2],
            inner: random(5, 20),
            outer: random(20, 40),
            color: `${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}`
          })
        }
        return arr
      },
      scatterClick(e) {
        console.log('scater e', e)
      } 

    },
    created() {
       this.arr = this.createTexts()
    }
  }
</script>

<style scoped>

</style>

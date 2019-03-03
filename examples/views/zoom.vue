<template>

  <example>
    <range-set v-model="precent"  :steps="20"></range-set>
    <p>{{precent}}</p>
    <button @click="add">+</button>
    <xdh-map>
      <xdh-map-zoom placement="left-top" :simple="false"></xdh-map-zoom>
    </xdh-map>
    
  </example>

</template>

<script>
  import RangeSet from '../../packages/zoom/src/range-set.vue'
  export default {
    data() {
      return {
        precent: 0
      }
    },
    components: {
      RangeSet
    },
    methods: {
      add() {
        this.precent += 5
        if (this.precent >= 100) {
          this.precent = 100
        }
      },
      dragHandle(e) {
        console.log(e.clientY)
      }
    }
  }
</script>

<style scoped>
</style>

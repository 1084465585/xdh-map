<template>
<div style="width: 100%; height: 100%">
  <div style="width: 600px; height: 600px;border: 1px solid red">
    <xdh-map type="Baidu" :zoom="10" :min-zoom="2" :max-zoom="17" ref="map"   :center="location" 
    >
      <xdh-map-circle 
        :loc="cirLoc"
        color="green"
        :onlyStroke="true"
        :strokeWidth="3"
        :radius="radius"
      ></xdh-map-circle>
    </xdh-map>
    <button @click="add">+</button>
    <button @click="move">move</button>
  </div>
  
</div>
</template>

<script>

  export default {
    data() {
      return {
        strOpt: {
          color: 'blue',
          width: 18
        },
        radius: 30, 
        location: [120 + Math.random(), 30 + Math.random()],
        cirLoc: [120 + Math.random(), 30 + Math.random()]
      }
    },
    methods: {
      add() {
        this.radius += 5 
      },
      move() {
        let a = this.cirLoc[0] + 1
        let b = this.cirLoc[1] + 1
        this.cirLoc = [a, b]
        // console.log()
      },
      handleClick(e, f) {
        console.log('click', e, f)
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>

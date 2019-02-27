<template>
  <div>
    <example>
      <xdh-map :zoom="9">
        <xdh-map-heat :data="data" :radius="10"></xdh-map-heat>
      </xdh-map>
    </example>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: []
      }
    },
    methods: {
      getData() {
        let data = []
        for (let i = 0; i < 1000; i++) {
          data.push({
            lon: 120 + Math.random() - Math.random(),
            lat: 30 + Math.random() - Math.random(),
            weight: Math.random()
          })
        }
        return data
      }
    },
    created() {
      this.data = this.getData()

    }
  }
</script>

<style scoped>

</style>

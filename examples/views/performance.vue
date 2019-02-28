<template>
    <example>
      <xdh-map :zoom="12">
        <xdh-map-text v-for="(item,index) in textArray"
                      :key="index"
                      v-bind="item"
                      @click="handleClick"></xdh-map-text>
      </xdh-map>
    </example>
</template>

<script>
  export default {
    data() {
      return {
        total: 1000,
        textArray: []
      }
    },
    methods: {
      createTexts() {
        let texts = []
        for (let i = 0; i < this.total; i++) {
          texts.push({
            position: [120 + (0.5 - Math.random()), 30 + (0.5 - Math.random())],
            text: '文本' + i,
            font: '18px',
            background: '#fff',
            strokeColor: 'red',
            padding: [5, 10, 5, 10],
            color: 'blue'
          })
        }
        return texts
      },
      handleClick(e, feature) {
        console.log(feature)
      }
    },
    created() {
      this.textArray = this.createTexts()
    }
  }
</script>

<style scoped>

</style>

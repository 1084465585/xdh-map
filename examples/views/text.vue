<template>
  <example>
    <xdh-map>
      <xdh-map-text :text="text"
                    :position="position"
                    font="20px"
                    color="blue"
                    stroke-color="red"
                    :stroke-width="5"
                    background="#ccc"
                    :padding="[5, 10, 5, 10]"
                    cursor="pointer"
                    @click="handleClick"></xdh-map-text>
    </xdh-map>
  </example>
</template>

<script>
  export default {
    data() {
      return {
        text: '333',
        position: [120, 30]
      }
    },
    methods: {
      handleClick(e, feature) {
        console.log(feature)
        alert(feature._vm.text)
      }
    },
    created() {
      setTimeout(() => {
        this.text = '点击我试试'
        this.position = [120.1, 30.01]
      }, 1000)
    }
  }
</script>

<style scoped>

</style>

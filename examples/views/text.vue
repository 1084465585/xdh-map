<template>
  <div>
    <example>
      <xdh-map>
        <xdh-map-text text="点击我试试"
                      :position="[120, 30]"
                      font="20px"
                      color="blue"
                      stroke-color="red"
                      :stroke-width="5"
                      background="#ccc"
                      :padding="[5, 10, 5, 10]"
                      @click="handleClick"></xdh-map-text>


      </xdh-map>
    </example>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick(e, feature) {
        console.log(feature)
        alert(feature._vm.text)
      }
    }
  }
</script>

<style scoped>

</style>

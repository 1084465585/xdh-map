<template>
  <div>
    <example>
      <xdh-map :zoom="8">
        <xdh-map-rectangle :position="[120, 30]"
                           fill="#f00"
                           :width="1"
                           height="1"
                           text="文字文字"
                           color="#fff"
                           font="20px"
        ></xdh-map-rectangle>
      </xdh-map>
    </example>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>

</style>

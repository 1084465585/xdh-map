<template>
  <div>
    <example>
      <xdh-map>
        <xdh-map-pointer placement="left-bottom"
                         :margin="[0,0,10,10]"
                         @copy="handleCopy"></xdh-map-pointer>
      </xdh-map>
    </example>
  </div>
</template>

<script>
  export default {
    methods: {
      handleCopy(coord) {
        alert('复制：' + coord)
      }
    }
  }
</script>

<style scoped>

</style>

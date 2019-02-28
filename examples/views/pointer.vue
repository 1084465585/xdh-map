<template>
    <example>
      <xdh-map>
        <xdh-map-pointer placement="left-bottom"
                         :margin="[0,0,10,10]"
                         @copy="handleCopy"></xdh-map-pointer>

        <xdh-map-pointer placement="left-top"
                         :margin="[10,0,0,10]"
                         @copy="handleCopy"></xdh-map-pointer>

        <xdh-map-pointer placement="right-top"
                         :margin="[10,10,0,0]"
                         @copy="handleCopy"></xdh-map-pointer>

        <xdh-map-pointer placement="right-bottom"
                         :margin="[0,10,10,0]"
                         @copy="handleCopy"></xdh-map-pointer>

      </xdh-map>
    </example>
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

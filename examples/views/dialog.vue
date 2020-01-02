<template>
    <example>
      <xdh-map>
         
      </xdh-map>
    </example>
</template>

 
<script>
  export default {
    data() {
      return {
        closed1: true,
        closed2: true
      }
    },
    watch: {
      
    },
    methods: {
      handleClose1() {
        this.closed1 = !this.closed1
      },
      handleClose2() {
        this.closed2 = !this.closed2
      }
    }
  }
</script>


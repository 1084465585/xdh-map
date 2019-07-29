<template>
    <example>
      <xdh-map>
        <xdh-map-placement placement="left-top" :margin="[0,0,0,0]">
          <xdh-map-dialog :closed.sync="closed"></xdh-map-dialog>
        </xdh-map-placement>
        <xdh-map-placement>
          <button @click="clickHandle">打开</button>
        </xdh-map-placement>
      </xdh-map>
    </example>
</template>

 
<script>
  export default {
    data() {
      return {
        closed: true
      }
    },
    watch: {
      
    },
    methods: {
      
      clickHandle() {
        this.closed = !this.closed
      }
    }
  }
</script>


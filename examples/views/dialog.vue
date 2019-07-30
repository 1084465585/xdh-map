<template>
    <example>
      <xdh-map>
        <xdh-map-placement placement="left-top" :margin="[0,0,0,0]">
          <xdh-map-dialog :closed.sync="closed" :position="[150, 150]">
            <div style="">
              <h1>测试内容</h1>
            </div>
            <div class="bottom" slot="bottom">
              这个是底部  
            </div>  
          </xdh-map-dialog>
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


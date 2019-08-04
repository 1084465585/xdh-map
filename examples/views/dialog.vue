<template>
    <example>
      <xdh-map>
        <xdh-map-placement placement="left-top" :margin="[0,0,0,0]">
          <xdh-map-dialog :closed.sync="closed1" :position="[150, 150]">
            <div style="">
              <h1>测试内容1</h1>
            </div>
            <div class="bottom" slot="bottom">
              这个是底部  
            </div>  
          </xdh-map-dialog>
        </xdh-map-placement>

        <xdh-map-placement placement="left-top" :margin="[0,0,0,0]">
          <xdh-map-dialog :closed.sync="closed2" :position="[0, 0]" :bottom="false">
            <div style="">
              <h1>测试内容2</h1>
            </div>
          </xdh-map-dialog>
        </xdh-map-placement>

        <xdh-map-placement>
          <button @click="handleClose1">打开</button>
          <button @click="handleClose2">打开</button>
        </xdh-map-placement>
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


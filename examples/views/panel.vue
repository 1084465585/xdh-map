<template>
    <example>
      <xdh-map>
        <xdh-map-placement>
          <button @click="panelHandle">打开</button>
        </xdh-map-placement>
        <xdh-map-panel :position="position" :closed.sync="panelClose" @on-closed="panelClosedHandle" height="auto">
           <div slot="title">
             这个是标题
           </div>
           ssssss<br/>ssssss<br/>ssssss<br/>ssssss<br/>
           <div slot="bottom">
             这个是底部
           </div>
        </xdh-map-panel>
      </xdh-map>
    </example>
</template>

<script>
  export default {
    data() {
      return {
        position: [120, 30],
        panelClose: true
      }
    },
    watch: {
      // panelClose(val) {
      //   console.log('test watch: ', val)
      // }
    },
    methods: {
      panelHandle() {
        this.panelClose = !this.panelClose
      },
      panelClosedHandle() {
        console.log('panel close')
      }
    },
    mounted() {
       
    }
  }
</script>

<style lang="scss" scoped>
.map-panel {
  min-width: 300px;
  &__header{
    padding: 3px;
    background: skyblue;
    color: white;
  }
}
</style>

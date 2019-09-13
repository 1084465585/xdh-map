<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-29 09:03:13
 * @LastEditTime: 2019-09-13 16:38:22
 * @LastEditors: Please set LastEditors
 -->

<template>
    <example>
      <xdh-map>
        
        <xdh-map-panel :position="position"  height="auto" :visible="visible">
          <button @click="visible = false">test</button>  
        </xdh-map-panel>
        <xdh-map-icon class="icon" icon="iconfont icon-locus" :position="position"  @click="visible = true"></xdh-map-icon>
      </xdh-map>
    </example>
</template>

<script>
  export default {
    data() {
      return {
        position: [120, 30],
        visible: true
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
.xdh-map-html.icon{
  /deep/ i.iconfont{
    font-size: 34px;
    color: red;
  }
}
</style>

<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-29 09:03:13
 * @LastEditTime: 2019-09-14 10:39:58
 * @LastEditors: Please set LastEditors
 -->

<template>
    <example>
      <xdh-map>
        <xdh-map-panel :position="position1"  height="auto" :visible="visible" key="panel_1">
          <button @click="visible = false">关闭</button>
          点击按钮关闭，点击icon 打开  
        </xdh-map-panel>
        <xdh-map-icon class="icon" icon="iconfont icon-locus" :position="position1"  @click="visible = true"  key="icon_1"></xdh-map-icon>

        <xdh-map-panel class="custom-panel" :position="position2"  height="auto" :visible="visible" key="panel_2">
          <div class="custom-panel__body">
            <div>可自定义样式：</div>
            <pre>
              /deep/ .xdh-map-panel{ 
                  border-bottom: 1px solid green; 
                .box{
                  border-color: green;
                  background: red;
                }
                .bottom-pin{
                  &:after{
                    border-bottom-color: red;
                  }
                }
              }
            </pre>
          </div>
        </xdh-map-panel>
        <xdh-map-icon class="icon" icon="iconfont icon-locus" :position="position2"  key="icon_2"></xdh-map-icon>
      </xdh-map>
    </example>
</template>

<script>
  export default {
    data() {
      return {
        position1: [119.4, 29.6],
        position2: [120, 30],
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
.custom-panel {
  /deep/ .xdh-map-panel{
    border-bottom: 1px solid green;
    .box{
      border-color: green;
      background: red;
    }
    .bottom-pin{
      &:after{
        border-bottom-color: red;
      }
      
    }
  }
  &__body{
    width: 300px;
    // height: 280px;
    color: yellow;
  }
}
.xdh-map-html.icon{
  /deep/ i.iconfont{
    font-size: 34px;
    color: red;
  }
}
</style>

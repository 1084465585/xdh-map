<template>

  <div class="xdh-map-warp" >
    <div class="map-warp">
      <slot name="map"></slot>
    </div>
    <slot></slot>
    <div style="position: absolute; right: 0;bottom:0;z-index: 1000">
      <button @click="test">test</button>
    </div>
  </div> 
  
</template>

<style lang="scss" scoped>
.xdh-map-warp{
  width: 100%;
  height: 100%;
  position: relative;
  .map-warp{
    position: absolute;
    width: 100%;
    top:0;
    bottom: 0;
    z-index: 0;
  }
}

</style>



<script>
  /**
   * warp 地图容器
   * @module xdh-map-warp
   */
    
  
   /**
   * 插槽
   * @member slots
   * @property {string} bottom 定义底部内容
   * @property {string} default 定义主体内容
   * 
   */

  export default {
    name: 'xdh-map-warp',
    /**
    * 参数属性
    * @member props
    * @property {boolean} closed 定义关闭变量
    * 
    */
    props: {
     
    },
    data() {
      return {
        dialogList: []
         
      }
    },
    watch: { 
    },
    methods: {
      test() {
        console.log(this.dialogList)
      },
      registerDialog(vm) {
        this.dialogList = this.dialogList.concat([vm])
      },
      getAllDialogs() {
        return this.dialogList
      }
    },
    mounted() {
 

    },
    beforeDestroy() {
      
    }
  }
</script>


<template>

  <div class="xdh-map-warp" >
    <div class="map-warp">
      <slot name="map"></slot>
    </div>
    <slot></slot>
  </div> 
  
</template>

<style lang="scss" scoped>
</style>



<script>
  /**
   * warp 地图容器
   * @module xdh-map-warp
   */
    
  
   /**
   * 插槽
   * @member slots
   * @property {string} map 定义地图的放置位置（默认为z-index: 0）
   * @property {string} default 其他布局内容
   * 
   */

  export default {
    name: 'xdh-map-warp',
    /**
    * 参数属性
    * @member props
    * @property {number} dialogLayer 弹窗的z-index 层级倍数（用于将xdh-map-dialog弹窗与其他自定义内容的zindex区分开），设置 dialogLayer 后，所有在 warp容器内 注册的 xdh-map-dialog 会以此作为倍数设置 z-index的值
    * 
    */
    props: {
      dialogLayer: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        dialogList: []
         
      }
    },
    provide() {
      return {
        dialogLayer: this.dialogLayer
      }
    },
    watch: { 
    },
    methods: {
      registerDialog(vm) {
        this.dialogList = this.dialogList.concat([vm])
      },
      getAllDialogs() {
        return this.dialogList
      },
      setDialogsSeries(vm) {
        let targetIndex = this.dialogList.findIndex((dialog) => {
          return dialog._uid === vm._uid
        })
        let current = this.dialogList.splice(targetIndex, 1)
        this.dialogList = current.concat(this.dialogList)
        return this.dialogList
      }
    },
    mounted() {
 

    },
    beforeDestroy() {
      
    }
  }
</script>


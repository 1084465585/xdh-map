<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-27 16:25:51
 * @LastEditTime: 2019-09-13 16:57:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <xdh-map-html  v-bind="$attrs" positioning="bottom-center" >
      <div class="main-warp">
        <div class="shadow-warp">
          <img class="shadow" src="../../../../sources/panel/shadow.png" alt="">
        </div>
        <div class="box">
          <slot></slot>
        </div>
        <div class="bottom-pin" style="">
          <img class="shadow-pin" src="../../../../sources/panel/shadow_pin.png" alt="">
        </div>
      </div> 
    
  </xdh-map-html>
</template>
<style lang="scss" scoped>
.main-warp{
  position: absolute;
  border-radius: 0 0 10px 10px;
  border-bottom: 1px solid #ccc;
  transform: translate3d(calc(-50% + 40px), calc(-100% - 60px), 0);
  .box{
    position: relative;
    box-sizing: border-box;
    padding: 5px;
    min-width: 200px;
    min-height: 100px;
    border-radius: 10px;
    border: 1px solid #ccc;
    border-bottom: 0px solid black;
    background: white;
    z-index: 2;
  }
  .bottom-pin{
    position: absolute;
    bottom: -60px;
    left: calc(50% - 80px); 
    height: 60px; 
    width: 80px;
    &::after{
      content: '';
      display:block;
      margin-left: -40px;
      border-bottom: 30px solid white;
      border-left: 80px solid transparent;
      border-right: 80px solid transparent;
      transform: rotate(120deg) translate3d(-45px, -30px, 0);
    }
    img.shadow-pin{
      position: absolute;
      display: block;
      bottom: 8px;
      left: 26%;
    }
  }
  .shadow-warp{
    position: absolute;
    left: 12%;
    right: -45%;
    bottom: -23px;
    pointer-events: none;
    img.shadow{
      display: block;
      width: 100%;
    }
    
  }

}
</style>

<script>
  /**
   * Panel覆盖物组件
   * @module xdh-map-panel
   */

  import XdhMapHtml from '../../../html'

  /**
   * 插槽
   * @member slots
   * @property {string} title 定义标题内容
   * @property {string} default 定义主体内容
   * @property {string} bottom 定义主体内容
   */
  export default {
    name: 'XdhMapPanel',
    components: {
      XdhMapHtml
    },
    /**
     * 参数属性
     * @member props
     * @property {string} [width] 窗体宽度
     * @property {string} [height] 窗体高度
     * @property {boolean} [closed] 关闭
     *
     */
    props: {
      // ...XdhMapPopup.props,
      // width: {
      //   type: String,
      //   default: '300px'
      // },
      // height: {
      //   type: String,
      //   default: '260px'
      // },
      // closed: {
      //   type: Boolean,
      //   default: true
      // }
    },
    data() {
      return {
        
      }
    },
    computed: {
      
    },
    watch: {
    },
    methods: {
      
    },
    mounted() {
    },
    beforeDestroy() {
    }
  }
</script>

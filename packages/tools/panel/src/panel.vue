<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-27 16:25:51
 * @LastEditTime: 2019-09-14 12:01:41
 * @LastEditors: Please set LastEditors
 -->

<template>
  <xdh-map-html v-bind="$attrs" positioning="bottom-center" >
      <div class="xdh-map-panel">
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


<script>
  /**
   * Panel覆盖物组件
   * @module xdh-map-panel
   * @description 父组件必须是 xdh-map
   */

  import XdhMapHtml from '../../../html'

  /**
   * 插槽
   * @member slots
   */
  export default {
    name: 'XdhMapPanel',
    components: {
      XdhMapHtml
    },
    /**
     * 参数属性
     * @member props
     *
     */
    props: {
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

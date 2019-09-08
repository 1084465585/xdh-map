<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 21:57:21
 * @LastEditTime: 2019-09-08 18:41:25
 * @LastEditors: Please set LastEditors
 -->
<template>
    <example>
      <div style="margin-bottom: 10px">
        <div ref="thing" draggable="true" style="width: 50px; height: 50px; background: red"></div>
      </div>
      <div class="map-warp" style="width: 100%; height: 500px;">
        <xdh-map v-droppable :zoom="16" :center="[120.2014, 30.2574]" ref="map" >
        
        </xdh-map>
      </div>
      
    </example>
</template>

 
<script>
import droppable from '../../packages/tools/dragdrop/index'
export default {
  directives: {droppable},
  data() {
    return {
    }
  },
  watch: {
    
  },
  methods: {
    
  },
  mounted() {
    // this.$refs.thing.addEventListener('drop', () => {
    //   console.log('ec')
    // })
  }
}
</script>


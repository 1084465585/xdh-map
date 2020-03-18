<template>
  
  <example>
    <xdh-map ref="map" type="Amap" @ready="mapReady" :center="[120, 30]" :zoom="14" >
      <xdh-map-overview placement="left-bottom" 
                        :margin="[10]"
                        :box-style="boxStyle"></xdh-map-overview>


      <xdh-map-icon icon="iconfont icon-locus"  :position="[107.6513671875, 17.58544921875]"></xdh-map-icon>
      <xdh-map-icon icon="iconfont icon-policeman" :position="[132.3486328125, 42.41455078125]"></xdh-map-icon>
      <xdh-map-overview placement="left-top" 
                        :margin="[10]"
                        theme="dark"></xdh-map-overview> 

      <!-- <xdh-map-overview placement="right-top" 
                        :margin="[10]"
                        theme="light"></xdh-map-overview>    

      <xdh-map-overview placement="right-bottom" 
                        :margin="[10]"
                        theme="light"></xdh-map-overview>  -->
    </xdh-map>
    
  </example>
   
</template>

<script>
  
  export default {
    data() {
      return {
        map: null,
        boxStyle: {
          strokeWidth: 3, // 边框厚度
          strokeColor: 'red', // 边框颜色
          strokeLineCap: 'square', // 虚线样式
          strokeLineJoin: '', // 虚线样式
          strokeLineDash: [5, 5], // 虚线样式
          strokeLineDashOffset: 0,
          strokeMiterLimit: 0
          // strokeLineCap: 'square',
          // strokeLineDash: [3, 5]
        } 
      }
    },
    methods: {
      mapReady(map) {
        this.map = map
        this.view = this.map.getView()
         

      }
    },
    mounted() {
      
    }
  }
</script>

<style scoped>

</style>

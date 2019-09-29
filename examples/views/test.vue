<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 21:57:21
 * @LastEditTime: 2019-09-28 17:06:00
 * @LastEditors: Please set LastEditors
 -->
<template>
    <example>
      
      <div class="map-warp" style="width: 100%; height: 500px;">
        <xdh-map :zoom="9" :center="[120, 30]" ref="map" @ready="readyInit" >
       
 

         
        </xdh-map>
      </div>
     
    </example>
</template>
<style>
.xdh-dragzoom{
  border: 2px solid green;
}
</style>
 
<script>

import DragZoom from 'ol/interaction/DragZoom'
export default {
  
  data() {
    return {
      mapOpts: {
        // interaction: defaultInteractions({
        //   shiftDragZoom: false
        // })
      } 
    }
  },
  watch: {
    
  },
  methods: {
    readyInit(map, mapComp) {
      this.mapView = map.getView()
      let intersArr = map.getInteractions().getArray()
      map.removeInteraction(intersArr[intersArr.length - 1])
      let newDragZoom = new DragZoom({
        className: 'xdh-dragzoom',
        duration: 0
      })
      map.addInteraction(newDragZoom)
      let currZoom = 0
      let currCenter = []
      newDragZoom.on('boxstart', (e) => {
         console.log('boxstart', e)
        currZoom = this.mapView.getZoom()
        currCenter = this.mapView.getCenter()
     
      }) 
      newDragZoom.on('boxend', (e) => {
        console.log('boxend', e)
        this.mapView.setZoom(currZoom)
        this.mapView.setCenter(currCenter)
        return false
      }) 
    } 
  },
  mounted() {
  }
}
</script>


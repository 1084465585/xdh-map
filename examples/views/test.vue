<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 21:57:21
 * @LastEditTime: 2019-10-07 11:26:55
 * @LastEditors: Please set LastEditors
 -->
<template>
    <example>
      
      <div class="map-warp" style="width: 100%; height: 500px;">
        <xdh-map :zoom="9" :center="[120, 30]" ref="map" @ready="readyInit" :coord-type="coordType" >
          <xdh-map-polygon :key="1" :coordinates="coordinates"
                       ref="polygon"
                       :fill="color"
                       stroke-color="yellow"
                       :props="data"
                       :stroke-width="3" @click="clickHandle" ></xdh-map-polygon>
        </xdh-map>
      </div>
      <div>
        <button @click="changeData">test</button>
      </div>
     
    </example>
</template>
<style>
.custom-drag-box{
  border: 2px solid green;
}
</style>
 
<script>
// import AreaSelect from '../../utils/interactions/area-select'


export default {
  
  data() {
    
    return {
      coordType: 'WGS84',
      map: null,
      mapComp: null,
      data: {
        testId: 'test'
      },
      color: '#f00',
      coordinates: [
        [120, 30],
        [120, 29],
        [119, 29.5],
        [118, 30.5],
        [120, 30]
      ]
    }
  },
  watch: {
    
  },
  methods: {
    readyInit(map, mapComp) {
      this.map = map
      this.mapComp = mapComp
    },
    clickHandle(e, feature) {
      // console.log(arguments)
      console.log(feature.getProperties())
    },
    changeData() {
      this.data = {
        testId: 'test2'
      }
    }
  },

  mounted() {
  }
}
</script>


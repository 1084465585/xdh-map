<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 21:57:21
 * @LastEditTime: 2019-10-02 16:31:25
 * @LastEditors: Please set LastEditors
 -->
<template>
    <example>
      
      <div class="map-warp" style="width: 100%; height: 500px;">
        <xdh-map :zoom="9" :center="[120, 30]" ref="map" @ready="readyInit" :coord-type="coordType" @on-boxend="boxEndHandle">
           <xdh-map-icon v-for="(item, index) in icons" :key="index" icon="iconfont icon-location" :position="item.pos" :style="{'color': item.checked ? 'red' : 'black'}"></xdh-map-icon>
        </xdh-map>
      </div>
      <div>
        <button @click="clearHandle">清空</button>
        <p>按“shift”拖动鼠标，当前选中 {{selectData.length}}个坐标</p>
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
import {AreaSelectClass as AreaSelect} from '../../packages/index.js'


export default {
  
  data() {
    const getData = function () {
      let data = []
      for (let i = 0; i < 100; i++) {
        data.push({
          pos: [120 + Math.random() - Math.random(), 30 + Math.random() - Math.random()],
          checked: false
        })
      }
      return data
    }
    return {
      coordType: 'WGS84',
      mapOpts: {},
      icons: getData(),
      selectData: []
    }
  },
  watch: {
    
  },
  methods: {
    readyInit(map, mapComp) {
      let areaSelect = new AreaSelect(map, mapComp, {
        class: 'custom-drag-box',
        coordType: this.coordType
      })
      
      map.addInteraction(areaSelect)

      areaSelect.on('boxend', (e) => {
        console.log(e.areaGeo)
      })
    },
    boxEndHandle(e) {
      let includes = this.icons.reduce((total, item) => {
        if (e.areaGeo.intersectsCoordinate(item.pos)) {
          item.checked = true
          total.push(item)
        }
        return total
      }, [])
      console.log(includes)
      this.selectData = includes
    },
    clearHandle() {
      this.icons.forEach((item) => {
        item.checked = false
      })
      this.selectData = []
    } 
  },

  mounted() {
  }
}
</script>


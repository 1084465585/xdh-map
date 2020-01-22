<template>
  <example>
    <div style="height: 400px">
      <xdh-map ref="map"  type="Baidu" :zoom="zoom" :center="target" @ready="mapReady"    > 
        <template v-for="(group, index) in groupList">
          <xdh-map-icon :visible="!group.detailShow" class="main-point" :key="`main_${index}`" icon="iconfont icon-locus" :position="group.center" @click="mainPointClick(group)"></xdh-map-icon>
          <template v-if="group.detailShow">
            <xdh-map-text  v-for="(point, i) in group.points"
                      :key="`text_${index}_${i}`"
                      v-bind="point"
            ></xdh-map-text>
          </template>
          
        </template>
        
      </xdh-map>
    </div> 
    
    
  </example>
</template>
<style scoped lang="scss">
.main-point{
  /deep/ .iconfont.icon-locus{
    font-size: 40px;
    color: red;
  } 
} 
 
 
</style>
<script> 
import {getScale, pointClot} from 'utils/util'
const random = function(x, y) {
  return (y - x) * Math.random() + x
}
const RANGE = 400
const COOR_PORP = 'position'
const TOTAL = 80

// zoomLayer = [7, 8, 9, 10]
export default {
  
  data() {
    return { 
      map: null,
      view: null,  
      zoom: 7,
      target: [113, 23],
      
      
      total: TOTAL,
      textArray: [],
      groupList: []
       
    }
  },
  computed: {
      
  },
  methods: {
    mapReady(map, mapComp) {
      this.map = map
      this.view = this.map.getView() 
 
      let scale = getScale(map, mapComp) 
      this.groupList = pointClot(this.textArray, scale * RANGE, COOR_PORP) 
      console.log(this.groupList)
    },
    
    mainPointClick(group) {
      this.groupList.forEach((group) => {
        group.detailShow = false
      })
      this.$nextTick(() => {
        group.detailShow = true
        if (group.points.length === 1) {
          this.$refs.map.moveTo(group.points[0].position)
        } else {
          this.$refs.map.zoomAt(group.area, {maxZoom: 10})
        }
      }) 
       
    },
   
     
    createTexts() {
      let texts = []
      for (let i = 0; i < this.total; i++) {
        texts.push({
          position: [random(107, 119), random(20.8, 25.2)],
          text: `${i}`,
          font: '12px',
          background: '#fff',
          strokeColor: 'red',
          padding: [5, 5, 5, 5],
          color: 'blue'
        })
      }
      return texts
    } 
    
    
  },
  created() { 
    this.textArray = this.createTexts()
  },
  mounted() {
     
  },
  beforeDestroy() {
     
  }
}
</script>



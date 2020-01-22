<template>
  <example>
    <div style="height: 400px">
      <xdh-map ref="map" type="Baidu" :zoom="zoom" :center="target" @ready="mapReady" >

        <xdh-map-group v-if="textArray.length" :data="textArray" coor-prop="position"  @on-groupInit="groupsInit"
          :groups-set="groupSet" :rang="range" :coorProp="coorProp"
        >
          <template  slot="group" slot-scope="scope">
            <xdh-map-html :visible="!scope.group.detailShow" :position="scope.group.center" @click="groupPointClick(scope.group, scope.data)">
              <div class="group"  >{{scope.group.name}}</div>
            </xdh-map-html>
          </template>
          <template slot="point" slot-scope="scope">
            <xdh-map-html :position="scope.point.position" >
              <div class="point" ></div>
            </xdh-map-html>
            <!-- <xdh-map-text  v-bind="scope.point" ></xdh-map-text> -->
          </template>
          
        </xdh-map-group>
        
      </xdh-map>
    </div>  
    
    
  </example>
</template>
<style scoped lang="scss">
.group{
  padding: 0 5px;
  // width: 40px; 
  height: 40px; 
  background: red; 
  line-height: 40px;
  text-align: center;
  
}
.point{
  width: 20px; 
  height: 20px; 
  background: blue; 
  border-radius: 50%;
}
</style>

<script>  
const random = function(x, y) {
  return (y - x) * Math.random() + x
} 
const RANGE = 300
const COOR_PORP = 'position'
const TOTAL = 80
export default {
  
  data() {
    return {
      target: [113, 23],
      map: null,
      view: null,  
      zoom: 7,
      
      range: RANGE,
      coorProp: COOR_PORP,
      
      total: TOTAL,
      textArray: [],
      groups: []
       
    }
  },
  computed: {
      
  },
  methods: {
    mapReady(map) {
      this.map = map
      this.view = this.map.getView()
      
      this.view.on('change', this.viewChangeHandle)
    },  
    groupPointClick(group, groups) {
      groups.forEach((group) => {
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
    groupSet(groups) {
      return groups.map((item, index) => {
        return {
          ...item,
          name: `组${index}(${item.points.length})`
        }
      })
    },
    groupsInit(groups) {
      this.groups = groups
      // console.log(this.groups)
    },
    showAllClick(flag) {
      this.groups.forEach((group) => {
        group.detailShow = flag
      })
    },
    viewChangeHandle(e) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => { 
        if (e.target.getZoom() < this.zoom) {
          console.log(e.target.getZoom(), this.zoom)
          this.groups.forEach((group) => {
            group.detailShow = false
          })
        }
      }, 500)
      
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



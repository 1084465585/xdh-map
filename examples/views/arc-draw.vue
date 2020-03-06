<template>
  <example class="flex"> 
    <xdh-map ref="map" type="Baidu" id="map3"  :zoom="9" :center="target" @ready="mapReady"   > 
      <xdh-map-placement>
        <button @click="drawArc">开始</button> 
        <button @click="drawModify">编辑</button>
        <button @click="drawFinish">完成</button>
        <button @click="drawClear">清除</button>
      </xdh-map-placement>

      <xdh-map-draw-arc ref="arcDraw" @drawend="handleDrawEnd" :line-style="style"></xdh-map-draw-arc>

       <xdh-map-line ref="line"
                      :routes="route" 
                      :arrow-each="false"
                      stroke-color="#000"
                      :stroke-width="2"></xdh-map-line>
    </xdh-map>
 
   
 
  </example>
</template>

<script> 

import {parseStyle, plotUtils} from '../../packages'
 
const pathStyle = parseStyle({
  className: 'Style',
  fill: {
    className: 'Fill',
    color: 'rgba(0,0,0,.3)'
  },
  stroke: {
    className: 'Stroke',
    color: 'red',
    width: 2
  }
})

 
export default {
  
  data() {
    return {
      path: [[113, 23], [112.4, 23.4], [112.4, 23.9]],
      map: null,
      view: null,  
      target: [113, 23],

      style: pathStyle,
      arr: [],

      route: []
    }
  },
  computed: {
      
  },
  methods: {
      
    mapReady(map) {
      this.map = map
      this.view = this.map.getView() 

      this.route = plotUtils.getArcLine(...this.path)
    },
    handleDrawEnd(arc, arcs) { 
      this.arr.push(arc)
      console.log('arr', this.arr)
    },
    
    

    drawArc() {
      this.$refs.arcDraw.draw()
    },
    drawFinish() {
      this.$refs.arcDraw.finish()
    },
    drawModify() {
      this.$refs.arcDraw.modify()
    },
    drawClear() {
      this.$refs.arcDraw.clear()
    }
  },
  created() {
    
  },
  mounted() {
    console.log(plotUtils)
  }
}
</script>

<style scoped lang="scss"> 
 
</style>

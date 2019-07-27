<template>
  <example>
    <xdh-map :zoom="5" :center="[116.23, 39.54]" @pointermove="mapHoverHandle">
      <xdh-map-geo @click="clickHandle" :state="state" :draw-define="drawDefineFn" @mouseEnter="hoverHandle" @mouseLeave="hoveroutHandle"></xdh-map-geo>
      <xdh-map-html :position="position" :offset="[30, -30]">
        <div class="tooltip" v-if="showData">{{showData.cityname}}<br/>{{showData.value}}</div>
      </xdh-map-html>

    </xdh-map> 
    
  </example>
</template>

<script>
  import china from '../../data/china.json'
  import data from '../../data/layer-data/data1'
  import {parseStyle} from '../../../packages/index.js'
  const setStyle = function (bg = 'rgba(0, 0, 0, 0)', line = {}) {
    return parseStyle({
      className: 'Style',
      fill: {
        className: 'Fill',
        color: bg // (225,0,0)-(225,225,0)
      },
      stroke: {
        className: 'Stroke',
        color: 'white',
        width: 1,
        ...line
      }
    })
  }
  export default {
    /*
      props:
      baseColor // 基建颜（最大值的颜色）
      opacity // 透明度
      geoState // 地图多边形图层
      data // 数据
    */
    data() {
      return {
        state: china,
        data: data.datas,
        normalStyle: setStyle(),
        position: [0, 0],
        showData: null
        
      }
    },
    computed: {
      total() {
        return this.data.reduce((total, item) => {
          if (item.value > total) {
            total = item.value
          }
          return total
        }, 0)
      }
      // layerData() {
      //   this.state.  
      //   return true
      // }
    },
    methods: {
      mapHoverHandle(e) {
        this.position = e.coordinate 
      },
      clickHandle(obj, e, f) {
        console.log(e)
        // console.log(f.getStyle().getFill().getColor())
      },
      setCantonStyle(obj) {
        return parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'blue'
          },
          stroke: {
            className: 'Stroke',
            color: 'green',
            width: 1
          },
          text: {
            className: 'Text',
            text: obj.properties.name,
            font: '14px sans-serif',
            fill: {
              className: 'Fill',
              color: 'red'
            }
          }
        })
      },
      setActiveStyle(obj) {
        return parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'pink'
          },
          stroke: {
            className: 'Stroke',
            color: 'yellow',
            width: 2
          },
          text: {
            className: 'Text',
            text: obj.properties.name,
            font: '14px sans-serif',
            fill: {
              className: 'Fill',
              color: 'blue'
            }
          }
        })
      },
      hoverHandle(obj, e, f) {
        this.showData = obj.properties._data
        let bg = f.getStyle().getFill().getColor()
        f.setStyle(setStyle(bg, {
          width: 3,
          color: 'green'
        }))
      },
      hoveroutHandle(obj, e, f) {
        this.showData = null
        let bg = f.getStyle().getFill().getColor()
        f.setStyle(setStyle(bg))
      },
      drawDefineFn(feature, obj) {
         
        let target = this.data.find((item, index) => {
          return item.cityname === obj.properties.name
        })
        if (target) {
          let val = Math.ceil(225 * target.value / this.total)
          let bg = `rgba(225, ${225 - val}, 0, 0.9)`
          obj.properties._originBg = bg
          obj.properties._data = target
          feature.setStyle(setStyle(bg))
        } else {
          feature.setStyle(setStyle())
        }
        
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="scss">
.tooltip{
  padding: 5px;
  background: white;
  border-radius: 10px;
  text-align: center;
}
</style>

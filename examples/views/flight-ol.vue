<template>
  <example> 
    <xdh-map ref="map" type="Baidu" :zoom="zoom" :center="target" @ready="mapReady"  > 
      <xdh-map-scatter v-if="scatters.length" :data="scatters" :z-index="4"></xdh-map-scatter>

      <xdh-map-line  v-for="(item, index) in linesData" 
        :key="`line_${index}`"
        :routes="item.line" 
        :arrow-each="false"
        :stroke-color="item.color"
        :stroke-width="1"
        :z-index="11">
      </xdh-map-line>
                     
    </xdh-map>  
  </example>
</template>
<style scoped lang="scss">
 
</style>

<script>
// import VectorLayer from 'ol/layer/Vector';
// import VectorSource from 'ol/source/Vector'; 
import Point from 'ol/geom/Point'  
import Feature from 'ol/Feature'
import {parseStyle, mapUtils} from '../../packages'
import CITYS from '../data/citys'

const BJData = [
  [{
    name: '北京'
  }, {
    name: '上海',
    value: 95
  }],
  [{
    name: '北京'
  }, {
    name: '广州',
    value: 90
  }],
  [{
    name: '北京'
  }, {
    name: '大连',
    value: 80
  }],
  [{
    name: '北京'
  }, {
    name: '南宁',
    value: 70
  }],
  [{
    name: '北京'
  }, {
    name: '南昌',
    value: 60
  }],
  [{
    name: '北京'
  }, {
    name: '拉萨',
    value: 50
  }],
  [{
    name: '北京'
  }, {
    name: '长春',
    value: 40
  }],
  [{
    name: '北京'
  }, {
    name: '包头',
    value: 30
  }],
  [{
    name: '北京'
  }, {
    name: '重庆',
    value: 20
  }],
  [{
    name: '北京'
  }, {
    name: '常州',
    value: 10
  }]
];

const SHData = [
  [{
    name: '上海'
  }, {
    name: '包头',
    value: 95
  }],
  [{
    name: '上海'
  }, {
    name: '昆明',
    value: 90
  }],
  [{
    name: '上海'
  }, {
    name: '广州',
    value: 80
  }],
  [{
    name: '上海'
  }, {
    name: '郑州',
    value: 70
  }],
  [{
    name: '上海'
  }, {
    name: '长春',
    value: 60
  }],
  [{
    name: '上海'
  }, {
    name: '重庆',
    value: 50
  }],
  [{
    name: '上海'
  }, {
    name: '长沙',
    value: 40
  }],
  [{
    name: '上海'
  }, {
    name: '北京',
    value: 30
  }],
  [{
    name: '上海'
  }, {
    name: '丹东',
    value: 20
  }],
  [{
    name: '上海'
  }, {
    name: '大连',
    value: 10
  }]
];

const GZData = [
  [{
    name: '广州'
  }, {
    name: '福州',
    value: 95
  }],
  [{
    name: '广州'
  }, {
    name: '太原',
    value: 90
  }],
  [{
    name: '广州'
  }, {
    name: '长春',
    value: 80
  }],
  [{
    name: '广州'
  }, {
    name: '重庆',
    value: 70
  }],
  [{
    name: '广州'
  }, {
    name: '西安',
    value: 60
  }],
  [{
    name: '广州'
  }, {
    name: '成都',
    value: 50
  }],
  [{
    name: '广州'
  }, {
    name: '常州',
    value: 40
  }],
  [{
    name: '广州'
  }, {
    name: '北京',
    value: 30
  }],
  [{
    name: '广州'
  }, {
    name: '北海',
    value: 20
  }],
  [{
    name: '广州'
  }, {
    name: '海口',
    value: 10
  }]
];

const random = function (start, end) {
  return start + Math.round((end - start) * Math.random())
}

const scatterMapInit = function () {
  let bjTerminal = BJData.map((line) => {
    return line[1]
  })
  let shTerminal = SHData.map((line) => {
    return line[1]
  })
  let gzTerminal = GZData.map((line) => {
    return line[1]
  })
  let all = [...bjTerminal, ...shTerminal, ...gzTerminal]
  
  let largestVal = 0
  
  let citys = all.reduce((total, item) => {
    if (!total[item.name]) { 
      total[item.name] = {...item, position: CITYS[item.name]}
    } else {
      total[item.name].value = total[item.name].value + item.value
    }

    if (largestVal < total[item.name].value) {
      largestVal = total[item.name].value
    }
    
    return total
  }, {})

   
 
  for (const key in citys) {
    let obj = {...citys[key]}
    citys[key] = {
      ...obj,
      inner: Math.round(20 * (obj.value / largestVal)),
      outer: 15,
      color: `${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}`
    }
  }
  console.log(citys, largestVal)
  return citys
}

const scatterMap = scatterMapInit()
 
const pointStyle = function (color) {
  return parseStyle({
    className: 'Style',
    zIndex: 17,
    image: {
      className: 'Circle',
      radius: 3,
      fill: {
        className: 'Fill',
        color: color
      }
    } 
  })
}
export default {
  
  data() {
    return {
      target: [108, 32],
      map: null,
      view: null,  
      zoom: 4,

      total: 40,
      scatterMap: scatterMap,
      BJScatter: scatterMap['北京'],
      SHScatter: scatterMap['上海'],
      GZScatter: scatterMap['广州'],
      scatters: [],
      // lineStyle: lineStyle,
       
 
      
      linesData: [],
      positions: [],
      points: [],
      now: null,
      speed: 20
      
       
       
    }
  },
  computed: {
      
  },
  methods: {
    mapReady(map) {
      this.map = map
      this.view = this.map.getView() 
      this.scatters = this.createScatter() 
      this.createLinesData() 
      setTimeout(() => { 
        this.registerPoint()

        this.startAnimation()
      }, 500)
      
    },
    createScatter() {
      return Object.values(this.scatterMap)
    },
    createLinesData() {
      let BJpoints = []
      let BJroutes = BJData.map((route) => {
        BJpoints.push(this.BJScatter.position)
        return {
          line: mapUtils.createCurve(this.BJScatter.position, this.scatterMap[route[1]['name']].position, 3),
          color: `rgba(${this.BJScatter.color}, 1`
        }
      })
      let SHpoints = []
      let SHroutes = SHData.map((route) => {
        SHpoints.push(this.SHScatter.position)
        return {
          line: mapUtils.createCurve(this.SHScatter.position, this.scatterMap[route[1]['name']].position, 3),
          color: `rgba(${this.SHScatter.color}, 1`
        }
      })

      let GZpoints = []
      let GZroutes = GZData.map((route) => {
        GZpoints.push(this.GZScatter.position)
        return {
          line: mapUtils.createCurve(this.GZScatter.position, this.scatterMap[route[1]['name']].position, 3),
          color: `rgba(${this.GZScatter.color}, 1`
        }
      }) 
      this.positions = [...BJpoints, ...SHpoints, ...GZpoints]
      this.linesData = [...BJroutes, ...SHroutes, ...GZroutes] 

    },
     
    registerPoint() {
      let GZStyle = pointStyle(`rgba(${this.GZScatter.color}, 1`)
      let SHStyle = pointStyle(`rgba(${this.SHScatter.color}, 1`)
      let BJStyle = pointStyle(`rgba(${this.BJScatter.color}, 1`) 
      this.points = this.positions.map((item) => {
        let feature = new Feature({
          geometry: new Point(item)
        })
        if (item[0] === this.BJScatter.position[0]) {
          feature.setStyle(BJStyle)
        } else if(item[0] === this.SHScatter.position[0]) {
          feature.setStyle(SHStyle)
        } else if (item[0] === this.GZScatter.position[0]) {
          feature.setStyle(GZStyle)
        }
        return feature
      })  
      this.$refs.map.addFeature(this.points)
    },

    startAnimation() {
      this.now = new Date().getTime(); 
      window.requestAnimationFrame(this.pointMove)
    },
    pointMove() {
      let current = new Date().getTime()

      let elapsedTime = current - this.now;
      let _index = Math.round(this.speed * elapsedTime / 1000) 
       
      if (_index > this.linesData[0].line.length - 1) {
        this.now = new Date().getTime() 
      } else {
        this.points.forEach((feature, index) => {
          feature.getGeometry().setCoordinates(this.linesData[index].line[_index])
        })
      } 
      window.requestAnimationFrame(this.pointMove)
    }
  },
  created() { 
    // console.log(Object.keys(CITYS).length)
     
  },
  mounted() { 
    
   
    
  },
  beforeDestroy() {
     
  }
}
</script>



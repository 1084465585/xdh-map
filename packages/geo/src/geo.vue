<template>
  <div v-if="features.length">
    <xdh-map-polygon ref="poly" v-for="(item, index) in features"  :key="`poly_${index}`" :coordinates="item.coordinates[0]"
                fill="rgba(0,0,0,0.5)"
                stroke-color="transparent"
                :stroke-width="1" :text="item.properties.name" color="transparent" 
                @draw="drawHandle(arguments[0], item)" 
                @pointermove="hoverHandle(...arguments, item)"
                v-on="geoListeners(item)"
                
    ></xdh-map-polygon>
    <!--  -->
  </div>  
</template>

<script>
  /**
   * 遮罩蒙层
   * @module xdh-map-mask
   */
  
  import XdhMapPolygon from '../../polygon'
  import {mapReady, getParent} from 'utils/util'
  // import {parse} from 'utils/style'
  import {pointerMove} from 'ol/events/condition.js'
  import Select from 'ol/interaction/Select.js'

// 从Echarts提取的编码解码方法
  const decodePolygon = function (coordinate, encodeOffsets) {
    let result = [];
    let prevX = encodeOffsets[0];
    let prevY = encodeOffsets[1];
    
    for (let i = 0; i < coordinate.length; i += 2) {
      let x = coordinate.charCodeAt(i) - 64;
      let y = coordinate.charCodeAt(i + 1) - 64;
      // ZigZag decoding
      x = (x >> 1) ^ (-(x & 1));
      y = (y >> 1) ^ (-(y & 1));
      // Delta deocding
      x += prevX;
      y += prevY;
      
      prevX = x;
      prevY = y;
      // Dequantize
      result.push([x / 1024, y / 1024]);
    }
    
    return result;
  }
  export default {
    name: 'XdhMapGeo',
    components: {
      XdhMapPolygon
    },
    /**
     */
    props: {
      state: {
        type: Object,
        required: true
      },
      drawDefine: {
        type: Function
      }
    },
    data() {
      return {
        features: [],
        currentFeature: null,
        currentObj: null
      }
    },
    computed: {
      decodeGeo() {
        if (!this.state) return null
        const geo = this.state
        const features = geo.features
        features.forEach(feature => {
          let geometry = feature.geometry
          let coordinates = geometry.coordinates
          let encodeOffsets = geometry.encodeOffsets
          if (!encodeOffsets) return geo
          geometry.coordinates = coordinates.map((coordinate, index) => {
            if (Array.isArray(coordinate)) {
              return coordinate.map((coord, j) => {
                return decodePolygon(coord, encodeOffsets[index][j])
              })
            }
            return decodePolygon(coordinate, encodeOffsets[index])
          })
        })
        return geo
      }
      
    },
    methods: {
      geoListeners(item) {
        let vm = this
        let obj = Object.assign({}, vm.$listeners)
        for (let key in obj) {
          if (key !== 'mouseLeave' || key !== 'mouseEnter' || key !== 'pointermove') {
            obj[key] = obj[key].bind(vm, ...arguments)
          } 
        }
        return obj
      },
      hoverHandle(e, feature, obj) {  
        if (!this.currentFeature) {
          this.currentFeature = feature
          this.currentObj = obj
          this.$emit('mouseEnter', obj, e, feature)
        } else {
          if (this.currentFeature !== feature) {
            this.$emit('mouseLeave', this.currentObj, e, this.currentFeature)
            this.currentFeature = feature
            this.currentObj = obj
            this.$emit('mouseEnter', obj, e, feature)
          }
        }
      },
      drawHandle(feature, obj) {
        if (this.drawDefine) {
          this.drawDefine(feature, obj)
        }
      },
      ready(map) {
        this.map = map
        this.select = new Select({condition: pointerMove})
        
        this.map.addInteraction(this.select)
        this.select.on('select', (e) => {
          if(!e.selected.length && this.currentFeature) {
            this.$emit('mouseLeave', this.currentObj, e, this.currentFeature)
            this.$nextTick(() => {
              this.currentFeature = null
              this.currentObj = null
            })
          }
        })
         
      },

      formatFeatures() {
        if (!this.decodeGeo) return []
        if (!this.decodeGeo.features || !this.decodeGeo.features.length) return []
        let features = this.decodeGeo.features
        let arr = features.map((item, index) => {
          return {
            // index: index,
            type: item.geometry.type,
            coordinates: item.geometry.coordinates,
            properties: item.properties || {}
          }
        })
        arr = arr.filter((item) => {
          if (item.type === 'Polygon' || item.type === 'MultiPolygon') {
            return item
          }
        })
        
        // let temp = arr.filter((item) => { return item.type !== 'Polygon' })
        let output = []
        arr.forEach((item, index) => {
          if (item.type === 'Polygon') {
            output.push(item)
          } else {
            let inner = item.coordinates.map((a, j) => { 
              return {
                type: item.type,
                coordinates: a,
                properties: item.properties
              } 
            })
            output = output.concat(inner)
          }
        })
        // console.log('output', output)
        this.features = output
      }
    },
    created() {
      this.parent = getParent.call(this)
    },
    mounted() {
      mapReady.call(this, this.ready)
      this.formatFeatures()
      
    },
    beforeDestroy() {
      this.map.removeInteraction(this.select)
    }
  }
</script>

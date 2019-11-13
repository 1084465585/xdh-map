<template>
  <div>
    
  </div>  
</template>

<script>
  import {mapReady, getParent} from 'utils/util'
  import GeoJSON from 'ol/format/GeoJSON';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import CleanMixin from '../../../utils/mixins/clean'
  import {parseStyle} from '../../../packages'
  import {pointerMove} from 'ol/events/condition.js'
  import Select from 'ol/interaction/Select.js'
  const DefaultStyle = function () {
    return parseStyle({
      className: 'Style',
      fill: {
        className: 'Fill',
        color: 'rgba(0,0,0,0.5)'
      },
      stroke: {
        className: 'Stroke',
        color: 'black',
        width: 2
      }
    })
  }
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
    name: 'XdhMapGeoLayer',
    mixins: [CleanMixin],
    components: {
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
      },
      withLayer: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        parent: null,
        map: null,
        features: [],
        
        style: DefaultStyle(),
        vectorContext: null,
        vectorLayer: null,

        currentFeature: null
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
    watch: {
      
    },
    methods: {
      
      ready(map) {
        this.map = map
        if (this.vectorLayer && this.withLayer) {
          this.map.addLayer(this.vectorLayer) 
        } else if(this.features.length) {
          this.features.forEach((feature) => {
            this.parent.addFeature(feature) 
          })
        }
        this.bindEventAtFeatures()
        this.$nextTick(() => {
          this.$emit('ready', this.features)
        })
      },
      bindEventAtFeatures() {
        this.features.forEach((feature) => {
          let obj = Object.assign({}, this.$listeners)
          // console.log(obj)
          for (let key in obj) {
            if (key === 'mouseLeave' || key === 'mouseEnter' || key === 'pointermove') {
              return
            } else {
              this.parent._bind(key, feature, obj[key], this._uid)
            }
          }
        })

        this.select = new Select({condition: pointerMove})
        this.map.addInteraction(this.select)
        this.select.on('select', (e) => {
          // console.log('sel', e)
          if(!e.selected.length && this.currentFeature) {
            this.$emit('mouseLeave', e, this.currentFeature)
            this.$nextTick(() => {
              this.currentFeature = null
            })
          } else {
            this.currentFeature = e.selected[0]
            this.$emit('mouseEnter', e, this.currentFeature)
          }
        })
      },
      setFeatures() {
        this.features = (new GeoJSON()).readFeatures(this.decodeGeo)
        this.features.forEach((feature) => {
          feature.setStyle(this.style)
          if (this.drawDefine) {
            this.drawDefine(feature)
          }
        })
      },
      getFeatures() {
        return this.features
      }
    },
    created() {
      this.parent = getParent.call(this)
     
      this.setFeatures()

      this.vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: this.features,
          format: new GeoJSON()
        })
      })
     
      const layerAcitons = ['postcompose', 'postrender', 'precompose', 'propertychange', 'rendercomplete']
      
      if (this.withLayer) {
        // this.vectorLayer.on('precompose', (e) => {
        //    this.$emit('precompose', e, this.vectorLayer, this)
        //   let context = e.context
        //   context.shadowOffsetX = 0
        //   context.shadowOffsetY = 0
        //   context.shadowBlur = 10;
        //   context.shadowColor = 'blue';
        // })
        layerAcitons.forEach((type) => {
          this.vectorLayer.on(type, (e) => {
           this.$emit(type, e, this.vectorLayer, this)
          })
        })
        
      }
    },
    mounted() {
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      if (this.withLayer) {
        this.map.removeLayer(this.vectorLayer)
        this.features = []
        this.vectorLayer = null
      } else {
        this.features.forEach((feature) => {
          this.parent.removeFeature(feature)
        })
        this.features = []
        this.vectorLayer = null
      }
    }
  }
</script>

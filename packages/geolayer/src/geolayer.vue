<template>
  <div></div>  
</template>

<script>
  /**
 *  XdhMapGeolayer 组件
 *  @module xdh-map-geo-layer
 *  @description 根据geoJson格式的数据生成 地图的图形覆盖物
 */
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
     * 参数属性
     * @member props
     * @property {object{}} state geoJson格式的文件
     * @property {function} drawDefine 定义单个Feature生成时执行的定义函数
     * @property {boolean | object} withLayer 是否使用layer图层， 或定义layer图层属性的数据， 为false / undefined / null 时表示不实用图层，默认false
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
        type: [Boolean, Object],
        default: false
      }
    },
    data() {
      return {
        parent: null,
        map: null,
        features: [],
        
        style: DefaultStyle(),
        vectorContext: null,
        vectorLayer: null
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
          /**
           * geoJson 图形渲染完成触发
           * @event ready
           * @param {Array} features
           */
          this.$emit('ready', this.features)
        })
      },
      bindEventAtFeatures() {
        this.features.forEach((feature) => {
          let obj = Object.assign({}, this.$listeners)
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
          if (e.selected.length) {
            this.$nextTick(() => {
              /**
               * 鼠标进入某个feature时触发
               * @event mouseEnter
               * @param {Object} event
               * @param {ol/Feature} feature
               */
              this.$emit('mouseEnter', e, e.selected[0])
            })
          }
          if (e.deselected.length) {
            /**
               * 鼠标离开某个feature时触发
               * @event mouseEnter
               * @param {Object} event
               * @param {ol/Feature} feature
               */
            this.$emit('mouseLeave', e, e.deselected[0])
          }
        })
      },
      setFeatures() {
        this.features = (new GeoJSON()).readFeatures(this.decodeGeo)
        this.features.forEach((feature, index) => {
          feature.setStyle(this.style)
          if (this.drawDefine) {
            setTimeout(() => {
              this.drawDefine(feature)
            }, index)
          }
        })
      },
      /**
       * 获取geolayer组件生成的所有feature
       * @method getFeatures
       */
      getFeatures() {
        return this.features
      },
      /**
       * 输出从Echarts提取的编码解码方法
       * @method _decodePolygon
       */
      _decodePolygon(coordinate, encodeOffsets) {
        return decodePolygon(coordinate, encodeOffsets)
      }
    },
    created() {
      this.parent = getParent.call(this)
     
      this.setFeatures()
      this.source = new VectorSource({
        features: this.features,
        format: new GeoJSON()
      })

      this.vectorLayer = new VectorLayer({
        source: this.source
      })

      if (this.withLayer) { 
        if (typeof this.withLayer === 'object') {
          this.vectorLayer.setProperties(this.withLayer)
        }
        this.vectorLayer.on('precompose', (e) => {
          this.$emit('precompose', e)
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

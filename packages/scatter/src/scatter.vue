<template>
  <div></div>
</template>

<script>
  /**
   * 水波涟漪动画组件
   * @module xdh-map-scatter
   */
  import {mapReady, getParent} from 'utils/util' 
  import CleanMixin from 'utils/mixins/clean'
  import Feature from 'ol/Feature'
  import {parseStyle} from '../../../packages'
  import {easeOut} from 'ol/easing'; 
  import Point from 'ol/geom/Point'

  const DURATION = function (start, end) {
    return start + Math.round((end - start) * Math.random())
  }

  export default {
    name: 'XdhMapScatter',
    mixins: [CleanMixin],
    components: {
    },
    /**
     * 参数属性
     * @member props
     * @property {array[]} data 散点数据 
     * @property {number} data.inner // 散点内半径
     * @property {number} data.outer // 散点扩散范围
     * @property {array} data.position // 散点位置
     * @property {color} data.color // 散点颜色值（rgb）
     * @property {zIndex} zIndex // 层级
     */
    props: {
      data: {
        type: Array,
        default: () => { return [] }
      },
      zIndex: {
        type: Number,
        default: 1
      }
      // color: {
      //   type: String,
      //   default: '255, 0, 0'
      // },
      // inner: {
      //   type: Number,
      //   default: 10
      // },
      // outer: {
      //   type: Number,
      //   default: 20
      // },
      // position: {
      //   type: Array,
      //   default: () => { return [0, 0] }
      // }
    },
    data() {
      return {
        map: null,
        parent: null,
        now: null, 
        scatters: [],
        scater: null,
        coreStyle: null,
        duration: DURATION(1000, 2000) // 1200
      }
    },
    computed: {
      
    },
    methods: {
      ready(map, comp) {
        this.map = map
         
        this.createPoint()
      
      },
      createPoint() {
        
        this.data.forEach((item) => {
          let feature = new Feature({
            geometry: new Point(item.position)
          })
          let coreStyle = this._coreStyle(item)
          let outStyle = this._defaultOuterStyle(item.inner, item.color)
          feature.setStyle([coreStyle, outStyle])
          
          this.scatters.push(feature)
        })
 
        this.parent.addFeature(this.scatters)
        
        this.animateStart()
         
        // this.bindEvents()
      },
      animateStart() {
        this.now = new Date().getTime();
        
        window.requestAnimationFrame(this.expand)
        // this.map.on('postrender', () => {
        //   this.expand()
        // })
      },
      expand() {
        let current = new Date().getTime()
        let elapsed = current - this.now 
        let elapsedRatio = elapsed / this.duration

        this.data.forEach((item, index) => {
          let radius1 = item.inner + (elapsedRatio * item.outer)
          let opacity1 = easeOut(elapsedRatio)
          const expandOuter = this._expandOuterStyle(item.color, radius1, opacity1)
          this.scatters[index].setStyle([this._coreStyle(item), expandOuter])
        })
        if (elapsed > this.duration) { 
          this.now = new Date().getTime()
        } 
        
        window.requestAnimationFrame(this.expand)
        
      },
      bindEvents() {
        let obj = Object.assign({}, this.$listeners) 
        for (let key in obj) {
          if (key === 'mouseLeave' || key === 'mouseEnter' || key === 'pointermove') {
            
            return
          } else {
            this.parent._bind(key, this.scatter, obj[key], this._uid)
          }
        }
      },
      _coreStyle(data) {
        return parseStyle({
          className: 'Style',
          zIndex: this.zIndex,
          image: {
            className: 'Circle',
            radius: data.inner,
            fill: {
              className: 'Fill',
              color: `rgba(${data.color}, 1)`
            }
          } 
        })
      },
      _defaultOuterStyle(inner, color) {
        return parseStyle({
          className: 'Style',
          zIndex: this.zIndex,
          image: {
            className: 'Circle',
            radius: inner,
            fill: {
              className: 'Fill',
              color: 'transparent'
            },
            stroke: {
              className: 'Stroke',
              color: `rgba(${color}, 1)`,
              width: 2
            }
          } 
        })
      },
      _expandOuterStyle(color, radius, opacity) {
        return parseStyle({
          className: 'Style',
          zIndex: this.zIndex,
          image: {
            className: 'Circle',
            radius: radius,
            fill: {
              className: 'Fill',
              color: `rgba(${color}, ${(1 - opacity) * 0.6})`
            },
            stroke: {
              className: 'Stroke',
              color: `rgba(${color}, ${1 - opacity})`, 
              width: 2
            } 
          }
        })
      }
    },
    created() {
      this.parent = getParent.call(this)
    },
    mounted() {
      mapReady.call(this, this.ready)
    }
  }
</script>

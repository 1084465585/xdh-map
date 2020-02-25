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
     * @property {number[]} position 经纬度 
     * @property {string} [color=red] 颜色
     */
    props: {  
      color: {
        type: String,
        default: '255, 0, 0'
      },
      inner: {
        type: Number,
        default: 10
      },
      outer: {
        type: Number,
        default: 20
      },
      position: {
        type: Array,
        default: () => { return [0, 0] }
      }
    },
    data() {
      return {
        map: null,
        parent: null,
        now: null, 
        scater: null,
        coreStyle: null,
        duration: DURATION(1000, 2000) // 1200
      }
    },
    computed: {
      
    },
    methods: {
      ready(map) {
        this.map = map
         
        this.createPoint()
      
      },
      createPoint() {
        this.scatter = new Feature({
          geometry: new Point(this.position)
        })
        
        this.coreStyle = parseStyle({
          className: 'Style',
          image: {
            className: 'Circle',
            radius: this.inner,
            fill: {
              className: 'Fill',
              color: `rgba(${this.color}, 1)`
            }
          } 
        })

        let outStyle = parseStyle({
          className: 'Style',
          image: {
            className: 'Circle',
            radius: this.inner,
            fill: {
              className: 'Fill',
              color: 'transparent'
            },
            stroke: {
              className: 'Stroke',
              color: `rgba(${this.color}, 1)`,
              width: 2
            }
          } 
        })
         

        this.scatter.setStyle([this.coreStyle, outStyle])
        this.parent.addFeature(this.scatter)
        
        this.animateStart()
         
        this.bindEvents()
      },
      animateStart() {
        this.now = new Date().getTime();
        
        window.requestAnimationFrame(this.expand)
        
      },
      expand() {
        let current = new Date().getTime()
        let elapsed = current - this.now
        let elapsedRatio = elapsed / this.duration
        
        let radius1 = this.inner + (elapsedRatio * this.outer)
        let opacity1 = easeOut(elapsedRatio)
         
        const _style1 = this._outerStyle(radius1, opacity1) 
        
        this.scatter.setStyle([this.coreStyle, _style1])
        if (elapsed > this.duration) { 
          this.now = new Date().getTime() 
        } 
        window.requestAnimationFrame(this.expand)
      },
      _outerStyle(radius, opacity) {
        return parseStyle({
          className: 'Style',
          image: {
            className: 'Circle',
            radius: radius,
            fill: {
              className: 'Fill',
              color: `rgba(${this.color}, ${(1 - opacity) * 0.6})`
            },
            stroke: {
              className: 'Stroke',
              color: `rgba(${this.color}, ${1 - opacity})`, 
              width: 2
            } 
          }
        })
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

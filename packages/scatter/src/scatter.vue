<template>
  <div></div>
</template>

<script>
  /**
   * 水波涟漪动画组件
   * @module xdh-map-scatter
   */
 
  import {getParent} from 'utils/util'
  import CleanMixin from 'utils/mixins/clean'
  import Feature from 'ol/Feature'
  import {parseStyle} from '../../../packages'
  import {easeOut} from 'ol/easing'; 
  import Point from 'ol/geom/Point'

  const DURATION = 1200

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
      // outer: {
      //   type: Number,
      //   default: 10
      // },
      position: {
        type: Array,
        default: () => { return [0, 0] }
      }
    },
    data() {
      return {
        now: null, 
        scater: null,
        outer: 10,
        // out1: null,
        // out2: null,
        // out3: null, 

        coreStyle: null
      }
    },
    computed: {
      
    },
    methods: {
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
         

      },
      animateStart() {
        this.now = new Date().getTime();
        
        window.requestAnimationFrame(this.expand)
        
      },
      expand() {
        let current = new Date().getTime()
        let elapsed = current - this.now
        let elapsedRatio = elapsed / DURATION
        
        let radius1 = this.inner + easeOut(elapsedRatio) * this.outer
        let opacity1 = easeOut(elapsedRatio) // * 2

        // let radius2 = this.inner / 2 + easeOut(elapsedRatio) * (this.outer + this.inner / 2)
        // let opacity2 = easeOut(elapsedRatio) * 1

        // let radius3 = easeOut(elapsedRatio) * (this.outer + this.inner / 2)
        // let opacity3 = easeOut(elapsedRatio) * 0.9

        let radius4 = easeOut(elapsedRatio) * (this.outer + this.inner + 5)
        let opacity4 = easeOut(elapsedRatio)
        
         
        const _style1 = this._outerStyle(radius1, opacity1) 
        // const _style2 = this._outerStyle(radius2, opacity2)
        // const _style3 = this._outerStyle(radius3, opacity3)
        const _style4 = this._outerStyle(radius4, opacity4)
        
        this.scatter.setStyle([this.coreStyle, _style1, _style4]) // _style2, _style3, _style4
        if (elapsed > DURATION) { 
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
              color: 'transparent' // `rgba(255, 0, 0, ${(1 - opacity) * 0.6})`
            },
            stroke: {
              className: 'Stroke',
              color: `rgba(${this.color}, ${1 - opacity})`, // 
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
      this.$nextTick(() => {
        this.createPoint()
      })
      
    }
  }
</script>

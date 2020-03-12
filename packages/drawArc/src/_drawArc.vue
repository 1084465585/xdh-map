<template>
  <xdh-map-draw ref="line" @drawend="drawend" @change="drawChange" @drawstart="drawstart"
  @modifystart="modifyStart" v-bind="$attrs"></xdh-map-draw>
</template>

<script>
  /**
   * 地图弧线描绘控件
   * @module xdh-map-draw-arc
   */ 
  // import { getArcLine } from 'utils/plot-utils'
  import {parseStyle} from '../../../packages'
  import Feature from 'ol/Feature' 
  import LineString from 'ol/geom/LineString'
  import { getArcLine } from 'utils/plot-utils'
  
  const handleLine = function () {
    return parseStyle({
      className: 'Style',
      stroke: {
        className: 'Stroke',
        color: 'red',
        width: 1
      }
    })
  }

  const ArcLine = function () {
    return parseStyle({
      className: 'Style',
      stroke: {
        className: 'Stroke',
        color: 'red',
        width: 3
      }
    })
  }

  export default {
    name: 'XdhMapDrawArc',
    mixins: [],
    components: { 
    },
    /**
     * 参数属性 
     * @member props
     */
    props: {
       

    },
    data() {
      return {
        handleLineStyle: handleLine(),
        ArcLineStyle: ArcLine(),
        currentArcLine: null,
        currentFeature: null,
        features: [] 
      }
    },
    computed: {
      
    },
    methods: {
      draw() {
        this.$refs.line.draw()
      },
      drawstart(e) {
        e.feature.setStyle(this.handleLineStyle)
        let id = `${new Date().getTime()}`
        e.feature.setId(`handle_${id}`)
        let path = e.feature.getGeometry().getCoordinates()
        this.addLine(...path) 
        this.currentFeature.setId(`arc_${id}`)
        
      },
      drawChange(e) { 
        // console.log('change')
        let path = e.target.getGeometry().getCoordinates() 
         
        if (path.length === 3) { 
          let arcPath = getArcLine(...path) 
          this.currentArcLine.setCoordinates(arcPath)
        } else {
          this.currentArcLine.setCoordinates(path)
        }
        // console.log(path)
        if (path.length === 4) {
          this.$refs.line.drawer.finishDrawing()
        }
      },
      drawend(e) {
    
        this.features.push(this.currentFeature)
        this.$emit('drawnd', this.currentFeature)
        this.currentArcLine = null
        this.currentFeature = null 

      },
      addLine(start, end) { 
        this.currentArcLine = new LineString([start, end])
        this.currentFeature = new Feature({
          geometry: this.currentArcLine
        })
        // this.currentFeature.setStyle(this.ArcLineStyle) 
        this.$refs.line.source.addFeature(this.currentFeature) 
      },
      finish() {
        if (!this.currentArcLine) {
          this.$refs.line.finish()
        } else { 
          let currentPath = this.currentArcLine.getCoordinates()
          console.log('path', currentPath)
          if (currentPath.length < 3) {
            this.$refs.line.source.removeFeature(this.currentFeature)

            this.currentArcLine = null
            this.currentFeature = null
            this.$refs.line.finish()
          }
        }
      },
      modify() {
        this.$refs.line.modify()
      },
      modifyStart(e) {
        console.log(e)
        console.log(e.features.getArray())
      }
    },
    created() {
       
    },
    beforeDestroy() {
       
    }
  }
</script>

<template>
  <xdh-map-placement class="xdh-map-scale"  >
    <div ref="xdhMapScale" class="xdh-map-scale__target"
         :style="scaleStyle"
    ></div>
  </xdh-map-placement>
</template>

<script>
  import {ScaleLine} from 'ol/control.js'
  import XdhMapPlacement from '../../placement'
  import {mixProps, getParent, mapReady} from 'utils/util'

  const vueProps = {
  }
  const props = mixProps({props: vueProps}, XdhMapPlacement)

  export default {
    name: 'XdhMapScale',
    components: {
      XdhMapPlacement
    },
    props: {
      units: {
        type: String,
        default: 'metric'
      },
      color: {
        type: String,
        default: 'black'
      },
      ...props
    },
    data() {
      return {
        
      }
    },
    computed: {
      scaleStyle() {
        return {
          'background': 'no-repeat',
          'background-image': `linear-gradient(90deg, ${this.color} 0, ${this.color} 2px),
                               linear-gradient(${this.color} 0, ${this.color} 100%),
                               linear-gradient(90deg, ${this.color} 0, ${this.color} 2px)`,
          'background-color': 'transparent',
          'background-size': `2px 4px, 100% 2px, 2px 4px`,
          'background-position': `0% 100%, 0% 100%, 100% 100%`
        }
      }
    },
    watch: {
      color(val) {
        this.$refs.xdhMapScale.querySelector('.ol-scale-line-inner').style.color = val
      }
    },
    methods: {
      ready(map, vm) {
        this.scaleLineControl = new ScaleLine({
          target: this.$refs.xdhMapScale,
          units: this.units
        })
        this.map = map
        this.map.addControl(this.scaleLineControl)
        this.$refs.xdhMapScale.querySelector('.ol-scale-line-inner').style.color = this.color
      }
    },
    created() {
      // 获取地图组件实例
      this.parent = getParent.call(this)
    },
    mounted() {
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      this.map.removeControl(this.scaleLineControl)
    }
  }
</script>

<style lang="scss" scope >
</style>


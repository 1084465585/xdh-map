<template>
  <xdh-map-placement class="xdh-map-scale" v-bind="$props"></xdh-map-placement>
</template>

<script>
  import {ScaleLine} from 'ol/control.js'
  import XdhMapPlacement from '../../placement'
  import {getParent, mapReady} from 'utils/util'


  export default {
    name: 'XdhMapScale',
    components: {
      XdhMapPlacement
    },
    props: {
      ...XdhMapPlacement.props,
      units: {
        type: String,
        default: 'metric'
      },
      margin: {
        type: Array,
        default() {
          return [10]
        }
      }
    },
    methods: {
      ready(map, vm) {
        this.map = map
        this.createScaleLine()
      },
      createScaleLine() {
        if (!this.map || this.scaleLineControl) return

        this.scaleLineControl = new ScaleLine({
          target: this.$el,
          units: this.units
        })
        this.map.addControl(this.scaleLineControl)
      }
    },
    created() {
      // 获取地图组件实例
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      if (this.map && this.scaleLineControl) {
        this.map.removeControl(this.scaleLineControl)
      }
    }
  }
</script>


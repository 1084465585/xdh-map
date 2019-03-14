<template>
  <xdh-map-placement class="xdh-map-scale" v-bind="$props"></xdh-map-placement>
</template>

<script>
  /**
   * 比例尺控件
   */
  import {ScaleLine} from 'ol/control.js'
  import XdhMapPlacement from '../../placement'
  import {getParent, mapReady} from 'utils/util'


  export default {
    name: 'XdhMapScale',
    components: {
      XdhMapPlacement
    },
    /**
     * 参数属性
     * @member props
     * @property {string} [placement] 停泊位置，可选值'left-top', 'center-top', 'right-top'，'left-center', 'center-center', 'right-center''left-bottom', 'center-bottom', 'right-bottom'
     * @property {number} [zIndex=1] 层级
     * @property {number[]} [margin] 外边距
     * @property {string[]} [theme] 主题 可选值 'default', 'light', 'dark'
     * @property {string} [units=metric] 单位
     * @property {number[]} [margin] 外边距
     */
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
    },
    mounted() {
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      if (this.map && this.scaleLineControl) {
        this.map.removeControl(this.scaleLineControl)
      }
    }
  }
</script>


<template>
  <xdh-map-placement class="xdh-map-zoom" v-bind="$props">
    <span class="xdh-map-zoom__btn" @click="zoomIn"><i class="iconfont icon-add"></i></span>
    <span class="xdh-map-zoom__split"></span>
    <span class="xdh-map-zoom__btn" @click="zoomOut"><i class="iconfont icon-remove"></i></span>
  </xdh-map-placement>
</template>

<script>
  /**
   * 缩放控件
   * @module xdh-map-zoom
   */
  import XdhMapPlacement from '../../placement'
  import {getParent} from 'utils/util'

  export default {
    name: 'XdhMapZoom',
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
     */
    props: {
      ...XdhMapPlacement.props,
      theme: {
        type: String,
        default: 'light'
      }
    },
    methods: {
      zoomIn() {
        if (this.parent) {
          this.parent.zoomIn()
        }
      },
      zoomOut() {
        if (this.parent) {
          this.parent.zoomOut()
        }
      }
    },
    created() {
      // 获取地图组件实例
      this.parent = getParent.call(this)
    }
  }
</script>

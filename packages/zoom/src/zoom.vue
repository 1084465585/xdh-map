<template>
  <xdh-map-placement class="xdh-map-zoom" v-bind="$props">
    <span class="xdh-map-zoom__btn" @click="zoomIn"><i class="iconfont icon-add"></i></span>
    <span class="xdh-map-zoom__split"></span>
    <span class="xdh-map-zoom__btn" @click="zoomOut"><i class="iconfont icon-remove"></i></span>
  </xdh-map-placement>
</template>

<script>
  import XdhMapPlacement from '../../placement'
  import {getParent} from 'utils/util'

  export default {
    name: 'XdhMapZoom',
    components: {
      XdhMapPlacement
    },
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

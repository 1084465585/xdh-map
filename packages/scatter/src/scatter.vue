<template>
  <xdh-map-html class="xdh-map-scatter" v-bind="$props" positioning="center-center">
    <div class="scatter-effect xdh-map-scatter__outer" :style="styles"></div>
    <div class="scatter-effect xdh-map-scatter__mid" :style="styles"></div>
    <div class="xdh-map-scatter__inner" @click="handleClick" :style="styles"></div>
  </xdh-map-html>
</template>

<script>
  /**
   * 水波涟漪动画组件
   * @module xdh-map-scatter
   */
  import XdhMapHtml from '../../html'
  import {getParent} from 'utils/util'

  export default {
    name: 'XdhMapScatter',
    components: {
      XdhMapHtml
    },
    /**
     * 参数属性
     * @member props
     * @property {number[]} position 经纬度
     * @property {number[]} [offset] 位置偏移
     * @property {boolean} [stopEvent] 是否阻止时间冒泡，默认 true
     * @property {boolean} [insertFirst]
     * @property {string} [color=red] 颜色
     */
    props: {
      ...XdhMapHtml.props,
      color: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      styles() {
        return {
          background: this.color
        }
      }
    },
    methods: {
      handleClick() {
        this.$emit('click', this)
      }
    },
    created() {
      this.parent = getParent.call(this)
    }
  }
</script>

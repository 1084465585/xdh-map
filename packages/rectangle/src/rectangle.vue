<template>
  <xdh-map-polygon ref="polygon" v-bind="$props" :coordinates="coords" @draw="handleDraw"></xdh-map-polygon>
</template>

<script>

  /**
   * 矩形覆盖物
   * @module xdh-map-rectangle
   *
   */

  import XdhMapPolygon from '../../polygon/src/polygon'
  import CleanMixin from 'utils/mixins/clean'
  import {mixProps} from 'utils/util'

  /**
   *
   * 参数属性
   * @member props
   * @property {number[]} position 矩形左上角经纬度
   * @property {number} width 宽度经纬度距离
   * @property {number} height 高度经纬度距离
   * @property {number} [zIndex] 渲染层级
   * @property {string} [fill] 填充颜色
   * @property {string} [cursor] 鼠标经过时形状
   * @property {number} [strokeWidth] 边框厚度
   * @property {string} [strokeColor] 边框颜色
   * @property {string} [strokeLineCap] 虚线样式
   * @property {string} [strokeLineJoin] 虚线样式
   * @property {number[]} [strokeLineDash] 虚线样式
   * @property {number} [strokeLineDashOffset]
   * @property {number} [strokeMiterLimit]
   * @property {string} [text] 文本内容
   * @property {string} [color] 文本颜色
   * @property {string} [font] 字体大小，如 20px
   * @property {string} [background] 字体背景颜色
   */

  const vueProps = {
    // 宽度经纬度距离
    width: {
      type: Number,
      default: 0,
      required: true
    },
    // 高度经纬度距离
    height: {
      type: Number,
      default: 0,
      required: true
    }
  }
  export const props = mixProps({props: vueProps}, XdhMapPolygon)
  // 矩形不需要 coordinates
  delete props.coordinates

  // 左上角为开始点
  export default {
    name: 'XdhMapRectangle',
    mixins: [CleanMixin],
    components: {
      XdhMapPolygon
    },
    props: props,
    computed: {
      coords() {
        const loc = (this.$attrs.position || []).map(n => Number.parseFloat(n))
        return [
          loc,
          [loc[0] + this.width, loc[1]],
          [loc[0] + this.width, loc[1] - this.height],
          [loc[0], loc[1] - this.height],
          loc
        ]
      }
    },
    methods: {
      handleDraw(feature) {
        this.feature = feature
      }
    }
  }
</script>

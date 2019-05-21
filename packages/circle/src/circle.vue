<template>
  <div></div>
</template>

<script>

  /**
   * 圆形覆盖物
   * @module xdh-map-circle
   *
   */
  import Circle from 'ol/geom/Circle'
  import {featureStyleRender, mixProps} from 'utils/util'
  import FeatureMixin from 'utils/mixins/feature'
  import BaseMixin from 'utils/mixins/base'
  import StrokeMixin from 'utils/mixins/stroke'
  import TextMixin from 'utils/mixins/text'
  import CleanMixin from 'utils/mixins/clean'

  /**
   *
   * 参数属性
   * @member props
   * @property {number[]} position 矩形左上角经纬度
   * @property {number} radius 半径经纬度距离
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
    // 半径
    radius: {
      type: Number,
      required: true
    }
  }

  export const props = mixProps({props: vueProps}, BaseMixin, StrokeMixin, TextMixin)
  export default {
    name: 'XdhMapCircle',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin, CleanMixin],
    props: props,
    watch: {
      radius() {
        this.update()
      }
    },
    methods: {
      createStyle() {
        return featureStyleRender.call(this)
      },
      createGeometry() {
        return new Circle(this.coordinate, this.radius)
      }
    }
  }
</script>

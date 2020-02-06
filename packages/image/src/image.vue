<template>
  <div></div>
</template>

<script>
  /**
   * 图片覆盖物组件
   * @module xdh-map-image
   */
  import Point from 'ol/geom/Point'
  import {mixProps} from 'utils/util'
  import {parse} from 'utils/style'
  import FeatureMixin from 'utils/mixins/feature'
  import BaseMixin from 'utils/mixins/base'
  import StrokeMixin from 'utils/mixins/stroke'
  import TextMixin from 'utils/mixins/text'
  import factory from 'utils/mixins/factory'
  import CleanMixin from 'utils/mixins/clean'

  /**
   * 参数选项
   * @member props
   * @property {number[]} [anchor] 位置偏移
   * @property {string} [crossOrigin]
   * @property {number} [opacity] 透明度
   * @property {number} [scale] 缩放
   * @property {Boolean} [rotateWithView] 缩放
   * @property {number} [rotation] 旋转
   * @property {src} [src] 图片资源
   * @property {number} [zIndex] 渲染层级
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
  const options = {
    anchor: Array,
    crossOrigin: String,
    offset: Array,
    opacity: Number,
    scale: Number,
    rotateWithView: Boolean,
    rotation: Number,
    src: String
  }
  const factoryMixin = factory(options)

  export const props = mixProps(BaseMixin, StrokeMixin, TextMixin, factoryMixin)

  export default {
    name: 'XdhMapImage',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin, factoryMixin, CleanMixin],
    props: props,
    watch: {
      anchor(value) { this.redraw() },
      crossOrigin(value) { this.redraw() },
      offset(value) { this.redraw() },
      opacity(value) { this.redraw() },
      scale(value) { this.redraw() },
      rotateWithView(value) { this.redraw() },
      rotation(value) { this.redraw() },
      src(value) { this.redraw() }
      // radius(value) { this.redraw() }
    },
    methods: {
      createStyle() {
        return parse({
          ...this.baseStyleRender(),
          image: {
            className: 'Icon',
            ...this.styleFactory()
          }
        })
      },
      createGeometry() {
        return new Point(this.coordinate)
      }
    }
  }
</script>

<template>
  <div class="xdh-map-text hidden"></div>
</template>

<script>
  /**
   * 文本覆盖物组件
   * @module xdh-map-text
   * @description 父组件必须是 xdh-map
   * @example
   * <xdh-map>
   *    <xdh-map-text :position="[120, 30]"
   *                  text="文字"></xdh-map-text>
   * </xdh-map>
   *  import {XdhMap, XdhMapText} from 'xdh-map'
   *  export default {
   *    components: {
   *      XdhMap,
   *      XdhMapText
   *    }
   *  }
   */
  import {parse} from 'utils/style'
  import Point from 'ol/geom/Point'
  import FeatureMixin from 'utils/mixins/feature'
  import BaseMixin from 'utils/mixins/base'
  import StrokeMixin from 'utils/mixins/stroke'
  import TextMixin from 'utils/mixins/text'
  import CleanMixin from 'utils/mixins/clean'
  import factory from 'utils/mixins/factory'
  import {mixProps} from 'utils/util'

  /**
   * 参数选项
   * @member props
   * @property {number[]} position 经纬度位置
   * @property {number} [zIndex] 渲染层级
   * @property {string} [cursor] 鼠标经过时形状
   * @property {number} [maxAngle] 最大旋转角度
   * @property {number} [offsetX] 位置偏移
   * @property {number} [offsetY] 位置偏移
   * @property {boolean} [overflow]
   * @property {number} [scale]
   * @property {boolean} [rotateWithView]
   * @property {number} [rotation]
   * @property {string} [textAlign]
   * @property {string} [textBaseline]
   * @property {number[]} [padding]
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
    maxAngle: Number,
    offsetX: Number,
    offsetY: Number,
    overflow: Boolean,
    scale: Number,
    rotateWithView: Boolean,
    rotation: Number,
    textAlign: String,
    textBaseline: String,
    padding: Array
  }
  const factoryMixin = factory(options)

  const vueProps = {
    // 经纬度坐标
    position: {
      type: Array,
      required: true
    }
  }

  export const props = mixProps(BaseMixin, StrokeMixin, TextMixin, factoryMixin, {props: vueProps})

  export default {
    name: 'XdhMapText',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin, factoryMixin, CleanMixin],
    props: props,
    methods: {
      createStyle() {
        return parse({
          ...this.baseStyleRender(),
          text: {
            ...this.textRender(),
            backgroundStroke: this.strokeRender(),
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

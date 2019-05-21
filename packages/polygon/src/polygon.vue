<template>
  <div></div>
</template>

<script>
/**
 * 多边形覆盖物组件
 * @module xdh-map-polygon
 */

import Polygon from 'ol/geom/Polygon'
import { featureStyleRender, mixProps } from 'utils/util'
import FeatureMixin from 'utils/mixins/feature'
import BaseMixin from 'utils/mixins/base'
import StrokeMixin from 'utils/mixins/stroke'
import TextMixin from 'utils/mixins/text'
import CleanMixin from 'utils/mixins/clean'
import { convertToWgs84 } from 'utils/convert'
/**
 *
 * 参数属性
 * @member props
 * @property {Array[]} coordinates 经纬度数组，是一个二维数组，必须三个点以上，首尾的点要相同, 才能构成多边形
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
  // 坐标数组
  coordinates: {
    type: Array,
    default() {
      return []
    }
  }
}

export const props = mixProps(
  { props: vueProps },
  BaseMixin,
  StrokeMixin,
  TextMixin
)

// 多边形不需要 position 参数
delete props.position

export default {
  name: 'XdhMapPolygon',
  mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin, CleanMixin],
  props: props,
  watch: {
    coordinates() {
      this.update()
    }
  },
  methods: {
    createStyle() {
      return featureStyleRender.call(this)
    },
    createGeometry() {
      return new Polygon([
        this.coordinates.map(pos => {
          return convertToWgs84(
            this.coordType,
            pos.map(n => Number.parseFloat(n))
          )
        })
      ])
    }
  }
}
</script>

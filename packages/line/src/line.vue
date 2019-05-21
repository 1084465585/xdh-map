<template>
  <div></div>
</template>

<script>
/**
 * 线条覆盖物组件
 * @module xdh-map-line
 *
 */
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import { featureStyleRender, mixProps } from 'utils/util'
import FeatureMixin from 'utils/mixins/feature'
import BaseMixin from 'utils/mixins/base'
import StrokeMixin from 'utils/mixins/stroke'
import TextMixin from 'utils/mixins/text'
import CleanMixin from 'utils/mixins/clean'
import { parse } from 'utils/style'
import { convertToWgs84 } from 'utils/convert'
const defaultArrow = require('sources/arrows/black.png')

/**
 * 参数属性
 * @member props
 * @property {array[]} routes 点经纬度坐标，是一个维数组
 * @property {string | boolean} [arrow] 箭头图片url，true为采用默认的黑色箭头，false不要箭头
 * @property {number[]} [arrowAnchor] 箭头位置偏移
 * @property {boolean} [arrowEach] 是否每段线条都加箭头
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
const vueProps = {
  // 坐标数组
  routes: {
    type: Array,
    default() {
      return []
    }
  },
  // 箭头图片url
  arrow: {
    type: [String, Boolean],
    default: false
  },
  // 箭头位置偏移
  arrowAnchor: {
    type: Array,
    default() {
      return [0.75, 0.5]
    }
  },
  // 每段线条都加箭头
  arrowEach: {
    type: Boolean
  }
}

const props = mixProps({ props: vueProps }, BaseMixin, StrokeMixin, TextMixin)

// 线条形不需要 position 参数
delete props.position

export default {
  name: 'XdhMapLine',
  mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin, CleanMixin],
  props: props,
  watch: {
    routes() {
      this.update()
    }
  },
  methods: {
    arrowStyle(start, end) {
      const dx = end[0] - start[0]
      const dy = end[1] - start[1]
      const rotation = Math.atan2(dy, dx)
      return parse({
        className: 'Style',
        geometry: new Point(end),
        image: {
          className: 'Icon',
          src: this.arrow === true ? defaultArrow : this.arrow,
          anchor: this.arrowAnchor,
          rotateWithView: true,
          rotation: -rotation
        }
      })
    },
    lastSegment() {
      const length = this.routes.length
      if (length >= 2) {
        return this.arrowStyle(this.routes[length - 2], this.routes[length - 1])
      }
    },
    createStyle() {
      const feature = this.feature
      const geometry = feature.getGeometry()
      let styles = [featureStyleRender.call(this)]
      if (this.arrow) {
        if (this.arrowEach) {
          geometry.forEachSegment((start, end) => {
            styles.push(this.arrowStyle(start, end))
          })
        } else {
          styles.push(this.lastSegment())
        }
      }
      return styles
    },
    createGeometry() {
      return new LineString(
        this.routes.map(pos => {
          return convertToWgs84(
            this.coordType,
            pos.map(n => Number.parseFloat(n))
          )
        })
      )
    }
  }
}
</script>

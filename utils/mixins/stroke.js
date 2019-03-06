import {prefix, mix} from '../util';

/**
 *
 * @property {number} [strokeWidth] 边框厚度
 * @property {string} [strokeColor] 边框颜色
 * @property {string} [strokeLineCap] 虚线样式
 * @property {string} [strokeLineJoin] 虚线样式
 * @property {number[]} [strokeLineDash] 虚线样式
 * @property {number} [strokeLineDashOffset]
 * @property {number} [strokeMiterLimit]
 *
 */

const options = {
  // 边框颜色
  color: {
    type: String,
    default: 'transparent'
  },
  lineCap: {
    type: String,
    default: 'round'
  },
  lineJoin: {
    type: String,
    default: 'round'
  },
  lineDash: Array,
  lineDashOffset: Number,
  miterLimit: Number,
  width: Number
}

const prefixOptions = prefix('stroke', options)
export default {
  props: {
    ...prefixOptions
  },
  methods: {
    strokeRender() {
      return {
        className: 'Stroke',
        ...mix(this, 'stroke', options)
      }
    }
  }
}

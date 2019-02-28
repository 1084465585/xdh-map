import {prefix, mix} from '../util';

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

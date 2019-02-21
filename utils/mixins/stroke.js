import {prefix, mix} from '../util';

const options = {
  color: {
    type: String,
    default: 'transparent'
  },
  lineCap: String,
  lineJoin: String,
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

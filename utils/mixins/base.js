/**
 *  Vue组件公共参数
 */
export default {
  props: {
    zIndex: Number,
    fill: String
  },
  methods: {
    baseStyleRender() {
      return {
        className: 'Style',
        zIndex: this.zIndex,
        fill: this.fill
      }
    }
  }
}

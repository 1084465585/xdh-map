/**
 *  Vue组件公共参数
 */
export default {
  props: {
    // 经纬度坐标
    position: Array,
    // 层级
    zIndex: Number,
    // 填充颜色
    fill: String
  },
  watch: {
    position: {
      deep: true,
      handler() {
        // 方法在 utils/feature.js 中定义
        this.update()
      }
    }
  },
  computed: {
    coordinate() {
      // 转换坐标的数组类型
      return this.position.map(n => Number.parseFloat(n))
    }
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

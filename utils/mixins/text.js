/**
 * 文本公共属性
 */
export default {
  /**
   * @property {string} [text] 文本内容
   * @property {string} [color] 文本颜色
   * @property {string} [font] 字体大小，如 20px
   * @property {string} [background] 字体背景颜色
   */
  props: {
    text: String,
    color: String,
    font: String,
    background: {
      type: String,
      default: 'transparent'
    }
  },
  computed: {
    fontWithFamily() {
      return `${this.font} sans-serif`
    }
  },
  watch: {
    /**
     * 文本变化更新图形样式
     */
    text() {
      this.setStyle()
    }
  },
  methods: {
    textRender() {
      return {
        className: 'Text',
        text: this.text,
        font: this.fontWithFamily,
        fill: {
          className: 'Fill',
          color: this.color
        },
        backgroundFill: {
          className: 'Fill',
          color: this.background
        }
      }
    }
  }
}

/**
 * 文本公共属性
 */
export default {
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

export default {
  mounted() {
    // 组件不需要生成html节点
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
      this.$el = null
    }
    
  }
}

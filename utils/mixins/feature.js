import Feature from 'ol/Feature'

export default {
  methods: {
    draw() {
      // createStyle 方法由父类实现
      const style = this.createStyle()
      
      // createGeometry 方法由父类实现
      const geometry = this.createGeometry()
      this.feature = new Feature(geometry)
      this.feature.setStyle(style)
      // 在图层上画图形
      if (this.$parent && this.$parent.addFeature) {
        this.$parent.addFeature(this.feature)
        this.$parent.bindEvents(this)
      }
    },
    update() {
      if (!this.feature) return
      
      const geometry = this.createGeometry()
      // 更新图形
      this.feature.setGeometry(geometry)
    }
  },
  mounted() {
    // 文本组件不需要生成html节点
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    
    // 先检查父组件的地图是否初始化完成
    if (this.$parent && this.$parent.map) {
      this.draw()
      return
    }
    // 父组件地图未初始化，侦听完成事件
    this.$parent.$on('ready', map => {
      this.draw()
    })
    
  },
  beforeDestroy() {
    if (this.$parent && this.$parent.removeFeature && this.feature) {
      this.$parent.removeFeature(this.feature)
      this.$parent.unbindEvents(this)
    }
  }
  
}

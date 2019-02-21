import Feature from 'ol/Feature'

export default {
  methods: {
    draw() {
      // createGeometry 方法由父类实现
      const geometry = this.createGeometry()
      this.feature = new Feature(geometry)
      this.setStyle()
      // 在图形实例记录当前vue组件的实例引用，方便从事件中取会vue组件实例
      this.feature._vm = this
      // 在图层上画图形
      if (this.$parent && this.$parent.addFeature) {
        this.$parent.addFeature(this.feature)
        this.$parent.bindEvents(this)
      }
      // 绘制完成事件
      this.$emit('draw', this.feature)
    },
    update() {
      if (!this.feature) return
      
      const geometry = this.createGeometry()
      // 更新图形
      this.feature.setGeometry(geometry)
      
      // 更新完成事件
      this.$emit('update', this.feature)
    },
    setStyle() {
      // createStyle 方法由父类实现
      const style = this.createStyle()
      this.feature.setStyle(style)
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
      this.feature._vm = null
      this.$parent.removeFeature(this.feature)
      this.$parent.unbindEvents(this)
    }
  }
  
}

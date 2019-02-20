<template>
  <div class="xdh-map-circle hidden"></div>
</template>
<script>
import Feature from 'ol/Feature'
import {parse} from '../../../utils/Style'
import Point from 'ol/geom/Point'


export default {
  name: 'XdhMapCircle',
  props: {
    // 经纬度坐标
    loc: {
      type: Array,
      required: true
    },
    // 空心圆（接受布尔值 和 object 配置项）
    onlyStroke: {
      default: false
    },
    // 圆边宽度
    strokeWidth: {
      type: Number,
      default: 3
    },
    // 背景 及 圆边颜色
    color: {
      type: String,
      default: 'red'
    },
    // 半径
    radius: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      feature: null
    }
  },
  computed: {
    coordinate() {
      // 转换坐标的数组类型
      return this.loc.map(n => Number.parseFloat(n))
    }

  },
  watch: {
    // 监听直径
    radius() {
      this.styleReset()
    },
    // 监听区域
    loc() {
      this.update()
    }
  },
  methods: {
    getStyle() {
      const circle = {
        className: 'Circle',
        radius: this.radius
      }
      if (!this.onlyStroke) {
        Object.assign(circle, {
          fill: {
            className: 'Fill',
            color: this.color
          }
        })
      } else {
        if (typeof this.onlyStroke === 'object') {
          Object.assign(circle, {
            stroke: {
              className: 'Stroke',
              color: this.color,
              width: this.strokeWidth,
              ...this.onlyStroke
            }
          })
        } else {
          Object.assign(circle, {
            stroke: {
              className: 'Stroke',
              color: this.color,
              width: this.strokeWidth
            }
          })
        }
      }
      return parse({
        className: 'Style',
        image: circle
      })
    },
    draw() {
      const style = this.getStyle()
      this.feature = new Feature({
        geometry: new Point(this.coordinate)
      })
      this.feature.setStyle(style)
      // 在图层上画图形
      if (this.$parent && this.$parent.addFeature) {
        this.$parent.addFeature(this.feature)
        this.$parent.bindEvents(this)
      }
    },
    // 位置更新函数
    update() {
      if (!this.feature) return
      this.feature.setGeometry(new Point(this.coordinate))
    },
    // 样式更新函数
    styleReset() {
      const style = this.getStyle()
      this.feature.setStyle(style)
    }
  },
  mounted() {
    // 删除本组件的html节点
    this.$el.parentNode.removeChild(this.$el)
    
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
</script>
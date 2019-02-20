<template>
  <div class="xdh-map-text hidden"></div>
</template>

<script>
  import Feature from 'ol/Feature'
  import Point from 'ol/geom/Point'
  import {parse} from '../../../utils/Style'

  export default {
    name: 'XdhMapText',
    props: {
      // 经纬度坐标
      loc: {
        type: Array,
        required: true
      },
      // 文本内容
      content: {
        type: String
      },
      // 字体
      font: {
        type: String,
        default: '14px'
      },
      // 文本样式
      color: {
        type: String,
        default: '#333'
      },
      // 背景颜色
      background: {
        type: String,
        default: 'transparent'
      },
      // 边框颜色
      border: {
        type: String,
        default: 'transparent'
      },
      // 内边距
      padding: {
        type: Array,
        default() {
          return [2, 2, 2, 2]
        }
      },
      // 位置偏移
      offset: {
        type: Array,
        default() {
          return [0, 0]
        }
      }
    },
    computed: {
      fullFont() {
        return `${this.font} sans-serif`
      },
      coordinate() {
        // 转换坐标的数组类型
        return this.loc.map(n => Number.parseFloat(n))
      }
    },
    watch: {
      /**
       * 文本变化更新图形样式
       */
      content() {
        const style = this.getStyle()
        this.feature && this.feature.setStyle(style)
      },
      /**
       * 坐标变化需要更新位置
       */
      loc() {
        this.update()
      }
    },
    methods: {
      getStyle() {
        return parse({
          className: 'Style',
          text: {
            className: 'Text',
            text: this.content,
            font: this.fullFont,
            fill: {
              className: 'Fill',
              color: this.color
            },
            backgroundFill: {
              className: 'Fill',
              color: this.background
            },
            backgroundStroke: {
              className: 'Stroke',
              color: this.border
            },
            padding: this.padding,
            offsetX: this.offset[0],
            offsetY: this.offset[1]
          }
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
      update() {
        if (!this.feature) return

        // 更新经纬度
        this.feature.setGeometry(new Point(this.coordinate))
      }
    },
    mounted() {
      // 文本组件不需要生成html节点
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

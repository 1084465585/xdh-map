<template>
  <div></div>
</template>

<script>
/**
 * 轨迹动画组件
 * @module xdh-map-track
 */
import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import { parse } from 'utils/style'
import { GreatCircle } from 'utils/plugins/Arc'
import { getParent, mapReady } from 'utils/util'
import CleanMixin from 'utils/mixins/clean'
import { convertToWgs84 } from 'utils/convert'
export default {
  name: 'XdhMapTrack',
  mixins: [CleanMixin],
  /**
   * 参数属性
   * @member props
   * @property {array[]} routes 线坐标数组
   * @property {string} src 图标图片资源
   * @property {number} [steps=200] 两点之间移动次数，值越大，速度越慢
   * @property {boolean} [loop=true] 是否循环动画
   * @property {boolean} [auto=true] 是否自动播放动画
   */
  props: {
    // 线坐标数组
    routes: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    // 图标图片资源
    src: {
      type: String
    },
    // 两点之间移动次数，值越大，速度越慢
    steps: {
      type: Number,
      default: 200
    },
    // 是否循环动画
    loop: {
      type: Boolean,
      default: true
    },
    // 是否自动播放动画
    auto: {
      type: Boolean,
      default: true
    }
  },
  inject: ['coordType'],
  data() {
    return {
      // 轨迹移动进度
      progress: 0,
      // 动画状态是否暂停
      pause: false
    }
  },
  computed: {
    // 分步完成轨迹动画，计算需要走几步
    stepRoutes() {
      let routes = []
      // 根据坐标类型对坐标进行转换
      let convertRoutes = this.routes.map(n => {
        return convertToWgs84(this.coordType, n)
      })
      convertRoutes.forEach((route, index) => {
        if (index > 0) {
          const prev = convertRoutes[index - 1]
          const gen = new GreatCircle(
            { x: prev[0], y: prev[1] },
            { x: route[0], y: route[1] }
          )
          const arcLine = gen.Arc(this.steps, { offset: 0 })
          // 两段线中间有重复的点，要删除第一个
          routes = routes.concat(arcLine.geometries[0].coords.slice(1))
        } else {
          routes.push(route)
        }
      })
      return routes
    },
    // 总步数
    totalSteps() {
      return this.stepRoutes.length
    }
  },
  methods: {
    /**
     * 开始动画
     */
    start() {
      this.pause = false
      /**
       * 开始动画时触发
       * @event start
       * @param {array[]} stepRoutes 动画步骤
       * @param {number} progress 当前进度
       * @param {number} rotation 旋转角度
       */
      this.$emit('start', this.stepRoutes, this.progress, 0)
      this.move()
    },
    /**
     * 停止动画
     */
    stop() {
      this.pause = true
      /**
       * 停止动画时触发
       * @event stop
       * @param {array[]} stepRoutes 动画步骤
       * @param {number} progress 当前进度
       * @param {number} rotation 旋转角度
       */
      this.$emit('stop', this.stepRoutes, this.progress, 0)
    },
    /**
     * 移动图标，完成动画
     */
    move() {
      if (this.pause) return

      ++this.progress
      // 运动到最后
      if (this.progress >= this.totalSteps - 1) {
        // 自动循环
        if (this.loop) {
          this.progress = 0
          requestAnimationFrame(this.move)
        }
      } else {
        const route = this.stepRoutes[this.progress]
        const next = this.stepRoutes[this.progress + 1]
        const dx = route[0] - next[0]
        const dy = route[1] - next[1]
        const rotation = Math.atan2(dy, dx)
        // 如果不设置图片资源，不创建图形，只触发动画事件
        if (this.src) {
          const style = this.createStyle(rotation)
          const geometry = new Point(route)
          this.feature.setGeometry(geometry)
          this.feature.setStyle(style)
          this.feature._vm = this
        }
        /**
         * 动画执行时触发
         * @event move
         * @param {array[]} stepRoutes 动画步骤
         * @param {number} progress 当前进度
         * @param {number} rotation 旋转角度
         */
        this.$emit('move', this.stepRoutes, this.progress, rotation)
        requestAnimationFrame(this.move)
      }
    },
    createStyle(rotation) {
      return parse({
        className: 'Style',
        image: {
          className: 'Icon',
          src: this.src,
          rotateWithView: false,
          rotation: -rotation
        }
      })
    },

    ready(map) {
      this.map = map
      // 轨迹动画至少需要有两个点
      if (this.routes.length < 2) return

      const route = this.routes[0]
      const next = this.routes[1]
      const dx = route[0] - next[0]
      const dy = route[1] - next[1]
      const rotation = Math.atan2(dy, dx)
      if (this.src) {
        const style = this.createStyle(rotation)
        const point = new Point(route)
        this.feature = new Feature(point)
        this.feature.setStyle(style)
        this.parent.addFeature(this.feature)
      }
      this.auto && this.start()
    }
  },
  created() {
    this.parent = getParent.call(this)
    mapReady.call(this, this.ready)
  },
  beforeDestroy() {
    if (this.parent && this.feature) {
      this.parent.removeFeature(this.feature)
    }
  }
}
</script>

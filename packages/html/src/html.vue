<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-02 20:57:42
 * @LastEditTime: 2019-09-22 12:38:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="xdh-map-html" v-on="overlayListeners()">
    <slot></slot>
  </div>
</template>

<script>
/**
 * HTML覆盖物组件
 * @module xdh-map-html
 */
import { mapReady, getParent } from 'utils/util'
import Overlay from 'ol/Overlay'
import { convertToWgs84 } from 'utils/convert'

/**
 * 插槽
 * @member slots
 * @property {string} [default] 默认插槽，定义 html 内容
 */

export default {
  name: 'XdhMapHtml',
  /**
   * 参数属性
   * @member props
   * @property {string} [positioning] 经纬度对齐位置，默认 center-center
   * @property {number[]} position 经纬度
   * @property {number[]} [offset] 位置偏移
   * @property {boolean} [stopEvent] 是否阻止时间冒泡，默认 true
   * @property {boolean} [insertFirst]
   * @property {string} [className]
   * @property {string} [visible] 切换显示隐藏（作用于html元素的 父级overlay）
   */
  props: {
    positioning: {
      type: String,
      default: 'center-center',
      validator(val) {
        return [
          'bottom-left',
          'bottom-center',
          'bottom-right',
          'center-left',
          'center-center',
          'center-right',
          'top-left',
          'top-center',
          'top-right'
        ].includes(val)
      }
    },
    // 显示位置
    position: Array,
    // 位置偏移
    offset: Array,
    // 是否阻止时间冒泡，默认 true
    stopEvent: {
      type: Boolean,
      default: true
    },
    insertFirst: Boolean,
    // CSS class name
    className: String,
    // 切换显示隐藏
    visible: Boolean,
    // OverlayId
    id: String
  },
  inject: ['coordType'],
  data() {
    return {
      parentNode: null,
      overlay: null
    }
  },
  watch: {
    position() {
      this.show()
    },
    visible(val) {
      if (this.parentNode) {
        this.parentNode.style.display = val ? 'block' : 'none'
      }
    }
  },
  methods: {
    addOverlay(map) {
      const options = this.$props
      options.element = this.$el
      this.overlay = new Overlay(
        Object.assign({}, options, {
          position: convertToWgs84(this.coordType, this.position)
        })
      )
      map.addOverlay(this.overlay)
      this.$nextTick(() => {
        this.parentNode = this.$el.parentNode
      })
    },
    show(position) {
      let pos = position || this.position
      this.overlay &&
        this.overlay.setPosition(convertToWgs84(this.coordType, pos))
    },
    hide() {
      this.overlay && this.overlay.setPosition(null)
    },
    overlayListeners() {
      let vm = this
      let obj = Object.assign({}, vm.$listeners)
      for (let key in obj) {
        obj[key] = obj[key].bind(vm, vm, vm.overlay, ...arguments)
      }
      return obj
    }
  },
  created() {
    this.parent = getParent.call(this)
  },
  mounted() {
    mapReady.call(this, this.addOverlay)

    
  },
  beforeDestroy() {
    if (this.overlay && this.parent) {
      this.parent.map.removeOverlay(this.overlay)
    }
  }
}
</script>

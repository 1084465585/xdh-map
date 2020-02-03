<template>
<div :class="classNames" ref="target">
</div>
</template>
<style lang="scss" scope>
.xdh-zoom-tools{
  position: absolute;
  &.left-top{
    top: 10px;
    left: 10px;
  }
  &.right-top{
    top: 10px;
    right: 10px;
  }
  &.left-bottom{
    bottom: 10px;
    left: 10px;
  }
  &.right-bottom{
    bottom: 10px;
    right: 10px;
  }
}
</style>
<script>
/**
 * 缩放控件
 * @module xdh-map-zoom
 */
import '../../../theme/zoom.scss';
import {ZoomSlider, Zoom} from 'ol/control'
import Control from 'ol/control/Control';
import {getParent} from 'utils/util'
export default {
  name: 'XdhMapZoom',
   /**
   * 参数属性
   * @member props
   * @property {string} [placement] 停泊位置，可选值'left-top', 'right-top', 'left-bottom', 'right-bottom'
   * @property {string} [theme] 主题 可选值 'light'(默认), 'dark'
   * @property {string | boolean} [slider] 是否显示拖动条，‘inside’ 表示将滚动条显示在 zoom 内部
   * @property {boolean} [horizonta] 纵向还是横向显示
   */
  props: {
    // 停泊位置
    placement: {
      type: String,
      default: 'left-top',
      validator(val) {
        return [
          'left-top', 'right-top', 'left-bottom', 'right-bottom'
        ].includes(val)
      }
    },
    theme: {
      type: String,
      default: 'light',
      validator(val) {
        return [
          'light', 'dark'
        ].includes(val)
      }
    },
    slider: {
      type: [Boolean, String],
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      parent: null,
      map: null
    }
  },
  computed: {
    classNames() {
      let defaultName = 'xdh-zoom-tools'
      let sliderClass = ''
      let horizontal = this.horizontal ? 'horizontal' : ''
      if (typeof this.slider === 'string' && this.slider === 'inside') {
        sliderClass = 'show-slider-inside'
      } else {
        sliderClass = this.slider ? 'show-slider' : ''
      }

      let output = [defaultName, this.placement, `is-${this.theme}`]
      if (horizontal) {
        output.push(horizontal)
      }
      if (sliderClass) {
        output.push(sliderClass)
      }
      return output
    }
  },
  methods: {
    zoomInit() {
      this.map = this.parent.map
       
      let control = new Control({ 
        element: this.$refs.target
      }) 
      let zoomslider = new ZoomSlider({
        target: this.$refs.target,
        className: 'xdh-zoom-slider'
      });
      let zoom = new Zoom({
        target: this.$refs.target,
        className: 'xdh-zoom'
      })
      zoomslider.setTarget(this.$refs.target)
      this.map.addControl(control);
      this.map.addControl(zoom);
      this.map.addControl(zoomslider);
    }
  },
  created() {
    // 获取地图组件实例
    this.parent = getParent.call(this)
  },
  mounted() {
    this.$nextTick(() => {
      this.zoomInit()
    })
  }
}
</script>
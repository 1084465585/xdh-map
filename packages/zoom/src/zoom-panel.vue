<template>
<div :class="classNames" ref="target">
</div>
</template>
<style lang="scss" scope>
.xdh-zoom-panel{
  box-sizing: border-box;
  position: absolute;
  background: rgba(255,255,255,0.8);
  border-radius: 5px;
  box-shadow: 0 0 4px 1px rgba(95, 100, 119, 0.3);
  &.bottom, &.top{
    padding: 5px 10px; 
    width: 400px;
    left: calc((100% - 400px) / 2);
  }
  &.top{
    top: 10px; 
  }
  &.bottom{
    bottom: 10px; 
  }
  &.left, &.right{
    padding: 10px 5px;
    height: 400px;
    top: calc((100% - 400px) / 2); 
  }
  &.left{
    left: 10px; 
  }
  &.right{
    right: 10px; 
  }
}

</style>
<script>
/**
 * 缩放控件
 * @module xdh-map-zoom-panel
 */
import '../../../theme/zoom-panel.scss';
import {ZoomSlider, Zoom} from 'ol/control'
import Control from 'ol/control/Control';
import {getParent} from 'utils/util'
export default {
  name: 'XdhMapZoomPanel',
   /**
   * 参数属性
   * @member props
   * @property {string} [placement] 停泊位置，可选值'left', 'top', 'bottom', 'right'
   */
  props: {
    // 停泊位置
    placement: {
      type: String,
      default: 'bottom',
      validator(val) {
        return [
          'left', 'top', 'bottom', 'right'
        ].includes(val)
      }
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
      let defaultName = 'xdh-zoom-panel' 
      let output = [defaultName, this.placement]
      
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
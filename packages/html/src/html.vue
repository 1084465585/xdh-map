<template>
  <div class="xdh-map-html">
    <slot></slot>
  </div>
</template>

<script>
  import {mapReady, getParent} from 'utils/util'
  import Overlay from 'ol/Overlay'

  export default {
    name: 'XdhMapHtml',
    props: {
      positioning: {
        type: String,
        default: 'center-center',
        validator(val) {
          return ['bottom-left',
            'bottom-center',
            'bottom-right',
            'center-left',
            'center-center',
            'center-right',
            'top-left',
            'top-center',
            'top-right'].includes(val)
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
      className: String
    },
    watch: {
      position() {
        this.show()
      }
    },
    methods: {
      addOverlay(map) {
        const options = this.$props
        options.element = this.$el
        this.overlay = new Overlay(options)
        map.addOverlay(this.overlay)
      },
      show(position) {
        this.overlay && this.overlay.setPosition(position || this.position)
      },
      hide() {
        this.overlay && this.overlay.setPosition(null)
      }
    },
    created() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.addOverlay)
    },
    beforeDestroy() {
      if (this.overlay && this.parent) {
        this.parent.map.removeOverlay(this.overlay)
      }
    }
  }
</script>

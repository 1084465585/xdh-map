<template>
  <xdh-map-popup ref="popup" class="xdh-map-tooltip" v-bind="$props" :closable="false" :closeOnClick="false">
    <div class="xdh-map-tooltip__wrap">
      <div class="xdh-map-tooltip__content">
        <slot name="content"></slot>
      </div>
      <div v-if="tool" class="xdh-map-tooltip__tool">
        <slot name="tool"></slot>
      </div>
    </div>
  </xdh-map-popup>
</template>

<script>
  /**
   * 气泡弹窗覆盖物组件
   * @module xdh-map-popup
   */

  import XdhMapPopup from '../../popup'
  import {getParent, mapReady} from 'utils/util'

  /**
   * 插槽
   * @member slots
   * @property {string} title 定义标题内容
   * @property {string} default 定义主体内容
   */
  export default {
    name: 'XdhMapTooltip',
    components: {
      XdhMapPopup
    },
    /**
     * 参数属性
     * @member props
     * @property {string} [theme=light] 主题样式，可选值 'dark', 'light'
     *
     */
    props: {
      ...XdhMapPopup.props,
      // direction: {
      //   type: String,
      //   default: 'top',
      //   validator() {
      //     return ['top', 'bottom', 'left', 'right']
      //   }
      // },
      tool: {
        type: Boolean,
        default: false
      },
      autoClose: {
        type: Number,
        default: 0
      },
      show: {
        type: Boolean,
        default: true
      }
  
    },
    data() {
      return {
        // isShow: this.value,
        timer: null
      }
    },
    computed: {
    },
    watch: {
      show(val) {
        if (val && this.autoClose) {
          this.toAutoClose()
        }
      }
    },
    methods: {
      toAutoClose() {
        if (this.timer) { clearTimeout(this.timer) }
        this.timer = setTimeout(() => {
          this.$refs.popup.hide()
          this.$emit('update:show', false)
        }, this.autoClose)
      }, 
      ready(map) {
        this.map = map
        if (this.autoClose && this.show) {
          this.toAutoClose()
        }
      }
    },
    mounted() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    }
  }
</script>

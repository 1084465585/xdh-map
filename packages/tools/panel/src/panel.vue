<template>
  <xdh-map-popup title="true" ref="popup" :show-errow="false" :closable="true" :close-on-click="false" :width="width" :height="height" @on-closed="handleClosed" v-bind="$attrs">
    <div slot="title">
      <slot name="title"></slot>
    </div>
    <div class="xdh-map-panel" >
      <div class="xdh-map-panel__body">
        <slot></slot>
      </div>
      <div v-if="bottom" class="xdh-map-panel__bottom">
        <slot name="bottom"></slot>
      </div>
    </div>
  </xdh-map-popup>
</template>

<script>
  /**
   * Panel覆盖物组件
   * @module xdh-map-panel
   */

  import XdhMapPopup from '../../../popup'

  /**
   * 插槽
   * @member slots
   * @property {string} title 定义标题内容
   * @property {string} default 定义主体内容
   * @property {string} bottom 定义主体内容
   */
  export default {
    name: 'XdhMapPanel',
    components: {
      XdhMapPopup
    },
    /**
     * 参数属性
     * @member props
     * @property {string} [width] 窗体宽度
     * @property {string} [height] 窗体高度
     * @property {boolean} [closed] 关闭
     *
     */
    props: {
      // ...XdhMapPopup.props,
      width: {
        type: String,
        default: '300px'
      },
      height: {
        type: String,
        default: '260px'
      },
      closed: {
        type: Boolean,
        default: true
      },
      bottom: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentClosed: this.closed
      }
    },
    computed: {
      
    },
    watch: {
      closed(val) {
        this.currentClosed = val
        if (val) {
          this.$refs.popup.hide()
          this.$emit('on-closed')
        } else {
          this.$refs.popup.show(this.position)
        }
      }
    },
    methods: {
      handleClosed() {
        if (!this.currentClosed) {
          this.currentClosed = true
          this.$emit('update:closed', this.currentClosed)
        }
      }
    },
    mounted() {
      if (this.closed) {
        this.$nextTick(() => {
          this.$refs.popup.hide()
        })
      }
      
    },
    beforeDestroy() {
    }
  }
</script>

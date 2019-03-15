<template>
  <xdh-map-html v-bind="$props" ref="html">
    <div class="xdh-map-tooltip">
      <div :class="classes">
        <slot></slot>
      </div> 
    </div> 
  </xdh-map-html>
</template>

<script>
  /**
   * 气泡弹窗覆盖物组件
   * @module xdh-map-popup
   */

  import XdhMapHtml from '../../html'
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
      XdhMapHtml
    },
    /**
     * 参数属性
     * @member props
     * @property {string} [theme=light] 主题样式，可选值 'dark', 'light'
     *
     */
    props: {
      ...XdhMapHtml.props,
      direction: {
        type: String,
        default: 'top',
        validator() {
          return ['top', 'bottom', 'left', 'right']
        }
      }, 
      theme: {
        type: String,
        default: 'dark',
        validator() {
          return ['dark', 'light']
        }
      },
      
      closeOnClick: {
        type: Boolean,
        default: true
      },
      value: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isShow: this.value
      }
    },
    computed: {
      classes() {
        return ['xdh-map-tooltip__tag', `is-${this.theme}`, this.direction]
      }
    },
    watch: {
      value(val) {
        if (val === false) {
          this.$nextTick(() => { this.hide() })
        } else {
          this.show(this.position)
        }
        this.isShow = val
        
      },
      isShow(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      show(position) {
        this.$refs.html.show(position || this.position)
      },
      hide() {
        this.$refs.html.hide()
      },
      setHide() {
        this.isShow = false 
        
      },
       
      ready(map) {
        this.map = map
        if (!this.isShow) {
          this.hide()
        }
        if (this.closeOnClick) {
          map.on('click', this.setHide)
        }
      }
    },
    mounted() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      if (this.closeOnClick) {
        this.parent.map.un('click', this.setHide)
      }
    }
  }
</script>

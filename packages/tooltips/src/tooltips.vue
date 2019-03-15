<template>
  <xdh-map-html v-bind="$props" ref="html">
    <div class="xdh-map-tooltips">
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
    name: 'XdhMapTooltips',
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
      }
    },
    computed: {
      classes() {
        return ['xdh-map-tooltips__tag', `is-${this.theme}`, this.direction]
      }
    },
    methods: {
      show(position) {
        this.$refs.html.show(position || this.position)
      },
      hide() {
        this.$refs.html.hide()
      },
      ready(map) {
        this.map = map
        // if (this.closeOnClick) {
        //   map.on('click', this.hide)
        // }
      }
    },
    created() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      // if (this.closeOnClick) {
      //   this.parent.map.un('click', this.hide)
      // }
    }
  }
</script>

<template>
  <xdh-map-html v-bind="$props"
                ref="html"
                positioning="bottom-center"
                :class="classes"
                :style="{'width': width}">
    <i class="xdh-map-popup__close" v-if="closable" @click="hide"></i>
    <div v-if="title" class="xdh-map-popup__title">
      <slot name="title">
        <i :class="icon"></i> {{typeof title === 'string' ? title : '标题'}}
      </slot>
    </div>
    <div class="xdh-map-popup__body" :style="{'height': height}">
      <slot></slot>
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
    name: 'XdhMapPopup',
    components: {
      XdhMapHtml
    },
    /**
     * 参数属性
     * @member props
     * @property {string} [width] 窗体宽度
     * @property {string} [height] 窗体高度
     * @property {string} [title] 标题文字
     * @property {string} [icon] 标题文字前的字体图标样式名称
     * @property {boolean} [closable=true] 是否显示关闭按钮
     * @property {boolean} [closeOnClick=true] 点击窗体之外是否关闭窗体
     * @property {string} [theme=light] 主题样式，可选值 'dark', 'light'
     *
     */
    props: {
      ...XdhMapHtml.props,
      width: String,
      height: String,
      title: {
        type: String || Boolean
      },
      icon: {
        type: String
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeOnClick: {
        type: Boolean,
        default: true
      },
      showErrow: {
        type: Boolean,
        default: true
      },
      theme: {
        type: String,
        default: 'light',
        validator() {
          return ['dark', 'light']
        }
      }
    },
    computed: {
      classes() {
        return ['xdh-map-popup', `is-${this.theme}`, `${this.showErrow ? 'errow' : ''}`]
      },
      styles() {
        return {
          width: this.width,
          height: this.height
        }
      }
    },
    methods: {
      show(position) {
        this.$refs.html.show(position || this.position)
      },
      hide() {
        this.$refs.html.hide()
        this.$emit('on-closed')
      },
      ready(map) {
        if (this.closeOnClick) {
          map.on('click', this.hide)
        }
      }
    },
    created() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      if (this.closeOnClick) {
        this.parent.map.un('click', this.hide)
      }
    }
  }
</script>

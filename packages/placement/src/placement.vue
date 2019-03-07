<template>
  <div class="xdh-map-placement"
       :class="classes"
       :style="styles">
    <slot></slot>
  </div>
</template>

<script>
  /**
   * 位置覆盖物组件
   * @module xdh-map-placement
   */
  export default {
    name: 'XdhMapPlacement',
    /**
     * 参数属性
     * @member props
     * @property {string} [placement] 停泊位置，可选值'left-top', 'center-top', 'right-top'，'left-center', 'center-center', 'right-center''left-bottom', 'center-bottom', 'right-bottom'
     * @property {number} [zIndex=1] 层级
     * @property {number[]} [margin] 外边距
     * @property {string[]} [theme] 主题 可选值 'default', 'light', 'dark'
     */
    props: {
      // 停泊位置
      placement: {
        type: String,
        default: 'left-bottom',
        validator(val) {
          return [
            'left-top', 'center-top', 'right-top',
            'left-center', 'center-center', 'right-center',
            'left-bottom', 'center-bottom', 'right-bottom'
          ].includes(val)
        }
      },
      // 层级
      zIndex: {
        type: Number,
        default: 1
      },
      // 外边距
      margin: {
        type: Array,
        default() {
          return [0, 0, 0, 0]
        }
      },
      // 主题
      theme: {
        type: String,
        default: '',
        validator() {
          return ['default', 'light', 'dark']
        }
      }
    },
    computed: {
      styles() {
        return {
          zIndex: this.zIndex,
          margin: this.margin.map(n => `${n}px`).join(' ')
        }
      },
      classes() {
        return [`is-${this.theme}`, this.placement]
      }
    }
  }
</script>


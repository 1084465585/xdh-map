<template>
  <xdh-map-html v-bind="$props">
    <i :class="icon" v-on="$listeners"></i>
  </xdh-map-html>
</template>

<script>
  /**
   * 字体样式Icon覆盖物组件
   * @module xdh-map-icon
   *
   */
  import XdhMapHtml from '../../html'

  export default {
    name: 'XdhMapIcon',
    components: {
      XdhMapHtml
    },
    /**
     * 参数属性
     * @member props
     * @property {string} icon 样式名称
     * @property {string} [positioning] 经纬度对齐位置，默认 center-center
     * @property {number[]} position 经纬度
     * @property {number[]} [offset] 位置偏移
     * @property {boolean} [stopEvent] 是否阻止时间冒泡，默认 true
     */
    props: {
      ...XdhMapHtml.props,
      icon: String
    }
  }
</script>

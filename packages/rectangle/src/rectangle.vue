<template>
  <xdh-map-polygon v-bind="$attrs" :coordinates="coordinates"></xdh-map-polygon>
</template>

<script>

  import XdhMapPolygon from '../../polygon/src/polygon'

  // 左上角为开始点
  export default {
    name: 'XdhMapRectangle',
    components: {
      XdhMapPolygon
    },
    props: {
      // 宽度经纬度距离
      width: {
        type: Number,
        default: 0,
        required: true
      },
      // 高度经纬度距离
      height: {
        type: Number,
        default: 0,
        required: true
      }
    },
    computed: {
      coordinates() {
        const loc = (this.$attrs.position || []).map(n => Number.parseFloat(n))
        return [
          loc,
          [loc[0] + this.width, loc[1]],
          [loc[0] + this.width, loc[1] - this.height],
          [loc[0], loc[1] - this.height],
          loc
        ]
      }
    }
  }
</script>

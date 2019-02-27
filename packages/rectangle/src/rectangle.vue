<template>
  <xdh-map-polygon ref="polygon" v-bind="$props" :coordinates="coords" @draw="handleDraw"></xdh-map-polygon>
</template>

<script>

  import XdhMapPolygon from '../../polygon/src/polygon'
  import CleanMixin from 'utils/mixins/clean'
  import {mixProps} from 'utils/util'

  const vueProps = {
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
  }
  export const props = mixProps({props: vueProps}, XdhMapPolygon)
  // 矩形不需要 coordinates
  delete props.coordinates

  // 左上角为开始点
  export default {
    name: 'XdhMapRectangle',
    mixins: [CleanMixin],
    components: {
      XdhMapPolygon
    },
    props: props,
    computed: {
      coords() {
        const loc = (this.$attrs.position || []).map(n => Number.parseFloat(n))
        return [
          loc,
          [loc[0] + this.width, loc[1]],
          [loc[0] + this.width, loc[1] - this.height],
          [loc[0], loc[1] - this.height],
          loc
        ]
      }
    },
    methods: {
      handleDraw(feature) {
        this.feature = feature
      }
    }
  }
</script>

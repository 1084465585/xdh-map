<template>
  <div></div>
</template>

<script>
  import Polygon from 'ol/geom/Polygon'
  import {featureStyleRender} from 'utils/util'
  import FeatureMixin from 'utils/mixins/feature'
  import BaseMixin from 'utils/mixins/base'
  import StrokeMixin from 'utils/mixins/stroke'
  import TextMixin from 'utils/mixins/text'

  // 左上角为开始点
  export default {
    name: 'XdhMapRectangle',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin],
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
        const loc = this.coordinate
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
      createStyle() {
        return featureStyleRender.call(this)
      },
      createGeometry() {
        return new Polygon([this.coordinates])
      }
    }
  }
</script>

<template>
  <div></div>
</template>

<script>
  import Polygon from 'ol/geom/Polygon'
  import {parse} from 'utils/style'
  import FeatureMixin from 'utils/feature'
  import BaseMixin from 'utils/mixins/base'
  import StrokeMixin from 'utils/mixins/stroke'
  import TextMixin from 'utils/mixins/text'

  // 左上角为开始点
  export default {
    name: 'XdhMapRectangle',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin],
    props: {
      loc: {
        type: Array,
        required: true
      },
      width: {
        type: Number,
        default: 0,
        required: true
      },
      height: {
        type: Number,
        default: 0,
        required: true
      }
    },
    computed: {
      coordinate() {
        // 转换坐标的数组类型
        return this.loc.map(n => Number.parseFloat(n))
      },
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
        return parse({
          ...this.baseStyleRender(),
          fill: {
            className: 'Fill',
            color: this.fill
          },
          stroke: this.strokeRender(),
          text: this.textRender()
        })
      },
      createGeometry() {
        return new Polygon([this.coordinates])
      }
    }
  }
</script>

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

  export default {
    name: 'XdhMapPolygon',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin],
    props: {
      // 坐标数组
      coordinates: {
        type: Array,
        default() {
          return []
        }
      }
    },
    watch: {
      coordinates() {
        this.update()
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

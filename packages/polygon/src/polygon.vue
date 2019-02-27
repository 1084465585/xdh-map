<template>
  <div></div>
</template>

<script>
  import Polygon from 'ol/geom/Polygon'
  import {featureStyleRender, mixProps} from 'utils/util'
  import FeatureMixin from 'utils/mixins/feature'
  import BaseMixin from 'utils/mixins/base'
  import StrokeMixin from 'utils/mixins/stroke'
  import TextMixin from 'utils/mixins/text'
  import CleanMixin from 'utils/mixins/clean'

  const vueProps = {
    // 坐标数组
    coordinates: {
      type: Array,
      default() {
        return []
      }
    }
  }

  export const props = mixProps({props: vueProps}, BaseMixin, StrokeMixin, TextMixin)

  // 多边形不需要 position 参数
  delete props.position

  export default {
    name: 'XdhMapPolygon',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin, CleanMixin],
    props: props,
    watch: {
      coordinates() {
        this.update()
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

<template>
  <div></div>
</template>

<script>
  import LineString from 'ol/geom/LineString'
  import {featureStyleRender} from 'utils/util'
  import FeatureMixin from 'utils/mixins/feature'
  import BaseMixin from 'utils/mixins/base'
  import StrokeMixin from 'utils/mixins/stroke'
  import TextMixin from 'utils/mixins/text'

  export default {
    name: 'XdhMapLine',
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
        return featureStyleRender.call(this)
      },
      createGeometry() {
        return new LineString(this.coordinates)
      }
    }
  }
</script>

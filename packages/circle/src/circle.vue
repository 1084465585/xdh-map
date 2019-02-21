<template>
  <div></div>
</template>

<script>
  import Circle from 'ol/geom/Circle'
  import {featureStyleRender} from 'utils/util'
  import FeatureMixin from 'utils/mixins/feature'
  import BaseMixin from 'utils/mixins/base'
  import StrokeMixin from 'utils/mixins/stroke'
  import TextMixin from 'utils/mixins/text'

  export default {
    name: 'XdhMapCircle',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin],
    props: {
      // 半径
      radius: {
        type: Number,
        required: true
      }
    },
    watch: {
      radius() {
        this.update()
      }
    },
    methods: {
      createStyle() {
        return featureStyleRender.call(this)
      },
      createGeometry() {
        return new Circle(this.coordinate, this.radius)
      }
    }
  }
</script>

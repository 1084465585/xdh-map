<template>
  <div></div>
</template>

<script>
  import Circle from 'ol/geom/Circle'
  import {featureStyleRender, mixProps} from 'utils/util'
  import FeatureMixin from 'utils/mixins/feature'
  import BaseMixin from 'utils/mixins/base'
  import StrokeMixin from 'utils/mixins/stroke'
  import TextMixin from 'utils/mixins/text'

  const vueProps = {
    // 半径
    radius: {
      type: Number,
      required: true
    }
  }

  export const props = mixProps({props: vueProps}, BaseMixin, StrokeMixin, TextMixin)

  export default {
    name: 'XdhMapCircle',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin],
    props: props,
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

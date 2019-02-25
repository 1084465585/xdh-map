<template>
  <div></div>
</template>

<script>
  import Point from 'ol/geom/Point'
  import {mixProps} from 'utils/util'
  import {parse} from 'utils/style'
  import FeatureMixin from 'utils/mixins/feature'
  import BaseMixin from 'utils/mixins/base'
  import StrokeMixin from 'utils/mixins/stroke'
  import TextMixin from 'utils/mixins/text'
  import factory from 'utils/mixins/factory'
  import CleanMixin from 'utils/mixins/clean'

  const options = {
    anchor: Array,
    crossOrigin: String,
    offset: Array,
    opacity: Number,
    scale: Number,
    rotateWithView: Boolean,
    rotation: Number,
    src: String
  }
  const factoryMixin = factory(options)

  export const props = mixProps(BaseMixin, StrokeMixin, TextMixin, factoryMixin)

  export default {
    name: 'XdhMapMarker',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin, factoryMixin, CleanMixin],
    props: props,
    watch: {
      radius() {
        this.update()
      }
    },
    methods: {
      createStyle() {
        return parse({
          ...this.baseStyleRender(),
          image: {
            className: 'Icon',
            ...this.styleFactory()
          }
        })
      },
      createGeometry() {
        return new Point(this.coordinate)
      }
    }
  }
</script>

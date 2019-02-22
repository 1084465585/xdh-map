<template>
  <div class="xdh-map-text hidden"></div>
</template>

<script>
  import {parse} from 'utils/style'
  import Point from 'ol/geom/Point'
  import FeatureMixin from 'utils/mixins/feature'
  import BaseMixin from 'utils/mixins/base'
  import StrokeMixin from 'utils/mixins/stroke'
  import TextMixin from 'utils/mixins/text'
  import CleanMixin from 'utils/mixins/clean'
  import factory from 'utils/mixins/factory'
  import {mixProps} from 'utils/util'

  const options = {
    maxAngle: Number,
    offsetX: Number,
    offsetY: Number,
    overflow: Boolean,
    scale: Number,
    rotateWithView: Boolean,
    rotation: Number,
    textAlign: String,
    textBaseline: String,
    padding: Array
  }
  const factoryMixin = factory(options)

  const vueProps = {
    // 经纬度坐标
    position: {
      type: Array,
      required: true
    }
  }

  export const props = mixProps({props: vueProps}, BaseMixin, StrokeMixin, TextMixin, factoryMixin)

  export default {
    name: 'XdhMapText',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin, factoryMixin, CleanMixin],
    props: props,
    methods: {
      createStyle() {
        return parse({
          ...this.baseStyleRender(),
          text: {
            ...this.textRender(),
            backgroundStroke: this.strokeRender(),
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

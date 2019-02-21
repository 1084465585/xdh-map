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
  import factory from 'utils/mixins/factory'

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

  export default {
    name: 'XdhMapText',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin, factory(options)],
    props: {
      // 经纬度坐标
      position: {
        type: Array,
        required: true
      }
    },
    watch: {
      /**
       * 文本变化更新图形样式
       */
      content() {
        const style = this.getStyle()
        this.feature && this.feature.setStyle(style)
      }
    },
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

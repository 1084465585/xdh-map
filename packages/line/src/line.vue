<template>
  <div></div>
</template>

<script>
  import LineString from 'ol/geom/LineString'
  import Point from 'ol/geom/Point'
  import {featureStyleRender, mixProps} from 'utils/util'
  import FeatureMixin from 'utils/mixins/feature'
  import BaseMixin from 'utils/mixins/base'
  import StrokeMixin from 'utils/mixins/stroke'
  import TextMixin from 'utils/mixins/text'
  import {parse} from 'utils/style'

  const vueProps = {
    // 坐标数组
    coordinates: {
      type: Array,
      default() {
        return []
      }
    },
    // 箭头图片url
    arrow: {
      type: String
    },
    // 箭头位置偏移
    arrowAnchor: {
      type: Array,
      default() {
        return [0.75, 0.5]
      }
    },
    // 每段线条都加箭头
    arrowEach: {
      type: Boolean
    }
  }

  const props = mixProps({props: vueProps}, BaseMixin, StrokeMixin, TextMixin)

  // 线条形不需要 position 参数
  delete props.position

  export default {
    name: 'XdhMapLine',
    mixins: [FeatureMixin, BaseMixin, StrokeMixin, TextMixin],
    props: props,
    watch: {
      coordinates() {
        this.update()
      }
    },
    methods: {
      arrowStyle(start, end) {
        const dx = end[0] - start[0];
        const dy = end[1] - start[1];
        const rotation = Math.atan2(dy, dx);
        return parse({
          className: 'Style',
          geometry: new Point(end),
          image: {
            className: 'Icon',
            src: this.arrow,
            anchor: this.arrowAnchor,
            rotateWithView: true,
            rotation: -rotation
          }
        })
      },
      lastSegment() {
        const length = this.coordinates.length
        if (length >= 2) {
          return this.arrowStyle(this.coordinates[length - 2], this.coordinates[length - 1])
        }
      },
      createStyle() {
        const feature = this.feature
        const geometry = feature.getGeometry()
        let styles = [featureStyleRender.call(this)]
        if (this.arrow) {
          if (this.arrowEach) {
            geometry.forEachSegment((start, end) => {
              styles.push(this.arrowStyle(start, end))
            })
          } else {
            styles.push(this.lastSegment())
          }
        }
        return styles
      },
      createGeometry() {
        return new LineString(this.coordinates)
      }
    }
  }
</script>

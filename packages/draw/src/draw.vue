<template>
  <div></div>
</template>

<script>
  import VectorSource from 'ol/source/Vector'
  import VectorLayer from 'ol/layer/Vector'
  import {getParent, mapReady} from 'utils/util'
  import {parse} from 'utils/style'
  import {Draw, Modify} from 'ol/interaction.js';
  import CleanMixin from 'utils/mixins/clean'

  const vueProps = {
    type: {
      type: String,
      default: 'LineString'
    },

    validator(val) {
      return ['Point', 'LineString',
        'LinearRing', 'Polygon',
        'MultiPoint', 'MultiLineString',
        'MultiPolygon',
        'GeometryCollection', 'Circle'].includes(val)
    },
    // Delay in milliseconds after pointerdown before the current vertex can be dragged to its exact position.
    dragVertexDelay: {
      type: Number,
      default: 500
    },
    // Pixel distance for snapping to the drawing finish.
    snapTolerance: {
      type: Number,
      default: 12
    },
    // Stop click, singleclick, and doubleclick events from firing during drawing
    stopClick: Boolean,
    // The number of points that can be drawn before a polygon ring or line string is finished.
    // By default there is no restriction.
    maxPoints: Number,
    // The number of points that must be drawn before a polygon ring or line string can be finished.
    // Default is 3 for polygon rings and 2 for line strings.
    minPoints: Number,

    // Style描述JSON
    styleJson: Object,

    freehand: Boolean,
    // Wrap the world horizontally on the sketch overlay.
    wrapX: Boolean
  }


  export default {
    name: 'XdhMapDraw',
    mixins: [CleanMixin],
    props: vueProps,
    data() {
      return {}
    },
    methods: {
      ready(map) {
        this.map = map

      },
      createStyle() {
        return this.styleJson ? parse(this.styleJson) : null
      },
      draw() {
        if (!this.map) return

        if (!this.source) {
          this.source = new VectorSource({wrapX: false});
        }
        if (!this.layer) {
          this.layer = new VectorLayer({
            source: this.source
          });
          this.map.addLayer(this.layer);
        }
        this.drawer = new Draw({
          source: this.source,
          style: this.createStyle(),
          ...this.$props
        });

        this.map.addInteraction(this.drawer);
        this.drawer.once('drawend', e => {
          this.$emit('drawend', e)
          this.finish()
        });
      },
      modify() {
        this.drawer = new Modify({
          source: this.source,
          style: this.createStyle(),
          wrapX: this.wrapX
        });
        this.map.addInteraction(this.drawer);
      },
      finish() {
        if (this.drawer) {
          this.map.removeInteraction(this.drawer);
          this.drawer = null
        }
      },
      clear() {
        if (this.layer && this.map) {
          this.map.removeLayer(this.layer)
          this.layer = null
        }
      }
    },
    created() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      if (this.map) {
        this.finish()
        this.layer && this.map.removeLayer(this.layer);
      }
    }
  }
</script>


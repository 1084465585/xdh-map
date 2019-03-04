<template>
  <div></div>
</template>

<script>
  import Collection from 'ol/Collection'
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
        if (!this.map || !this.parent) return

        const layer = this.parent.createVectorLayer()
        const source = layer.getSource()

        this.drawer = new Draw({
          source: source,
          style: this.createStyle(),
          ...this.$props
        })

        this.map.addInteraction(this.drawer)
        this.drawer.on('drawend', this.handleDraw);
      },
      modify() {
        this.drawer = new Modify({
          features: new Collection(this.features),
          style: this.createStyle(),
          wrapX: this.wrapX
        });
        this.drawer.on('modifyend', this.handleModify);
        this.map.addInteraction(this.drawer)
      },
      finish() {
        if (this.drawer) {
          this.drawer.un('drawend', this.handleDraw);
          this.drawer.un('modifyend', this.handleModify);
          this.map.removeInteraction(this.drawer)
          this.drawer = null
        }
      },
      handleModify(e) {
        this.$emit('modifyend', e)
      },
      handleDraw(e) {
        this.features.push(e.feature)
        this.$emit('drawend', e)
      },
      clear() {
        if (this.parent) {
          this.features.forEach(feature => {
            this.parent.removeFeature(feature)
          })
        }
      }
    },
    created() {
      this.features = []
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      if (this.map) {
        this.finish()
        this.clear()
      }
    }
  }
</script>


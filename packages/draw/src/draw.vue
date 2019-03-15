<template>
  <div></div>
</template>

<script>
  /**
   * 画图组件
   * @module xdh-map-draw
   */
  import Collection from 'ol/Collection'
  import {getParent, mapReady} from 'utils/util'
  import {parse} from 'utils/style'
  import {Draw, Modify} from 'ol/interaction.js';
  import CleanMixin from 'utils/mixins/clean'

  /**
   * 参数属性
   * @member props
   * @property {string} type 画图类型，可选值：'Point', 'LineString','LinearRing', 'Polygon', 'MultiPoint', 'MultiLineString','MultiPolygon','GeometryCollection', 'Circle'
   * @property {number} [dragVertexDelay=500] Delay in milliseconds after pointerdown before the current vertex can be dragged to its exact position.
   * @property {number} [snapTolerance=12] Pixel distance for snapping to the drawing finish.
   * @property {boolean} [stopClick]
   * @property {number} [maxPoints]
   * @property {number} [minPoints]
   * @property {object} [styleJson] Style描述JSON
   * @property {boolean} [freehand]
   * @property {boolean} [wrapX]
   */

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
      /**
       * 开始画图
       * @method draw
       */
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
        this.drawer.on('drawstart', this.handleDrawStart);
        this.drawer.on('drawend', this.handleDraw);
      },
      /**
       * 编辑图形模式
       * @method modify
       */
      modify() {
        this.drawer = new Modify({
          features: new Collection(this.features),
          style: this.createStyle(),
          wrapX: this.wrapX
        });
        this.drawer.on('modifystart', this.handleModifyStart);
        this.drawer.on('modifyend', this.handleModify);
        this.map.addInteraction(this.drawer)
      },
      /**
       * 完成画图
       * @method finish
       */
      finish() {
        if (this.drawer) {
          this.drawer.un('drawstart', this.handleDrawStart);
          this.drawer.un('drawend', this.handleDraw);
          this.drawer.un('modifystart', this.handleModifyStart);
          this.drawer.un('modifyend', this.handleModify);
          this.map.removeInteraction(this.drawer)
          this.drawer = null
        }
      },
      handleDrawStart(e) {
        /**
         * 画图开始时触发
         * @event drawstart
         * @param {object} e 事件对象
         */
        this.$emit('drawstart', e)
        e.feature.on('change', this.handleChange)
      },
      handleChange(e) {
        /**
         * 图形发生变化时触发
         * @event change
         * @param {object} e 事件对象
         */
        this.$emit('change', e)
      },
      handleModify(e) {
        /**
         * 修改图形结束时触发
         * @event modifyend
         * @param {object} e 事件对象
         */
        this.$emit('modifyend', e)
      },
      handleModifyStart(e) {
        /**
         * 修改图形开始时触发
         * @event modifystart
         * @param {object} e 事件对象
         */
        this.$emit('modifystart', e)
      },
      handleDraw(e) {
        this.features.push(e.feature)
        /**
         * 画图结束时触发
         * @event drawend
         * @param {object} e 事件对象
         */
        this.$emit('drawend', e)
      },
      /**
       * 清除已画的图形
       * @method clear
       */
      clear() {
        if (this.parent) {
          this.features.forEach(feature => {
            this.remove(feature)
          })
        }
      },
      /**
       * 删除已画的图形
       * @method remove
       * @param {ol/Feature} feature 图形实例
       */
      remove(feature) {
        feature.un('change', this.handleChange)
        this.parent.removeFeature(feature)
        this.features.filter(f => f !== feature)
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


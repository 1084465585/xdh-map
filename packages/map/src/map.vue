<template>
  <div class="xdh-map" ref="map">
    <slot></slot>
  </div>
</template>

<script>
  import Map from 'ol/Map'
  import View from 'ol/View'
  import VectorLayer from 'ol/layer/Vector'
  import VectorSource from 'ol/source/Vector'
  import {set as setLayerConfig} from 'utils/setting'
  import {createLayer} from 'utils/layers'
  /*
   地图支持以下事件：
    change        (module:ol/events/Event~Event)    - Generic change event. Triggered when the revision counter is increased.change:layerGroup (module:ol/Object.ObjectEvent)
    change:size   (module:ol/Object.ObjectEvent)
    change:target (module:ol/Object.ObjectEvent)
    change:view   (module:ol/Object.ObjectEvent)
    click         (module:ol/MapBrowserEvent~MapBrowserEvent) - A click with no dragging. A double click will fire two of this.
    dblclick      (module:ol/MapBrowserEvent~MapBrowserEvent) - A true double click, with no dragging.
    moveend       (module:ol/MapEvent~MapEvent) - Triggered after the map is moved.
    movestart     (module:ol/MapEvent~MapEvent) - Triggered when the map starts moving.
    pointerdrag   (module:ol/MapBrowserEvent~MapBrowserEvent) - Triggered when a pointer is dragged.
    pointermove   (module:ol/MapBrowserEvent~MapBrowserEvent) - Triggered when a pointer is moved. Note that on touch devices this is triggered when the map is panned, so is not the same as mousemove.
    postcompose   (module:ol/render/Event~RenderEvent)
    postrender    (module:ol/MapEvent~MapEvent) - Triggered after a map frame is rendered.
    precompose    (module:ol/render/Event~RenderEvent)
    propertychange (module:ol/Object.ObjectEvent) - Triggered when a property is changed.
    rendercomplete (module:ol/render/Event~RenderEvent) - Triggered when rendering is complete, i.e. all sources and tiles have finished loading for the current viewport, and all tiles are faded in.
    singleclick    (module:ol/MapBrowserEvent~MapBrowserEvent) - A true single click with no dragging and no double click. Note that this event is delayed by 250 ms to ensure that it is not a double click.

  */
  export default {
    name: 'XdhMap',
    props: {
      // 最小缩放
      minZoom: {
        type: Number,
        default: 1
      },
      // 最大缩放
      maxZoom: {
        type: Number,
        default: 20
      },
      // 初始化缩放层级
      zoom: {
        type: Number,
        default: 10
      },
      // 初始化中心经纬度
      center: {
        type: Array,
        default() {
          return [120, 30]
        }
      },
      // 初始化图层瓦片地图类型
      type: {
        type: String,
        default: 'OSM'
      },
      // 图层瓦片服务配置，必须返回Promise
      layerConfig: {
        type: Function,
        default() {
          return Promise.resolve({})
        }
      }
    },
    methods: {
      /**
       * 图形事件处理句柄
       * @private
       */
      _eventHandler(e) {
        const feat = this.getFeatureAtPixel(e.pixel)
        if (feat) {
          const array = this._featureEvents[e.type] || []
          const item = array.find(item => item.feature === feat)
          if (item) {
            item.listener(e, item.feature)
          }
        }
      },
      /**
       * 绑定图形事件
       * @private
       * @param {string} type 事件类型名称
       * @param {FeatureClass} feature 图形实例
       * @param {Function} listener 事件句柄
       * @param {number} uid 图形所属的Vue实例id
       */
      _bind(type, feature, listener, uid) {
        // 图形的事件需要地图图层转发，为提高性能，共享图层事件
        // 相同的事件名称只注册一次
        let typeEvents = this._featureEvents[type]
        if (!typeEvents) {
          this._featureEvents[type] = []
          this.map.on(type, this._eventHandler)
        }
        this._featureEvents[type].push({type, feature, listener, uid})
      },
      /**
       * 给子组件的图形绑定事件
       * @param {VueComponent} 子组件实例
       */
      bindEvents(vm) {
        if (!this.map) return
        const listeners = vm.$listeners
        Object.keys(listeners).forEach(key => {
          this._bind(key, vm.feature, listeners[key], vm._uid)
        })
      },
      /**
       * 给子组件的图形销毁事件
       * @param {VueComponent} 子组件实例
       */
      unbindEvents(vm) {
        if (!this.map) return
        const listeners = vm.$listeners
        const uid = vm._uid
        Object.keys(listeners).forEach(key => {
          const array = this._featureEvents[key] || []
          array.splice(array.findIndex(item => item.uid === uid), 1)
          if (array.length === 0) {
            delete this._featureEvents[key]
            this.map.un(key, this._eventHandler)
          }
        })
      },
      /**
       * 在地图上画图形
       * @param {FeatureClass} feature 图形实例
       */
      addFeature(feature) {
        // 共享矢量图层，把所有图形就加入同一个图层
        if (this.vectorLayer) {
          const source = this.vectorLayer.getSource()
          source.addFeature(feature)
        } else {
          let vectorSource = new VectorSource({
            features: [feature]
          })

          this.vectorLayer = new VectorLayer({
            source: vectorSource
          })
          this.map.addLayer(this.vectorLayer)
        }
      },
      /**
       * 删除图形
       * @param {FeatureClass} feature 图形实例
       */
      removeFeature(feature) {
        if (!this.vectorLayer) return
        const source = this.vectorLayer.getSource()
        source.removeFeature(feature)
      },
      /**
       * 根据地图上的像素位置获取图形对象
       * @param  {Array} pixel 位置像素 [x,y]
       * @return {module:ol/Feature|module:ol/render/Feature|*}
       */
      getFeatureAtPixel(pixel) {
        return this.map.forEachFeatureAtPixel(pixel, function (feature) {
          return feature
        })
      },
      /**
       * 切换地图类型
       * @param {string} type 地图类型，如： Baidu / Amap / OSM
       */
      changeType(type) {
        if (!type) return

        const layers = this.map.getLayers().getArray()
        const tileLayer = layers.find(layer => layer.type === 'TILE')
        if (tileLayer) {
          this.map.removeLayer(tileLayer)
          tileLayer.disposeInternal()
        }
        this.map.addLayer(createLayer(type))
      },
      /**
       * 重置地图尺寸，当容器的尺寸变化后需要执行resize
       */
      resize() {
        this.map.updateSize()
      },
      /**
       * 设置地图缩放等级
       * @param {Number} level 等级数值
       */
      zoomTo(level) {
        const view = this.map.getView()
        view.animate({
          zoom: Number.parseInt(level)
        })
      },

      /**
       * 逐步放大
       */
      zoomIn() {
        const view = this.map.getView()
        this.zoomTo(view.getZoom() + 1)
      },

      /**
       * 逐步缩小
       */
      zoomOut() {
        const view = this.map.getView()
        this.zoomTo(view.getZoom() - 1)
      },
      /**
       * 移动到指定经纬度居中
       * @param {Array} loc 经纬度数组
       */
      moveTo(loc) {
        const view = this.map.getView()
        view.animate({
          center: loc
        })
      }
    },
    created() {
      // 标记是地图组件
      this.isMap = true

      /**
       * 图形绑定的事件集合，存储格式：
       * { click: [{type, feature, listener, uid}, ...], movestart: [..]}
       * type: 事件类型
       * feature：触发的图形对象
       * listener： Vue组件绑定的事件句柄
       * uid: Vue组件实例id
       */
      this._featureEvents = {}

      // 初始化图层瓦片服务配置
      this.layerConfig().then(layers => {
        setLayerConfig(layers)
      })
    },
    mounted() {
      const layer = createLayer(this.type)
      const view = new View({
        projection: 'EPSG:4326',
        center: this.center,
        zoom: this.zoom,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom
      })
      this.map = new Map({
        layers: [layer],
        target: this.$refs.map,
        view: view,
        // 删除默认的控件
        controls: []
      })

      /**
       * @event ready
       * 地图初始化完成
       */
      this.$emit('ready', this.map, this)

      // 绑定地图事件
      Object.keys(this.$listeners).forEach(key => {
        this.map.on(key, this.$listeners[key])
      })
    },
    beforeDestroy() {
      // 销毁地图事件
      Object.keys(this.$listeners).forEach(key => {
        this.map.un(key, this.$listeners[key])
      })
      // 销毁地图
      this.map && this.map.disposeInternal()
    }
  }
</script>


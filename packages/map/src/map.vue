<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-27 09:25:50
 * @LastEditTime: 2019-10-21 21:44:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="xdh-map" ref="map" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
/**
 *  XdhMap 组件
 *  @module xdh-map
 *  @description 基于ol/Map的封装，支持ol/Map所提供的所有事件，相关事件参考openlayers文档，可以通过this.map 访问ol/Map实例
 *  @example
 *
 *  <xdh-map :center="[120, 30]"></xdh-map>
 *
 *  import {XdhMap} from 'xdh-map'
 *  export default {
 *    components: {
 *      XdhMap
 *    }
 *  }
 */

import Map from 'ol/Map'
import View from 'ol/View'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { set as setLayerConfig } from 'utils/setting'
import { createLayer } from 'utils/layers'
import { convertFromWgs84, convertToWgs84 } from 'utils/convert'
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

/**
 * Slots 插槽
 * @member slots
 * @property {String} [default] 默认插槽，覆盖物组件
 */

export default {
  name: 'XdhMap',

  /**
   * Props 参数
   * @member props
   * @property {Number} [minZoom=1] 最小缩放层级
   * @property {Number} [maxZoom=20] 最大缩放层级
   * @property {Number} [zoom=10] 初始化缩放层级
   * @property {Number[]} [center] 初始化中心经纬度
   * @property {String} [type=OSM] 初始化图层瓦片地图类型, 默认可选值：OSM、Baidu、Google、Amap、SuperMap、Founder、TDT、EzMap、FcMap
   * @property {Object} [layerConfig] 图层瓦片服务配置
   * @property {String} [coordType=WGS84] 地图的坐标类型,可选类型：'BD09'(百度地图坐标系) ，'WGS84'(1984年世界大地坐标系统) ，'GCJ02'(火星坐标系)
   */

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
      default: 'TDT'
    },
    // 图层瓦片服务配置
    layerConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    // 地图的坐标类型  BD09(百度地图坐标系) | WGS84(1984年世界大地坐标系统) | GCJ02(火星坐标系)
    coordType: {
      type: String,
      default: 'WGS84'
    },
    _options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  provide() {
    return {
      coordType: this.coordType
    }
  },
  data() {
    return {
      // 鼠标形状
      cursor: null
    }
  },
  computed: {
    styles() {
      return {
        cursor: this.cursor
      }
    }
  },
  methods: {
    _mouseHandler(feature) {
      // 鼠标移出
      if (this.featureAtPixel && !feature) {
        this.$emit('mouseleave', this.featureAtPixel)
      }
      // 鼠标移入
      if (!this.featureAtPixel && feature) {
        this.$emit('mouseenter', feature)
      }

      if (this.featureAtPixel && feature && this.featureAtPixel !== feature) {
        this.$emit('mouseleave', this.featureAtPixel)
        this.$emit('mouseenter', feature)
      }
      this.featureAtPixel = feature
    },
    /**
     * 图形事件处理句柄
     * @private
     */
    _eventHandler(e) {
      const feat = this.getFeatureAtPixel(e.pixel)
      if (!feat) return
      const array = this._featureEvents[e.type] || []
      const item = array.find(item => item.feature === feat)
      item && item.listener(e, item.feature)
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
      this._featureEvents[type].push({ type, feature, listener, uid })
    },
    /**
     * 给子组件的图形绑定事件
     * @method bindEvents
     * @param {VueComponent} vm 子组件实例
     */
    bindEvents(vm) {
      if (!this.map || !vm.feature) return
      const listeners = vm.$listeners
      Object.keys(listeners)
        .filter(key => !['mouseenter', 'mouseleave'].includes(key))
        .forEach(key => {
          this._bind(key, vm.feature, listeners[key], vm._uid)
        })
    },
    /**
     * 给子组件的图形销毁事件
     * @method unbindEvents
     * @param {VueComponent} vm 子组件实例
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
     * 创建矢量图层，只会创建一个图层，已创建即复用
     * @method createVectorLayer
     * @param {ol/Featrue} [feature] 图形实例, 可选，如传图形，创建图层并且把图形加入到图层中
     * @return {ol/layer/Vector} vectorLayer 图层实例
     */
    createVectorLayer(feature) {
      if (this.vectorLayer) {
        return this.vectorLayer
      }
      let vectorSource = new VectorSource()
      if (feature) {
        if (Array.isArray(feature)) {
          vectorSource.addFeatures(feature)
        } else {
          vectorSource.addFeature(feature)
        }
      }
      // feature && vectorSource.addFeature(feature)
      this.vectorLayer = new VectorLayer({
        source: vectorSource
      })
      this.map.addLayer(this.vectorLayer)
      return this.vectorLayer
    },
    /**
     * 在地图上添加图形, 图形加入到矢量图层
     * @method addFeature
     * @param {ol/Feature} feature 图形实例
     */
    addFeature(feature) {
      // 共享矢量图层，把所有图形就加入同一个图层
      if (this.vectorLayer) {
        const source = this.vectorLayer.getSource()
        if (Array.isArray(feature)) {
          source.addFeatures(feature)
        } else {
          source.addFeature(feature)
        }
      } else {
        this.createVectorLayer(feature)
      }
    },
    /**
     * 删除图形
     * @method removeFeature
     * @param {ol/Feature} feature 图形实例
     */
    removeFeature(feature) {
      if (!this.vectorLayer) return
      const source = this.vectorLayer.getSource()
      source.removeFeature(feature)
    },
    /**
     * 根据地图上的像素位置获取图形对象
     * @method getFeatureAtPixel
     * @param  {Number[]} pixel 位置像素 [x,y]
     * @return {module:ol/Feature|module:ol/render/Feature|*}
     */
    getFeatureAtPixel(pixel) {
      return this.map.forEachFeatureAtPixel(pixel, function(feature) {
        return feature
      })
    },
    /**
     * 切换地图类型
     * @method changeType
     * @param {string} type 地图类型，如： Baidu / Amap / OSM
     */
    changeType(type) {
      if (!type) return

      const oldLayers = [].concat(this.map.getLayers().getArray()) // 老图层集合
      this.$nextTick(() => {
        // 将map图层全部删除
        oldLayers.forEach(layer => {
          this.map.removeLayer(layer)
          if (layer.type === 'TILE') {
            layer.disposeInternal()
          }
        })
        // 在老图层集合中排除原地图图层
        let excludeLayers = oldLayers.filter(layer => {
          return layer.type !== 'TILE'
        })
        // 新地图图层
        let newLayers = [].concat(createLayer(type))
        // 将地图图层 与 老图层集合 合并
        newLayers = newLayers.concat(excludeLayers)
        /*
        const tileLayer = layers.find(layer => layer.type === 'TILE')
        if (tileLayer) {
          this.map.removeLayer(tileLayer)
          tileLayer.disposeInternal()
        }
        const newLayers = [].concat(createLayer(type))
        */
        // 从新加到地图上
        newLayers.forEach(layer => {
          this.map.addLayer(layer)
        })

        /**
         * 地图类型切换时触发
         * @event changeType
         * @param {String} type
         */
        this.$emit('changeType', type)
      })
    },
    /**
     * 重置地图尺寸，当容器的尺寸变化后需要执行resize
     * @method resize
     */
    resize() {
      this.map.updateSize()
    },
    /**
     * 设置地图缩放等级
     * @method zoomTo
     * @param {Number} level 等级数值
     * @return {Promise}
     */
    zoomTo(level) {
      const view = this.map.getView()
      return new Promise((resolve, reject) => {
        view.animate(
          {
            zoom: Number.parseInt(level)
          },
          () => {
            this.$emit('on-zoomed', view, level)
            resolve(view)
          }
        )
      })
    },
    /**
     * 设置地图缩放等级
     * @method zoomAt
     * @param {module:ol/Extent|module:ol/Geometry} area 区域对象，可以是 ol的 extent对象或geometry对象
     * @param {Object} options 配置参数，配置项参考 ol.view.fit()
     * @return {Promise}
     */
    zoomAt(area, options) {
      return new Promise((resolve, reject) => {
        if (area) {
          let size = [this.$refs.map.offsetWidth, this.$refs.map.offsetHeight]
          const view = this.map.getView()
          view.fit(area, {
            size: size,
            padding: [0, 0, 0, 0],
            duration: 500,
            ...options,
            callback: () => {
              this.$emit('on-zoomed', view, view.getZoom())
              resolve(this.map, this, view)
            }
          })
        } else {
          reject(new Error('定位失败'))
        }
      })
    },

    /**
     * 逐步放大
     * @method zoomIn
     * @return {Promise}
     */
    zoomIn() {
      const view = this.map.getView()
      return this.zoomTo(view.getZoom() + 1).then(res => {
        return Promise.resolve(res)
      })
    },

    /**
     * 逐步缩小
     * @method zoomOut
     * @return {Promise}
     */
    zoomOut() {
      const view = this.map.getView()
      return this.zoomTo(view.getZoom() - 1).then(res => {
        return Promise.resolve(res)
      })
    },
    /**
     * 移动到指定经纬度居中
     * @method moveTo
     * @param {Number[]} loc 经纬度数组
     * @return {Promise}
     */
    moveTo(loc) {
      const view = this.map.getView()
      return new Promise((resolve, reject) => {
        view.animate(
          {
            center: loc
          },
          () => {
            this.$emit('on-moved', view, loc)
            resolve(view)
          }
        )
      })
    },
    /**
     * 设置鼠标形状
     * @method setCursor
     * @param {Event} e 事件对象
     */
    setCursor(e) {
      const feature = this.getFeatureAtPixel(e.pixel)
      if (feature && feature._vm && feature._vm.cursor) {
        this.cursor = feature._vm.cursor
      } else {
        this.cursor = null
      }
      this._mouseHandler(feature)
    }
  },
  created() {
    // 标记是地图组件
    this.isMap = true
    this.featureAtPixel = null

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
    setLayerConfig(this.layerConfig || {})
  },
  mounted() {
    const layers = [].concat(createLayer(this.type))
    let center = convertToWgs84(
      this.coordType,
      this.center.map(n => Number.parseFloat(n))
    )
    const view = new View({
      projection: 'EPSG:4326',
      center: center,
      zoom: this.zoom,
      maxZoom: this.maxZoom,
      minZoom: this.minZoom
    })
    this.map = new Map({
      layers: layers,
      target: this.$refs.map,
      view: view,
      // 删除默认的控件
      controls: [],
      ...this._options
    })

    /**
     * 地图初始化完成
     * @event ready
     * @param {ol/Map} map ol地图实例
     * @param {VueComponent} mv Vue组件实例
     */
    this.$emit('ready', this.map, this)

    // 绑定地图事件
    Object.keys(this.$listeners).forEach(key => {
      this.map.on(key, e => {
        // console.log(e)
        if (e.coordinate) {
          let coordinate = convertFromWgs84(this.coordType, e.coordinate)
          e.convert = {
            coordinate: coordinate
          }
        }
        this.$listeners[key](e)
      })
    })

    // 设置子图形的鼠标形状
    this.map.on('pointermove', this.setCursor)
  },
  beforeDestroy() {
    // 销毁地图事件
    if (this.map) {
      Object.keys(this.$listeners).forEach(key => {
        this.map.un(key, this.$listeners[key])
      })
      this.map.un('pointermove', this.setCursor)
      // 销毁地图
      this.map.disposeInternal()
    }
  }
}
</script>


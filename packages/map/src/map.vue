<template>
  <div class="xdh-map" ref="map">
    <slot></slot>
  </div>
</template>

<script>
  import Map from 'ol/Map'
  import View from 'ol/View'
  import {set as setLayerConfig} from '../../../utils/LayerSetting'
  import {createLayer} from '../../../utils/Layers'

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
       * 切换地图类型
       * @param {string} type 地图类型，如： Baidu / Amap / OSM
       */
      changeType(type) {
        if (!type) return

        const layers = this.map.getLayers().getArray()
        const tileLayer = layers.find(layer => layer.type === 'TILE')
        if (tileLayer) {
          this.map.removeLayer(tileLayer)
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
        this.zoom(view.getZoom() + 1)
      },

      /**
       * 逐步缩小
       */
      zoomOut() {
        const view = this.map.getView()
        this.zoom(view.getZoom() - 1)
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
    },
    beforeDestroy() {
      // 销毁地图
      this.map && this.map.disposeInternal()
    }
  }
</script>


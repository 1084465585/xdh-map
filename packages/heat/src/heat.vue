<template>
  <div></div>
</template>

<script>
  import Feature from 'ol/Feature'
  import Point from 'ol/geom/Point'
  import Vector from 'ol/source/Vector'
  import Heatmap from 'ol/layer/Heatmap'
  import CleanMixin from 'utils/mixins/clean'
  import factory from 'utils/mixins/factory'
  import {getParent, mapReady} from 'utils/util'

  const options = {
    // 不透明度（0,1）
    opacity: {
      type: Number,
      default: 1
    },
    // 是否能见
    visible: {
      type: Boolean,
      default: true
    },
    // 图层渲染的z-index。在渲染时，将按照Z-index然后按位置对层进行排序
    zIndex: Number,
    // 此图层可见的最小分辨率（包括）
    minResolution: Number,
    // 最低分辨率（不包括在内），此层将在该分辨率下可见
    maxResolution: Number,
    // 热图的颜色渐变，指定为CSS颜色字符串数组
    gradient: {
      type: Array,
      default() {
        return ['#00f', '#0ff', '#0f0', '#ff0', '#f00']
      }
    },
    // 半径大小（以像素为单位）
    radius: {
      type: Number,
      default: 8
    },
    // 模糊大小（以像素为单位）
    blur: {
      type: Number,
      default: 15
    },
    // 阴影大小，以像素为单
    shadow: {
      type: Number,
      default: 250
    },
    // 用于权重的要素属性或从要素返回权重的函数。重量值的范围应为0到1（外部的值将被限制在该范围内）。
    weight: {
      type: [String, Function],
      default: 'weight'
    }
  }

  const factoryMixin = factory(options)

  export default {
    name: 'XdhMapHeat',
    mixins: [CleanMixin, factoryMixin],
    props: {
      ...factoryMixin.props,
      data: {
        type: Array,
        default() {
          return []
        }
      },
      prop: {
        type: Object,
        default() {
          return {
            lon: 'lon',
            lat: 'lat',
            // 权重值，取 0 ~ 1
            weight: 'weight'
          }
        }
      }
    },
    watch: {
      data() {
        this.removeLayer()
        this.draw()
      }
    },
    methods: {
      draw() {
        if (!this.parent) return
        const features = this.createFeatures()
        const source = new Vector()
        source.addFeatures(features)
        this.layer = new Heatmap({
          source: source,
          ...this.styleFactory()
        })
        this.parent.map.addLayer(this.layer)
      },
      createFeatures() {
        const prop = this.prop
        return this.data.map(item => {
          return new Feature({
            geometry: new Point([item[prop.lon], item[prop.lat]]),
            weight: item[prop.weight] || 1
          })
        })
      },
      removeLayer() {
        if (this.parent && this.layer) {
          this.layer.disposeInternal()
          this.parent.map.removeLayer(this.layer)
        }
      }
    },
    created() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.draw)

    },
    beforeDestroy() {
      this.removeLayer()
    }
  }
</script>


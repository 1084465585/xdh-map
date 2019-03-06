<template>
  <xdh-map-placement :class="classes" v-bind="$props">

    <div ref="overview" class="xdh-map-overview__map" :style="overviewStyle"></div>

    <div class="xdh-map-overview__trigger" @click="handleClick">
      <i class="iconfont" :class="iconClass"></i>
    </div>
  </xdh-map-placement>
</template>

<script>
  import {OverviewMap} from 'ol/control.js'
  import View from 'ol/View'
  import XdhMapPlacement from '../../placement'
  import {mixProps, getParent, mapReady} from 'utils/util'

  const vueProps = {
    theme: {
      type: String,
      default: 'light'
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    }
  }
  const props = mixProps(XdhMapPlacement, {props: vueProps})

  export default {
    name: 'XdhMapOverview',
    components: {
      XdhMapPlacement
    },
    props: props,
    data() {
      return {
        expand: false,
        map: null,
        overview: null
      }
    },
    computed: {
      classes() {
        return {
          'xdh-map-overview': true,
          expand: this.expand
        }
      },
      overviewStyle() {
        return {
          width: `${this.width}px`,
          height: `${this.height}px`
        }
      },
      iconClass() {
        if (this.placement.includes('bottom')) {
          return this.expand ? 'icon-down' : 'icon-up'
        }
        return this.expand ? 'icon-up' : 'icon-down'
      }
    },
    methods: {
      renderOverview() {
        if (this.overview) return
        this.overview = new OverviewMap({
          target: this.$refs.overview,
          view: new View({
            projection: 'EPSG:4326'
          })
        })
        this.map.addControl(this.overview)
      },
      handleClick() {
        this.expand = !this.expand
        this.$nextTick(() => {
          this.renderOverview()
        })
      },
      ready(map, vm) {
        this.map = map
      }
    },
    created() {
      // 获取地图组件实例
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      if (this.map && this.overview) {
        this.map.removeControl(this.overview)
      }
    }
  }
</script>

<style lang="scss" scope>


</style>


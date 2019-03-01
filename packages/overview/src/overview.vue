<template>
  <xdh-map-placement class="xdh-map-overview" :class="isClosed ? '' : 'is-show'"
  v-bind="$props" :style="placementStyle">
    <div class="xdh-map-overview__btn" :class="placement"  @click="isClosed = !isClosed">{{isClosed ? '«' : '»'}}</div>
    <div ref="overview" :class="mapClass" :style="overviewStyle">
    </div>
  </xdh-map-placement>
</template>

<script>
  import {OverviewMap} from 'ol/control.js'
  import View from 'ol/View'
  import XdhMapPlacement from '../../placement'
  import {mixProps, getParent, mapReady} from 'utils/util'

  const vueProps = {
  }
  const props = mixProps({props: vueProps}, XdhMapPlacement)

  export default {
    name: 'XdhMapOverview',
    components: {
      XdhMapPlacement
    },
    props: {
      width: {
        type: String,
        default: '500px'
      },
      height: {
        type: String,
        default: '300px'
      },
      defaultClosed: {
        type: Boolean,
        default: true
      },
      ...props
    },
    data() {
      return {
        isClosed: false,
        map: null,
        overview: null
      }
    },
    computed: {
      overviewStyle() {
        return {
          'width': this.width,
          'height': this.height
        }
      },
      placementStyle() {
        return {
          'width': this.isClosed ? '31px' : this.width, 
          'height': this.isClosed ? '31px' : this.height
        }
      },
      mapClass() {
        return `xdh-map-overview__wrap ${this.isClosed ? 'is-closed' : ''} ${this.placement}`
      }
    },
    methods: {
      ready(map, vm) {
        let layers = map.getLayers()
        this.overview = new OverviewMap({
          target: this.$refs.overview,
          layers: layers,
          view: new View({
            projection: 'EPSG:4326'
          })
        })
        this.map = map
        this.map.addControl(this.overview)
        this.isClosed = this.defaultClosed
        // vm.$on('changeType', (e) => {
        //   console.log(map.getLayers())
        //   // this.overview.set('layers', map.getLayers())
        // })
        // console.log(vm.$on())
        // vm.$parent.on('changeType', (e) => {
        //   console.log(e)
        // })
      }
    },
    created() {
      // 获取地图组件实例
      this.parent = getParent.call(this)
    },
    mounted() {
      
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      this.map.removeControl(this.overview)
    }
  }
</script>

<style lang="scss" scope >


</style>


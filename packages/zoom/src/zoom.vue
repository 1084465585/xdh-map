<template>
  <xdh-map-placement class="xdh-map-zoom" v-bind="$props">
    <div class="xdh-map-zoom__wrap"   ref="zoomWrap"  >
      <div class="range-wrap" ref="rangeWrap"  >
        <range-set v-model="zoomPrecent" @change="scaleChangeHandle"></range-set>
      </div>
    </div>
  </xdh-map-placement>
</template>

<script>
  import RangeSet from './range-set.vue'
  import XdhMapPlacement from '../../placement'
  import {mixProps, getParent, mapReady} from 'utils/util'

  const vueProps = {
  }
  const props = mixProps({props: vueProps}, XdhMapPlacement)

  export default {
    name: 'XdhMapZoom',
    components: {
      XdhMapPlacement,
      RangeSet
    },
    props: {
      ...props
    },
    data() {
      return {
        map: null,
        nowZoom: 0,
        minZoom: 0,
        maxZoom: 0,
        zoomPrecent: 0
      }
    },
    computed: {

    },
    watch: {
      
    },
    methods: {
      zoomToPrecent(zoom) {
        this.nowZoom = zoom || this.map.getView().getZoom()
        this.minZoom = this.map.getView().getMinZoom() // .minZoom
        this.maxZoom = this.map.getView().getMaxZoom()
        let zoomPrecent
        if (this.nowZoom === this.minZoom) {
          zoomPrecent = 100
        } else if(this.nowZoom === this.maxZoom) {
          zoomPrecent = 0
        } else {
          zoomPrecent = Math.round((this.maxZoom - this.nowZoom) / (this.maxZoom - this.minZoom) * 100)
        }
        return zoomPrecent
      },
      scaleChangeHandle(precent) {
        let zoom = Math.round(((100 - precent) / 100) * (this.maxZoom - this.minZoom)) + 1
        if (zoom === this.nowZoom) return
        this.parent.zoomTo(zoom)
      },
      ready(map, vm) {
        this.map = map

        this.zoomPrecent = this.zoomToPrecent()
        this.map.getView().on('change', (e) => {
          let changeZoom = e.target.getZoom()
          if (this.nowZoom === changeZoom) return
          this.nowZoom = changeZoom
          this.zoomPrecent = this.zoomToPrecent(this.nowZoom)
        })
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
       
    }
  }
</script>

<style lang="scss" scope >
</style>


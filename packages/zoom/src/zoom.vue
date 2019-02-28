<template>
  <xdh-map-placement class="xdh-map-pointer" v-bind="$props">
    <div class="xdh-map-zoom"   ref="zoomWrap"  >
      <div class="btn-wrap" v-if="simple">
        <div class="btn plus" @click="zoomIn">+</div>
        <div class="btn substract" @click="zoomOut">-</div>
      </div>
      <div class="range-wrap" ref="rangeWrap" v-if="!simple" >
        <vertical-scale v-model="zoomPrecent" @change="scaleChangeHandle"></vertical-scale> 
      </div>
    </div>
  </xdh-map-placement>
</template>

<script>
  import VerticalScale from './scale.vue'
  // import {OverviewMap} from 'ol/control.js'
  // import View from 'ol/View'
  // import {DragRotateAndZoom} from 'ol/interaction.js';
  import XdhMapPlacement from '../../placement'
  import {mixProps, getParent, mapReady} from 'utils/util'

  const vueProps = {
    simple: {
      type: Boolean,
      default: true
    }
  }
  const props = mixProps({props: vueProps}, XdhMapPlacement)

  export default {
    name: 'XdhMapZoom',
    components: {
      XdhMapPlacement,
      VerticalScale
    },
    props: props,
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
      zoomIn() {
        this.parent.zoomIn()
      },
      zoomOut() {
        this.parent.zoomOut()
      },
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
        let zoom = Math.round((precent / 100) * (this.maxZoom - this.minZoom)) + 1
        this.parent.zoomTo(zoom)
      },
      ready(map, vm) {
        this.map = map

        this.zoomPrecent = this.zoomToPrecent()

        this.map.getView().on('change', (e) => {
          let changeZoom = e.target.getZoom()
          if (this.nowZoom === changeZoom) return
          this.nowZoom = changeZoom
          this.zoomPrecent = 100 - this.zoomToPrecent(this.nowZoom)
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
@import "../../../theme/_vars.scss";
.xdh-map-zoom{
  padding: 8px;
  .btn-wrap{
    .btn{
      width: 20px;
      line-height: 20px;
      text-align:center;
      margin: 10px 0;
      background: $--scale-btn-bg;
      color: $--scale-btn-color;
      box-shadow: 0 0 0px 1px $--scale-highlight;
      cursor: pointer;
      &:hover{
        box-shadow: 0 0 1px 1px $--scale-highlight;
      }
    }
  }
  
}

</style>


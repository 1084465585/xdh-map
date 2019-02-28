<template>
  <xdh-map-placement class="xdh-map-pointer" v-bind="$props">
    <div class="xdh-overviewmap" :style="{'width': overviewW, 'height': overviewH}" ref="overview" >
      <div class="toggle-btn" :class="toggleBtnClass" @click="isClosed = !isClosed">{{isClosed ? '«' : '»'}}</div>
    </div>
  </xdh-map-placement>
</template>

<script>
  import {OverviewMap} from 'ol/control.js'
  import View from 'ol/View'
  import XdhMapPlacement from '../../placement'
  import {mixProps, getParent, mapReady} from 'utils/util'

  const vueProps = {
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
    }
  }
  const props = mixProps({props: vueProps}, XdhMapPlacement)

  export default {
    name: 'XdhMapOverview',
    components: {
      XdhMapPlacement
    },
    props: props,
    data() {
      return {
        isClosed: false
      }
    },
    computed: {
      overviewW() {
        return this.isClosed ? 0 : this.width
      },
      overviewH() {
        return this.isClosed ? 0 : this.height
      },
      toggleBtnClass() {
        return `${this.isClosed ? 'is-closed' : ''} ${this.placement}`
      }
    },
    methods: {
      ready(map, vm) {
        let layers = map.getLayers()
        const Overview = new OverviewMap({
          target: this.$refs.overview,
          layers: layers,
          view: new View({
            projection: 'EPSG:4326'
          })
        })
        map.addControl(Overview)

        setTimeout(() => {
          this.$refs.overview.style.opacity = '1'
          this.isClosed = this.defaultClosed
        }, 500)
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
@import '../../../theme/_vars.scss';
.xdh-overviewmap{
  position: relative;
  transition: all 0.5s;
  border: 1px solid $--pointer-bg;
  opacity: 0;
  .toggle-btn{
    position: absolute;
    line-height: 28px;
    width: 30px;
    color: white;
    text-align:center;
    border-radius: 3px;
    background: #7698B1;
    z-index: 2;
    // transform: translate3d(100%, -100%, 0);
    &.left-top{
      left: 0;
      top: 0;
      &.is-closed{
        transform: translate3d(0%, 0%, 0);
      }
    }
    &.right-top{
      right: 0;
      top: 0;
      &.is-closed{
        transform: translate3d(0%, 0%, 0);
      }
    }
    &.left-bottom{
      left: 0;
      bottom: 0;
      &.is-closed{
        transform: translate3d(0%, 0%, 0);
      }
    }
    &.right-bottom{
      right: 0;
      bottom: 0;
      &.is-closed{
        transform: translate3d(0%, 0%, 0);
      }
    }
  }

  .ol-overviewmap{
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background: white;
  }
  .ol-overviewmap-map{
    width: 100%;
    height: 100%;
  }
  .ol-overviewmap.ol-collapsed{
    // width: 0;
    // height: 0;
    // border: 0px solid black;
  }
  .ol-selectable{
    border: 1px solid green;
  }

  button[title="Overview map"]{
    display:none;
  }
}

</style>


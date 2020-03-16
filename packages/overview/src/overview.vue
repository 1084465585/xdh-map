<template>
<xdh-map-placement :placement="placement" v-bind="$attrs" style="border: 1px solid blue">
  <div ref="warp" :class="{'xdh-map-overview': true, 'close': close}" >
    <div :class="{'xdh-map-overview__map': true}" :style="mapWarpSize"></div>
    
    <div :class="[{'xdh-map-overview__trigger': true}, placement]" @click="close = !close">
      <i class="iconfont" :class="iconClass"></i>
    </div>
  </div>
    
</xdh-map-placement>
</template>
<style scope lang="scss">
  @import '../../../theme/_vars.scss'; 
  .xdh-map-overview {
    position: relative;
    width: 150px;
    height: 150px;
    overflow: hidden;
    transition: all 0.5s;
    &.close{
      width: 24px;
      height: 24px;
    }
    &__trigger {
      position: absolute;
      z-index: 2;
      width: 24px;
      height: 24px;
      border-radius: $--border-radius; 
      background: white;
      cursor: pointer;
      line-height: 26px;
      overflow: hidden;
      :hover {
        opacity: 0.5;
      }
      i {
        font-size: 30px;
        text-align: center;
        transform: translateX(-4px);
        display: inline-block;
      }
      &.left-top{
        left: 0;
        top: 0;
      }
      &.right-top{
        right: 0;
        top: 0;
      }
      &.left-bottom{
        left: 0;
        bottom: 0;
      }
      &.right-bottom{
        right: 0;
        bottom: 0;
      }
    }
    &__map{
      background: blue;
    }  
  }


  

  
</style>
<script>
  /**
   * 鹰眼控件
   * @module xdh-map-overview
   */
 
  import XdhMapPlacement from '../../placement'
  import {getParent, mapReady} from 'utils/util' 
  // import { createLayer } from 'utils/layers'

  /**
   * 参数属性
   * @member props
   * @property {number} [width=200] 宽度
   * @property {number} [height=200] 高度
   * @property {string} [placement] 停泊位置，可选值'left-top', 'center-top', 'right-top'，'left-center', 'center-center', 'right-center''left-bottom', 'center-bottom', 'right-bottom'
   * @property {number} [zIndex=1] 层级
   * @property {number[]} [margin] 外边距
   * @property {string[]} [theme] 主题 可选值 'default', 'light', 'dark'
   */
   

  export default {
    name: 'XdhMapOverview',
    components: {
      XdhMapPlacement
    },
    props: {
      placement: {
        type: String,
        default: 'left-bottom',
        validator(val) {
          return [
            'left-top', 'right-top', 'left-bottom', 'right-bottom'
          ].includes(val)
        }
      }
    },
    data() {
      return {
        close: false,
        mapWarpSize: {
          width: '100%',
          height: '100%'
        },
        parent: null,
        map: null,
        overviewMap: null
      }
    },
    computed: {
      btnClass() {
        return ['xdh-map-overview__triggr', this.placement]
      }, 
      iconClass() {
        if (this.placement.includes('bottom')) {
          return this.close ? 'icon-up' : 'icon-down'
        }
        return this.close ? 'icon-left' : 'icon-right'
      }
    },
    methods: {
      ready(map) {
        this.map = map
        // console.log(this.parent, this.map)
        console.log(this.parent.$el.offsetWidth, this.parent.$el.offsetHeight)
      }
    },
    created() {
      // 获取地图组件实例
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    mounted() {
      this.close = false
      this.mapWarpSize.width = this.$refs.warp.offsetWidth + 'px'
      this.mapWarpSize.height = this.$refs.warp.offsetHeight + 'px'
      this.close = true
      // this.renderOverview()
    },
    beforeDestroy() {
      
    }
  }
</script>


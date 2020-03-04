<template>
  <xdh-map-placement class="xdh-map-type" v-bind="$props">
    <div v-for="item in layers"
         :key="item.name"
         class="xdh-map-type__layer"
         :class="{active:selected===item}" @click="change(item)">
      <img :src="item.preview">
      <span class="xdh-map-type__title">{{item.title}}</span>
    </div>
  </xdh-map-placement>
</template>

<script>
  /**
   * 地图图层类型切换控件
   * @module xdh-map-type
   */

  import XdhMapPlacement from 'packages/placement'
  import {get as getLayers} from 'utils/setting'
  import {getParent} from 'utils/util'

  export default {
    name: 'XdhMapType',
    components: {
      XdhMapPlacement
    },
    /**
     * 参数属性
     * @member props
     * @property {string} [placement] 停泊位置，可选值'left-top', 'center-top', 'right-top'，'left-center', 'center-center', 'right-center''left-bottom', 'center-bottom', 'right-bottom'
     * @property {number} [zIndex=1] 层级
     * @property {number[]} [margin] 外边距
     * @property {string[]} [theme] 主题 可选值 'default', 'light', 'dark'
     * @property {string[]} types 显示的图层类型，支持 'Baidu', 'Amap', 'OSM','SuperMap', 'Google', 'Founder'，'TDT'
     */
    props: {
      ...XdhMapPlacement.props,
      types: {
        type: Array,
        default() {
          return ['Baidu', 'Amap', 'TDT']
        }
      }
    },
    data() {
      return {
        selected: null
      }
    },
    computed: {
      layers() {
        const layers = getLayers()
        return this.types.map(name => {
          return {
            name: name,
            ...layers[name]
          }
        })
      }
    },
    methods: {
      change(item) {
        if ((this.selected || {}).name !== item.name) {
          this.selected = item
          console.log(item.name)
          this.parent.changeType(item.name)
          
          /**
           * 图层切换时触发
           * @event change
           * @param {Object} layer 图层对象
           */
          this.$emit('change', item)
        }
      },
      setSelected(type) {
        const layer = this.layers.find(item => item.name === type)
        if (layer) {
          this.selected = layer
        }
      }
    },
    created() {
      this.parent = getParent.call(this)
      if (!this.parent) return
      this.setSelected(this.parent.type)
      this.parent.$on('changeType', this.setSelected)
    },
    beforeDestroy() {
      this.parent.$off('changeType', this.setSelected)
    }
  }
</script>

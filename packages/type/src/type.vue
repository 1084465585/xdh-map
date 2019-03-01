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
  import XdhMapPlacement from 'packages/placement'
  import {get as getLayers} from 'utils/setting'
  import {getParent} from 'utils/util'

  export default {
    name: 'XdhMapType',
    components: {
      XdhMapPlacement
    },
    props: {
      ...XdhMapPlacement.props,
      types: {
        type: Array,
        default() {
          return ['Baidu', 'Amap', 'OSM']
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
          this.parent.changeType(item.name)
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

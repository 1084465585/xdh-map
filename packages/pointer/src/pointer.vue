<template>
  <xdh-map-placement class="xdh-map-pointer" v-bind="$props">
    <div ref="btn"
         class="xdh-map-pointer__btn"
         @click="copy"
         :class="{'is-lock':lock}"
         title="点击复制">{{coordinate.join(', ')}}
    </div>
  </xdh-map-placement>
</template>

<script>
  import Clipboard from 'clipboard'
  import XdhMapPlacement from '../../placement'
  import {mixProps, getParent, mapReady} from 'utils/util'

  const vueProps = {
    // 精度，保留几位小数
    precision: {
      type: Number,
      default: 6
    }
  }
  const props = mixProps({props: vueProps}, XdhMapPlacement)

  export default {
    name: 'XdhMapPointer',
    components: {
      XdhMapPlacement
    },
    props: props,
    data() {
      return {
        coordinate: [0, 0],
        lock: false
      }
    },
    methods: {
      ready(map, vm) {
        this.coordinate = vm.center
        map.on('pointermove', this.move)
        map.on('click', this.pick)
        this.map = map
      },
      update(e) {
        this.coordinate = e.coordinate.map(n => n.toFixed(this.precision))
      },
      move(e) {
        if (this.lock) return
        this.update(e)
      },
      pick(e) {
        this.lock = true
        this.update(e)
      },
      copy() {
        this.$emit('copy', this.coordinate)
        this.lock = false
      }
    },
    created() {
      // 获取地图组件实例
      this.parent = getParent.call(this)
    },
    mounted() {
      this.clipboard = new Clipboard(this.$refs.btn, {
        text: e => {
          return this.coordinate.join(', ')
        }
      });
      this.clipboard.on('success', this.copy)
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      this.clipboard && this.clipboard.destroy()
      if (this.map) {
        this.map.un('pointermove', this.move)
        this.map.un('click', this.pick)
      }
    }
  }
</script>


<template>
  <xdh-map-html class="xdh-map-mask"
                :position="center"
                :style="styles"
                :stop-event="false">
  </xdh-map-html>
</template>

<script>
  /**
   * 遮罩蒙层
   * @module xdh-map-mask
   */
  import XdhMapHtml from '../../html'
  import {mapReady, getParent} from 'utils/util'

  export default {
    name: 'XdhMapMask',
    components: {
      XdhMapHtml
    },
    /**
     * 参数属性
     * @member props
     * @property {String} [fill=black] 填充颜色
     * @property {number} [opacity=0.8] 透明度
     */
    props: {
      fill: {
        type: String,
        default: '#000'
      },
      opacity: {
        type: Number,
        default: 0.8
      }
    },
    data() {
      return {
        center: [],
        size: []
      }
    },
    computed: {
      styles() {
        return {
          width: `${this.size[0]}px`,
          height: `${this.size[1]}px`,
          background: this.fill,
          opacity: this.opacity
        }
      }
    },
    methods: {
      ready(map) {
        this.map = map
        this.map.on('postrender', this.postRender)
      },
      postRender() {
        const view = this.map.getView()
        this.size = this.map.getSize()
        this.center = view.getCenter()
      }
    },
    created() {
      this.parent = getParent.call(this)
    },
    mounted() {
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      this.map.un('postrender', this.postRender)
    }
  }
</script>

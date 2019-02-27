<template>
  <div>23232</div>
</template>

<script>
  import {getParent, mapReady} from 'utils/util'
  import CleanMixin from 'utils/mixins/clean'
  import createCoordSystem from 'utils/plugins/CoordSystem'

  export default {
    name: 'XdhMapEcharts',
    mixins: [CleanMixin],
    props: {
      // ECharts类库
      lib: {
        type: Object,
        required: true
      },
      // ECharts 配置参数
      options: Object
    },
    watch: {
      options: {
        deep: true,
        handler() {
          this.postRender()
        }
      }
    },
    methods: {

      postRender() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.registerCoordinateSystem()
          const el = this.createContainer()
          const chart = this.createChart(el)
          chart.setOption(this.options || {})
          this.resize(chart)
        }, 200)
      },
      resize(chart) {
        if (!this.container || !this.map) return

        const map = this.map
        const size = map.getSize()
        Object.assign(this.container.style, {
          height: size[1] + 'px',
          width: size[0] + 'px'
        })
        chart.resize()
      },
      createContainer() {
        if (!this.map) return
        if (this.container) return this.container

        const map = this.map
        const size = map.getSize()
        const div = document.createElement('div')
        Object.assign(div.style, {
          height: size[1] + 'px',
          width: size[0] + 'px',
          top: 0,
          left: 0,
          zIndex: 999,
          position: 'absolute'
        })
        this.container = div
        map.getViewport().appendChild(div)
        return this.container
      },
      registerCoordinateSystem() {
        if (!this.map || this.registered) return
        const coordSystem = createCoordSystem(this.map)
        this.lib.registerCoordinateSystem('ol', coordSystem)
        this.registered = true
      },
      createChart(el) {
        if (this.chart) return this.chart
        this.chart = this.lib.init(el)
        return this.chart
      },
      ready(map) {
        this.map = map
        this.map.on('postrender', this.postRender)
      }
    },
    created() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)

    },
    beforeDestroy() {
      clearTimeout(this.timer)
      if (this.chart) {
        this.chart.dispose()
      }
      if (this.container) {
        this.container.parentNode.removeChild(this.container)
        this.container = null
      }
      if (this.map) {
        this.map.un('postrender', this.postRender)
      }

    }
  }
</script>


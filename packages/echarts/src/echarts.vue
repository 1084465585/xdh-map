<template>
  <div></div>
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
      options() {
        this.postRender()
      }
    },
    methods: {
      // 由于Openlayers与Echarts的click事件有冲突，Echarts触发不了click事件, 需要用mouse事件触发click
      fixClickEvent() {
        if (!this.map || !this.chart) return

        this.proxyMapHandleClick = e => {
          if (this.eventData) {
            this.$emit('click', this.eventData)
          }
        }
        this.proxyChartMouseOver = e => {
          this.eventData = e
        }
        this.proxyChartMouseOut = e => {
          this.eventData = null
        }

        this.map.on('click', this.proxyMapHandleClick)
        this.chart.on('mouseover', this.proxyChartMouseOver)
        this.chart.on('mouseout', this.proxyChartMouseOut)
      },
      postRender() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.registerCoordinateSystem()
          const el = this.createContainer()
          const chart = this.createChart(el)
          chart.setOption(this.options || {})
          this.resize(chart)
        }, 100)
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
        this.fixClickEvent()
        Object.keys(this.$listeners).forEach(key => {
          this.chart.on(key, this.$listeners[key])
        })
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
        this.chart.off('mouseover')
        this.chart.off('mouseout')
        Object.keys(this.$listeners).forEach(key => {
          this.chart.off(key)
        })
        this.chart.dispose()
      }
      if (this.container) {
        this.container.parentNode.removeChild(this.container)
        this.container = null
      }
      if (this.map) {
        this.map.un('click', this.proxyMapHandleClick)
        this.map.un('postrender', this.postRender)
      }

    }
  }
</script>


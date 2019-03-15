<template>
  <example>
    <xdh-map>
      <xdh-map-icon :stop-event="true"  icon="iconfont icon-location" :position="[120, 30]" @click="handleClick"></xdh-map-icon>
      <xdh-map-tooltip key="a"  :stop-event="true" :position="[120, 30]" :offset="[0, -3]" direction="top" :close-on-click="true" v-model="tooltipShow">
        <div style="">这里是icon</div>
      </xdh-map-tooltip>

      <xdh-map-icon :stop-event="true"  icon="iconfont icon-locus" :position="[120, 30.1]" @click="otherClick"></xdh-map-icon>

      <!-- <xdh-map-tooltip key="b"   :stop-event="true" :position="[120, 30.1]" :offset="[0, -3]" direction="top" :close-on-click="true" v-model="other">
        <div style="">这里是icon2</div>
      </xdh-map-tooltip> -->
      
      <xdh-map-icon icon="iconfont icon-policeman" :position="[120.1, 30]"></xdh-map-icon>
    </xdh-map>
    <!-- <p>showtoll1: {{tooltipShow}}, showtool2: {{other}}</p> -->
  </example>
</template>

<script>
  export default {
    data() {
      return {
        tooltipShow: false,
        other: false,
        timer: null
      }
    },
    methods: {
      handleClick() {
        this.tooltipShow = true
      },
      otherClick() {
        this.other = true
        // if (this.timer) {
        //   clearTimeout(this.timer)
        // }
        // this.tooltipShow2 = true
        // this.timer = setTimeout(() => {
        //   this.tooltipShow2 = false
        // }, 2000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .iconfont {
    font-size: 36px;
    color: blue;
  }

</style>

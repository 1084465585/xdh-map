<template>
  <example>
    <xdh-map>
      <xdh-map-icon key="icon_a" :stop-event="true"  icon="iconfont icon-location" :position="[120, 30]"></xdh-map-icon>
      <xdh-map-tooltip key="a"   :position="[120, 30]" :offset="[0, -15]"   >
        <div slot="content">请点上面的icon</div>
      </xdh-map-tooltip>

      <xdh-map-icon key="icon_b" :stop-event="true"  icon="iconfont icon-locus" :position="[120, 30.1]" @click="a = true"></xdh-map-icon>
      <xdh-map-tooltip key="b" v-show="a"  :position="[120, 30.1]" :offset="[0, -15]"  :tool="true"  >
        <div slot="content">请点下右icon</div>
         <i slot="tool" class="iconfont icon-close" style="font-size: 14px;" @click="a = false"></i>
      </xdh-map-tooltip>
      
      <xdh-map-icon key="icon_c" icon="iconfont icon-policeman" :position="[120.1, 30]" @click="b = true"></xdh-map-icon>
      <xdh-map-tooltip key="c" v-show="b"  :position="[120.1, 30]" :offset="[0, -15]" v-model="b"  :auto-close="1000">
        <div slot="content">这里是icon</div>
      </xdh-map-tooltip>
       
    </xdh-map>
    <p>b is: {{b}}</p>
  </example>
</template>

<script>
  export default {
    data() {
      return {
        a: false,
        b: false
      }
    },
    methods: {
    //  aClick() {
    //     this.a = true
    //   },
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

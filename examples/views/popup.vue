<template>
  <example>
    <xdh-map>
      <xdh-map-popup ref="popup"
                     :position="[120, 30]"
                     :offset="[0,-30]"
                     title="我是标题文字"
                     :stop-event="true"
                     width="200px">
        <div>内容文本，内容文本，内容文本，内容文本</div>
      </xdh-map-popup>
      <xdh-map-image v-bind="options" @click="showPopup"></xdh-map-image>

      <xdh-map-popup :position="[120.4, 30]"
                     :offset="[0,-30]"
                     title="我是标题文字"
                     :stop-event="false"
                     :closable="false"
                     :close-on-click="false"
                     theme="dark"
                     v-if="active"
                     width="200px">
        <div>内容文本，内容文本，内容文本，内容文本</div>
      </xdh-map-popup>
      <xdh-map-image :position="[120.4, 30]" :src="options.src"></xdh-map-image>
    </xdh-map>
  </example>
</template>

<script>
  export default {
    data() {
      return {
        active: false,
        options: {
          position: [120, 30],
          src: require('../../sources/markers/location_blue.png')
        }
      }
    },
    methods: {
      showPopup() {
        this.$refs.popup.show()
      }
    },
    mounted() {
      setTimeout(() => {
        this.active = true
      }, 200)
    }
  }
</script>

<style scoped>

</style>

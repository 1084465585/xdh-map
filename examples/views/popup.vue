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
      <xdh-map-marker v-bind="options" @click="showPopup"></xdh-map-marker>

      <xdh-map-popup :position="[120.4, 30]"
                     :offset="[0,-30]"
                     title="我是标题文字"
                     :stop-event="false"
                     :closable="false"
                     :close-on-click="false"
                     theme="dark"
                     width="200px">
        <div>内容文本，内容文本，内容文本，内容文本</div>
      </xdh-map-popup>
      <xdh-map-marker :position="[120.4, 30]" :src="options.src"></xdh-map-marker>
    </xdh-map>
  </example>
</template>

<script>
  export default {
    data() {
      return {
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
    }
  }
</script>

<style scoped>

</style>

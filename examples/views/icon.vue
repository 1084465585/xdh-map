<template>
  <example>
    <xdh-map>
      <xdh-map-icon icon="iconfont icon-location" :position="[120, 30]" @click="handleClick"></xdh-map-icon>
      <xdh-map-icon icon="iconfont icon-locus" :position="[120, 30.1]"></xdh-map-icon>
      <xdh-map-icon icon="iconfont icon-policeman" :position="[120.1, 30]"></xdh-map-icon>

      <xdh-map-image v-for="(item,index) in arr"
                    :key="index"
                    v-bind="item" ></xdh-map-image>
      
    </xdh-map>
  </example>
</template>

<script>
import {svgToImg} from 'utils/util'
  export default {
    data() {
      return {
        img: '',
        arr: []
      }
    },
    methods: {
      handleClick() {
        alert('clicked')
      },
      createIcons(total, img) {
        let texts = []
        for (let i = 0; i < total; i++) {
          texts.push({
            position: [120 + (0.5 - Math.random()), 30 + (0.5 - Math.random())],
            src: img,
            crossOrigin: 'anonymous'
          })
        }
        return texts
      }
    },
    mounted() {
      
      this.img = svgToImg('iconfont icon-ambulance', 18, 'red')
      this.arr = this.createIcons(60, this.img)
      // }, 100)
     

    }
  }
</script>

<style lang="scss" scoped>
  .iconfont {
    font-size: 36px;
    color: blue;
  }

</style>

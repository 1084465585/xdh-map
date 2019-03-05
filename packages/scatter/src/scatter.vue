<template>
  <xdh-map-html class="xdh-map-scatter" v-bind="$props" positioning="center-center">
    <div class="scatter-effect xdh-map-scatter__outer" :style="styles"></div>
    <div class="scatter-effect xdh-map-scatter__mid" :style="styles"></div>
    <div class="xdh-map-scatter__inner" @click="handleClick" :style="styles"></div>
  </xdh-map-html>
</template>

<script>
  import XdhMapHtml from '../../html'
  import {getParent} from 'utils/util'

  export default {
    name: 'XdhMapScatter',
    components: {
      XdhMapHtml
    },
    props: {
      ...XdhMapHtml.props,
      color: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      styles() {
        return {
          background: this.color
        }
      }
    },
    methods: {
      handleClick() {
        this.$emit('click', this)
      }
    },
    created() {
      this.parent = getParent.call(this)
    }
  }
</script>

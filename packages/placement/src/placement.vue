<template>
  <div class="xdh-map-placement"
       :class="placement"
       :style="styles">
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: 'placement',
    props: {
      placement: {
        type: String,
        default: 'left-bottom',
        validator(val) {
          return [
            'left-top', 'center-top', 'right-top',
            'left-center', 'center-center', 'right-center',
            'left-bottom', 'center-bottom', 'right-bottom'
          ].includes(val)
        }
      },
      zIndex: {
        type: Number,
        default: 1
      },
      margin: {
        type: Array,
        default() {
          return [0, 0, 0, 0]
        }
      }
    },
    computed: {
      styles() {
        return {
          zIndex: this.zIndex,
          margin: this.margin.map(n => `${n}px`).join(' ')
        }
      }
    }
  }
</script>


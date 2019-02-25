<template>
  <xdh-map-html :position="position">
    <i :class="icon" v-on="$listeners"></i>
  </xdh-map-html>
</template>

<script>
  import XdhMapHtml from '../../html'

  export default {
    name: 'XdhMapIcon',
    components: {
      XdhMapHtml
    },
    props: {
      position: Array,
      icon: String
    }
  }
</script>

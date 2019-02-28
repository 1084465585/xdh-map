<template>
  <xdh-map-html v-bind="$props">
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
      ...XdhMapHtml.props,
      icon: String
    }
  }
</script>

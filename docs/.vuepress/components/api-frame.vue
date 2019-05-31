<template>
  <iframe class="api-frame" :src="url" frameborder="0"></iframe>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {
      url() {
        return this.$route.query.url || 'doc/index.html'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .api-frame {
    height: 100%;
    width: 100%;
  }
</style>

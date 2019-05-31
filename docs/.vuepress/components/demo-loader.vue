<template>
  <div class="demo-loader">
    <component v-if="component" :is="component"></component>
    <div class="demo-loader__loading" v-if="!component">正在努力加载中...</div>
  </div>

</template>

<script>

  export default {
    props: {
      id: String
    },

    data() {
      return {
        component: null
      }
    },
    mounted() {
      import(`../.demo/${this.id}.vue`).then(res => {
        this.component = res.default
      })
    }
  }
</script>

<style lang="scss" scoped>
  .demo-loader {
    height: 100%;

    &__loading {
      padding: 2rem;
    }
  }
</style>

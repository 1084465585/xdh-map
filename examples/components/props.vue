<template>
  <div class="props">
    <span v-for="item in data" :key="item.name">key: <input :name="item.name" v-model="model[item.name]"/></span>
    <button @click="submit">更新</button>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        model: null
      }
    },
    methods: {
      submit() {

      }

    },
    created() {
      const model = {}
      this.data.forEach(n => {
        model[n.name] = n.value || ''
      })
      this.model = model
    }
  }
</script>

<style scoped>

</style>

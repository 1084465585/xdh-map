<template>
  <div>
    <example>
      <xdh-map>
        <xdh-map-zoom placement="left-top" :simple="false"></xdh-map-zoom>
      </xdh-map>
    </example>
    <div class="test"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        precent: 30
      }
    },
    components: {
    },
    methods: {
      changeHandle(e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped>
.test{
  width: 20px;
  height: 280px;
  border: 1px solid red;
  background: no-repeat;
  background-image: repeating-linear-gradient(black 0, black 1px, transparent 0, transparent 3px),
                    repeating-linear-gradient(black 0, black 1px, transparent 0, transparent 15px);
  background-size: 3px 100%, 5px 100%;
  background-position: center top;

}
</style>

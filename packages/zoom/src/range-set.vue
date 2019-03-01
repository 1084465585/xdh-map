<template>
<div class="range-set" :style="{'height': `${height}px`}">
  <div class="range-set__btn"></div>
  <div class="range-set__track" @click="test" >

  </div>
  <div class="range-set__btn" ></div>
  <div class="drag-wrap" ref="dragWrap">
    <!-- <div class="drag" ></div> -->
    <div class="ctrl" ref="dragCtrl">
    </div>
    <div class="drag" draggable="true" @drag="dragHandle">cc</div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'RangeSet',
    components: {
    },
    props: {
      height: {
        type: Number,
        default: 250
      },
      value: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        precent: this.value,

        maxRange: 0,
        startTop: 0,
        startY: 0
      }
    },
    computed: {
    },
    watch: {
    },
    methods: {
      startHandle() {
        this.startY = this.$refs.dragCtrl.getBoundingClientRect().top
      },
      dragHandle(e) {
        console.log(e)
        // this.startTop = this.$refs.dragCtrl.offsetTop
        // // let startY = this.$refs.dragCtrl.getBoundingClientRect().top
        // // console.log(startY)
        // console.log(e.clientY - this.startY)
        // this.$refs.dragCtrl.style.top = this.startTop + e.clientY - this.startY + 'px'
      },
      test() {
        console.log('test')
      }
    },
    created() {
       
    },
    mounted() {
      this.maxRange = this.$refs.dragWrap && this.$refs.dragCtrl ? this.$refs.dragWrap.offsetHeight - this.$refs.dragCtrl.offsetHeight : 0
      
    },
    beforeDestroy() {
    }
  }
</script>

<style lang="scss" scope >
$--range-bg: #FAFCFF;
$--range-color: #CCCCCA;
.range-set{
  position: relative;
  display: flex;
  width: max-content;
  flex-flow: column;
  align-items: center;
  // border: 1px solid red;
  &__btn{
    flex: 0 0 26px;
    width: 26px;
    line-height: 26px;
    text-align: center;
    font-weight: 800;
    color: $--range-color;
    background: $--range-bg;
    box-shadow: 0 0 1px 1px $--range-color;
    z-index: 2;
  }
  &__track{
    flex: 1;
    width: 10px;
    box-shadow: 0 0 1px 0px $--range-color;
    background: no-repeat;
    background-color: $--range-bg;
    background-image: repeating-linear-gradient($--range-color 0, $--range-color 1px, transparent 0, transparent 3px),
                      repeating-linear-gradient($--range-color 0, $--range-color 1px, transparent 0, transparent 15px);
    background-size: 3px 100%, 5px 100%;
    background-position: center top;
  }
  .drag-wrap{
    position: absolute;
    width: 1px;
    left: 0;
    top: 28px;
    bottom: 28px;
    background: red;
    .ctrl{
      position: absolute;
      left: 2px;
      top: 60px;
      width: 26px;
      height: 18px;
      line-height: 18px;
      font-weight: 800;
      text-align:center;
      color: $--range-color;
      background: red; // $--range-bg;
      box-shadow: inset 0 0 1px 1px $--range-color;
      
      
    }
    .drag{
      position: absolute;
      left: 2px;
      top: 0px;
      width: 26px;
      height: 18px;
      background: rgba(0,0,0,0.1);
      cursor:pointer;
       
    }

  }
}
</style>



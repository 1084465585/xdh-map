<template>
<div class="range-set" :style="{'height': `${height}px`}">
  <div class="range-set__btn" @click="btnClickHandle(-10)"></div>
  <div class="range-set__track" @click="trackClick" >

  </div>
  <div class="range-set__btn"  @click="btnClickHandle(10)"></div>
  <div class="drag-wrap" ref="dragWrap">
    <!-- <div class="drag" ></div> -->
    <div class="ctrl" ref="dragCtrl"  >
    </div>
    <div class="drag" ref="drag" draggable="true" @dragstart="startHandle" @drag="dragHandle">cc</div>
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
        percent: 0, // this.value,

        maxRange: 0,
        startTop: 0,
        currentTop: 0,
        startY: 0
      }
    },
    computed: {
      
    },
    watch: {
      value(val) {
        let Top = Math.ceil(val / 100 * this.maxRange)
        this.setTop(Top)
      },
      percent(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      startHandle(e) {
        this.startY = e.clientY
        this.startTop = this.currentTop = this.$refs.dragCtrl.offsetTop
      },
      dragHandle(e) {
        let deltaY = e.clientY - this.startY
        let offsetY = this.startTop + deltaY
        this.setTop(offsetY)
      },
      
      setTop(top) {
        let _top = Math.max(0, Math.min(top, this.maxRange))
         
        this.currentTop = _top
        this.percent = Math.floor(_top / this.maxRange * 100)
        
        this.$refs.dragCtrl.style.top = this.currentTop + 'px'
        this.$refs.drag.style.top = this.currentTop + 'px'
      },
      btnClickHandle(dir) {
        this.setTop(this.currentTop + dir)
      },
      trackClick() {
        console.log('test')
      }
    },
    created() {
       
    },
    mounted() {
      // 设置最大拖动范围
      this.maxRange = this.$refs.dragWrap && this.$refs.dragCtrl ? this.$refs.dragWrap.offsetHeight - this.$refs.dragCtrl.offsetHeight : 0
      
      //
      let top = Math.round(this.maxRange * this.value / 100)
      this.setTop(top)

      document.body.addEventListener('dragover', (evt) => {
        if (typeof evt.preventDefault === 'function') {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
      })
      
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
      top: 0px;
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
      background: rgba(0,0,0,0);
      opacity: 0;
      cursor:pointer;
       
    }

  }
}
</style>



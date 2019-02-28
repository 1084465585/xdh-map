<template>
<div class="vertical-scale">
  <div class="scale-btn" @click="upBtnClick">+</div>
  <div class="scale-wrap">

    <div class="scale" ref="scale">
      <div class="scale-ctrl" ref="ctrl" @mousedown="scaleMouseDown"></div>
    </div>
    <!-- <div class="scale-ctrl"></div> -->

  </div>
  <!-- <div class="range-scale"></div> -->
  <div class="scale-btn" @click="downBtnClick">-</div>
</div>
</template>

<script>

  export default {
    name: 'verticalScale',
    components: {
    },
    props: {
      value: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        precent: this.value,

        isDraging: false,

        rangeHeight: 0,

        startY: 0,
        startTop: 0, // Math.ceil(this.precent / 100 * this.rangeHeight),
        
        offsetY: 0
      }
    },
    computed: {
    },
    watch: {
      value(val) {
        this.precent = val
        let Top = Math.ceil(val / 100 * this.rangeHeight)
        this.ctrlMove(Top)
      },
      precent(val) {
        this.$emit('input', val)
      }
    },
    methods: {
      
      scaleMouseDown(e) {
        this.isDraging = true
        this.startTop = this.$refs.ctrl.offsetTop
        this.startY = e.clientY
      },
      scaleMouseMove(e) {
        if (!this.isDraging) return
        let deltaY = e.clientY - this.startY
        
        this.offsetY = Math.max(0, Math.min((this.startTop + deltaY), this.rangeHeight))
        this.ctrlMove(this.offsetY)
      },
      scaleMouseUp(e) {
        if (!this.isDraging) return
        this.isDraging = false
        this.startTop = this.offsetY
        this.$emit('change', this.precent)
      },

      ctrlMove(top) {
        this.$refs.ctrl.style.top = top + 'px'
        this.precent = Math.round((top / this.rangeHeight) * 100)
      },

      upBtnClick() {
        this.startTop = this.$refs.ctrl.offsetTop
        let changeTop = Math.max(0, Math.min((this.startTop - 10), this.rangeHeight))
        this.startTop = this.offsetY = changeTop
        this.ctrlMove(changeTop)
        this.$emit('change', this.precent)
      },

      downBtnClick() {
        this.startTop = this.$refs.ctrl.offsetTop
        let changeTop = Math.max(0, Math.min((this.startTop + 10), this.rangeHeight))
        this.startTop = this.offsetY = changeTop
        
        this.ctrlMove(changeTop)
        this.$emit('change', this.precent)
      }
    },
    created() {
       
    },
    mounted() {
      this.rangeHeight = this.$refs.scale ? this.$refs.scale.offsetHeight : 0
      this.scaleMouseMoveProxy = this.scaleMouseMove.bind(this)
      this.scaleMouseUpProxy = this.scaleMouseUp.bind(this)
      document.body.addEventListener('mousemove', this.scaleMouseMoveProxy)
      document.body.addEventListener('mouseup', this.scaleMouseUpProxy)
    },
    beforeDestroy() {
      document.body.removeEventListener('mousemove', this.scaleMouseMoveProxy)
      document.body.removeEventListener('mouseup', this.scaleMouseUpProxy) 
    }
  }
</script>

<style lang="scss" scope >
@import "../../../theme/_vars.scss";
.vertical-scale{
  width: 20px;
  height: 260px;
  display: flex;
  flex-flow: column;
  align-items: center;
  .scale-btn{
    flex: 0 0 16px;
    line-height: 16px;
    width: 16px;
    text-align:center;
    font-size: 16px;
    font-weight: 800;
    border-radius: 3px;
    color: $--scale-btn-color;
    background: $--scale-btn-bg;
    box-shadow: 0 0 0px 1px $--scale-highlight;
    cursor: pointer;
    &:hover{
      box-shadow: 0 0 1px 1px $--scale-highlight;
    }
  }
  .scale-wrap{
    flex: 1;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 5px auto;
    width: 16px;
    overflow: hidden;
    // box-shadow: inset 0 0 1px 0px $--scale-highlight;
    :before{
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      height: 6px;
      bottom: -5px;
      left: 0%;
      background: $--scale-btn-bg;
    }
    
    .scale{
      flex: 0 0 calc(100% - 16px);
      position: relative;
      width: 60%;
      height: calc(100% - 16px);
      border-radius: 2px;
      background: no-repeat;
      background-color: $--scale-btn-bg;
      background-image: repeating-linear-gradient($--scale-btn-color 0, $--scale-btn-color 1px, transparent 0, transparent 3px),
                        repeating-linear-gradient($--scale-btn-color 0, $--scale-btn-color 1px, transparent 0, transparent 15px);
      background-size: 3px 100%, 5px 100%;
      background-position: center top;
      box-shadow: 0 0 1px 1px $--scale-btn-color; 
      .scale-ctrl{
        opacity: 1;
        position: absolute;
        width: 16px;
        height: 16px;
        left: 50%;
        top: 0%;
        border-radius: 50%;
        margin-left: -8px;
        transform-origin: center center;
        transform: translateY(-8px);
        background: $--scale-btn-bg;
        box-shadow: inset 0 0 1px 1px $--scale-highlight;

        &:after{
          content: '';
          position: absolute;
          display: block;
          width: 80%;
          height: 1000px;
          left: 10%;
          bottom: 16px;
          transform-origin: center bottom;
          background: rgba(255,255,255,0.8);
        }
        &:before{
          content: '';
          position: absolute;
          display: block;
          width: 4px;
          height: 4px;
          left: 50%;
          top: 50%;
          margin-left: -2px;
          margin-top: -2px;
          border-radius: 50%;
          background: skyblue;
        }
      }
      .scale-ctrl:hover{
        transform: scale(1.2), translateY(-8px);
        box-shadow: inset 0 0 1px 2px #8CB0CE;
      }
      .scale-ctrl:hover:after{
        transform: scale(0.9);
      }
    }
    
  }
}
</style>


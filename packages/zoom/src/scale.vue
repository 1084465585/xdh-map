<template>
<div class="vertical-scale">
  <div class="vertical-scale__btn" @click="upBtnClick">+</div>
  <div class="vertical-scale__scale">

    <div class="scale" ref="scale">
      <div class="scale-ctrl" ref="ctrl" @mousedown="scaleMouseDown"></div>
    </div>
  </div>
  <div class="vertical-scale__btn" @click="downBtnClick">-</div>
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
        startTop: 0,
        
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
</style>


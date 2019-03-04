<template>
<div class="range-set" :style="{'height': `${height}px`}">
  <div class="range-set__btn" @click="btnClickHandle(-10)">+</div>
  <div class="range-set__track" @click="trackClick">

  </div>
  <div class="range-set__btn"  @click="btnClickHandle(10)">-</div>
  <div class="drag-wrap" ref="dragWrap">
    <div class="ctrl" ref="dragCtrl"  >-</div>
    <div class="drag" ref="drag" draggable="true" @dragstart="startHandle" @drag="dragHandle"></div>
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
        this.$emit('change', this.percent)
      },
      trackClick(e) {
        let height = e.clientY - e.target.getBoundingClientRect().top
        this.setTop(height)
        this.$emit('change', this.percent)
      },
      _dragoverHandle(e) {
        if (typeof e.preventDefault === 'function') {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      },
      _dropHandle(e) {
        if (typeof e.preventDefault === 'function') {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
        this.$emit('change', this.percent)
      }
    },
    created() {
       
    },
    mounted() {
      // 设置最大拖动范围
      this.maxRange = this.$refs.dragWrap && this.$refs.dragCtrl ? this.$refs.dragWrap.offsetHeight - this.$refs.dragCtrl.offsetHeight : 0
 
      let top = Math.round(this.maxRange * this.value / 100)
      this.setTop(top)
      
      this.dragoverHandleProxy = this._dragoverHandle
      this.dropHandleProxy = this._dropHandle
      document.body.addEventListener('dragover', this.dragoverHandleProxy)
      document.body.addEventListener('drop', this.dropHandleProxy)
      
    },
    beforeDestroy() {
      document.body.removeEventListener('dragover', this.dragoverHandleProxy)
      document.body.removeEventListener('drop', this.dropHandleProxy)
    }
  }
</script>

<style lang="scss" scope >

</style>



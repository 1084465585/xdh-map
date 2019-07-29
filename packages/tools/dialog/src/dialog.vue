<template> 
<div class="xdh-map-dialog" ref="point" :style="{'z-index': currentClosed ? -1 : 999}">
  <div class="dialog" ref="dialog" >
    <i class="xdh-map-popup__close" @click="closeHandle" ></i>
    <div class="xdh-map-dialog__header"  @mousedown="mouseDownHandle"
  ></div>
  hhh
  </div>
</div> 
</template>


<script>
  export default {
    name: 'xdh-map-dialog',
    props: {
      closed: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentClosed: this.closed,
        position: [120, 30], 
        dialog: null,
        pointX: 0,
        pointY: 0,

        transX: 0,
        transY: 0,

        startX: 0,
        startY: 0,
        mouseDownFlag: false
      }
    },
    watch: {
      closed(val) {
        this.currentClosed = val
        if (!val) {
          console.log([this.transX, this.transY])
          
          this.dialog.style.transform = `translate3d(${this.transX}px, ${this.transY}px, 0)`
        }
      }
    },
    methods: {
      closeHandle() {
        this.currentClosed = true
        console.log('close', [this.transX, this.transY])
        this.$emit('update:closed', this.currentClosed)
      },
      mouseDownHandle(e) {
        this.startX = e.clientX
        this.startY = e.clientY
        this.mouseDownFlag = true
        
      },
      mouseMoveHandle(e) {
        if (!this.mouseDownFlag) return
        let dirX = e.clientX - this.startX
        let dirY = e.clientY - this.startY
       
        let moveX = this.transX + dirX
        let moveY = this.transY + dirY

        this.dialog.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`  
      },
      mouseUpHandle(e) {
        this.transX = this.dialog.getBoundingClientRect().left - this.pointX
        this.transY = this.dialog.getBoundingClientRect().top - this.pointY
        // this.startX = e.clientX
        // this.startY = e.clientY
        this.dialog.style.transform = `translate3d(${this.transX}px, ${this.transY}px, 0)`
        this.mouseDownFlag = false
      }
    },
    mounted() {
      
     

      this.pointX = this.$refs.point.getBoundingClientRect().left
      this.pointY = this.$refs.point.getBoundingClientRect().top

      // this.header = this.$refs.header
      this.dialog = this.$refs.dialog 
      
      this.dialog.style.left = '0px'
      this.dialog.style.top = '0px'
      this.dialog.style.transform = `translate3d(${this.transX}px, ${this.transY}px, 0)`

      this.mouseMoveHandleProxy = this.mouseMoveHandle.bind(this)
      this.mouseUpHandleProxy = this.mouseUpHandle.bind(this)
      document.body.addEventListener('mousemove', this.mouseMoveHandleProxy)
      document.body.addEventListener('mouseup', this.mouseUpHandleProxy)


    },
    beforeDestroy() {
       document.body.removeEventListener('mousemove', this.mouseMoveHandleProxy)
      document.body.removeEventListener('mouseup', this.mouseUpHandleProxy)
    }
  }
</script>


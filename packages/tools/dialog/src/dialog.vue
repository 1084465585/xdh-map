<template> 
<div class="xdh-map-dialog" ref="point" :style="{'overflow': currentClosed ? 'hidden' : 'visible'}">
  <div class="dialog" ref="dialog" :style="{'width': width, 'height': height}">
    <i class="xdh-map-popup__close" @click="closeHandle" ></i>
    <div class="xdh-map-dialog__header"  @mousedown="mouseDownHandle"
    >{{title}}</div>
    <div class="xdh-map-dialog__body">
      <slot></slot>
    </div>
    <div class="xdh-map-dialog__bottom" v-if="bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</div> 
</template>


<script>
  import {getParent} from 'utils/util'
  export default {
    name: 'xdh-map-dialog',
    props: {
      closed: {
        type: Boolean,
        default: true
      },
      width: {
        type: String,
        default: '300px'
      },
      height: {
        type: String,
        default: '280px'
      },
      title: {
        type: String,
        default: '标题'
      },
      bottom: {
        type: Boolean,
        default: true
      },
      position: {
        type: Array,
        default: () => { return [0, 0] }
      }
    },
    data() {
      return {
        currentClosed: this.closed, 
        dialog: null,
        pointX: 0,
        pointY: 0,

        transX: this.position[0],
        transY: this.position[1],

        startX: 0,
        startY: 0,
        mouseDownFlag: false,
        mapWrap: null
      }
    },
    watch: {
      closed(val) {
        this.currentClosed = val
      }
    },
    methods: {
      closeHandle() {
        this.currentClosed = true
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

        let minX = 0
        let minY = 0
        let maxX = this.mapWrap.offsetWidth - this.dialog.offsetWidth
        let maxY = this.mapWrap.offsetHeight - this.dialog.offsetHeight
        
        if (moveX <= minX) {
          moveX = minX
        } else if(moveX >= maxX) {
          moveX = maxX
        }
        if (moveY <= minY) {
          moveY = minY
        } else if(moveY >= maxY) {
          moveY = maxY
        }

        this.dialog.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`  
      },
      mouseUpHandle(e) {
        this.transX = this.dialog.getBoundingClientRect().left - this.pointX
        this.transY = this.dialog.getBoundingClientRect().top - this.pointY
        
        this.dialog.style.transform = `translate3d(${this.transX}px, ${this.transY}px, 0)`
        this.mouseDownFlag = false
      }
    },
    mounted() {
      let map = getParent.call(this)
      this.mapWrap = map.$el
     
        
      this.pointX = this.$refs.point.getBoundingClientRect().left
      this.pointY = this.$refs.point.getBoundingClientRect().top

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


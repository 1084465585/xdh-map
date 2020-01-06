<template>  
  <!-- <transition name="dialog"  > -->
    <!--  v-show="!closed" -->
    <div class="xdh-map-dialog" ref="dialog"   :style="{'width': dialogW, 'height': dialogH,'left': styleLeft + 'px', 'top': styleTop + 'px', 'z-index': zIndex}" >
      <i class="xdh-map-dialog__close" @click.stop="closeHandle" ></i>
      <div class="xdh-map-dialog__header"  @mousedown="mouseDownHandle"
      >{{title}}</div>
      <div class="xdh-map-dialog__body"  v-show="!closed"> 
        <slot></slot>
      </div>
      <div class="xdh-map-dialog__bottom" v-if="bottom">
        <slot name="bottom"></slot>
      </div>
    </div>

  <!-- </transition>  -->
</template>
<style scoped lang="scss">
// .dialog-enter, .dialog-leave-to{
//   opacity: 0;
// }
.dialog-enter-active, .dialog-leave-active {
  transition: all 0.5s;
}
</style>

<script>
  /**
   * dialog 地图内置弹窗
   * @module xdh-map-dialog
   */
    
  // import {getParent} from 'utils/util'
   /**
   * 插槽
   * @member slots
   * @property {string} bottom 定义底部内容
   * @property {string} default 定义主体内容
   * 
   */

  export default {
    name: 'xdh-map-dialog',
    /**
    * 参数属性
    * @member props
    * @property {boolean} closed 定义关闭变量
    * @property {string} width 定义dialog宽度
    * @property {string} height 定义dialog高度
    * @property {string} title 弹窗标题
    * @property {boolean} bottom 是否显示底部
    * @property {array} position dialog 右上角原点 相对 地图 右上角原点的偏移值(px)
    * 
    */
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
        default: false
      },
      warp: {}
    },
    data() {
      return {
        currentClosed: this.closed, 
        dialog: null,

        dialogW: '0px', // this.width,
        dialogH: '0px', // this.height,

        styleLeft: 0,
        styleTop: 0,

        startX: 0,
        startY: 0,
        originLeft: 0,
        originTop: 0,

        mouseDownFlag: false,
        field: this.warp,
        zIndex: 1 
      }
    },
    watch: {
      closed(val) {
        if (val) {
          this.dialogW = '0px'
          this.dialogH = '0px'
        } else {
          this.dialogW = this.width
          this.dialogH = this.height
        }
        this.currentClosed = val
        
      },
      left(val) {
        this.styleLeft = val
        this.originLeft = val
        
      },
      top(val) {
        this.styleTop = val
        this.originTop = val
      }
    },
    methods: {
      closeHandle() {
        this.currentClosed = true
        this.$emit('on-closed')
        this.$emit('update:closed', this.currentClosed)
      },
      mouseDownHandle(e) {
        this.dialog.style.transition = ''
        this.startX = e.clientX
        this.startY = e.clientY
        this.mouseDownFlag = true

        this._mDownCtrl()
      },
      mouseMoveHandle(e) {
        if (!this.mouseDownFlag) return
        let dirX = e.clientX - this.startX
        let dirY = e.clientY - this.startY
        
        this.styleLeft = this.originLeft + dirX
        this.styleTop = this.originTop + dirY

        let minX = 0
        let minY = 0
        let maxX = this.field.offsetWidth - this.dialog.offsetWidth
        let maxY = this.field.offsetHeight - this.dialog.offsetHeight
        
        if (this.styleLeft <= minX) {
          this.styleLeft = minX
        } else if(this.styleLeft >= maxX) {
          this.styleLeft = maxX
        }
        if (this.styleTop <= minY) {
          this.styleTop = minY
        } else if(this.styleTop >= maxY) {
          this.styleTop = maxY
        }
       
          

      },
      mouseUpHandle(e) {
        this.dialog.style.transition = 'all 0.5s'
        this.originLeft = this.styleLeft
        this.originTop = this.styleTop
 
        this.mouseDownFlag = false
        
      },
      definePositionWarp(dom) {
        let parent = dom.parentNode
        let positionStyle = window.getComputedStyle(parent, false)['position']
        if (positionStyle === 'relative' || positionStyle === 'absolute') {
          return parent
        } else {
          this.definePositionWarp(parent)
        }
        
      },
      _mDownCtrl() {
        if (this.$parent.$options.name !== 'xdh-map-warp') return
        let otherDialogs = this.$parent.getAllDialogs()
        otherDialogs.forEach((vm) => { vm._setIndex(1) }) 
        this.$nextTick(() => {
          this._setIndex(otherDialogs.length)
        })
      },
      _setIndex(index) {
        this.zIndex = index
      },
      setPosition(l, t) {
        this.styleLeft = l
        this.styleTop = t 
        this.originLeft = l
        this.originTop = t
      }
    },
    mounted() { 
      this.dialog = this.$refs.dialog 
      this.dialog.style.transition = 'all 0.5s'
      
      if (!this.field) {
        
        this.field = this.definePositionWarp(this.$el) 
      }

      if (this.$parent.$options.name === 'xdh-map-warp') {
        this.$parent.registerDialog(this)
      }
       
      
      

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


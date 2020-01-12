<template>  
 
  <div :class="classes" ref="dialog"   :style="{'width': dialogW + 'px', 'height': dialogH + 'px','left': styleLeft + 'px', 'top': styleTop + 'px', 'z-index': zIndex}" @click.stop="_mDownCtrl">
    <i class="xdh-map-dialog__close" @click.stop="closeHandle" v-if="showClose"></i>
    <div class="xdh-map-dialog__header"  @mousedown="mouseDownHandle" v-if="header"
    >{{title}}</div>
    <div class="xdh-map-dialog__body">
      <slot></slot>
    </div>
    <div class="xdh-map-dialog__bottom" v-if="bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
 
</template>


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
    * @property {string} posStyle 定义弹窗left/top/right/bottom/width/height 的css字符串
    * @property {string} title 弹窗标题
    * @property {boolean} bottom 是否显示底部
    * @property {array} position dialog 右上角原点 相对 地图 右上角原点的偏移值(px)
    * @property {HTMLNode} warp dialog 所在的定位容器 （通常与xdh-map-warp结合使用，为xdh-map-warp的$el）
    * @property {boolean} animate 是否启用动画
    * @property {boolean} header 是否显示头部
    * @property {boolean} showClose 是否关闭按钮
    * @property {array} hideAt 弹窗隐藏时归位到容器某个位置
    */
    props: {
      posStyle: {
        type: String,
        default: 'left: 0px; top:0px; width: 300px; height: 300px;'
      },
      closed: {
        type: Boolean,
        default: true
      },
      
      header: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '标题'
      },
      bottom: {
        type: Boolean,
        default: false
      },
      warp: {},
      animate: {
        type: Boolean,
        default: false
      },
      hideAt: {
        type: Array,
        default: () => { return [0, 0] }
      }, 
      theme: {
        type: String,
        default: ''
      },
      showClose: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentClosed: this.closed, 
        dialog: null,

        width: 0,
        height: 0,
        left: 0,
        top: 0,

        dialogW: 0,
        dialogH: 0,

        styleLeft: 0,
        styleTop: 0, 

        startX: 0,
        startY: 0,
        
        mouseDownFlag: false,
        field: this.warp,
        zIndex: 1,
        transition: this.animate ? 'all 0.3s' : '',
        closedPos: null
      }
    },
    computed: {
      classes() {
        return this.theme ? ['xdh-map-dialog', `is-${this.theme}`] : ['xdh-map-dialog']
      }
    },
    inject: ['dialogLayer'],
    watch: {
      closed(val) { 
        if (val) { 
          this._close()
        } else {
          this._open()
        }
        this.currentClosed = val
      },
      posStyle(val) {
        if (!this.field) {
          this.field = this.definePositionWarp(this.$el)
        } else {
          this._initDialogPos()
        }
      },
      hideAt(val) {
        if (this.closed) {
          if (this.hideAt && this.hideAt.length) {
            this.styleLeft = this.hideAt[0]
            this.styleTop = this.hideAt[1]
          }
        }
      }
    },
    methods: {
      _close() {
        this.left = this.styleLeft
        this.top = this.styleTop
        this.$nextTick(() => {
          this.dialogW = 0
          this.dialogH = 0
          // ------------
          if (this.hideAt && this.hideAt.length) {
            this.styleLeft = this.hideAt[0]
            this.styleTop = this.hideAt[1]
          }
        })
        
      },
      _open() {
        this.dialogW = this.width
        this.dialogH = this.height 
        
        this.styleLeft = this.left
        this.styleTop = this.top
          
        this._mDownCtrl()
      },
      closeHandle() {
        this.currentClosed = true 
        this.$emit('on-closed')
        this.$emit('update:closed', this.currentClosed)
      },
      mouseDownHandle(e) { 
        this.left = this.styleLeft
        this.top = this.styleTop

        this.dialog.style.transition = '' // this.transition
        this.startX = e.clientX
        this.startY = e.clientY
        this.mouseDownFlag = true

        this._mDownCtrl()
        this.$emit('on-mouseDown', this.styleLeft, this.styleTop)
      },
      mouseMoveHandle(e) {
        if (!this.mouseDownFlag) return
        let dirX = e.clientX - this.startX
        let dirY = e.clientY - this.startY
        
        this.styleLeft = this.left + dirX
        this.styleTop = this.top + dirY

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
        this.mouseDownFlag = false
        this.dialog.style.transition = this.transition 
        this.$emit('on-mouseUp', this.styleLeft, this.styleTop)
      },
      definePositionWarp(dom) {
        let parent = dom.parentNode
        let positionStyle = window.getComputedStyle(parent, false)['position']
        if (positionStyle === 'relative' || positionStyle === 'absolute' || parent.tagName === 'BODY') {
          return parent
        } else {
          this.definePositionWarp(parent)
        }
      },
      _mDownCtrl() {
        if (this.$parent.$options.name !== 'xdh-map-warp') return
        let otherDialogs = this.$parent.setDialogsSeries(this)
        otherDialogs.forEach((vm, index) => { vm._setIndex(otherDialogs.length - index) }) 
      },
      _setIndex(index) {
        this.zIndex = index * this.dialogLayer
      },
      
      _initDialogPos() {
        let div = document.createElement('DIV')
        div.style = 'position:absolute;' + this.posStyle
        this.field.appendChild(div)
        
        this.width = div.offsetWidth
        this.height = div.offsetHeight
        this.left = div.offsetLeft
        this.top = div.offsetTop

        

        if (!this.closed) {
          this.styleLeft = div.offsetLeft
          this.styleTop = div.offsetTop

          this.dialogW = div.offsetWidth
          this.dialogH = div.offsetHeight
        }
        this.field.removeChild(div)
      }
      
    },
    created() {
       
    },
    mounted() { 

      
      this.dialog = this.$refs.dialog 
      this.dialog.style.transition = this.transition
      
      if (!this.field) {
        this.field = this.definePositionWarp(this.$el)
        this._initDialogPos()
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

<style lang="scss" scoped>
/* 
@import "../../../../theme/_vars";
.xdh-map-dialog{
  display: flex;
  flex-flow: column;
  position: absolute;
  background: $--dialog-bg;
  color: $--dialog-light-color;
  box-shadow: $--shadow-base; // 0 0 8px 0 rgba(0, 0, 0, .5);
  overflow: hidden;
 
  &__header {
    flex: 0 0 30px;
    height: 30px;
    background: $--dialog-title-bg-light;
    line-height: 30px;
    padding: 0 5px;
    cursor: move;
  }
  &__close {
    background: url(../../../../sources/popup/close.png);
    background-size: contain;
    width: 30px;
    height: 30px;
    display: inline-block;
    position: absolute;
    top: 0;
    right: -3px;
    opacity: 0.7;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
 
  &__body {
    flex: 1;
    position: relative;
    width: 100%;
  }
  &__bottom{
    flex: 0 0 auto;
    padding: 2px 0;
    border-top: 1px solid $--border-color-base;
  }
 
   
  &.is-dark {
    .xdh-map-dialog__header {
      color: $--dialog-dark-color;
      background: $--dialog-title-bg-dark;
    }
    .xdh-map-dialog__close {
      background: url(../../../../sources/popup/close_dark.png);
    }
  }
}  
*/
</style>
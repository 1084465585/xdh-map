<template>  
 
  <div :class="{'xdh-map-dialog': true, 'is-dark': isDark}" ref="dialog"   :style="{'width': dialogW, 'height': dialogH,'left': styleLeft + 'px', 'top': styleTop + 'px', 'z-index': zIndex}" @click.stop="_mDownCtrl">
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
      from: {
        type: Array,
        default: () => { return [0, 0] }
      },
      isDark: {
        type: Boolean,
        default: false
      },
      left: {
        type: Number,
        default: 0
      },
      top: {
        type: Number,
        default: 0
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

        dialogW: this.width,
        dialogH: this.height,

        styleLeft: this.left,
        styleTop: this.top,
        originLeft: this.left,
        originTop: this.top,
          

        startX: 0,
        startY: 0,
        
        mouseDownFlag: false,
        field: this.warp,
        zIndex: 1,
        transition: this.animate ? 'all 0.3s' : '',
        closedPos: null
      }
    },
    watch: {
      closed(val) {
        if (val) {
          this.closedPos = [this.styleLeft, this.styleTop]
          this.dialogW = '0px'
          this.dialogH = '0px'
          this.from && this.from.length && this._setPosition(this.from)
        } else {
          this.dialogW = this.width
          this.dialogH = this.height
          if (this.closedPos) {
            this._setPosition(this.closedPos) 
            this.originLeft = this.closedPos[0]
            this.originTop = this.closedPos[1]
          } else {
            this._setPosition([this.left, this.top])
          }
          
          this._mDownCtrl()
        }
        this.currentClosed = val
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
        this.dialog.style.transition = this.transition
        this.originLeft = this.styleLeft
        this.originTop = this.styleTop
 
        this.mouseDownFlag = false
       
        this.$emit('on-mouseDown')

        this.$emit('update:left', this.styleLeft)
        this.$emit('update:top', this.styleTop)
        
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
      _setPosition(pos) {
        this.styleLeft = pos[0]
        this.styleTop = pos[1]
      }
      
    },
    created() {
      if (this.closed) {
        this.dialogW = 0
        this.dialogH = 0
        
      } else {
        this.dialogW = this.width
        this.dialogH = this.height
      }
    },
    mounted() { 

      
      this.dialog = this.$refs.dialog 
      this.dialog.style.transition = this.transition
      
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


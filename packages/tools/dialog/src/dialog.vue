<template> 
  <div v-show="!closed" class="xdh-map-dialog" ref="dialog" :style="{'width': width, 'height': height, 'left': styleLeft + 'px', 'top': styleTop + 'px'}" >
    <i class="xdh-map-dialog__close" @click.stop="closeHandle" ></i>
    <div class="xdh-map-dialog__header"  @mousedown="mouseDownHandle"
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
      title: {
        type: String,
        default: '标题'
      },
      bottom: {
        type: Boolean,
        default: true
      },
      left: {
        type: Number,
        default: 0
      },
      top: {
        type: Number,
        default: 0
      },
      mapWarp: {}
    },
    data() {
      return {
        currentClosed: this.closed, 
        dialog: null,
        
        originLeft: this.left,
        originTop: this.top,

        styleLeft: this.left,
        styleTop: this.top,

        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0,

        mouseDownFlag: false
         
      }
    },
    watch: {
      closed(val) {
        this.currentClosed = val
      }
    },
    methods: {
      closeHandle() {
        console.log('cc', this.styleLeft, this.styleTop)
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
        
        this.styleLeft = this.originLeft + dirX
        this.styleTop = this.originTop + dirY

        let minX = 0
        let minY = 0
        let maxX = this.mapWarp.offsetWidth - this.dialog.offsetWidth
        let maxY = this.mapWarp.offsetHeight - this.dialog.offsetHeight
        
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
        console.log('up')
        this.originLeft = this.styleLeft
        this.originTop = this.styleTop
 
        this.mouseDownFlag = false
      }
    },
    mounted() {

      this.dialog = this.$refs.dialog 
      
      

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


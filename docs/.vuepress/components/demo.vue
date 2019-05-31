<template>
  <div class="demo">
    <div ref="preview" class="demo__preview" :class="{'full-screen':fullscreen}">
      <slot></slot>
      <div class="demo__actions">

        <el-tooltip v-if="fullscreen" class="item" effect="dark" content="取消全屏" placement="top">
          <i class=" el-icon-switch-button" @click="fullscreen=false"></i>
        </el-tooltip>
        <el-tooltip v-else class="item" effect="dark" content="全屏" placement="top">
          <i class="el-icon-full-screen" @click="fullscreen=true"></i>
        </el-tooltip>


      </div>
    </div>
    <transition name="el-zoom-in-top">
      <div class="demo__body" v-if="!collapsed">
        <div class="demo__desc" v-if="$slots.desc">
          <slot name="desc"></slot>
        </div>
        <div class="demo__code">
          <slot name="code"></slot>
        </div>
      </div>
    </transition>
    <div class="demo__handler" @click="handleCollapsed">
      <span v-if="collapsed"><i class="el-icon-caret-bottom"></i> 显示代码</span>
      <span v-else="collapsed"><i class="el-icon-caret-top"></i> 隐藏代码</span>
    </div>
  </div>

</template>

<script>
  import {on, off} from 'element-ui/lib/utils/dom'

  export default {
    data() {
      return {
        collapsed: true,
        fullscreen: false
      }
    },
    watch: {
      fullscreen(val) {
        val ? this.setFullscreen() : this.cancelFullscreen()
      }
    },
    methods: {
      handleCollapsed() {
        this.collapsed = !this.collapsed
      },

      setFullscreen() {
        const el = this.$refs.preview
        const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (typeof rfs !== 'undefined' && rfs) {
          rfs.call(el);
        }
      },
      cancelFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      },
      isFullScreen() {
        return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
      },
      handleFullscreenChange() {
        this.fullscreen = this.isFullScreen()
      }
    },
    mounted() {
      on(this.$refs.preview, 'webkitfullscreenchange', this.handleFullscreenChange)
    },
    beforeDestroy() {
      off(this.$refs.preview, 'webkitfullscreenchange', this.handleFullscreenChange)
    }

  }
</script>

<style lang="scss" scoped>
  .demo {
    padding: 0;
    border: 1px solid #eaecef;
    border-radius: 3px;
    background: #fafafa;
    margin: 1rem 0 3rem 0;

    &__preview {
      padding: 2px;
      background: #fff;
      border-bottom: 1px solid #eaecef;
      border-radius: 3px 3px 0 0;
      position: relative;

      &.full-screen {
        width: 100%;
        height: 100%;
      }

      &:hover {
        .demo__actions {
          background: rgba(0, 0, 0, .2);
          display: inline-block;
        }

      }
    }

    &__actions {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      font-size: 20px;
      padding: 2px;
      border-radius: 4px;
      cursor: pointer;
      display: none;

      &:hover {
        background: rgba(0, 0, 0, .5) !important;
        color: #fff;
      }
    }

    &__desc {
      margin: 10px;
      border: 1px solid #eaecef;
      padding: 12px;
      background: #fff;
      font-size: 14px;

      p {
        margin: 0;
      }
    }

    &__code {
      /deep/ {
        div[class*="language-"] {
          border-radius: 0;
          margin: 0 1px;
        }

        pre {
          margin: 0;
        }
      }
    }

    &__handler {
      text-align: center;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      color: #999;
      font-size: 14px;
      background: #fcfcfc;

      &:hover {
        color: #666;
        background: #fafafa;
      }
    }
  }

</style>

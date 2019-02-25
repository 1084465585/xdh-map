<template>
  <xdh-map-html v-bind="$props"
                ref="html"
                positioning="bottom-center"
                :class="classes"
                :style="styles">
    <i class="xdh-map-popup__close" v-if="closable" @click="hide"></i>
    <div v-if="title" class="xdh-map-popup__title">
      <slot name="title"></slot>
      <i :class="icon"></i> {{title}}
    </div>
    <div class="xdh-map-popup__body">
      <slot></slot>
    </div>
  </xdh-map-html>
</template>

<script>
  import XdhMapHtml from '../../html'
  import {getParent, mapReady} from 'utils/util'

  export default {
    name: 'XdhMapPopup',
    components: {
      XdhMapHtml
    },
    props: {
      ...XdhMapHtml.props,
      width: String,
      height: String,
      title: {
        type: String
      },
      icon: {
        type: String
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeOnClick: {
        type: Boolean,
        default: true
      },
      theme: {
        type: String,
        default: 'light',
        validator() {
          return ['dark', 'light']
        }
      }
    },
    computed: {
      classes() {
        return ['xdh-map-popup', `is-${this.theme}`]
      },
      styles() {
        return {
          width: this.width,
          height: this.height
        }
      }
    },
    methods: {
      show(position) {
        this.$refs.html.show(position || this.position)
      },
      hide() {
        this.$refs.html.hide()
      },
      ready(map) {
        if (this.closeOnClick) {
          map.on('click', this.hide)
        }
      }
    },
    created() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.ready)
    },
    beforeDestroy() {
      if (this.closeOnClick) {
        this.parent.map.un('click', this.hide)
      }
    }
  }
</script>

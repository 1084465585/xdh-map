<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 21:57:21
 * @LastEditTime: 2019-09-14 11:12:57
 * @LastEditors: Please set LastEditors
 -->
<template> 
<div class="xdh-map-drawdown"  style="width: 300px" >
  <div class="item" v-for="(item, index) in tabs" :key="`${index}_${item.id}`">
    <input type="checkbox" v-model="item.open" :id="item.id" @click="clickHandle(item)">
    <div class="xdh-map-drawdown__title">
      <div class="name-warp">
        <slot :name="`${item.id}_title`" v-bind="{...item}">
          <span class="name" style="line-height: 30px">{{item.title}}</span>
        </slot>
      </div>
      
      <label :for="item.id"><i class="iconfont">&#xe6ed;</i></label>
    </div>
    <div class="xdh-map-drawdown__content">
      <div class="inner">
        <slot :name="item.id" v-bind="{...item}"></slot>
      </div>
      
    </div>
  </div>

</div> 
</template>

<script>
  /**
   * DrawDown下拉列表
   * @module xdh-map-drawdown
   */

  /**
   * 插槽
   * @member slots
   * @property {string} title 定义标题内容
   * @property {string} default 定义主体内容
   */
  export default {
    name: 'xdh-map-drawdown',
    /**
     * 参数属性
     * @member props
     * @property {string} [width] 窗体宽度，默认300px
     * @property {array} [data] 下拉列表数据
     */
    props: {
      width: {
        type: String,
        default: '300px'
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      }
      
    },
    data() {
      let tabs = this.data.map((item) => {
        let obj = {
          open: false,
          ...item
        }
        return obj
      })
      return {
        tabs: tabs
      }
    },
    watch: {
      
    },
    methods: {
      clickHandle(item) {
      /**
       * 点击切换时触发
       * @event on-toggle
       * @param {object} item 当前数据对象
       */
        this.$emit('on-toggle', item)
      }
    },
    mounted() {
       

    },
    beforeDestroy() {
    }
  }
</script>


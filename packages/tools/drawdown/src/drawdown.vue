<template> 
<div class="xdh-map-drawdown"  style="width: 300px" >
  <div class="item" v-for="(item, index) in tabs" :key="`${index}_${item.id}`">
    <input type="checkbox" :id="item.id" >
    <div class="xdh-map-drawdown__title">
      <span class="name">{{item.title}}</span>
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
  // import {getParent} from 'utils/util'
  export default {
    name: 'xdh-map-drawdown',
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
       
    },
    mounted() {
       

    },
    beforeDestroy() {
    }
  }
</script>


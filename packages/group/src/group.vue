<template>
  <div>
    <template v-for="(group, index) in groups">
      <template>
        <slot name="group" :group="group" :data="groups">
          <xdh-map-icon class="group-point" :key="`group_${index}`" icon="iconfont icon-locus" :position="group.center" @click="groupPointClick(group)"></xdh-map-icon>
        </slot>
      </template>
      
      <template v-if="group.detailShow">
        <slot name="point" :point="point" :group="group" :data="groups" v-for="(point, i) in group.points">
          <xdh-map-icon class="normal-point"  icon="iconfont icon-locus"
                    :key="`point_${index}_${i}`" v-bind="point" ></xdh-map-icon>
        </slot>
      </template>
      
    </template>
  </div>
</template>
<style scoped lang="scss">

.group-point{
  /deep/ .iconfont.icon-locus{
    font-size: 40px;
    color: red;
  } 
} 
.normal-point{
  /deep/ .iconfont.icon-locus{
    font-size: 20px;
    color: blue;
  } 
}


 
</style>
<script>

  /**
   * 聚合坐标组组件
   * @module xdh-map-group
   */
  import {getParent, mapReady, getScale, pointClot} from 'utils/util'
  import CleanMixin from 'utils/mixins/clean'  
  /**
   * 插槽
   * @member slots
   * @property {string} [group] 表示群的展示
   * @property {string} [point] 表示点的展示
   */
  

   
 

  export default {
    name: 'XdhMapGroup',
    mixins: [CleanMixin],
    /**
     * 参数选项
     * @member props
     * @property {number} [range = 100] 定义群组的半径范围（单位px）
     * @property {array} [data = []] 所有点的数据
     * @property {string} [coorProp = 'position'] 点数据中 坐标的字段名
     * @property {function} [groupsSet = function] 对 分组后的 组列表数据进行修饰的函数（参数 groupList, 返回加工后的groupList）
     */
    props: {
      range: {
        type: Number,
        default: 100
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      coorProp: {
        type: String,
        default: 'position'
      },
      groupsSet: {
        type: Function
      }
    },
    data() {
      return {
        map: null,
        view: null,
        scale: 0,
        groups: []
      }
    },
    watch: {
       
    },
    
    methods: {
      init(map, mapComp) {
        this.map = map
        this.view = this.map.getView()
        this.scale = getScale(map, mapComp)
        let groups = pointClot(this.data, this.scale * this.range, this.coorProp) 
        this.groups = this.groupsSet ? this.groupsSet(groups) : groups 
        this.$emit('on-groupInit', this.groups)
      },
      groupPointClick(group) {
        group.detailShow = true
        this.parent.zoomAt(group.area, {maxZoom: 12})
      }
    },
    created() {
      this.parent = getParent.call(this)
      mapReady.call(this, this.init)
      
    },
    beforeDestroy() {
    }
  }
</script>


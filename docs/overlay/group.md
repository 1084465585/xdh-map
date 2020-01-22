# Group 坐标分组

::: tip 提示
坐标分组组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-group.html)
:::

## 基础用法
:::demo

```html
<template>
  <div style="height: 400px">
    <xdh-map  ref="map" type="Baidu" :zoom="zoom" :center="target" @ready="mapReady">
      <xdh-map-group v-if="textArray.length" :data="textArray" coor-prop="position"  @on-groupInit="groupsInit"
        :groups-set="groupSet" :rang="range" :coorProp="coorProp"
      >
        <template  slot="group" slot-scope="scope">
          <xdh-map-html :visible="!scope.group.detailShow" :position="scope.group.center" @click="groupPointClick(scope.group, scope.data)">
            <div class="group"  >{{scope.group.name}}</div>
          </xdh-map-html>
        </template>
        <template slot="point" slot-scope="scope">
          <xdh-map-html :position="scope.point.position" >
            <div class="point" ></div>
          </xdh-map-html>
        </template>
      </xdh-map-group>
    </xdh-map>
  </div>
</template>
<style scoped lang="scss">
.group{
  padding: 0 5px;
  height: 40px;
  background: red;
  line-height: 40px;
  text-align: center;
}
.point{
  width: 20px;
  height: 20px;
  background: blue;
  border-radius: 50%;
}
</style>
<script>
import {XdhMap, XdhMapGroup, XdhMapHtml} from 'xdh-map'
const random = function(x, y) {
  return (y - x) * Math.random() + x
}
const RANGE = 300
const COOR_PORP = 'position'
const TOTAL = 80
export default {
  components: {
    XdhMap,
    XdhMapGroup,
    XdhMapHtml
  },
  data() {
    return {
      target: [113, 23],
      map: null,
      view: null,  
      zoom: 7,
      range: RANGE,
      coorProp: COOR_PORP,
      total: TOTAL,
      textArray: [],
      groups: []
    }
  },
  methods: {
    mapReady(map) {
      this.map = map
      this.view = this.map.getView()
      this.view.on('change', this.viewChangeHandle)
    },  
    groupPointClick(group, groups) {
      groups.forEach((group) => {
        group.detailShow = false
      })
      this.$nextTick(() => {
        group.detailShow = true
        if (group.points.length === 1) {
          this.$refs.map.moveTo(group.points[0].position)
        } else {
          this.$refs.map.zoomAt(group.area, {maxZoom: 12})
        }
      })
    },
    groupSet(groups) {
      return groups.map((item, index) => {
        return {
          ...item,
          name: `组${index}(${item.points.length})`
        }
      })
    },
    groupsInit(groups) {
      this.groups = groups
    },
    viewChangeHandle(e) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        if (e.target.getZoom() < this.zoom) {
          this.groups.forEach((group) => {
            group.detailShow = false
          })
        }
      }, 500)
    },  
    createTexts() {
      let texts = []
      for (let i = 0; i < this.total; i++) { 
        texts.push({
          position: [random(107, 119), random(20.8, 25.2)],
          text: `${i}`,
          font: '12px',
          background: '#fff',
          strokeColor: 'red',
          padding: [5, 5, 5, 5],
          color: 'blue'
        })
      }
      return texts
    }
  },
  created() {
    this.textArray = this.createTexts()
  }
}
</script>
```

:::

## 通过内置方法实现

> - group 组件内部 使用 “getScale” 和 “pointClot” 方法 实现；
> - getScale(olMap, mapComp) 方法获取当前地图 每px 对应的 距离(米)
> - pointClot(data, distance, propName) 方法 将 坐标点数组 归纳为 group数组
:::demo

```html
<template>
  <div style="height: 400px">
    <xdh-map  ref="map" type="Baidu" :zoom="zoom" :center="target" @ready="mapReady">
      <template v-for="(group, index) in groupList">
        <xdh-map-icon :visible="!group.detailShow" class="main-point" :key="`main_${index}`" icon="iconfont icon-locus" :position="group.center" @click="mainPointClick(group)"></xdh-map-icon>
        <template v-if="group.detailShow">
          <xdh-map-text  v-for="(point, i) in group.points"
                    :key="`text_${index}_${i}`"
                    v-bind="point"
          ></xdh-map-text>
        </template>
      </template>
    </xdh-map>
  </div>
</template>
<style scoped lang="scss">
.main-point{
  /deep/ .iconfont.icon-locus{
    font-size: 40px;
    color: red;
  }
}
</style>
<script>
import {XdhMap, XdhMapIcon, XdhMapText} from 'xdh-map'
import {getScale, pointClot} from 'utils/util'
const random = function(x, y) {
  return (y - x) * Math.random() + x
}
const RANGE = 150
const COOR_PORP = 'position'
const TOTAL = 80
export default {
  components: {XdhMap, XdhMapIcon, XdhMapText},
  data() {
    return {
      map: null,
      view: null,  
      zoom: 7,
      target: [113, 23],
      total: TOTAL,
      textArray: [],
      groupList: []
    }
  },
  methods: {
    mapReady(map, mapComp) {
      this.map = map
      this.view = this.map.getView()
      let scale = getScale(map, mapComp)
      this.groupList = pointClot(this.textArray, scale * RANGE, COOR_PORP)
    },
    mainPointClick(group) {
      this.groupList.forEach((group) => {
        group.detailShow = false
      })
      this.$nextTick(() => {
        group.detailShow = true
        if (group.points.length === 1) {
          this.$refs.map.moveTo(group.points[0].position)
        } else {
          this.$refs.map.zoomAt(group.area, {maxZoom: 10})
        }
      })
    },
    createTexts() {
      let texts = []
      for (let i = 0; i < this.total; i++) {
        texts.push({
          position: [random(107, 119), random(20.8, 25.2)],
          text: `${i}`,
          font: '12px',
          background: '#fff',
          strokeColor: 'red',
          padding: [5, 5, 5, 5],
          color: 'blue'
        })
      }
      return texts
    }
  },
  created() {
    this.textArray = this.createTexts()
  }
}
</script>
```

:::

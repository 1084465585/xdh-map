# 内置折叠菜单

::: tip 提示
地图内置折叠
组件[API文档](/api.html?url=/doc/module-xdh-map-drawdown.html)
:::

## 基础用法

:::demo

```html
<template>
    <div style="height: 500px">
       <xdh-map :zoom="16" :center="[120.2014, 30.2574]" ref="map" >
        <xdh-map-placement placement="left-top" :margin="[0,0,0,0]">
          <xdh-map-drawdown :data="tabs">
            <template v-slot:test1_title="props">
              <span class="name">{{props.title}}({{props.data.ul.length}})</span>
            </template>
            <template v-slot:test1="props">
              <div class="content" >
                <h4>这个是tab1 的列表</h4>
                <ul>
                  <li v-for="(item, index) in props.data.ul" :key="index">{{item}}</li>
                </ul>
              </div>
            </template>

            
            <template v-slot:test2="props">
              <div class="content" >
                <h4>这个是tab2 的文字</h4>
                <p>{{props.data.content}}</p>
              </div>
            </template>
            
          </xdh-map-drawdown>
        </xdh-map-placement>
        
      </xdh-map>
    </div>
</template>
 
<script>
import {XdhMap, XdhMapDrawdown, XdhMapPlacement } from 'xdh-map'
  export default {
    components: {
      XdhMap,
      XdhMapDrawdown,
      XdhMapPlacement
    },
    data() {
      return {
        tabs: [
          {
            title: 'test1', 
            id: 'test1', 
            open: true, 
            data: {
              ul: ['A', 'B', 'C', 'D']
            }
          },
          {
            title: 'test2', 
            id: 'test2', 
            open: false,
            data: {
              content: '“美国人”可能是一位基督徒，犹太教徒，佛教徒，或穆斯林。事实上，在美国的穆斯林比在阿富汗的穆斯林还多，不同的是，在美国他们有选择敬拜谁的自由。'  
            }
          }
        ]
      }
    },
    watch: {
      
    },
    methods: {
      
    }
  }
</script>

```

:::

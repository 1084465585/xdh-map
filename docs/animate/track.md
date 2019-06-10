# Track 轨迹

::: tip 提示
在地图上显示移动轨迹， 组件[API 文档](/api.html?url=/xdh-map/doc/module-xdh-map-track.html)
:::

## 基础用法

:::demo

```html
<template>
  <xdh-map :center="center">
    <xdh-map-track :routes="line1" :src="car" :steps="50"></xdh-map-track>
    <xdh-map-line
      :routes="line1"
      stroke-color="blue"
      :stroke-line-dash="[10]"
      :stroke-width="4"
    ></xdh-map-line>

    <xdh-map-track :routes="line2" :loop="false" :src="car"></xdh-map-track>
    <xdh-map-line
      :routes="line2"
      stroke-color="red"
      :stroke-width="4"
    ></xdh-map-line>

    <xdh-map-track :routes="line3" @move="handleMove"></xdh-map-track>
    <xdh-map-line
      :routes="passLine"
      stroke-color="green"
      :stroke-width="4"
    ></xdh-map-line>
    <xdh-map-line
      :routes="toLine"
      stroke-color="red"
      :stroke-line-dash="[10]"
      :stroke-width="4"
    ></xdh-map-line>
    <xdh-map-circle
      :position="position"
      fill="blue"
      :z-index="100"
      :radius="0.01"
    ></xdh-map-circle>
  </xdh-map>
</template>

<script>
  import { XdhMap, XdhMapTrack, XdhMapLine, XdhMapCircle } from 'xdh-map';

  export default {
    components: {
      XdhMap,
      XdhMapTrack,
      XdhMapLine,
      XdhMapCircle
    },
    data() {
      return {
        center: [120.0, 30.186209],
        car: require('sources/track/car-small.png'),
        line1: [
          [119.960972, 30.246209],
          [119.975288, 30.235707],
          [119.979764, 30.235124],
          [120.039173, 30.24337],
          [120.05753, 30.217952],
          [120.058055, 30.21669],
          [120.054571, 30.20782],
          [120.0525, 30.19384],
          [120.054734, 30.185295],
          [120.073708, 30.166286],
          [120.081231, 30.160251]
        ],
        line2: [
          [119.40466, 30.167937],
          [119.553405, 30.22849],
          [119.58027, 30.028843],
          [119.872781, 30.159321]
        ],
        line3: [[119.534941, 29.817538], [120.401155, 29.827967]],
        passLine: [],
        toLine: [],
        position: []
      };
    },
    methods: {
      handleMove(routes, index) {
        this.passLine = routes.slice(0, index);
        this.toLine = routes.slice(index);
        this.position = routes[index];
      }
    },
    created() {}
  };
</script>
```

:::

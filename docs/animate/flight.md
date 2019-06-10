# Flight 迁徙路线

::: tip 提示
 在地图上覆盖echart图显示飞行轨迹， 组件[API文档](/api.html?url=/xdh-map/doc/module-xdh-map-echarts.html)
:::

## 基础用法

:::demo

```html
<template>
    <xdh-map :min-zoom="4" :zoom="4">
      <xdh-map-echarts :lib="lib" :options="options">
      </xdh-map-echarts>
    </xdh-map>
</template>

<script>
  import echarts from 'echarts'
  import geoCoordMap from 'demo-data/city'
 import {XdhMap, XdhMapEcharts} from 'xdh-map'

  const BJData = [
    [{
      name: '北京'
    }, {
      name: '上海',
      value: 95
    }],
    [{
      name: '北京'
    }, {
      name: '广州',
      value: 90
    }],
    [{
      name: '北京'
    }, {
      name: '大连',
      value: 80
    }],
    [{
      name: '北京'
    }, {
      name: '南宁',
      value: 70
    }],
    [{
      name: '北京'
    }, {
      name: '南昌',
      value: 60
    }],
    [{
      name: '北京'
    }, {
      name: '拉萨',
      value: 50
    }],
    [{
      name: '北京'
    }, {
      name: '长春',
      value: 40
    }],
    [{
      name: '北京'
    }, {
      name: '包头',
      value: 30
    }],
    [{
      name: '北京'
    }, {
      name: '重庆',
      value: 20
    }],
    [{
      name: '北京'
    }, {
      name: '常州',
      value: 10
    }]
  ];

  const SHData = [
    [{
      name: '上海'
    }, {
      name: '包头',
      value: 95
    }],
    [{
      name: '上海'
    }, {
      name: '昆明',
      value: 90
    }],
    [{
      name: '上海'
    }, {
      name: '广州',
      value: 80
    }],
    [{
      name: '上海'
    }, {
      name: '郑州',
      value: 70
    }],
    [{
      name: '上海'
    }, {
      name: '长春',
      value: 60
    }],
    [{
      name: '上海'
    }, {
      name: '重庆',
      value: 50
    }],
    [{
      name: '上海'
    }, {
      name: '长沙',
      value: 40
    }],
    [{
      name: '上海'
    }, {
      name: '北京',
      value: 30
    }],
    [{
      name: '上海'
    }, {
      name: '丹东',
      value: 20
    }],
    [{
      name: '上海'
    }, {
      name: '大连',
      value: 10
    }]
  ];

  const GZData = [
    [{
      name: '广州'
    }, {
      name: '福州',
      value: 95
    }],
    [{
      name: '广州'
    }, {
      name: '太原',
      value: 90
    }],
    [{
      name: '广州'
    }, {
      name: '长春',
      value: 80
    }],
    [{
      name: '广州'
    }, {
      name: '重庆',
      value: 70
    }],
    [{
      name: '广州'
    }, {
      name: '西安',
      value: 60
    }],
    [{
      name: '广州'
    }, {
      name: '成都',
      value: 50
    }],
    [{
      name: '广州'
    }, {
      name: '常州',
      value: 40
    }],
    [{
      name: '广州'
    }, {
      name: '北京',
      value: 30
    }],
    [{
      name: '广州'
    }, {
      name: '北海',
      value: 20
    }],
    [{
      name: '广州'
    }, {
      name: '海口',
      value: 10
    }]
  ];

  const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

  const convertData = function (data) {
    const res = [];
    for (let i = 0; i < data.length; i++) {
      const dataItem = data[i];
      const fromCoord = geoCoordMap[dataItem[0].name];
      const toCoord = geoCoordMap[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord]
        });
      }
    }
    return res;
  };

  const color = ['#a6c84c', '#ffa022', '#46bee9'];
  let series = [];
  [
    ['北京', BJData],
    ['上海', SHData],
    ['广州', GZData]
  ].forEach(function (item, i) {
    series.push({
      name: item[0] + ' Top10',
      type: 'effectScatter',
      coordinateSystem: 'ol',
      zlevel: 2,
      rippleEffect: {
        brushType: 'stroke'
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{b}'
        }
      },
      symbolSize: function (val) {
        return val[2] / 4;
      },
      showEffectOn: 'render',
      itemStyle: {
        normal: {
          color: color[i]
        }
      },
      data: [{
        name: item[0],
        value: geoCoordMap[item[0]].concat([100])
      }]
    }, {
      name: item[0] + ' Top10',
      type: 'lines',
      coordinateSystem: 'ol',
      zlevel: 1,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: '#fff',
        symbolSize: 3
      },
      lineStyle: {
        normal: {
          color: color[i],
          width: 0,
          curveness: 0.2
        }
      },
      data: convertData(item[1])
    }, {
      name: item[0] + ' Top10',
      type: 'lines',
      coordinateSystem: 'ol',
      zlevel: 2,
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbol: planePath,
        symbolSize: 15
      },
      lineStyle: {
        normal: {
          color: color[i],
          width: 2,
          opacity: 0.4,
          curveness: 0.2
        }
      },
      data: convertData(item[1])
    }, {
      name: item[0] + ' Top10',
      type: 'effectScatter',
      coordinateSystem: 'ol',
      zlevel: 2,
      rippleEffect: {
        brushType: 'stroke'
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{b}'
        }
      },
      symbolSize: function (val) {
        return val[2] / 4;
      },
      showEffectOn: 'render',
      itemStyle: {
        normal: {
          color: color[i]
        }
      },
      data: item[1].map(function (dataItem) {
        return {
          name: dataItem[1].name,
          value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
        };
      })
    });
  });

  export default {
    components: {
     XdhMap,
     XdhMapEcharts
   },
    data() {
      return {
        lib: echarts,
        options: {
          series: series
        }
      }
    }
  }
</script>

```

:::
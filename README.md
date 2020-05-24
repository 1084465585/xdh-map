# 新德汇地图应用类库

新版: [MyWeb 4.x](http://newgateway.gitee.io/my/ui/map/)

基于Openlayers的地图应用Vue组件。内置了百度、高德、天地图、离线Google、方正PGIS、超图PGIS 瓦片图层。 包含文本、图形、html、热力图、轨迹回放等20个组件，支持与ECharts结合实现散点、飞行迁徙等基于地理位置的图表，满足项目常见需求。 使用者不需要有地图相关专业知识，甚至不需要写任何JS代码就能实现通用功能。


## 安装
```
npm install xdh-map --save
```

### 全量引入
```
import XdhMap from 'xdh-map'
import Vue from 'vue'
import 'xdh-map/lib/xdhmap.css'
Vue.use(XdhMap)

```

### 按需引入
```
import 'xdh-map/lib/xdhmap.css'
import {XdhMap, XdhMapCircle} from 'xdh-map'

```

### 使用示例

```
<xdh-map>
    <xdh-map-circle :position="[120, 30]"
                    :radius="0.1"
                    fill="blue"
                    stroke-color="red"
                    :stroke-width="5"></xdh-map-circle>
</xdh-map>
```
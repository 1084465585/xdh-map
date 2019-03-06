# 新德汇地图应用开发类库

基于Openlayers封装的Vue组件，支持轨迹动画和接入ECharts。


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
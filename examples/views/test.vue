<template>
  <example>
    <div class="warp"  >
      <xdh-map ref="map" type="Amap"  :zoom="11" :center="[116.23, 39.54]" @ready="mapReady"    >
        <xdh-map-icon icon="iconfont icon-locus" :position="target"></xdh-map-icon>
      </xdh-map>
    </div>
    <div>
      <button @click="drawClick">click</button>
      {{target}}</div> 
      <!-- 'WGS84' | 'GCJ02' | 'BD09' -->
    <div class="warp"  >
      <xdh-map ref="map" type="Baidu"  :zoom="11" :center="[116.23, 39.54]" @click="mapClick" >
        <xdh-map-icon icon="iconfont icon-locus" :position="[116.23, 39.54]"></xdh-map-icon>
        <xdh-map-draw ref="circle" type="Circle" @drawend="drawend" ></xdh-map-draw>
      </xdh-map>
    </div>
   
    
  </example>
</template>

<script>
  // import { convertFromWgs84 } from 'utils/convert'
  import VectorLayer from 'ol/layer/Vector'
  import VectorSource from 'ol/source/Vector'
  import guangdong from '../data/province/guangdong.json' 
  import {parseStyle} from '../../packages'
  import { transform, WGS84, BD09 } from 'gcoord' // GCJ02
  const style = function () {
    return parseStyle({
      className: 'Style',
      fill: {
        className: 'Fill',
        color: 'rgba(0,0,0,.3)'
      },
      stroke: {
        className: 'Stroke',
        color: 'red',
        width: 5
      }
    })
  }
  export default {
    
    data() {
      return {
        map: null,
        view: null,
        layer: null,
        layerSource: null,
        state: guangdong,
        isEdit: false,
        target: [116.23, 39.54]
      }
    },
    computed: {
       
    },
    methods: {
      mapReady(map) {
        this.map = map
        this.layerSource = new VectorSource({ 
        })
        this.layer = new VectorLayer({
          source: this.layerSource
        })
        map.addLayer(this.layer) 
        // console.log(layers)
        // this.map.addLayer(this.featureOverlay)
      },
      mapClick(e) {
        // console.log(e)
        this.target = transform(e.coordinate, BD09, WGS84)
        console.log(e.coordinate, this.target)
      },
      drawend(e) {
        console.log(e.feature, this.layerSource)
        let feature = e.feature.clone()
        
        feature.setStyle(style())
        this.layerSource.addFeature(feature) 
      },
      drawClick() {
        this.isEdit = !this.isEdit
        if (this.isEdit) {
          this.$refs.circle.draw()
        } else {
          this.$refs.circle.finish()
        }
      }
    },
    mounted() {
      console.log(this.state)
    }
  }
</script>

<style scoped lang="scss">
.warp{
  width: 80%; 
  height: 400px; 
  margin: 0 auto; 
  // background: black;
  border:1px solid red;
}
.tooltip{
  padding: 5px;
  background: white;
  border-radius: 10px;
  text-align: center;
}
</style>

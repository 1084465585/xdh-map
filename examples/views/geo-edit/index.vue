<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-13 10:03:58
 * @LastEditTime: 2019-10-14 23:22:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <example>
    <xdh-map
      ref="map"
      type="Amap"
      :zoom="12"
      :center="[113.40, 23.06]"
      @ready="mapReady"
      :layer-config="layerConfig"
    >
      <xdh-map-placement placement="right-bottom" :margin="[10, 10]" theme="light">
        <div class="edit-btn-wrap clearfix">
          <div class="edit-btn" title="添加" @click="toEdit" v-show="state.features.length">
            <span class="iconfont">&#xe720;</span>
            {{editing ? '保存编辑' : '编辑'}}
          </div>
          <label for="uploadJson" class="edit-btn" title="导入">
            <span class="iconfont">&#xe69e;</span>
            导入
          </label>
          <input style="display: none" type="file" id="uploadJson" @change="uploadChange">
        </div>
      </xdh-map-placement>

      <xdh-map-geo
        v-if="isUpload && state.features.length"
        ref="geo"
        :state="state"
        :draw-define="drawDefineFn"
      ></xdh-map-geo>

      <xdh-map-draw ref="polygon" type="Polygon"   @drawend="addDrawEnd"></xdh-map-draw>
    </xdh-map>
  </example>
</template>
<style lang="scss" scope>
.clearfix {
  &:after {
    content: '';
    display: table;
    clear: both;
  }
}
.edit-btn-wrap {
  padding: 5px;
  .edit-btn {
    float: left;
    margin: 0 6px;
    cursor: pointer;
  }
}
</style>
<script>
import { parseStyle } from '../../../packages/index.js'
import { colorRgb } from './colorChange.js'
const STYLE_PROPERTIES = {'stroke': '#555555', 'stroke-width': 2, 'stroke-opacity': 1, 'fill': '#555555', 'fill-opacity': 0.5}
const Style = function(obj) {
  let fill = obj['fill'] || '#555555'
  let stroke = obj['stroke'] || '#555555'
  let fillStr = colorRgb(fill)
  let fillColor =
    fillStr.substring(0, fillStr.length - 1) + `,${obj['fill-opacity'] || 0.5})`
  let strokeStr = colorRgb(stroke)
  let strokeColor =
    strokeStr.substring(0, strokeStr.length - 1) +
    `,${obj['stroke-opacity'] || 1})`
  return parseStyle({
    className: 'Style',
    fill: {
      className: 'Fill',
      color: fillColor
      // opacity: obj['fill-opacity']
    },
    stroke: {
      className: 'Stroke',
      color: strokeColor,
      width: obj['stroke-width'] || 2
      // opacity: obj['stroke-opacity']
    }
  })
}

export default {
  mixins: [],
  components: {},
  props: {
    
  },
  data() {
    return {
      map: null,
      viewer: null,
      state: { type: 'FeatureCollection', features: [] },

      isUpload: true,
      // ---------
      editing: false,
      editPol: [],
      // ---------


      layerConfig: {
        Amap: {
          title: '高得地图',
          server: 'http://webrd03.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}&lang=zh_cn'
        }
      }
    }
  },
  computed: {

  },
  methods: {
    mapReady(map, vm) {
      this.map = map
      this.viewer = this.map.getView()
    },
    uploadChange(event) {
      let file = event.target.files[0]
      if (file && file.type === 'application/json') {
        let fileReader = new FileReader()
        fileReader.readAsText(file)
        fileReader.onload = e => {
          this.isUpload = true
          let uploadData = JSON.parse(e.currentTarget.result)
          if (!this.state.features.length) {
            this.state = uploadData
          } else {
            this.editPol = []
            this.state.features = this.state.features.concat(
              uploadData.features
            )
          }
        }
      }
    },
    drawDefineFn(feature, obj) {
      
      let newFeature = feature.clone()
      
      newFeature.setProperties({...obj.properties, ...STYLE_PROPERTIES})
      newFeature.setStyle(Style(obj.properties))

      this.$refs.map.addFeature(newFeature)
      this.editPol.push(newFeature)
      this.$refs.polygon.addFeatures([newFeature])

      feature.setStyle(
        parseStyle({
          className: 'Style',
          fill: { className: 'Fill', color: 'transparent' },
          stroke: { className: 'Stroke', color: 'transparent', width: 1 }
        })
      )
    },
    /*
      导入geo文件后 让地图定位到对应区域
    */
    drawDone(features) {
      let point = features[0].Feature.getGeometry()
        .getInteriorPoint()
        .getCoordinates()
      this.viewer.animate({
        center: point
      })
    },
    toEdit() {
      this.adding = false
      this.$refs.polygon.finish()
      if (!this.editing) {
        this.$refs.polygon.modify()
      } else {
        this.$refs.polygon.finish()
        this.saveEdit(this.editPol)
      }
      this.editing = !this.editing
    },
    addDrawEnd(e) {
      console.log(e.convert.feature)
    },
    saveEdit(editPol) {
      let geos = []
      let coords = []
      let propsArr = editPol.map((f) => {
        let props = f.getProperties()
        geos.push(f.getGeometry().getType())
        coords.push(f.getGeometry().getCoordinates())
        delete props.geometry
        return props
      })
       
      let features = propsArr.map((item, index) => {
        return {
          type: 'Feature',
          properties: {...item},
          geometry: {
            type: geos[index],
            coordinates: coords[index]
          }
        }
      })
      let output = {
        'type': 'FeatureCollection',
        'features': features
      }
      console.log(JSON.stringify(output))
      
    }
  },
  created() {},
  mounted() {}
}
</script>

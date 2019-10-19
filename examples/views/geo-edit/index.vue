<template>
  <example>
    <xdh-map
      ref="map"
      type="Amap"
      :zoom="12"
      :center="[113.40, 23.06]"
      @ready="mapReady"
      @click="featureClickHandle"
      :layer-config="layerConfig"
    >
      <xdh-map-placement placement="right-bottom" :margin="[10, 10]" theme="light">
        <div class="edit-btn-wrap clearfix">
          <div class="edit-btn" title="添加" @click="toAdd">
            <span class="iconfont">&#xe768;</span>
            {{adding ? '保存添加' : '添加'}}
          </div>
          <div class="edit-btn" title="添加" @click="toEdit" v-show="editPol.length">
            <span class="iconfont">&#xe720;</span>
            {{editing ? '保存编辑' : '编辑'}}
          </div>
          <label for="uploadJson" class="edit-btn" title="导入">
            <span class="iconfont">&#xe69e;</span>
            导入
          </label>
          <input style="display: none" type="file" id="uploadJson" @change="uploadChange">
          <div class="edit-btn" v-if="editPol.length" @click="saveOutput">输出</div>
        </div>
      </xdh-map-placement>

      <xdh-map-geo
        v-if="isUpload && state.features.length"
        ref="geo"
        :state="state"
        :draw-define="drawDefineFn"
        @ready="drawDone"
      ></xdh-map-geo>

      <xdh-map-draw ref="polygon" type="Polygon" @drawend="addDrawEnd"></xdh-map-draw>

      <edit-popup
        ref="editPopup"
        :position="popupCenter"
        :offset="[0,0]"
        :show="popupShow" 
        @on-save="propertiesSaveHandle"
      ></edit-popup>
      <!--  -->
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
import EditPopup from './edit-popup'
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
  components: {
    EditPopup
  },
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
      adding: false,
      // ---------  
      layerConfig: {
        Amap: {
          title: '高得地图',
          server: 'http://webrd03.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}&lang=zh_cn'
        }
      },
      // ------
      popupShow: false,
      popupCenter: [],
      editFeature: null,
      outputString: ''
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
          this.state = uploadData
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
        // this.saveEdit(this.editPol)
      }
      this.editing = !this.editing
    },
    toAdd() {
      this.editing = false
      this.$refs.polygon.finish()
      if (!this.adding) {
        this.$refs.polygon.draw()
      } else {
        // this.saveEdit(this.editPol)
        this.$refs.polygon.finish()
      }
      this.adding = !this.adding
    },
    addDrawEnd(e) {
      e.convert.feature.setProperties({...STYLE_PROPERTIES})
      e.convert.feature.setStyle(Style({}))
      this.editPol.push(e.convert.feature)
    },
    featureClickHandle(e) {
      if (this.adding) return
      if (this.editing) {
        this.$refs.polygon.finish()
      }
      const feature = this.$refs.map.getFeatureAtPixel(e.pixel)
      if (!feature) return
      this.popupShow = true
      // 如果使用BD09或GCJ02坐标，须使用转换过的坐标e.convert.coordinate
      this.popupCenter = e.convert.coordinate

      this.editFeature = feature
      console.log(feature.getId())
      let editTargetProp = {...feature.getProperties()}
      delete editTargetProp.geometry 
      this.$refs.editPopup.setProps(editTargetProp)
    },
    propertiesSaveHandle(props) {
      this.editFeature.setProperties({...props})
      // this.saveEdit(this.editPol)
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
      
      this.outputString = JSON.stringify(output)
      console.log(this.outputString)
    },
    saveOutput() {
      this.saveEdit(this.editPol)
      const elementA = document.createElement('a');
      elementA.download = +new Date() + '.txt'
      elementA.style.display = 'none';
      let blob = new Blob([this.outputString])
      elementA.href = URL.createObjectURL(blob)
      document.body.appendChild(elementA)
      elementA.click()
      document.body.removeChild(elementA)
    }
  },
  created() {},
  mounted() {}
}
</script>

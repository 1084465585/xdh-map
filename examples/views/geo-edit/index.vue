<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-20 09:51:58
 * @LastEditTime: 2019-10-20 13:11:47
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
      @click="featureClickHandle"
      @on-boxend="boxEndHandle"
      @on-dragDown="dragDownHandle"
      :layer-config="layerConfig"
    >
      <xdh-map-placement placement="right-bottom" :margin="[10, 10]" theme="light">
        <div class="edit-btn-wrap clearfix">
          <div class="edit-btn" title="添加" @click="toAdd">
            <span class="iconfont">&#xe720;</span>
            {{adding ? '保存添加' : '添加'}}
          </div>
          <div class="edit-btn" title="添加" @click="toEdit" v-show="editPol.length">
            <span class="iconfont">&#xe768;</span>
            {{editing ? '保存编辑' : '编辑'}}
          </div>
          <label for="uploadJson" class="edit-btn" title="导入">
            <span class="iconfont">&#xe69e;</span>
            导入
          </label>
          <input style="display: none" type="file" id="uploadJson" @change="uploadChange">
          <div class="edit-btn" v-if="editPol.length" @click="saveOutput">
            <span class="iconfont">&#xe7a3;</span>
            输出
          </div>
        </div>
      </xdh-map-placement>

      <xdh-map-placement placement="left-bottom" :margin="[10, 10]" theme="light">
        <div class="edit-btn-wrap clearfix">
          <div class="edit-btn" title="拖动" @click="dragable = !dragable">
            <span class="iconfont">&#xe6ae;</span>
            {{dragable ? '拖动' : '打开拖动'}}
          </div>
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
        @on-delete="featureDeleteHandle"
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
.custom-drag-box{
  border: 2px solid red;
}
</style>
<script>
import EditPopup from './edit-popup'
import { parseStyle } from '../../../packages/index.js'
import { colorRgb } from './colorChange.js'
import additionFeature from './addition-feature'


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
  mixins: [additionFeature],
  components: {
    EditPopup
  },
  props: {
    
  },
  data() {
    return {
      map: null,
      mapComp: null,
      viewer: null,
      // ---------  
      layerConfig: {
        Amap: {
          title: '高得地图',
          server: 'http://webrd03.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}&lang=zh_cn'
        }
      },
      // 编辑图形的数组
      editPol: [],
      // 上传---------
      state: { type: 'FeatureCollection', features: [] },
      isUpload: true,
      // 编辑---------
      editing: false, // 编辑状态
      // ---------
      adding: false, // 添加状态
      
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
      this.mapComp = vm
      this.viewer = this.map.getView()
      this.dragCtrl = this.dragCtrlRegister(this.mapComp, {
        featureDefine: (feature) => {
          if (this.dragable) {
            return feature
          }
        }
      })
      this.areaSelect = this.areaSelectRegister(this.map, this.mapComp, {
        class: 'custom-drag-box'
      })
      map.addInteraction(this.dragCtrl)
      map.addInteraction(this.areaSelect)
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
      
      newFeature.setProperties({...obj.properties, ...STYLE_PROPERTIES, _tempId: new Date().getTime(), _isImport: true})
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
      e.convert.feature.setProperties({...STYLE_PROPERTIES, ...{_tempId: new Date().getTime()}})
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
      console.log('feature', feature, feature.get('_tempId'))
      let editTargetProp = {...feature.getProperties()}
      delete editTargetProp.geometry 
      this.$refs.editPopup.setProps(editTargetProp)
    },
    propertiesSaveHandle(props) {
      let oldKeys = this.editFeature.getKeys().filter((item) => { return item !== 'geometry' })
      oldKeys.forEach((item) => {
        if (Object.keys(props).findIndex((key) => { return key === item }) < 0) {
          this.editFeature.unset(item)
        }
      })
      this.editFeature.setProperties({...props}) 
      // this.saveEdit(this.editPol)
    },
    featureDeleteHandle(tempId) {
      let target = null
      let targetIndex = -1
      this.editPol.forEach((feature, index) => {
        if (feature.get('_tempId') === tempId) {
          target = feature
          targetIndex = index
        }
      })
      if (target.get('_isImport')) {
        this.mapComp.removeFeature(target)
      } else {
        this.$refs.polygon.remove(target)
      }
      this.editPol.splice(targetIndex, 1)
      this.editFeature = null
      this.popupShow = false
      this.popupCenter = []
      console.log(this.editPol)
    },
    saveEdit(editPol) {
      let geos = []
      let coords = []
      let propsArr = editPol.map((f) => {
        let props = f.getProperties()
        geos.push(f.getGeometry().getType())
        coords.push(f.getGeometry().getCoordinates())
        delete props.geometry
        delete props._tempId
        delete props._isImport
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
      /*
      const elementA = document.createElement('a');
      elementA.download = +new Date() + '.txt'
      elementA.style.display = 'none';
      let blob = new Blob([this.outputString])
      elementA.href = URL.createObjectURL(blob)
      document.body.appendChild(elementA)
      elementA.click()
      document.body.removeChild(elementA)
       */
      
    },
    _Style: Style
  },
  created() {},
  mounted() {}
}
</script>

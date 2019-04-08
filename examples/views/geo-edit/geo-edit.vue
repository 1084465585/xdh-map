<template>
  <example>
    <xdh-map ref="map" type="Amap" :zoom="12" :center="[113.40, 23.06]" @ready=mapReady @click="featureClickHandle" :layer-config="layerConfig">
      <xdh-map-geo v-if="isUpload && state.features.length" ref="geo" :state="state"  :draw-define="drawDefineFn" @ready="drawDone"></xdh-map-geo>
      

      <xdh-map-placement placement="right-bottom" :margin="[10, 10]" theme="light"  >
        <div class="edit-btn-wrap clearfix">
          <div class="edit-btn" title="添加" @click="toEdit" v-show="state.features.length">
            <span class="iconfont">&#xe720;</span>
            {{editing ? '保存编辑' : '编辑'}}
          </div>  
          <div class="edit-btn" title="添加" @click="toAdd">
            <span class="iconfont">&#xe768;</span>
            {{adding ? '保存添加' : '添加'}}
          </div> 
          <div class="edit-btn" title="导出" @click="saveJson">
            <span class="iconfont">&#xe79c;</span>
            导出
          </div>
          <label for="uploadJson" class="edit-btn" title="导入">
            <span class="iconfont">&#xe69e;</span>
            导入
          </label>
          <input style="display: none" type="file" id="uploadJson" @change="uploadChange"/>
        </div>
      </xdh-map-placement>
      
      <!-- v-if="editPol.length" :default-features="editPol" -->
      <xdh-map-draw ref="polygon" type="Polygon"  @drawstart="drawStartHandle" @drawend="addDrawEnd" ></xdh-map-draw>
      
      <edit-popup :position="popupCenter" :offset="[0,0]" :show="popupShow" :target="editTarget" @on-save="propertiesSaveHandle"></edit-popup>
      
    </xdh-map>
  </example>
</template>


<style scoped lang="scss">
.clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
.edit-btn-wrap{
  padding: 5px;
  .edit-btn{
    float: left;
    margin: 0 6px;
    cursor: pointer;
  }
}

</style>

<script>
  // import {clone} from 'ol/Feature'
  import {colorRgb} from './colorChange.js'
  // import china from './test.json'
  import {parseStyle} from '../../../packages/index.js'
  import EditPopup from './edit-popup'
  const Style = function(obj) {
    let fill = obj['fill'] || '#555555'
    let stroke = obj['stroke'] || '#555555'
    let fillStr = colorRgb(fill)
    let fillColor = fillStr.substring(0, fillStr.length - 1) + `,${obj['fill-opacity'] || 0.5})`
    let strokeStr = colorRgb(stroke)
    let strokeColor = strokeStr.substring(0, strokeStr.length - 1) + `,${obj['stroke-opacity'] || 1})`
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
    components: {
      EditPopup
    },
    data() {
      return {
        map: null,
        viewer: null,

        isUpload: false, 
        state: {'type': 'FeatureCollection', 'features': []}, // 导入geo的数据文件
        formattedState: {'type': 'FeatureCollection', 'features': []},

        // ---------
        editing: false,
        editPol: [],
        // ---------
        adding: false,
        // ---------

        popupCenter: [0, 0],
        popupShow: false,
        editTarget: {
          geometry: null,
          properties: {}
        },

        layerConfig: {
          Amap: {
            title: '高得地图',
            server: 'http://webrd03.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}&lang=zh_cn'
          }
        }
      }
    },
    methods: {
      uploadChange(event) {
        let file = event.target.files[0]
        if (file && file.type === 'application/json') {
          
          let fileReader = new FileReader()
          fileReader.readAsText(file)
          fileReader.onload = (e) => {
            this.isUpload = true
            let uploadData = JSON.parse(e.currentTarget.result)
            if (!this.state.features.length) {
              this.state = uploadData
            } else {
              this.editPol = []
              this.state.features = this.state.features.concat(uploadData.features)
            }
          }
        }
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
      saveEdit(editPol) {
        let oldFeatures = this.state.features
        editPol.forEach((item, index) => {
          let newCoor = item.getGeometry().getCoordinates()
          let _geometry = oldFeatures[index].geometry
          _geometry.coordinates = newCoor
        })
       
      },
      toAdd() {
        this.editing = false
        this.$refs.polygon.finish()
        this.saveEdit(this.editPol)
        if (!this.adding) {
          this.$refs.polygon.draw()
        } else {
          this.$refs.polygon.finish()
        }
        this.adding = !this.adding
      },

      saveJson() {
        if (!this.state.features.length) {
          alert('当前未有图形')
          return
        }
        if (this.adding || this.editing) {
          alert('请先保存当前改动')
        } else {
          console.log(JSON.stringify(this.state))
          // let link = document.createElement('a')
          // link.download = 'geo.json'
          // link.href = this.state
          // link.click()
        }
        
      },
      drawStartHandle(e) {
        console.log(e)
      },
      addDrawEnd(e) {
        this.editPol.push(e.feature)
        this.state.features.push({
          'type': 'Feature',
          'properties': {
            'stroke': '#555555',
            'stroke-width': 2,
            'stroke-opacity': 1,
            'fill': '#555555',
            'fill-opacity': 0.5
          },
          'geometry': {
            'type': 'Polygon',
            'coordinates': e.feature.getGeometry().getCoordinates()
          }
        })
        e.feature.setStyle(Style({}))
      },
      featureClickHandle(e) {
        // console.log(e)
        if (this.adding) return
        const feature = this.$refs.map.getFeatureAtPixel(e.pixel)
        // console.log(feature.getProperties())
        if (!feature) return
        this.popupShow = true
        this.popupCenter = feature.getGeometry().getInteriorPoint().getCoordinates() 
        this.editTarget = feature.getProperties()
        // console.log(feature)
        // console.log(this.editTarget)
      },
      // 属性编辑弹窗保存 
      propertiesSaveHandle(data) {
        let targetIndex = this.editPol.findIndex((item) => { return item.ol_uid === data.id })
        // console.log(target)
        this.editPol[targetIndex].set('properties', data.properties)
        this.state.features[targetIndex].properties = data.properties
      },
      
      drawDefineFn(feature, obj) {
        // this.features.push(feature.clone())
        let newFeature = feature.clone()
        newFeature.set('properties', obj.properties)
        newFeature.set('id', newFeature.ol_uid)
         
        newFeature.setStyle(Style(obj.properties))
        this.$refs.map.addFeature(newFeature)

        this.$refs.polygon.addFeatures([newFeature])
        this.editPol.push(newFeature)

        feature.setStyle(parseStyle({
          className: 'Style',
          fill: { className: 'Fill', color: 'transparent' },
          stroke: { className: 'Stroke', color: 'transparent', width: 1 }
        }))
      },
      drawDone(features) {
        console.log('features')
        let point = features[0].Feature.getGeometry().getInteriorPoint().getCoordinates()
        this.viewer.animate({
          center: point
        })
      },
      mapReady(map, vm) {
        this.map = map
        this.viewer = this.map.getView()
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>

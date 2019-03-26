<template>
  <example>
    <xdh-map ref="map" :zoom="12" :center="[113.40, 23.06]" @ready=mapReady @click="featureClickHandle">
      <xdh-map-geo ref="geo" :state="state"  :draw-define="drawDefineFn"></xdh-map-geo>
      <!-- @mouseEnter="hoverHandle" @mouseLeave="hoveroutHandle" -->

      <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="light"  >
        <div style="padding: 10px; cursor: pointer" @click="toEdit">{{editing ? '保存编辑' : '编辑'}}</div>
      </xdh-map-placement>
      <xdh-map-placement placement="right-top" :margin="[10, 10]" theme="light"  >
        <div style="padding: 10px; cursor: pointer" @click="toAdd">{{adding ? '保存添加' : '添加'}}</div>
      </xdh-map-placement>
      <xdh-map-placement placement="left-bottom" :margin="[10, 10]" theme="light"  >
        <div style="padding: 10px; cursor: pointer" @click="saveJson">导出</div>
      </xdh-map-placement>
      <xdh-map-placement placement="right-bottom" :margin="[10, 10]" theme="light"  >
        <div class="edit-btn-wrap clearfix">
          <div class="edit-btn" title="添加"><span class="iconfont">&#xe720;</span></div>  
          <div class="edit-btn" title="编辑"><span class="iconfont">&#xe768;</span></div>
          <div class="edit-btn" title="导出"><span class="iconfont">&#xe79c;</span></div>
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
  import china from './test.json'
  import {parseStyle} from '../../../packages/index.js'
  import EditPopup from './edit-popup'
  const Style = function(obj) {
    let fillStr = colorRgb(obj['fill'])
    let fillColor = fillStr.substring(0, fillStr.length - 1) + `,${obj['fill-opacity']})`
    let strokeStr = colorRgb(obj['stroke'])
    let strokeColor = strokeStr.substring(0, strokeStr.length - 1) + `,${obj['stroke-opacity']})`
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
        width: obj['stroke-width']
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
        // features: [],
        state: china,

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
        }
      }
    },
    methods: {
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
        // let arr = []
        let oldFeatures = this.state.features
        editPol.forEach((item, index) => {
          let newCoor = item.getGeometry().getCoordinates()
          let _geometry = oldFeatures[index].geometry
          _geometry.coordinates = newCoor
        })
        // console.log(JSON.stringify(this.state))
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
        console.log(JSON.stringify(this.state))
      },
      drawStartHandle(e) {
        console.log(e)
        // let feat = this.$refs.map.getFeatureAtPixel(e.pixel)
        // if (feat) {
        //   return false
        // }
      },
      addDrawEnd(e) {
        // console.log(e.feature)
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
      },
      featureClickHandle(e) {
        // console.log(e)
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
      setActiveStyle(obj) {
        return parseStyle({
          className: 'Style',
          fill: {
            className: 'Fill',
            color: 'pink'
          },
          stroke: {
            className: 'Stroke',
            color: 'yellow',
            width: 2
          },
          text: {
            className: 'Text',
            text: obj.properties.name,
            font: '14px sans-serif',
            fill: {
              className: 'Fill',
              color: 'blue'
            }
          }
        })
      },
      // hoverHandle(obj, e, feature) {
      //   feature.setStyle(this.setActiveStyle(obj))
      // },
      // hoveroutHandle(obj, e, feature) {
      //   feature.setStyle(Style())
      // },
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
      mapReady(map, vm) {
        this.map = map
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>

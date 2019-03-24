<template>
  <example>
    <xdh-map ref="map" :zoom="12" :center="[113.40, 23.06]" @ready=mapReady>
      <xdh-map-geo ref="geo" :state="state"  :draw-define="drawDefineFn"></xdh-map-geo>
      <!-- @mouseEnter="hoverHandle" @mouseLeave="hoveroutHandle" -->

      <xdh-map-placement placement="left-top" :margin="[10, 10]" theme="light"  >
        <div style="padding: 10px; cursor: pointer" @click="toEdit">{{editing ? '保存' : '编辑'}}</div>
      </xdh-map-placement>
       
      <xdh-map-draw ref="polygon" type="Polygon" v-if="editPol.length" :default-features="editPol" @modifyend="modifyendHandle"></xdh-map-draw>
    </xdh-map>
  </example>
</template>

<script>

  // import {clone} from 'ol/Feature'
  import china from '../data/test2.json'
  import {parseStyle} from '../../packages/index.js'
  const Style = function(fill = 'transparent', stroke = 'red') {
    return parseStyle({
      className: 'Style',
      fill: {
        className: 'Fill',
        color: fill
      },
      stroke: {
        className: 'Stroke',
        color: stroke,
        width: 2
      }
    })
  }
  export default {
    data() {
      return {
        map: null,
        features: [],
        state: china,
        editing: false,
        editPol: [],
        editFeature: null,  
        normalStyle: Style('transparent', 'transparent') 
      }
    },
    methods: {
      toEdit() {
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
          // if (_geometry.type === 'Polygon') {
          //   _geometry.coordinates[0] = newCoor
          // } else {
          //   _geometry.coordinates = newCoor
          // }
        })
        
        console.log(JSON.stringify(this.state))
      },
      modifyendHandle(e) {
        console.log(e.target)
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
      hoverHandle(obj, e, feature) {
        feature.setStyle(this.setActiveStyle(obj))
      },
      hoveroutHandle(obj, e, feature) {
        feature.setStyle(this.normalStyle)
      },
      drawDefineFn(feature, obj) {
        // this.features.push(feature.clone())
        let newFeature = feature.clone()
        newFeature.set('_property', obj)
        newFeature.setStyle(Style('transparent', 'red'))
        this.$refs.map.addFeature(newFeature)
        this.editPol.push(newFeature)
        feature.setStyle(this.normalStyle)
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

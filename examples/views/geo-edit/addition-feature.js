/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-20 11:56:29
 * @LastEditTime: 2019-10-20 15:09:08
 * @LastEditors: Please set LastEditors
 * 此mixin 是 开发 进一步优化的操作功能（拖动/多选）
 */
import {DragClass as Drag, AreaSelectClass as AreaSelect, parseStyle} from '../../../packages/index.js'
export default {
  data() {
    return {
      dragable: false,
      dragCtrl: null,
      areaSelect: null,
      selectFeatures: []
    }
  },
  methods: {
    dragCtrlRegister(mapComp, opts = {}) { 
      return new Drag(mapComp, opts)
    },
    areaSelectRegister(map, mapComp, opts = {}) {
      return new AreaSelect(map, mapComp, opts)
    },
    boxEndHandle(e) {
      console.log('boxend', e)
      let sels = []
      this.editPol.forEach((feature) => {
        let interiorPoint = feature.getGeometry().getInteriorPoint().getCoordinates()
        // console.log('interiorPoint', interiorPoint)
        if (e.areaGeo.intersectsCoordinate(interiorPoint)) {
          // console.log('fea', feature)

          feature.setStyle(
            parseStyle({
              className: 'Style',
              fill: { className: 'Fill', color: 'rgba(250,0,0,0.5)' },
              stroke: { className: 'Stroke', color: 'red', width: 1 }
            })
          )
          sels.push(feature)
        }
      })
      this.selectFeatures = sels
      
    },

    dragDownHandle(feature, e) {
      // console.log(feature)
      if (this.isInSelets(feature.get('_tempId'))) {
        // 多选图形
        console.log('e', e)
      }  
    },
    multiFeatureDragDown() {
      
    },
    isInSelets(tempId) {
      if (!this.selectFeatures.length) return false
      let index = this.selectFeatures.findIndex((feature) => {
        return feature.get('_tempId') === tempId
      })
      return index >= 0
    }
  }
}

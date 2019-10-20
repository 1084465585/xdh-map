/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-20 11:56:29
 * @LastEditTime: 2019-10-20 20:59:08
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
      selectFeatures: [],
      otherFeatures: []
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
      let nowTempId = feature.get('_tempId')
      if (this.isInSelets(nowTempId)) { 
        // 多选图形
        this.startCoord = [...e.coordinate]
        this.otherFeatures = this.selectFeatures.filter((item) => { return item.get('_tempId') !== nowTempId })
        // console.log(this.otherFeatures, this.startCoord)
      }  
    },
    dragMoveHandle(feature, e) {
      if (this.otherFeatures.length) {
        // console.log(e.coordinate, this.startCoord)
        let deltaX = e.coordinate[0] - this.startCoord[0]
        let deltaY = e.coordinate[1] - this.startCoord[1]
        // console.log(deltaX, deltaY)
        this.otherFeatures.forEach((item) => {
          let geo = item.getGeometry()
          geo.translate(deltaX, deltaY)
        })
        this.startCoord[0] = e.coordinate[0]
        this.startCoord[1] = e.coordinate[1]
      }
    },
    dragUpHandle(feature, e) {
      this.startCoord = []
      this.otherFeatures = []
    },
    cleanSelectHandle() {
      this.selectFeatures.forEach((feature) => {
        feature.setStyle(this._Style({}))
      })
      this.selectFeatures = []
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

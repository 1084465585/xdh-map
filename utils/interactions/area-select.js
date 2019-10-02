/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-02 12:12:27
 * @LastEditTime: 2019-10-02 16:18:55
 * @LastEditors: Please set LastEditors
 */
import DragZoom from 'ol/interaction/DragZoom'
import Polygon from 'ol/geom/Polygon'
import { convertToWgs84 } from 'utils/convert'

class AreaSelect {
  constructor(map, mapVue, options) {
    this._view = map.getView()
    this._currZoom = 0
    this._currCenter = []
    
    this.leftTop = []
    this.rightTop = []
    this.rightBottom = []
    this.leftBottom = []


    const newDragZoom = new DragZoom({
      className: options.class || 'xdh-dragzoom',
      duration: 0
    })
    newDragZoom.on('boxstart', (e) => {
      this._currZoom = this._view.getZoom()
      this._currCenter = this._view.getCenter()

      this.leftTop = e.coordinate
      mapVue.$emit('on-boxstart', e)
    })
    
    newDragZoom.on('boxend', (e) => {
      this._view.setZoom(this._currZoom)
      this._view.setCenter(this._currCenter)

      this.rightBottom = e.coordinate
      this.rightTop = [this.rightBottom[0], this.leftTop[1]]
      this.leftBottom = [this.leftTop[0], this.rightBottom[1]]
      let coords = [this.leftTop, this.rightTop, this.rightBottom, this.leftBottom, this.leftTop]
      let areaGeo = new Polygon([
        coords.map(pos => {
          return convertToWgs84(
            options.coordType || 'WGS84',
            pos.map(n => Number.parseFloat(n))
          )
        })
      ])
      e.areaGeo = areaGeo
      mapVue.$emit('on-boxend', e)
    })
    return newDragZoom
  }

}

export default AreaSelect
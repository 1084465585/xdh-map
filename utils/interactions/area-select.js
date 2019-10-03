/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-02 12:12:27
 * @LastEditTime: 2019-10-02 12:12:27
 * @LastEditors: your name
 */
/**
 * 自定义地图框选操作类
 *
 * @example
 * /src/utils/interaction/area-select 
 * 实例化参数：
 * map 地图实例;
 * mapVue 组件; 
 * options: {
 *   class: 'custom-select-box',
 *   coordType: 'WGS84'
 * } 
 */
import DragZoom from 'ol/interaction/DragZoom'
import Polygon from 'ol/geom/Polygon'
import { convertToWgs84 } from 'utils/convert'
/**
 * @class ol.interaction.areaSelect 
 * @classdesc 自定义拖动交互类。
 * @param {VueComponent} map openlayer Map实例
 * @param {VueComponent} mapVueComp xdh-Map 主体组件
 * @param {Object} options - 参数。
 * @param {boolean} [options.class = 'xdh-dragzoom'] - 自定义拖动框样式类。
 */ 
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
      /**
      * 键盘shift按下后拖动开始触发
       * @event on-boxStart
       * @param {Object} event
       */ 
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
      /**
      * 键盘shift按下后拖动结束触发
       * @event on-boxEnd
       * @param {Object} event
       */
      mapVue.$emit('on-boxend', e)
    })
    return newDragZoom
  }

}

export default AreaSelect
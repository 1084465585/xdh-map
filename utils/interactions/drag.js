/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-21 12:10:47
 * @LastEditTime: 2019-09-22 11:02:13
 * @LastEditors: Please set LastEditors
 */
import {Pointer as PointerInteraction} from 'ol/interaction.js'

class Drag {
  /**
   * 构造函数
   * @constructor
   * @param {VueComponent} mapVueComp xdh-Map 主体组件
   * @param {Object} options 配置参数选项
   */
  constructor(mapVm, options) {
    /**
     * @type {module:ol/pixel~Pixel}
     * @private
     */
    this.coordinate_ = null;

    /**
     * @type {string|undefined}
     * @private 用于设置 鼠标 覆盖在 地图上物体时 地图的 cursor 样式值 （设为pointer）
     */
    this.cursor_ = 'pointer'; 

    /**
     * @type {module:ol/Feature~Feature}
     * @private
     */
    this.feature_ = null;

    /**
     * @type {string|undefined}
     * @private 临时存放 当前 地图容器 的 cursor 样式值
     */
    this.previousCursor_ = undefined;

    function handleDownEvent(evt) {
      let map = evt.map
       
      let feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        if (options.featureDefine) {
          return options.featureDefine.call(this, feature)
        } else {
          return feature
        }
        
      })
       
      if (feature) {
        this.coordinate_ = evt.coordinate;
        this.feature_ = feature;
        mapVm.$emit('on-dragDown', feature, evt)
      }
    

      return !!feature
    }
    function handleDragEvent(evt) {
      // 获取 移动开始 时的 XY 坐标
      let deltaX = evt.coordinate[0] - this.coordinate_[0];
      let deltaY = evt.coordinate[1] - this.coordinate_[1];

      // 获取地图上的物件
      let geometry = this.feature_.getGeometry()
      geometry.translate(deltaX, deltaY) // 让物件跟随移动

      this.coordinate_[0] = evt.coordinate[0]
      this.coordinate_[1] = evt.coordinate[1]
      mapVm.$emit('on-dragMove', this.feature_, evt)
    }

    // 鼠标 在地图上移动（非拖动时）
    function handleMoveEvent(evt) {
      if (this.cursor_) {
        let map = evt.map
        // 获取 地图上的 物体
        let feature = map.forEachFeatureAtPixel(evt.pixel, (feature) => { 
          // return feature
          if (options.featureDefine) {
            return options.featureDefine.call(this, feature)
          } else {
            return feature
          } 
        })

        let element = evt.map.getTargetElement() // 获取地图容器div
        
        if (feature) { // 如果鼠标经过地图上的物体存在时
          if (element.style.cursor !== this.cursor_) { // 判断 鼠标的 'cursor' 样式 是否为 pointer 
            this.previousCursor_ = element.style.cursor; // 记录当前 cursor 的样式值
            element.style.cursor = this.cursor_; // 将cursor样式 设为 pointer
          }
        } else if (this.previousCursor_ !== undefined) { // 还原
          element.style.cursor = this.previousCursor_;
          this.previousCursor_ = undefined;
        }
      }
    }
    function handleUpEvent(evt) {
      mapVm.$emit('on-dragUp', this.feature_, evt)
      this.coordinate_ = null;
      this.feature_ = null;
      return false;
    }

    return new PointerInteraction({
      handleDownEvent: handleDownEvent.bind(this),
      handleDragEvent: handleDragEvent.bind(this),
      handleMoveEvent: handleMoveEvent.bind(this),
      handleUpEvent: handleUpEvent.bind(this)
    }) 
  }
}



export default Drag
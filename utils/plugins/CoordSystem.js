/**
 * ECharts 地理位置坐标系
 * @param map
 * @return {*}
 */

export default function (map) {
  
  const CoordSystem = function CoordSystem() {
    this.map = map;
    this._mapOffset = [0, 0];
  };
  
  CoordSystem.create = function (ecModel) {
    ecModel.eachSeries(function (seriesModel) {
      if (seriesModel.get('coordinateSystem') === 'ol') {
        seriesModel.coordinateSystem = new CoordSystem(map);
      }
    });
  };
  
  CoordSystem.getDimensionsInfo = function () {
    return ['x', 'y'];
  };
  
  CoordSystem.dimensions = ['x', 'y'];
  
  Object.assign(CoordSystem.prototype, {
    
    dimensions: CoordSystem.dimensions,
    
    setMapOffset(mapOffset) {
      this._mapOffset = mapOffset;
    },
    
    dataToPoint(data) {
      // 地理坐标转为屏幕坐标
      // console.log(data);
      const px = this.map.getPixelFromCoordinate(data);
      // console.log(px, data)
      const mapOffset = this._mapOffset;
      
      return [px[0] - mapOffset[0], px[1] - mapOffset[1]];
    },
    
    pointToData(pt) {
      // 屏幕坐标转为地理坐标
      const mapOffset = this._mapOffset;
      const data = this.map.containerPointToCoordinate({
        x: pt[0] + mapOffset[0],
        y: pt[1] + mapOffset[1]
      });
      return [data.x, data.y];
    }
  })
  
  return CoordSystem;
  
  
}

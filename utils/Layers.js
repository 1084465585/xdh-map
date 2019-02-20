import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import XYZ from 'ol/source/XYZ'
import TileGrid from 'ol/tilegrid/TileGrid'
import WMTSGrid from 'ol/tilegrid/WMTS'
import WMTS from 'ol/source/WMTS'
import TileImage from 'ol/source/TileImage'
import {get as getProj} from 'ol/proj'
import {getWidth, getTopLeft} from 'ol/extent'
import TileSuperMapRest from './TileSuperMapRest'
import {validate, get as getConfig} from './LayerSetting'


// 创建百度地图图层
function createBaiduLayer(config) {
  const projection = getProj('EPSG:3857')
  
  const tileGrid = new TileGrid({
    origin: [0, 0],
    resolutions: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
      .map(function (x) {
        return Math.pow(2, 18 - x)
      })
  });
  let source = new TileImage({
    projection: projection,
    tileGrid: tileGrid,
    tileUrlFunction: function (tileCoord) {
      const z = tileCoord[0];
      const x = tileCoord[1];
      const y = tileCoord[2];
      const index = Math.ceil(Math.random() * 5)
      return config.server.replace(/{x}/g, x)
        .replace(/{y}/g, y)
        .replace(/{z}/g, z)
        .replace(/{index}/g, index)
    }
  });
  
  return new TileLayer({
    source: source
  })
  
}

// 创建方正地图图层
function createFounderLayer(config) {
  const tileSizePixels = 256
  const projection = getProj('EPSG:4326')
  const projectionExtent = projection.getExtent();
  const size = getWidth(projectionExtent) / tileSizePixels
  let matrixIds = [];
  let resolutions = [];
  for (let i = 0; i <= 20; i++) {
    matrixIds[i] = i;
    resolutions[i] = size / Math.pow(2, i);
  }
  const tileGrid = new WMTSGrid({
    origin: getTopLeft(projectionExtent),
    resolutions: resolutions,
    matrixIds: matrixIds
  });
  const basePath = config.server
  return new TileLayer({
    source: new WMTS({
      url: basePath,
      tileGrid: tileGrid,
      projection: projection,
      tileLoadFunction: function (imageTile, src) {
        const tileCoord = imageTile.tileCoord;
        let zoom = tileCoord[0];
        let col = tileCoord[1];
        let row = -(tileCoord[2] + 1);
        imageTile.getImage().src = `${basePath}?Service=getImage&Type=RGB&ZoomOffset=0&Col=${col}&Row=${row}&Zoom=${zoom}&V=0.3`;
      }
    }),
    wrapX: false
  })
}


/**
 * 创建地图图层
 * @param {String} key 地图图层配置名称
 * @return {TileLayer} TileLayer
 *
 * @example
 *
 * new Map({
 *           layers: [createLayer('Baidu')],
 *           target: this.$refs.map,
 *           view: new View({
 *              projection: 'EPSG:4326',
 *              center: [120, 30],
 *              zoom: 4
 *           })
 *       })
 */
export function createLayer(key = 'OSM') {
  if (!validate(key)) return null
  
  const config = getConfig(key)
  let layer = null
  switch (key) {
    case 'OSM':
      layer = new TileLayer({
        source: new OSM()
      })
      break
    // Google和高德的方式相同
    case 'Google':
    case 'Amap':
      layer = new TileLayer({
        source: new XYZ({
          url: config.server
        })
      })
      break
    case 'Baidu':
      layer = createBaiduLayer(config)
      break
    case 'SuperMap':
      layer = new TileLayer({
        source: new TileSuperMapRest({
          url: config.server
        }),
        projection: 'EPSG:4326'
      })
      break
    case 'Founder':
      layer = createFounderLayer(config)
      break
  }
  return layer
}

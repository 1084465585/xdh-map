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

/**
 * 地图图层配置，支持OSM、百度、离线谷歌、高德、超图、方正PGIS
 * @type {{OSM: {title: string, server: null, preview: string}, Baidu: {title: string, server: string, preview: string}, Amap: {title: string, server: string, preview: string}, SupperMap: {title: string, server: string, preview: string}, Google: {title: string, server: string, preview: string}, Founder: {title: string, server: string, preview: string}}}
 */
const LAYERS = {
  OSM: {
    title: '默认',
    server: null,
    preview: ''
  },
  Baidu: {
    title: '百度地图',
    server: 'http://online{index}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&udt=20170301&scaler=1&p=1',
    preview: ''
  },
  Amap: {
    title: '高德地图',
    server: 'http://webrd03.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}&lang=zh_cn',
    preview: ''
  },
  SuperMap: {
    title: '超图',
    server: 'http://53.1.238.17/iserver/services/map-pgisvec/rest/maps/pgisvecv1',
    preview: ''
  },
  Google: {
    title: '谷歌地图',
    server: 'http://172.19.40.108:8081/maptile/googlemaps/roadmap/{z}/{x}/{y}.png',
    preview: ''
  },
  Founder: {
    title: '方正PGIS',
    server: 'http://127.0.0.1:3000/proxy',
    preview: ''
  }
}


// 验证配置的名称是否存在
function validateLayerConfigName(key) {
  const keys = Object.keys(LAYERS)
  const valid = keys.includes(key)
  if (!valid) {
    throw new Error(`图层配置 ${key} 不存在`)
  }
  return valid
}

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
 * 更新图层服务配置
 * @param {Object} layers 图层配置信息对象
 *
 * @example
 *
 * setLayersConfig({
 *  Baidu: {
 *    title:'百度地图'
 *  }
 * })
 *
 */
export function setLayersConfig(layers) {
  Object.assign(LAYERS, layers)
}

/**
 * 获取图层服务配置
 * @param {String} [key=null] 图层名称,为null时表示获取全部图层配置
 * @param {boolean} [toArray=false] 是否转换成数组
 * @return {Object|Array}
 */
export function getLayersConfig(key = null, toArray = false) {
  if (key && validateLayerConfigName(key)) {
    return LAYERS[key]
  }
  if (!toArray) {
    return LAYERS
  }
  return Object.keys(LAYERS).map(key => {
    return {
      name: key,
      ...LAYERS[key]
    }
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
  if (!validateLayerConfigName(key)) return
  
  const config = getLayersConfig(key)
  let layer = null
  switch (key) {
    case 'OSM':
      layer = new TileLayer({
        source: new OSM()
      })
      break
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

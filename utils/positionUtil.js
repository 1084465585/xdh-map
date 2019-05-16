/**
 * 各地图API坐标系统比较与转换;
 * WGS84坐标系：即地球坐标系，国际上通用的坐标系。设备一般包含GPS芯片或者北斗芯片获取的经纬度为WGS84地理坐标系,
 * 谷歌地图采用的是WGS84地理坐标系（中国范围除外）;
 * GCJ02坐标系：即火星坐标系，是由中国国家测绘局制订的地理信息系统的坐标系统。由WGS84坐标系经加密后的坐标系。
 * 谷歌中国地图和搜搜中国地图采用的是GCJ02地理坐标系; BD09坐标系：即百度坐标系，GCJ02坐标系经加密后的坐标系;
 * 搜狗坐标系、图吧坐标系等，估计也是在GCJ02基础上加密而成的。
 */

const pi = 3.1415926535897932384626
const a = 6378245.0
const ee = 0.00669342162296594323

function outOfChina(lat, lon) {
  if (lon < 72.004 || lon > 137.8347) {
    return true
  }
  
  return lat < 0.8293 || lat > 55.8271;
  
}


function transformLat(x, y) {
  let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
  return ret;
}

function transformLon(x, y) {
  let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0;
  return ret;
}


function transform(lat, lon) {
  if (outOfChina(lat, lon)) {
    return {lat, lon}
  }
  let dLat = transformLat(lon - 105.0, lat - 35.0);
  let dLon = transformLon(lon - 105.0, lat - 35.0);
  let radLat = lat / 180.0 * pi;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  let sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
  dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
  let mgLat = lat + dLat;
  let mgLon = lon + dLon;
  return {lat: mgLat, lon: mgLon}
}

/**
 * 84 to 火星坐标系 (GCJ-02)
 * @param lat
 * @param lon
 * @return {null|{lon: *, lat: *}}
 */
export function gps84ToGcj02(lat, lon) {
  if (outOfChina(lat, lon)) {
    return null;
  }
  
  let dLat = transformLat(lon - 105.0, lat - 35.0);
  let dLon = transformLon(lon - 105.0, lat - 35.0);
  let radLat = lat / 180.0 * pi;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  
  let sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
  dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
  let mgLat = lat + dLat;
  let mgLon = lon + dLon;
  return {lat: mgLat, lon: mgLon}
}

/**
 * 火星坐标系 (GCJ-02) to 84
 * @param lat
 * @param lon
 * @return {{lon: number, lat: number}}
 */
export function gcjToGps84(lat, lon) {
  const gps = transform(lat, lon);
  const lontitude = lon * 2 - gps.lon;
  const latitude = lat * 2 - gps.lat;
  return {lat: latitude, lon: lontitude}
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标
 * @param ggLat
 * @param ggLon
 * @return {{lon: number, lat: number}}
 */
export function gcj02ToBd09(ggLat, ggLon) {
  let x = ggLon, y = ggLat;
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * pi);
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * pi);
  let bdLon = z * Math.cos(theta) + 0.0065;
  let bdLat = z * Math.sin(theta) + 0.006;
  return {lat: bdLat, lon: bdLon}
}

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 * * 将 BD-09 坐标转换成GCJ-02 坐标
 * @param bdlat
 * @param bdlon
 * @return {{lon: number, lat: number}}
 */
export function bd09ToGcj02(bdlat, bdlon) {
  let x = bdlon - 0.0065, y = bdlat - 0.006;
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi);
  let gglon = z * Math.cos(theta);
  let gglat = z * Math.sin(theta);
  return {lat: gglat, lon: gglon}
}

/**
 * (BD-09)-->84
 * @param bdlat
 * @param bdlon
 * @return {{lon: number, lat: number}}
 */
export function bd09ToGps84(bdlat, bdlon) {
  const gcj02 = bd09ToGcj02(bdlat, bdlon);
  return gcjToGps84(gcj02.lat, gcj02.lon);
}

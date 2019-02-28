import {parse} from './style'

const BASE_TYPES = [Array, String, Boolean, Object, Function]

/**
 * capitalize('fooBar'); // 'FooBar'
 * capitalize('fooBar', true); // 'Foobar'
 */
export function capitalize([first, ...rest], lowerRest = false) {
  return first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))
}

/**
 * 给选项对象的字段名称增加前缀
 * @param name
 * @param options
 *
 * @example
 * stroke: {color: 'red'} => {strokeColor: 'red'}
 */
export function prefix(name, options) {
  let result = {}
  Object.keys(options).forEach(key => {
    const fixName = name + capitalize(key)
    result[fixName] = options[key]
  })
  return result
}

/**
 * 选项对象增加前缀后对应关系
 * @param name
 * @param options
 *
 * @example
 * stroke: {color: 'red'} => {color：'strokeColor'}
 */
export function keyMap(name, options) {
  let result = {}
  Object.keys(options).forEach(key => {
    result[key] = name + capitalize(key)
  })
  return result
}

/**
 * 混合组件，生成Style描述JSON
 * @param {VueComponent} mv vue组件实例
 * @param name
 * @param options
 */
export function mix(mv, name, options) {
  let result = {}
  let map = keyMap(name, options)
  Object.keys(options).forEach(key => {
    result[key] = mv[map[key]]
  })
  return result
}

/**
 * 图形生成style
 * @return {*}
 */
export function featureStyleRender() {
  return parse({
    ...this.baseStyleRender(),
    fill: {
      className: 'Fill',
      color: this.fill
    },
    stroke: this.strokeRender(),
    text: this.textRender()
  })
}

/**
 * 合并组件的props
 * @return {any}
 */
export function mixProps() {
  const propsArray = Array.from(arguments).map(item => item.props || {})
  const props = Object.assign({}, ...propsArray)
  const fixedProps = Object.create(null)
  Object.entries(props).forEach(item => {
    const key = item[0]
    fixedProps[key] = BASE_TYPES.includes(item[1]) ? {type: item[1]} : item[1]
  })
  return fixedProps
}

/**
 * 获取组件的父级的地图组件
 * @return {*|Vue}
 */
export function getParent() {
  let parent = this.$parent
  while (parent && !parent.isMap) {
    parent = parent.$parent
  }
  return parent
}

/**
 * 地图初始化完成回调
 * @param callback
 */
export function mapReady(callback) {
  // 先检查父组件的地图是否初始化完成
  if (this.parent && this.parent.map) {
    callback(this.parent.map, this.parent)
    return
  }
  // 父组件地图未初始化，侦听完成事件
  this.parent.$once('ready', (map, vm) => {
    callback(map, vm)
  })
}

/**
 * 计算两经纬度坐标点距离，
 * @param {Array} coor1 标准经纬度坐标数组,如：[113.38585096783513, 22.96213834599851]；
 * @param {Array} coor2 标准经纬度坐标数组,如：[113.38585096783513, 22.96213834599851]；
 * @return {Number} 返回距离，单位为km；
 */
export function getDistance(coor1, coor2) {
  let radLat1 = coor1[0] * Math.PI / 180.0;
  let radLat2 = coor2[0] * Math.PI / 180.0;
  let a = radLat1 - radLat2;
  let b = coor1[1] * Math.PI / 180.0 - coor1[1] * Math.PI / 180.0;
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;// EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;
}

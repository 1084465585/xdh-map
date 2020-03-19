import {Circle, Fill, Icon, IconImage, Image, RegularShape, Stroke, Style, Text} from 'ol/style' // Atlas, AtlasManager, 

/**
 * style json对象解析，通过传入json格式数据解析成Style实例
 * @param {Object} options ,json数据，去匹配转化成Style实例,
 * 其中每个实例节点需要有className属性，为字符串，className包括:
 * Atlas/AtlasManager/Circle/Fill/Icon/IconImage/Image/RegularShape/Stroke/Style/Text
 * 分别匹配Style对应的对象实例，其余属性，为对象实例化时传入的对象；
 * 如果没有包含className的对象属性，则直接返回该对象。
 * 如：{
 *   className: 'Style',
 *   fill: {
 *     className: 'Fill',
 *     color: 'rgba(255, 255, 255, 0.2)'
 *   },
 *   stroke: {
 *     className: 'Stroke',
 *     color: '#ffcc33',
 *     width: 2
 *   },
 *   image: {
 *     className: 'Circle',
 *     radius: 7,
 *     fill: {
 *       className: 'Fill',
 *       color: '#ffcc33'
 *     }
 *   }
 * }
 * 解析后等同于
 *  new Style({
 *    fill: new Fill({
 *      color: 'rgba(255, 255, 255, 0.2)'
 *    }),
 *    stroke: new Stroke({
 *      color: '#ffcc33',
 *      width: 2
 *    }),
 *    image: new Circle({
 *      radius: 7,
 *      fill: new Fill({
 *        color: '#ffcc33'
 *      })
 *    })
 *  })
 */

const StyleMap = {Circle, Fill, Icon, IconImage, Image, RegularShape, Stroke, Style, Text} // Atlas, AtlasManager, 

export function parse(options) {
  if (options && options.className && StyleMap[options.className]) {
    let childOptions = {};
    Object.keys(options).map(v => {
      if (v !== 'className') {
        if (typeof options[v] === 'object' && options[v].className) {
          childOptions[v] = parse(options[v]);
        } else {
          childOptions[v] = options[v];
        }
      }
    });
    return new StyleMap[options.className](childOptions)
  }
}

export function colorRgba(sHex, alpha = 1) {
  // 十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  /* 16进制颜色转为RGB格式 */
  let sColor = sHex.toLowerCase()
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //  处理六位的颜色值
    let sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    // return sColorChange.join(',')
    // 或
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
  } else {
    return sColor
  }
}

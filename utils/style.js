import {Atlas, AtlasManager, Circle, Fill, Icon, IconImage, Image, RegularShape, Stroke, Style, Text} from 'ol/style'

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

const StyleMap = {Atlas, AtlasManager, Circle, Fill, Icon, IconImage, Image, RegularShape, Stroke, Style, Text}

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

/**
 * Vue组件基础类型的参数构建
 * 与Openlayers 图形实例对应，并搭配一个Style渲染函数，返回Json描述的Style配置
 * @param options
 * @return {{props: {}, methods: {styleFactory(): *}}}
 */
export default function (options) {
  return {
    props: {
      ...options
    },
    methods: {
      styleFactory() {
        let style = {}
        Object.keys(options).forEach(key => {
          style[key] = this[key]
        })
        return style
      }
    }
  }
}

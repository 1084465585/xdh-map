/**
 * Vue组件基础类型的参数构建
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

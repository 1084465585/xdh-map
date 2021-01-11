module.exports = {
  productionSourceMap: false,
  transpileDependencies: ['@xdh/my'],
  chainWebpack (chain) {
    chain.resolve.alias.set('$ui', '@xdh/my/ui/lib')
  }
}

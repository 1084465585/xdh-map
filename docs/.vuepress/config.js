module.exports = {
  title: '新德汇地图应用类库 v' + require('../../package.json').version,
  description: '基于Openlayers的地图应用Vue组件',
  port: '8001',
  dest: 'dist',
  base: '/xdh-map/',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}]
  ],
  themeConfig: {
    logo: '/img/xdh.png',
    sidebarDepth: 3,
    nav: require('./data/nav.json'),
    sidebar: require('./data/sidebar.json'),
  },
  markdown: {
    lineNumbers: true,
    extendMarkdown: require('./extend/markdown')
  },
  configureWebpack: require('./extend/webpack')
  
}

module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure']
  },
  source: {
    include: [
      'packages',
      'utils',
      'README.md'
    ],
    'exclude': ['utils/plot-utils.js'],
    includePattern: '\\.(vue|js)$'
  },
  plugins: [
    'plugins/markdown',
    './jsdoc-for-vue.js'
  ],
  templates: {
    'cleverLinks': false,
    'monospaceLinks': false
  },
  opts: {
    'destination': 'docs/.vuepress/public/doc'
  }
}

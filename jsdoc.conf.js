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
    'destination': 'public/docs'
  }
}

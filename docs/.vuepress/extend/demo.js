const path = require('path')
const fs = require('fs')
const CryptoJS = require('crypto-js')
const CACHE_DIR = path.resolve(__dirname, '../', '.demo')
const regex = /^demo\s*(.*)$/

function getMd5(content) {
  const word = CryptoJS.enc.Utf8.parse(content)
  return CryptoJS.MD5(word).toString()
}

function initCacheDir(dir) {
  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

function hasCacheFile(md5) {
  const filePath = path.join(CACHE_DIR, md5 + '.vue')
  return fs.existsSync(filePath)
}

function saveFile(md5, content) {
  const filePath = path.join(CACHE_DIR, md5 + '.vue')
  fs.writeFileSync(filePath, content, 'utf-8')
}

function createCache(content) {
  const md5 = getMd5(content)
  if (!hasCacheFile(md5)) {
    saveFile(md5, content)
  }
  return md5
}

initCacheDir(CACHE_DIR)

module.exports = md => {
  md.use(require('markdown-it-container'), 'demo', {
    validate(params) {
      return params.trim().match(regex)
    },
    render(tokens, idx) {
      const token = tokens[idx]
      const titles = token.info.trim().match(regex) || []
      if (token.nesting === 1) {
        const nextToken = tokens[idx + 1] || {}
        const md5 = createCache(nextToken.content)
        let descComponent = ''
        const title = titles[1]
        if (title) {
          const desc = md.render(titles[1]).html
          descComponent = !!title ? `<div slot="desc">${desc}</div>` : ''
        }
        return `<demo>
                      ${descComponent}
                      <demo-loader id="${md5}" />
                      <div slot="code">`
      } else {
        return '</div></demo>'
      }
      
    }
  })
}

const path = require('path')
const fs = require('fs')
const MarkdownIt = require('markdown-it')
const demo = require('./demo')
const rootPath = path.join(__dirname, '../../')
const dirs = fs.readdirSync(rootPath)

const mdFiles = dirs.filter(f => f !== '.vuepress')

function findFile(parent, dirs) {
  let result = []
  dirs.forEach(dir => {
    const file = path.join(parent, dir)
    const stats = fs.statSync(file)
    if (stats.isDirectory()) {
      const children = fs.readdirSync(file)
      result = result.concat(findFile(file, children))
    } else {
      result.push(file)
    }
  })
  return result
}

const files = findFile(rootPath, mdFiles)

const md = new MarkdownIt({
  html: true
})

demo(md)

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8')
  md.render(content)
})

console.log('init completed!')


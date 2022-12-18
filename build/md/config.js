var MarkdownIt = require('markdown-it')
var container = require('./container.js')

var md = new MarkdownIt()
container(md)
module.exports = md


const fs = require('fs')
const path = require('path')
const { runLoaders } = require('loader-runner')

runLoaders(
    {
        resource: path.resolve(__dirname, "../src/doc/index.md"),
        loaders: [path.resolve(__dirname, "../build/md/index.js")],
        readResource: fs.readFile.bind(fs)
    },
    (err, result) => (err ? console.error(err) : console.log(result))
)
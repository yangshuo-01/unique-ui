const common = require('./webpack.common')
const { merge } = require('webpack-merge') // 合并配置项

const config = merge(common,{
    mode: 'development',
    
})

module.exports = config;

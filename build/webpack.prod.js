const common = require('./webpack.common')
const { merge } = require('webpack-merge') // 合并配置项

const config = merge(common,{
    mode: 'production',

})

module.exports = config;

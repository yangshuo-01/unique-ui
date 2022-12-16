const path = require("path");
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin =require('progress-bar-webpack-plugin'); // 美化打包进度条


module.exports = {
    //入口 这里路径是相对于项目的根目录的 所以这里是 ./src/index.js
    entry:{
        app:'./src/index'
    },
    output:{
        path:path.resolve(__dirname,"../dist"),
        filename:'js/[name].js',
        publicPath:"/" //打包后的资源的访问路径前缀
    },
    devServer:{
        static: {
            directory: path.join(__dirname, '../'), // 告诉服务器从哪里提供内容
            publicPath: '/' // 模拟打包文件生成的位置
          },
    },
    module:{
        rules:[
            // 处理css文件
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // 处理less文件
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader','less-loader']
            },
            // 静态文件
            {
                test: /\.(png|svg|jpe?g)$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000 // 文件大小低于某个值时输出 DataURL 到js文件中
                }
            },
            // vue组件文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve: {
        // 文件路径别名
        alias: {
          '@': path.resolve(__dirname,'../src'),
          '~': path.resolve(__dirname,'../packages'),
        },
        // 省略文件后缀
        extensions: ['.js', '.json', '.vue', 'css']
    },
    // 插件
    plugins:[
        new HtmlWebpackPlugin({
            filename:path.resolve(__dirname,"../dist/index.html"),
            template:path.resolve(__dirname,"../public/index.html"),
            inject:true,// 注入选项 有四个值 true,body(script标签位于body底部),head,false(不插入js文件)
            hash:true,//回给script标签中的js文件增加一个随机数 防止缓存 bundle.js?22b9692e22e7be37b57e
        }),
        new VueLoaderPlugin(), 
        new ProgressBarPlugin(), // 美化打包进度插件
    ]
}


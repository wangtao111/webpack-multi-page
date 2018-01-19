/**
 * Created by wangTao on 2018/1/9.
 */
/**************           多页面生产环境配置         ***********/
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common');//把公共模块提取出来, 并取名为'common'(名字自起), webpack之后再out文件夹下生成common.js, 测试时记得引入提取出来的公共模块js文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");//将css独立引入变成link标签形式, 同时下面的rules也必须更改
var CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry : {index: './src/js/entry.js', index2: './src/js/entry2.js'},//入口文件 index， index2
    output : {//输出文件
        filename : 'js/[name].[chunkhash].js',//输出文件名
        publicPath: '/out/',//添加静态资源, 否则会出现路径错误
        chunkFilename: 'js/[name].[chunkhash].js',//CommonsChunkPlugin提取的公共文件
        path : __dirname + '/out'//输出文件路径
    },
    module : {
        rules: [
            {test: /.js$/, use: ['babel-loader']}, // js转es5
            //{test: /.css$/, use: ['style-loader', 'css-loader']},/*解析css, 并把css添加到html的style标签里*/
            {test: /.css$/, use: ExtractTextPlugin.extract({fallback: 'style-loader',use: 'css-loader'})},/*解析css, 并把css变成文件通过link标签引入*/
            //{test: /.(jpg|png|gif|svg)$/, use: ['url-loader?limit=8192&name=./[name].[ext]']},/*解析图片*/
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {//当图片低于10000k时使用base64编码图片；
                    limit: 10000,
                    name: 'img/[name].[hash:8].[ext]'//设置图片的命名格式8位hash值
                }
            },
            {test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader']}/*解析less, 把less解析成浏览器可以识别的css语言*/
        ],
        loaders: [
            {
                loader: 'css-loader',
                options: {
                    minimize: true
                }
            }
        ]
    },
    plugins: [
        CommonsChunkPlugin,
        new webpack.optimize.OccurrenceOrderPlugin(), //调整js顺序，引用多的靠前
        new webpack.optimize.DedupePlugin(), //去重
        new CleanWebpackPlugin(['out'], { // 清除上一次的打包文件，避免垃圾文件
            // "root":"[webpack.config的地址]",//一个根的绝对路径.
            // "verbose": true,//将log写到 console.
            // "dry": false,//不要删除任何东西，主要用于测试.
            // "exclude": ["files","to","ignore"]//排除不删除的目录，主要用于避免删除公用的文件
        }),
        new webpack.DefinePlugin({ //设置项目中的全局变量，类似于环境变量
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('css/[name].[contenthash].css'),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            mangle: false,
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }), //压缩js代码
        // new webpack.optimize.CommonsChunkPlugin({
        //   names: ['vendor', 'manifest']
        // }),
        new HtmlWebpackPlugin({ // 生产根据html模板生成新的html引入相应js、css
            filename: 'index.html',
            template: 'index.html',
            chunks: ['common', 'index']
        }),
        new HtmlWebpackPlugin({ // 多页面继续配置
            filename: 'index2.html',
            template: 'index2.html',
            chunks: ['common', 'index2']
        })
    ]//插件集合
}
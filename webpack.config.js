/**
 * Created by wangTao on 2018/1/9.
 */
/**************           多页面开发环境配置         ***********/
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html模板；
var CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common');//把公共模块提取出来, 并取名为'common'(名字自起), webpack之后再out文件夹下生成common.js, 测试时记得引入提取出来的公共模块js文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");//将css独立引入变成link标签形式, 使用该插件需要独立下载'npm install extract-text-webpack-plugin --save-dev', 同时下面的rules也必须更改
module.exports = {
    entry : {index: './src/js/entry.js', index2: './src/js/entry2.js'},//入口文件 index， index2
    output : {//输出文件
        filename : 'js/[name].js',//输出文件名
        // publicPath: '',//添加静态资源, 否则会出现路径错误
        chunkFilename: 'js/[name].js',//CommonsChunkPlugin提取的公共文件
        path : __dirname//输出文件路径
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
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash:8][ext]'
                }
            },
            {test: /.less$/, use: ['style-loader', 'css-loader', 'less-loader']}/*解析less, 把less解析成浏览器可以识别的css语言*/
        ]
    },
    devServer: {   // web-dev-server 的配置
        historyApiFallback: true, //防止单页面应用访问路径出错,单页面应用使用hash路径，如果不设置会请求本地资源导致页面走失
        port: 8088,
        open: 'http://localhost:8000',
        openPage: 'index.html',// 打开指定文件
        noInfo: true
    },
    devtool: '#eval-source-map',
    plugins: [
        CommonsChunkPlugin, //提取公共文件
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            chunks: ['common', 'index']
        }),
        new HtmlWebpackPlugin({
            filename: 'index2.html',
            template: 'index2.html',
            chunks: ['common', 'index2']
        })
    ]//插件集合
}
/**
 * Created by wangTao on 2018/1/9.
 */
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.js');

var app = express();
var compiler = webpack(config);
app.use(express.static(path.join(__dirname, '/')))
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
const server = app.listen(8088, '192.168.20.21', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    const host = server.address().address;
    const port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});

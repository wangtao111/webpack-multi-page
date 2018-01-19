/**
 * Created by wangTao on 2018/1/9.
 */
console.log('123');
require('../css/index.css');
var oImg = new Image();
oImg.src = require('../img/ss.jpg');//当成模块引入图片
document.body.appendChild(oImg);
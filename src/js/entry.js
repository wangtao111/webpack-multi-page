/**
 * Created by wangTao on 2018/1/9.
 */
require('../css/index.css');
require('../dhtmlx/codebase/dhtmlx.css');
var oImg = new Image();
oImg.src = require('../img/ss.jpg');//当成模块引入图片
document.body.appendChild(oImg);
var mygrid = new dhtmlXGridObject("grid");

mygrid.setImagesPath("../dhtmlx/codebase/imgs/");
mygrid.setHeader(
    "序号,备注",
    null,
    [ "text-align:center;background: #d9eaff;color: #111;border: 1px solid #a4bed4;",'text-align:center;background: #d9eaff;color: #111;border: 1px solid #a4bed4;']
);
mygrid.setInitWidths("200,200");          //设置每列单元格宽度
mygrid.setColAlign("center,center");       //设置居中
mygrid.setColTypes("ro,ro");  //设置单元格状态 https://docs.dhtmlx.com/grid__columns_types.html
mygrid.setSkin("dhx_custom");
mygrid.init(); //初始化表格
mygrid.addRow('11', ['sadasdasd', 'dasdas']);
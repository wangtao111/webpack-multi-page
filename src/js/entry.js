/**
 * Created by wangTao on 2018/1/9.
 */

require('../css/index.css');
require('../dhtmlx/codebase/dhtmlx.css');
var oImg = new Image();
oImg.src = require('../img/ss.jpg');//当成模块引入图片
// document.body.appendChild(oImg);
var mygrid = new dhtmlXGridObject("grid");
var switchBtn = true;
mygrid.setImagesPath("../dhtmlx/codebase/imgs/");
mygrid.setHeader(
    "序号,备注",
    null,
    [ "text-align:center;background: #d9eaff;color: #111;border: 1px solid #a4bed4;",'text-align:center;background: #d9eaff;color: #111;border: 1px solid #a4bed4;']
);
mygrid.setInitWidths("200,200");          //设置每列单元格宽度
mygrid.setColAlign("center,center");       //设置居中
mygrid.setColTypes("ro,ro");  //设置单元格状态 https://docs.dhtmlx.com/grid__columns_types.html
mygrid.init(); //初始化表格
mygrid.addRow('11', ['sadasdasd', 'dasdas']);
mygrid.addRow('22', ['sadasdasd', 'dasdas']);
mygrid.addRow('33', ['sadasdasd', 'dasdas']);
renderGridBg(mygrid);
function renderGridBg(mygrid) {
    var color = ['#D3EFFB', '#FFFDDE'];
    var flag = false;
    var index = 0;
    mygrid.forEachRow(function(id){
        if (flag) {
            index = 1;
            flag = false;
        } else {
            index = 0;
            flag = true;
        }
        mygrid.setRowColor(id, color[index]);
    });
}
window.onload = function () {

    var data = [
        {num: 1, name: '张三'},
        {num: 2, name: '李四'},
        {num: 3, name: '王二'},
        {num: 4, name: '赵四'}
    ], html = '';
    for(var i = 0; i < data.length; i++){
        html += '<li draggable="true" ondragstart="drag(event)"><span>'+data[i].num+'</span><span>'+data[i].name+'</span></li>'
    }
    $('#left_list').html(html);
    $('#app').click(function () {
        if(switchBtn){
            $('.el-switch__core').css({borderColor: '#dcdfe6', backgroundColor: '#dcdfe6'});
            $('.el-switch__button').removeClass('move');
            switchBtn = false;
        }else{
            $('.el-switch__core').css({borderColor: '#409eff', backgroundColor: '#409eff'});
            $('.el-switch__button').addClass('move');
            switchBtn = true;
        }
    })
}


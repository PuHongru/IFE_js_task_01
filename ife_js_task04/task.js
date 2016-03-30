/**
 * Created by puhongru on 2016/3/29.
 */
/**
 * aqiData???洢??????????????????
 * ????????
 * aqiData = {
 *    "????": 90,
 *    "???": 40
 * };
 */
var aqiData = {};

/**
 * ??????????л?????????aqiData?????????????
 * ??????aqi-list?б????????????????
 */
function addAqiData() {
    var cityInput = document.getElementById("aqi-city-input");
    var valueInput = document.getElementById("aqi-value-input");
    var keyReg = /[^\u4e00-\u9fa5a-zA-Z]/;
    var numReg = /[^0-9]/;
    var key = cityInput.value.trim();
    var num = valueInput.value.trim();
    var flag = true;
    if(key===''){
        alert("请输入城市！");
        cityInput.focus();
        flag = false;
    }
    else{
        if (num === '') {
            alert("请输入城市空气质量指数！");
            valueInput.focus();
            flag = false;
        }
        else{
            if (keyReg.test(key)) {
                alert("输入错误，请输入城市中文或英文！");
                cityInput.focus();
                flag = false;
            }
            else{
                if (numReg.test(num)) {
                    alert("输入错误，请输入空气指数的数字！");
                    valueInput.focus();
                    flag = false;
                }
            }
        }
    }
    if(flag){
        aqiData[key] = num;
    }
}

/**
 * ???aqi-table???
 */
function renderAqiList() {
    var aqiTable = document.getElementById("aqi-table");
    var itemsHTML ='<tr> <td>城市</td><td>空气质量指数</td><td>操作</td> </tr>';
    for(var items in aqiData){
        itemsHTML += '<tr><td>' + items +'</td><td>' + aqiData[items] + '</td><td><button>删除</button></td></tr>';
    }
    aqiTable.innerHTML = itemsHTML;
}

/**
 * ???add-btn?????????
 * ???????????????????????????????????
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * ?????????????????????????
 * ?????????????????????????????±?????
 */
function delBtnHandle() {
    // do sth.
    var aqiTable = document.getElementById("aqi-table");
    aqiTable.onclick = function(event){
        var events = event || window.event;
        var target = events.srcElement || events.target;//target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。
        if(target.tagName.toLowerCase() === 'button'){
            var delNode = target.parentNode.parentNode;
            aqiTable.deleteRow(delNode.rowIndex);//deleteRow()用于删除行
        }
    };
    /*delete addAqiData(key);
    renderAqiList();*/
}

function init() {

    //    ?????????add-btn?????????????????????addBtnHandle????
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = function(){
        addBtnHandle();
    };
    // ?????aqi-table?е??????????????????????delBtnHandle????
    /*var aqiTable = document.getElementById("aqi-table");
    aqiTable.addEventListener("click",function(event){
        var events = event || window.event;
        var targets = events.target || events.srcElement;
        if(targets.tagName.toLowerCase() === 'button'){
            /!*delBtnHandle.call(null,targets.dataset.key);//call()调用一个对象的一个方法，以另一个对象替换当前对象*!/

        }
    })*/
    delBtnHandle();
}

window.onload = function(){
    init();
};


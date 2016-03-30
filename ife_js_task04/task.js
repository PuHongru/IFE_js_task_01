/**
 * Created by puhongru on 2016/3/29.
 */
/**
 * aqiData???��??????????????????
 * ????????
 * aqiData = {
 *    "????": 90,
 *    "???": 40
 * };
 */
var aqiData = {};

/**
 * ??????????��?????????aqiData?????????????
 * ??????aqi-list?��????????????????
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
        alert("��������У�");
        cityInput.focus();
        flag = false;
    }
    else{
        if (num === '') {
            alert("��������п�������ָ����");
            valueInput.focus();
            flag = false;
        }
        else{
            if (keyReg.test(key)) {
                alert("�������������������Ļ�Ӣ�ģ�");
                cityInput.focus();
                flag = false;
            }
            else{
                if (numReg.test(num)) {
                    alert("����������������ָ�������֣�");
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
    var itemsHTML ='<tr> <td>����</td><td>��������ָ��</td><td>����</td> </tr>';
    for(var items in aqiData){
        itemsHTML += '<tr><td>' + items +'</td><td>' + aqiData[items] + '</td><td><button>ɾ��</button></td></tr>';
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
 * ?????????????????????????????��?????
 */
function delBtnHandle() {
    // do sth.
    var aqiTable = document.getElementById("aqi-table");
    aqiTable.onclick = function(event){
        var events = event || window.event;
        var target = events.srcElement || events.target;//target �¼����Կɷ����¼���Ŀ��ڵ㣨�������¼��Ľڵ㣩���������¼���Ԫ�ء��ĵ��򴰿ڡ�
        if(target.tagName.toLowerCase() === 'button'){
            var delNode = target.parentNode.parentNode;
            aqiTable.deleteRow(delNode.rowIndex);//deleteRow()����ɾ����
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
    // ?????aqi-table?��??????????????????????delBtnHandle????
    /*var aqiTable = document.getElementById("aqi-table");
    aqiTable.addEventListener("click",function(event){
        var events = event || window.event;
        var targets = events.target || events.srcElement;
        if(targets.tagName.toLowerCase() === 'button'){
            /!*delBtnHandle.call(null,targets.dataset.key);//call()����һ�������һ������������һ�������滻��ǰ����*!/

        }
    })*/
    delBtnHandle();
}

window.onload = function(){
    init();
};


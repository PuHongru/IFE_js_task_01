/**
 * Created by puhongru on 2016/4/7.
 */

var apiData = [];

(function(){
    var btns = document.querySelectorAll("button"),
        queue = document.querySelector('ul'),
        left_In = btns[0],
        right_In = btns[1],
        left_Out = btns[2],
        right_Out = btns[3],
        num_Random = btns[4],
        num_Sort = btns[5];

    addHandler(left_In,"click",leftIn);
    addHandler(right_In,"click",rightIn);
    addHandler(left_Out,"click",leftOut);
    addHandler(right_Out,"click",rightOut);
    addHandler(num_Random, "click", function() {
        apiData=[];
        init(queue, left_In, 10, 90, 10);
    });
    addHandler(num_Sort,"click",function(){
        apiData = quickSort(apiData);
        var elements = queue.querySelectorAll('li');
        console.log(apiData);
        for(var i = 0; i < apiData.length; i++){
            elements[i].style.height = apiData[i] + 'px';
            elements[i].innerHTML = apiData[i];
        }
    });

    init(queue, left_In, 10, 90, 10);

})();

//左侧进
function leftIn(){
    var query = document.querySelector("ul"),
        input = document.querySelector("input"),
        createEle = document.createElement("li"),
        firstEle = document.querySelectorAll("li")[0],
        numReg = /[^0-9]/;

    var data = input.value.trim();
    var txt = document.createTextNode(data);
    createEle.appendChild(txt);
    var flag = true;
    if(data === ''){
        alert("请输入数字");
        input.focus();
        flag = false;
    }
    else if(numReg.test(data) || data < 10 || data > 99){
        alert("请输入10-100之间的数字");
        input.focus();
        flag = false;
    }
    else if(queueLength > 60){
        alert("队列已满");
        input.focus();
        flag = false;
    }
    createEle.style.height = data + 'px';
    if(flag){
        if(!firstEle){
            query.appendChild(createEle);
        }
        else{
            query.insertBefore(createEle,firstEle);
        }
        apiData.unshift(data);
    }
}

//右侧进
function rightIn(){
    var query = document.querySelector("ul"),
        input = document.querySelector("input"),
        createEle = document.createElement("li"),
        numReg = /[^0-9]/,
        data = input.value.trim(),
        txt = document.createTextNode(data);
    createEle.appendChild(txt);

    var flag = true;
    if(data === ''){
        alert("请输入数字");
        input.focus();
        flag = false;
    }
    else if(numReg.test(data) || data < 10 || data > 99){
        alert("请输入10-100之间的数字");
        input.focus();
        flag = false;
    }
    else if(queueLength > 60){
        alert("队列已满");
        input.focus();
        flag = false;
    }

    createEle.style.height = data + 'px';

    if(flag){
        query.appendChild(createEle);
        apiData.push(data);
    }
}

//左侧出
function leftOut(){
    var query = document.querySelector("ul"),
        firstEle = document.querySelectorAll("li")[0];

    if(!firstEle){
        alert("没有数可以移除");
    }
    else{
        query.removeChild(firstEle);
        apiData.shift();
    }
}

//右侧出
function rightOut(){
    var query = document.querySelector("ul"),
        lastEle = query.lastElementChild;

    if(!lastEle){
        alert("没有数可以移除");
    }
    else{
        query.removeChild(lastEle);
        apiData.pop();
    }
}

//队列长度
function queueLength(queue){
    var eles = queue.querySelectorAll("li");
    return eles.length;
}

//快速排序
function quickSort(apidata)
{
    if(apidata.length <= 1)
    {
        return apidata;
    }
    var pivotIndex = Math.floor(apidata.length / 2),
        pivot = apidata.splice(pivotIndex,1)[0],
        left = [],
        right = [];

    for(var i = 0; i < apidata.length; i++)
    {
        if(apidata[i] < pivot)
        {
            left.push(apidata[i]);
        }
        else
        {
            right.push(apidata[i]);
        }
    }
    console.log('left:'+left+',pivot:'+pivot+',right:'+right);
    return quickSort(left).concat([pivot],quickSort(right));
}
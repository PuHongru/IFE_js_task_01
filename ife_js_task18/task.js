/**
 * Created by puhongru on 2016/4/5.
 */

(function(){
    var btns = document.querySelectorAll("button"),
        left_In = btns[0],
        right_In = btns[1],
        left_Out = btns[2],
        right_Out = btns[3];

    left_In.addEventListener("click",leftIn);
    right_In.addEventListener("click",rightIn);
    left_Out.addEventListener("click",leftOut);
    right_Out.addEventListener("click",rightOut);

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
    else if(numReg.test(data)){
        alert("输入格式有误，请输入数字");
        input.focus();
        flag = false;
    }
    if(flag){
        if(!firstEle){
            query.appendChild(createEle);
        }
        else{
            query.insertBefore(createEle,firstEle);
        }
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
    else if(numReg.test(data)){
        alert("输入格式有误，请输入数字");
        input.focus();
        flag = false;
    }

    if(flag){
        query.appendChild(createEle);
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
    }
}
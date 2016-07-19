/**
 * Created by puhongru on 2016/7/18.
 */
(function(){
    var input = document.getElementById("inputEle"),
        btns = document.querySelectorAll("button"),
        left_in = btns[0],
        right_in = btns[1],
        left_out = btns[2],
        right_out = btns[3],
        search_btn = btns[4];

    addHandler(left_in,"click",leftIn);
    addHandler(right_in,"click",rightIn);
    addHandler(left_out,"click",leftOut);
    addHandler(right_out,"click",rightOut);
    addHandler(search_btn,"click",searchBtn);
})();
/**
 * 从左进
 * */
function leftIn(){
    var queue = document.querySelector("ul"),
        input = document.querySelector("#inputEle"),
        createEle = document.createElement("li"),
        firstEle = queue.querySelectorAll("li")[0],
        inputArr = input.value.split(/[\n\r\s\t,，、;；]+/g);

    for(var i = 0, len = inputArr.length;i < len;i++){
        if(inputArr[i] == ''){
            alert("请输入字符串");
            input.focus();
        }else{
            createEle.innerHTML =inputArr[i];
            if(!firstEle){
                queue.appendChild(createEle);
            }else{
                queue.insertBefore(createEle,firstEle);
            }
        }
        firstEle = createEle;
        createEle =document.createElement("li");
    }
}
/**
 * right in
 * */
function rightIn(){
    var queue = document.querySelector("ul"),
        input = document.querySelector("#inputEle"),
        inputArr = input.value.split(/[\n\r\s\t,，;；、]+/g),
        createEle = document.createElement("li");

    for(var i = 0,len = inputArr.length;i < len;i++){
        if(inputArr[i]==''){
            alert("请输入字符串");
            input.focus();
        }
        else{
            createEle.innerHTML = inputArr[i];
            queue.appendChild(createEle);
        }
        createEle = document.createElement("li");
    }
}
/**
 * left out
 * */
function leftOut(){
    var queue = document.querySelector("ul"),
        firstEle = queue.querySelectorAll("li")[0];

    if(!firstEle){
        alert("没有数据可移除");
    }
    else{
        queue.removeChild(firstEle);
    }
}
/**
 * right out
 * */
function rightOut(){
    var queue = document.querySelector("ul"),
        lastEle = queue.lastChild;

    if(!lastEle){
        alert("没有数据可移除");
    }
    else{
        queue.removeChild(lastEle);
    }
}
/**
 * search
 * */
function searchBtn(){
    var keyword = new RegExp(document.querySelector("#keyboard").value),
        queue = document.querySelector("ul"),
        eles = queue.querySelectorAll("li");

    for(var i = 0,len = eles.length;i < len;i++){
        eles[i].style.color = "#000";
        if(keyword.test(eles[i].innerHTML)){
            eles[i].style.color = "#FFF";
        }
    }
}
/**
 * add handler to element
 * */
function addHandler(element, type, handler){
    if(element.addEventListener){
        addHandler = function(element, type, handler){
            element.addEventListener(type, handler, false);
        };
    }
    else if(element.attachEvent){
        addHandler = function(element, type, handler){
            element.attachEvent('on'+type, handler);
        };
    }
    return addHandler(element, type, handler);
}

/**
 * Created by puhongru on 2016/7/27.
 */
var divList = [],
    divs = document.querySelectorAll("div"),
    selectDiv,
    treeRoot = document.querySelectorAll("div")[0],
    timer;
(function(){
    var btns = document.querySelectorAll("button"),
        input = document.getElementById("#input"),
        delBtn = btns[0],
        insertBtn = btns[1],
        dftBtn = btns[2],
        bftBtn = btns[3],
        dfsBtn = btns[4],
        bfsBtn = btns[5];

    /**
     * 点击相应box改变颜色
     * */
    divs = document.querySelectorAll("div");
    for(var i = 0,len = divs.length;i < len;i++){
        divs[i].onclick = function(e){
            reset();
            this.style.backgroundColor = "#F7CCCC";
            e.stopPropagation();
            selectDiv = this;
            console.log(selectDiv);
        }
    }
    console.log(selectDiv);

    addHandler(delBtn,"click",deleteEle);
    addHandler(insertBtn,"click",insertEle);
    addHandler(dftBtn,"click",dft);
    addHandler(bftBtn,"click",bft);
    addHandler(dfsBtn,"click",dfs);
    addHandler(bfsBtn,"click",bfs);
}());
/**
 * 删除选中的节点及其子节点
 * */
function deleteEle(){
    if(selectDiv != null){
        var parentEle = selectDiv.parentNode;
        parentEle.removeChild(selectDiv);
    }else{
        alert("没有选中节点！");
    }

}
/**
 * 在选中节点下增加一个子节点
 * */
function insertEle(){
    var input = document.getElementById("input").value,
        createDiv = document.createElement("div"),
        createP = document.createElement("p");

    if(input == null){
        alert("Please input element's content!");
    }else{
        createP.innerHTML = input;
        createDiv.appendChild(createP);
        selectDiv.appendChild(createDiv);
    }
}
/**
 * 深度优先遍历
 * */
function dft(){
    reset();
    depthFirstTraversal(treeRoot);
    changeColor();
}
function depthFirstTraversal(node){
    if(!(node == null)){
        divList.push(node);
        if(node.hasChildNodes()){
            var childEle = node.children;
            for(var i = 0,len = childEle.length;i < len;i++){
                if(childEle[i].tagName == "DIV"){
                    depthFirstTraversal(childEle[i]);
                }
            }
        }
    }
}
/**
 * 广度优先遍历
 * */
function bft(){
    reset();
    breadthFirstTraversal(treeRoot);
    changeColor();
}
function breadthFirstTraversal(node){
    var queue = [],
        u,
        childEle;
    queue.push(node);
    divList.push(node);
    while(queue.length){
        u = queue.shift();
        divList.push(u);
        if(u.hasChildNodes()){
            childEle = u.children;
            for(var i = 0,len = childEle.length;i < len;i++){
                if(childEle[i].tagName == "DIV"){
                    queue.push(childEle[i]);
                }
            }
        }
    }
}
/**
 * 深度优先查找
 * */
function dfs(){
    reset();
    depthFirstTraversal(treeRoot);
    changeSearchColor();
}
/**
 * 广度优先查找
 * */
function bfs(){
    reset();
    breadthFirstTraversal(treeRoot);
    changeSearchColor();
}
/**
 * 重置
 * */
function reset(){
    divList = [];
     for(var i = 0,len = divs.length;i < len;i++){
         divs[i].style.backgroundColor = "#FFF";
     }
}
/**
 * 展示出来，更改颜色
 * */
function changeColor(){
    if(!(divList == null)){
        var i = 0;
        divList[i].style.backgroundColor = "#F7CCCC";
        timer = setInterval(function(){
            i++;
            if(i < divList.length){
                divList[i].style.backgroundColor = "#F7CCCC";
                divList[i - 1].style.backgroundColor = "#FFF";
            }else{
                clearInterval(timer);
                divList[i - 1].style.backgroundColor = "#FFF";
            }
        },500);
    }
}
/**
 * 展示查找结果
 * */
function changeSearchColor(){
    var keyword = new RegExp(document.getElementById("keyword").value),
        i = 0,
        flag = false;
    console.log(divList[i].querySelectorAll("p")[0].innerHTML);
    if(keyword.test(divList[i].children[0].innerHTML)&&divList[i].children[0].tagName == "P"){
        flag = true;
    }
    divList[i].style.backgroundColor = "#F7CCCC";
    timer = setInterval(function(){
        i++;
        if(i < divList.length){
            if(!flag){
                divList[i - 1].style.backgroundColor = "#FFF";
            }else{
                divList[i-1].style.backgroundColor = "#26A3C2";
            }
            if(keyword.test(divList[i].children[0].innerHTML)&&divList[i].children[0].tagName == "P"){
                flag = true;
                divList[i].style.backgroundColor = "#26A3C2";
            }else{
                flag = false;
                divList[i].style.backgroundColor = "#F7CCCC"
            }
        }else{
            clearInterval(timer);
            if(!flag){
                divList[i - 1].style.backgroundColor = "#FFF";
            }else{
                divList[i-1].style.backgroundColor = "#26A3C2";
            }
        }
    },500);
}
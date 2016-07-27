/**
 * Created by puhongru on 2016/7/25.
 */
var divList = [],
    searchList = [],
    timer,
    treeRoot = document.getElementsByClassName("root")[0];

(function(){
    var btns = document.querySelectorAll("button"),
        input = document.getElementById("#input"),
        dftBtn = btns[0],
        bftBtn = btns[1],
        dfsBtn = btns[2],
        bfsBtn = btns[3];

    addHandler(dftBtn,"click",dft);
    addHandler(bftBtn,"click",bft);
    addHandler(dfsBtn,"click",dfs);
    addHandler(bfsBtn,"click",bfs);
}());

/**
 * 深度优先遍历按钮
 * */
function dft(){
    reset();
    depthFirstTraversa(treeRoot);
    changeColor();
}
/**
 * 广度优先遍历按钮
 * */
function bft(){
    reset();
    breadthFirstTraversa(treeRoot);
    changeColor();
}
/**
 * 深度优先搜索按钮
 * */
function dfs(){
    reset();
    depthFirstTraversa(treeRoot);
    Search();
    changeSearchColor();
}
/**
 * 广度优先搜索按钮
 * */
function bfs(){
    reset();
    breadthFirstTraversa(treeRoot);
    Search();
    changeSearchColor();
}
/**
 * 深度优先遍历算法
 * @param node 传入节点
 * */
function depthFirstTraversa(node){
    if(!(node == null)){
        divList.push(node);
        var childNode = node.childNodes;
        for(var i = 0,len = childNode.length;i < len;i++){
            if(childNode[i].tagName === 'DIV'){
                depthFirstTraversa(childNode[i]);
            }
        }
    }
}
/**
 * 广度优先遍历算法
 * @param node 传入节点
 * */
function breadthFirstTraversa(node){
    var queue = [],
        u,
        childNode;
    queue.push(node);                //初始节点入队列
    //var w = node.firstChild;        //初始节点的第一个邻接节点
    while(queue.length){             //若队列为空时则跳出，不为空时继续
        u = queue[0];                 //取得队列的头结点
        console.log(u);
        divList.push(u);             //把头结点存入divList中
        queue.shift();                //删除头结点
        if(u.hasChildNodes()){        //若结点u有子节点，则继续进行下面的步骤，若没有，则跳出
            childNode = u.childNodes;//得到u的子节点NodeList
            for(var i = 0,len = childNode.length;i < len;i++){  //遍历所有子节点
                if(childNode[i].tagName === "DIV"){  //若子节点的tagName为div时
                    queue.push(childNode[i]);         //把该子节点存入队列中
                }
            }
        }else{
            break;
        }
    }
}
/**
 * 搜索算法
 * */
function Search(){
    var keyword = new RegExp(document.querySelector("#keyword").value),
        tag;
    console.log(keyword);
    for(var i = 0,len = divList.length;i < len;i++){
        tag = divList[i].children[0].innerHTML;
        //console.log(divList[i].childNodes);
        if(keyword.test(tag)&&divList[i].children[0].tagName == "P"){
            searchList.push(i);
        }
    }
}
/**
 * 重置
 * */
function reset(){
    divList = [];
    searchList = [];
    var divs = document.querySelectorAll("div");

    for(var i = 0,len = divs.length;i < len;i++){
        divs[i].style.backgroundColor = "#FFF";
    }
}
/**
 * 展示遍历过程
 * */
function changeColor(){
    var i = 0;
    divList[i].style.backgroundColor = "#5ec0b1";
    timer = setInterval(function(){
        i++;
        if(i < divList.length){
            divList[i-1].style.backgroundColor = "#FFF";
            divList[i].style.backgroundColor = "#5ec0b1";
        }else{
            clearInterval(timer);
            divList[i-1].style.backgroundColor = "#FFF";
        }
    },500);
}
/**
 * 展示搜索过程
 * */
function changeSearchColor(){
    var i = 0;
    console.log(searchList);
    if(i == searchList[0]){
        divList[i].style.backgroundColor = "#C03836";
        searchList.shift();
    }else{
        divList[i].style.backgroundColor = "#5ec0b1";
    }
    //divList[i].style.backgroundColor = "#5ec0b1";
    timer = setInterval(function(){
        i++;
        if(i < divList.length){
            if(i == searchList[0]){
                divList[i].style.backgroundColor = "#C03836";
                searchList.shift();
            }else{
                divList[i].style.backgroundColor = "#5ec0b1";
            }
            divList[i-1].style.backgroundColor = "#FFF";
        }else{
            clearInterval(timer);
            divList[i-1].style.backgroundColor = "#FFF";
        }
    },500);
}
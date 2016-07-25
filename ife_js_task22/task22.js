/**
 * Created by puhongru on 2016/7/24.
 */
var divList = [],
    timer = null,
    treeRoot = document.getElementsByClassName("root")[0];
(function(){
   var btns = document.querySelectorAll("button"),
       preBtn = btns[0],
       inBtn = btns[1],
       postBtn = btns[2];

    addHandler(preBtn,"click",preBtnClick);
    addHandler(inBtn,"click",inBtnClick);
    addHandler(postBtn,"click",postBtnClick);
}());

/**
 * 点击前序遍历按钮
 * */
function preBtnClick(){
    reset();
    preOrder(treeRoot);
    changeColor();
}
/**
 * 点击中序遍历按钮
 * */
function inBtnClick(){
    reset();
    inOrder(treeRoot);
    changeColor();
}/**
 * 点击后续遍历按钮
 * */
function postBtnClick(){
    reset();
    postOrder(treeRoot);
    changeColor(divList);
}
/**
 * 前序遍历
 * @param node 要遍历的节点
 * */
function preOrder(node){
    if(!(node == null)){
        divList.push(node);
        var nodeFirstChild = node.firstElementChild||node.firstChild,
            nodeLastChild = node.lastElementChild||node.lastChild;
        preOrder(nodeFirstChild);
        preOrder(nodeLastChild);
    }
}
/**
 * 中序遍历
 * @param node 要遍历的节点
 * */
function inOrder(node){
    if(!(node == null)){
        var nodeFirstChild = node.firstElementChild||node.firstChild,
            nodeLastChild = node.lastElementChild||node.lastChild;
        inOrder(nodeFirstChild);
        divList.push(node);
        inOrder(nodeLastChild);
    }
}
/**
 * 后序遍历
 * @param node 要遍历的节点
 * */
function postOrder(node){
    if(!(node == null)){
        var nodeFirstChild = node.firstElementChild||node.firstChild,
            nodeLastChild = node.lastElementChild||node.lastChild;
        postOrder(nodeFirstChild);
        postOrder(nodeLastChild);
        divList.push(node);
    }
}
/**
 * 重置
 * */
function reset(){
    divList = [];
    clearInterval(timer);
    var div = document.querySelectorAll("div");

    for(var i = 0,len = div.length;i < len;i++){
        div[i].style.backgroundColor = "#FFF";
    }
}
/**
 * 展示出整个流程
 * */
function changeColor(list){
    var i = 0;
    divList[i].style.backgroundColor = "#0DBEA3";
    timer = setInterval(function(){
        i++;
        if(i < divList.length){
            divList[i-1].style.backgroundColor = "#FFF";
            divList[i].style.backgroundColor = "#0DBEA3";
        }else{
            divList[i-1].style.backgroundColor = "#FFF";
            clearInterval(timer);
        }
    },800);
}
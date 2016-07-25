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
 * ���ǰ�������ť
 * */
function preBtnClick(){
    reset();
    preOrder(treeRoot);
    changeColor();
}
/**
 * ������������ť
 * */
function inBtnClick(){
    reset();
    inOrder(treeRoot);
    changeColor();
}/**
 * �������������ť
 * */
function postBtnClick(){
    reset();
    postOrder(treeRoot);
    changeColor(divList);
}
/**
 * ǰ�����
 * @param node Ҫ�����Ľڵ�
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
 * �������
 * @param node Ҫ�����Ľڵ�
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
 * �������
 * @param node Ҫ�����Ľڵ�
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
 * ����
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
 * չʾ����������
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
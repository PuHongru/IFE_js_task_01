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
 * ������ȱ�����ť
 * */
function dft(){
    reset();
    depthFirstTraversa(treeRoot);
    changeColor();
}
/**
 * ������ȱ�����ť
 * */
function bft(){
    reset();
    breadthFirstTraversa(treeRoot);
    changeColor();
}
/**
 * �������������ť
 * */
function dfs(){
    reset();
    depthFirstTraversa(treeRoot);
    Search();
    changeSearchColor();
}
/**
 * �������������ť
 * */
function bfs(){
    reset();
    breadthFirstTraversa(treeRoot);
    Search();
    changeSearchColor();
}
/**
 * ������ȱ����㷨
 * @param node ����ڵ�
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
 * ������ȱ����㷨
 * @param node ����ڵ�
 * */
function breadthFirstTraversa(node){
    var queue = [],
        u,
        childNode;
    queue.push(node);                //��ʼ�ڵ������
    //var w = node.firstChild;        //��ʼ�ڵ�ĵ�һ���ڽӽڵ�
    while(queue.length){             //������Ϊ��ʱ����������Ϊ��ʱ����
        u = queue[0];                 //ȡ�ö��е�ͷ���
        console.log(u);
        divList.push(u);             //��ͷ������divList��
        queue.shift();                //ɾ��ͷ���
        if(u.hasChildNodes()){        //�����u���ӽڵ㣬�������������Ĳ��裬��û�У�������
            childNode = u.childNodes;//�õ�u���ӽڵ�NodeList
            for(var i = 0,len = childNode.length;i < len;i++){  //���������ӽڵ�
                if(childNode[i].tagName === "DIV"){  //���ӽڵ��tagNameΪdivʱ
                    queue.push(childNode[i]);         //�Ѹ��ӽڵ���������
                }
            }
        }else{
            break;
        }
    }
}
/**
 * �����㷨
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
 * ����
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
 * չʾ��������
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
 * չʾ��������
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
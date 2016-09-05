/**
 * Created by puhongru on 2016/8/15.
 */


//================================封装TreeNode===================
function TreeNode(obj){
    this.parent = obj.parent;
    this.childs = obj.childes || [];
    this.data = obj.data || "";
    this.selfElement = obj.selfElement; //访问对应的DOM结点
    this.selfElement.TreeNode = this; //对应的DOM节点访问回来
}
//原型模式封装公共操作
TreeNode.prototype = {
    constructor: TreeNode,
    //解耦样式操作，四个参数表示是否改变箭头，可见性，改为高亮，改为普通，后两个参数可以省略
    render: function(arrow,visibility,toHighlight,deHighlight){
        if(arguments < 3){
            toHighlight = false;
            deHighlight = false;
        }
        if(arrow){
            if(this.isLeaf()){ //若是个叶子节点，则设为空箭头
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow empty-arrow";
            }else if(this.isFolded()){ //若在折叠状态，则设为右箭头
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow right-arrow";
            }else{ //若在展开状态，则设为下箭头
                this.selfElement.getElementsByClassName('arrow')[0].className = "arrow down-arrow";
            }
        }
        if(visibility){ //改变可见性
            if(this.selfElement.className.indexOf("nodebody-visible") == -1){ //变为可见
                this.selfElement.className = this.selfElement.className.replace("hidden","visible");
            }else{ //变为不可见
                this.selfElement.className = this.selfElement.className.replace("visible","hidden");
            }
        }
        if(toHighlight){ //设为高亮
            this.selfElement.getElementsByClassName("node-title")[0].className = "node-title node-title-highlight";
        }
        if(deHighlight){ //取消高亮
            this.selfElement.getElementsByClassName("node-title")[0].className = "node-title";
        }
    },
    //删除结点，DOM会自动递归删除子节点，TreeNode递归自动删除子节点
    deteleNode: function(){
        var i;
        if(!this.isLeaf()){
            for(i = 0;i < this.childs.length;i++){
                this.childs[i].deteleNode();
            }
        }
        this.parent.selfElement.removeChild(this.selfElement);//移除对应的DOM结点
        for(i = 0; i < this.parent.childs.length;i++){ //从父节点删除该孩子
            if(this.parent.childs[i] == this){
                this.parent.childs.splice(i,1);
                break;
            }
        }
        //调整父结点箭头样式
        this.parent.render(true, false);
    },
    //增加子节点
    addChild: function(text){
        if(text == null) return this;
        if(text.trim() == ""){
            alert("节点内容不能为空！");
            return this;
        }

        //先增加子节点，再渲染自身样式
        //若当前子节点关闭，则将其展开
        if(!this.isLeaf() && this.isFolded()){
            this.toggleFold();
        }
        //创建新的DOM结点并附加
        var newNode = document.createElement("div");
        newNode.className = "nodebody-visible";
        var newHeader = document.createElement("label");
        newHeader.className = "node-header";
        var newSymbol = document.createElement("div");
        newSymbol.className = "arrow empty-arrow";
        var newTitle = document.createElement("span");
        newTitle.className = "node-title";
        newTitle.innerHTML = text;
        var space = document.createElement("span");
        space.innerHTML = "&nbsp;&nbsp";
        var newAdd = document.createElement("img");
        newAdd.className = "addIcon";
        newAdd.src = "images/add.png";
        var newDelete = document.createElement("img");
        newDelete.className = "deleteIcon";
        newDelete.src = "images/delete.png";
        newHeader.appendChild(newSymbol);
        newHeader.appendChild(newTitle);
        newHeader.appendChild(space);
        newHeader.appendChild(newAdd);
        newHeader.appendChild(newDelete);
        newNode.appendChild(newHeader);
        this.selfElement.appendChild(newNode);
        //创建对应的TreeNode对象并添加到子节点队列
        this.childs.push(new TreeNode({
            parent: this,
            childs: [],
            data: text,
            selfElement: newNode
        }));
        //渲染自身样式
        this.render(true, false);
        return this; //返回自身，以便链式操作
    },
    //展开、收拢结点
    toggleFold: function(){
        if (this.isLeaf()) return this; // 叶子节点，无需操作
        // 改变所有子节点的可见状态
        for (var i = 0;i < this.childs.length;i++){
            this.childs[i].render(false, true);
        }
        // 渲染本结点的箭头
        this.render(true, false);
        return this; // 返回自身，以便链式操作
    },
    //判断是否为叶子节点’
    isLeaf: function(){
        return this.childs.length == 0;
    },
    //判断结点是否处于折叠状态
    isFolded: function(){
        if(this.isLeaf()) return false;
        if(this.childs[0].selfElement.className == "nodebody-visible") return false;
        return true;
    }
};
//================================以上是封装TreeNode的代码===================

//=====================================事件绑定区============================
// 创建根结点对应的TreeNode对象
var root = new TreeNode({
    parent: null,
    childs: [],
    data: "前端工程师",
    selfElement : document.getElementsByClassName("nodebody-visible")[0]
});
//为root绑定事件代理，处理所有节点的点击事件
addHandler(root.selfElement, "click" ,function(e){
    var target = e.target || e.srcElement;
    var domNode = target;
    while(domNode.className.indexOf("nodebody") == -1){ // 找到类名还有nodebody前缀的DOM结点
        domNode = domNode.parentNode;
    }
    selectedNode = domNode.TreeNode; // 获取DOM对象对应的TreeNode对象
    // 如果点在节点文字或箭头上
    if(target.className.indexOf("node-title") != -1 || target.className.indexOf("arrow") != -1){
        selectedNode.toggleFold();
    }else if (target.className == "addIcon"){ //点在加号上
        selectedNode.addChild(prompt("请输入子结点的内容："));
    }else if (target.className == "deleteIcon"){ //点在减号上
        selectedNode.deteleNode();
    }
});

//给root绑定广度优先搜索函数，无需访问DOM，返回一个搜索结果队列
root.search = function(query){
    var resultList = [];
    //广度优先搜索
    var queue = []; //辅助队列，顺序存储待访问结点
    var current = this;
    var keyword = new RegExp(query);
    //当前结点入队
    queue.push(current);
    while (queue.length > 0){
        // 出队列，取出队头结点
        current = queue.shift();
        current.render(false,false,false,true);
        //if (current.data == query) resultList.push(current); //找到了
        if (keyword.test(current.data)) resultList.push(current);
        // 将当前结点的所以孩子节点入“待访问”队
        for (var i = 0;i < current.childs.length;i++){
            queue.push(current.childs[i]);
        }
    }
    return resultList;
};
//搜索并显示结果
addHandler(document.getElementById("search"),"click",function(){
    var text = document.getElementById("input").value.trim();
    if(text == ""){
        alert("请输入查找内容！");
        return;
    }
    //执行搜索
    var resultList = root.search(text);
    //处理搜索结果
    if(resultList.length == 0){
        document.getElementById("result").innerHTML = "没有查找到符合条件的节点!";
    }
    else{
        document.getElementById("result").innerHTML = "查询到" + resultList.length + "条符合条件的节点！";
        // 将所有结果节点沿途展开，结果节点加粗红色展示
        var pathNode;
        for (var x = 0;x < resultList.length;x++){
            pathNode = resultList[x];
            pathNode.render(false,false,true,false);
            while (pathNode.parent != null){
                if (pathNode.selfElement.className == "nodebody-hidden"){
                    pathNode.parent.toggleFold();
                }
                pathNode = pathNode.parent;
            }
        }
    }
});

//清除搜索结果按钮
addHandler(document.getElementById("clear"),"click",function(){
    document.getElementById("input").innerHTML = "";
    root.search(null);  //清除高亮
    document.getElementById("result").innerHTML = "";
});
//=======================================================================================================

//======================================DOM展示区========================================================
root.addChild("技术").addChild("IT公司").addChild("谈笑风生");
root.childs[0].addChild("JavaScript").addChild("HTML").addChild("CSS");
root.childs[0].childs[0].addChild("jQuery");
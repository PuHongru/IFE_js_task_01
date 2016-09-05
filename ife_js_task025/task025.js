/**
 * Created by puhongru on 2016/8/15.
 */


//================================��װTreeNode===================
function TreeNode(obj){
    this.parent = obj.parent;
    this.childs = obj.childes || [];
    this.data = obj.data || "";
    this.selfElement = obj.selfElement; //���ʶ�Ӧ��DOM���
    this.selfElement.TreeNode = this; //��Ӧ��DOM�ڵ���ʻ���
}
//ԭ��ģʽ��װ��������
TreeNode.prototype = {
    constructor: TreeNode,
    //������ʽ�������ĸ�������ʾ�Ƿ�ı��ͷ���ɼ��ԣ���Ϊ��������Ϊ��ͨ����������������ʡ��
    render: function(arrow,visibility,toHighlight,deHighlight){
        if(arguments < 3){
            toHighlight = false;
            deHighlight = false;
        }
        if(arrow){
            if(this.isLeaf()){ //���Ǹ�Ҷ�ӽڵ㣬����Ϊ�ռ�ͷ
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow empty-arrow";
            }else if(this.isFolded()){ //�����۵�״̬������Ϊ�Ҽ�ͷ
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow right-arrow";
            }else{ //����չ��״̬������Ϊ�¼�ͷ
                this.selfElement.getElementsByClassName('arrow')[0].className = "arrow down-arrow";
            }
        }
        if(visibility){ //�ı�ɼ���
            if(this.selfElement.className.indexOf("nodebody-visible") == -1){ //��Ϊ�ɼ�
                this.selfElement.className = this.selfElement.className.replace("hidden","visible");
            }else{ //��Ϊ���ɼ�
                this.selfElement.className = this.selfElement.className.replace("visible","hidden");
            }
        }
        if(toHighlight){ //��Ϊ����
            this.selfElement.getElementsByClassName("node-title")[0].className = "node-title node-title-highlight";
        }
        if(deHighlight){ //ȡ������
            this.selfElement.getElementsByClassName("node-title")[0].className = "node-title";
        }
    },
    //ɾ����㣬DOM���Զ��ݹ�ɾ���ӽڵ㣬TreeNode�ݹ��Զ�ɾ���ӽڵ�
    deteleNode: function(){
        var i;
        if(!this.isLeaf()){
            for(i = 0;i < this.childs.length;i++){
                this.childs[i].deteleNode();
            }
        }
        this.parent.selfElement.removeChild(this.selfElement);//�Ƴ���Ӧ��DOM���
        for(i = 0; i < this.parent.childs.length;i++){ //�Ӹ��ڵ�ɾ���ú���
            if(this.parent.childs[i] == this){
                this.parent.childs.splice(i,1);
                break;
            }
        }
        //����������ͷ��ʽ
        this.parent.render(true, false);
    },
    //�����ӽڵ�
    addChild: function(text){
        if(text == null) return this;
        if(text.trim() == ""){
            alert("�ڵ����ݲ���Ϊ�գ�");
            return this;
        }

        //�������ӽڵ㣬����Ⱦ������ʽ
        //����ǰ�ӽڵ�رգ�����չ��
        if(!this.isLeaf() && this.isFolded()){
            this.toggleFold();
        }
        //�����µ�DOM��㲢����
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
        //������Ӧ��TreeNode������ӵ��ӽڵ����
        this.childs.push(new TreeNode({
            parent: this,
            childs: [],
            data: text,
            selfElement: newNode
        }));
        //��Ⱦ������ʽ
        this.render(true, false);
        return this; //���������Ա���ʽ����
    },
    //չ������£���
    toggleFold: function(){
        if (this.isLeaf()) return this; // Ҷ�ӽڵ㣬�������
        // �ı������ӽڵ�Ŀɼ�״̬
        for (var i = 0;i < this.childs.length;i++){
            this.childs[i].render(false, true);
        }
        // ��Ⱦ�����ļ�ͷ
        this.render(true, false);
        return this; // ���������Ա���ʽ����
    },
    //�ж��Ƿ�ΪҶ�ӽڵ㡯
    isLeaf: function(){
        return this.childs.length == 0;
    },
    //�жϽ���Ƿ����۵�״̬
    isFolded: function(){
        if(this.isLeaf()) return false;
        if(this.childs[0].selfElement.className == "nodebody-visible") return false;
        return true;
    }
};
//================================�����Ƿ�װTreeNode�Ĵ���===================

//=====================================�¼�����============================
// ����������Ӧ��TreeNode����
var root = new TreeNode({
    parent: null,
    childs: [],
    data: "ǰ�˹���ʦ",
    selfElement : document.getElementsByClassName("nodebody-visible")[0]
});
//Ϊroot���¼������������нڵ�ĵ���¼�
addHandler(root.selfElement, "click" ,function(e){
    var target = e.target || e.srcElement;
    var domNode = target;
    while(domNode.className.indexOf("nodebody") == -1){ // �ҵ���������nodebodyǰ׺��DOM���
        domNode = domNode.parentNode;
    }
    selectedNode = domNode.TreeNode; // ��ȡDOM�����Ӧ��TreeNode����
    // ������ڽڵ����ֻ��ͷ��
    if(target.className.indexOf("node-title") != -1 || target.className.indexOf("arrow") != -1){
        selectedNode.toggleFold();
    }else if (target.className == "addIcon"){ //���ڼӺ���
        selectedNode.addChild(prompt("�������ӽ������ݣ�"));
    }else if (target.className == "deleteIcon"){ //���ڼ�����
        selectedNode.deteleNode();
    }
});

//��root�󶨹�����������������������DOM������һ�������������
root.search = function(query){
    var resultList = [];
    //�����������
    var queue = []; //�������У�˳��洢�����ʽ��
    var current = this;
    var keyword = new RegExp(query);
    //��ǰ������
    queue.push(current);
    while (queue.length > 0){
        // �����У�ȡ����ͷ���
        current = queue.shift();
        current.render(false,false,false,true);
        //if (current.data == query) resultList.push(current); //�ҵ���
        if (keyword.test(current.data)) resultList.push(current);
        // ����ǰ�������Ժ��ӽڵ��롰�����ʡ���
        for (var i = 0;i < current.childs.length;i++){
            queue.push(current.childs[i]);
        }
    }
    return resultList;
};
//��������ʾ���
addHandler(document.getElementById("search"),"click",function(){
    var text = document.getElementById("input").value.trim();
    if(text == ""){
        alert("������������ݣ�");
        return;
    }
    //ִ������
    var resultList = root.search(text);
    //�����������
    if(resultList.length == 0){
        document.getElementById("result").innerHTML = "û�в��ҵ����������Ľڵ�!";
    }
    else{
        document.getElementById("result").innerHTML = "��ѯ��" + resultList.length + "�����������Ľڵ㣡";
        // �����н���ڵ���;չ��������ڵ�Ӵֺ�ɫչʾ
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

//������������ť
addHandler(document.getElementById("clear"),"click",function(){
    document.getElementById("input").innerHTML = "";
    root.search(null);  //�������
    document.getElementById("result").innerHTML = "";
});
//=======================================================================================================

//======================================DOMչʾ��========================================================
root.addChild("����").addChild("IT��˾").addChild("̸Ц����");
root.childs[0].addChild("JavaScript").addChild("HTML").addChild("CSS");
root.childs[0].childs[0].addChild("jQuery");
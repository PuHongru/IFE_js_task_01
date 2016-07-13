/**
 * Created by puhongru on 2016/7/13.
 */
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
/***
 * init data
 */
function init(queue, left_In, rangMin,rangHeight, n){
    var input = document.querySelector('input');
    queue.innerHTML = "";
    for(var i = 0;i < n;i++){
        input.value = Math.floor(Math.random() * rangHeight) + rangMin;
        left_In.click();
    }
}


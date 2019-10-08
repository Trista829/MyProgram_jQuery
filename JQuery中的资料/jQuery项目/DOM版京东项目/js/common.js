/**
 * Created by Administrator on 2017/3/24.
 */

/**
 * 格式化日期
 * @param dt 日期对象
 * @returns {string} 返回值是格式化的字符串日期
 */
function getDates(dt) {
    var str = "";//存储时间的字符串
    //获取年
    var year = dt.getFullYear();
    //获取月
    var month = dt.getMonth() + 1;
    //获取日
    var day = dt.getDate();
    //获取小时
    var hour = dt.getHours();
    //获取分钟
    var min = dt.getMinutes();
    //获取秒
    var sec = dt.getSeconds();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    str = year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + sec;
    return str;
}
/**
 * 获取指定标签对象
 * @param id 标签的id属性值
 * @returns {Element}根据id属性值返回指定标签对象
 */
function my$(id) {
    return document.getElementById(id);
}
/**
 * 设置元素的文本内容
 * @param element 任意元素
 * @param text 任意文本内容
 */
function setInnerText(element, text) {
    if (typeof(element.textContent) == "undefined") {
        element.innerText = text;
    } else {
        element.textContent = text;
    }
}
/**
 * 获取元素的文本内容
 * @param element 任意元素
 * @returns {*} 任意元素中的文本内容
 */
function getInnerText(element) {
    if (typeof(element.textContent) == "undefined") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}
/**
 * 获取父级元素中的第一个子元素
 * @param element 父级元素
 * @returns {*} 父级元素中的子级元素
 */
function getFirstElement(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var node = element.firstChild;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
/**
 * 获取父级元素中的最后一个子元素
 * @param element 父级元素
 * @returns {*} 最后一个子元素
 */
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
/**
 * 获取某个元素的前一个兄弟元素
 * @param element 某个元素
 * @returns {*} 前一个兄弟元素
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling
    } else {
        var node = element.previousSibling;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
/**
 * 获取某个元素的后一个兄弟元素
 * @param element 某个元素
 * @returns {*} 后一个兄弟元素
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling
    } else {
        var node = element.nextSibling;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
/**
 * 获取某个元素的所有兄弟元素
 * @param element 某个元素
 * @returns {Array} 兄弟元素
 */
function getSiblings(element) {
    if (!element)return;
    var elements = [];
    var ele = element.previousSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);
        }
        ele = ele.previousSibling;
    }
    ele = element.nextSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);

        }
        ele = ele.nextSibling;
    }
    return elements;
}
/**
 * 返回当前浏览器是什么类型的浏览器
 */
function userBrowser(){
    var browserName=navigator.userAgent.toLowerCase();
        if(/msie/i.test(browserName) && !/opera/.test(browserName)){
            console.log("IE");
        }else if(/firefox/i.test(browserName)){
            console.log("Firefox");
        }else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){
            console.log("Chrome");
        }else if(/opera/i.test(browserName)){
            console.log("Opera");
        }else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){
            console.log("Safari");
    }else{
        console.log("不知道什么鬼!");
    }
}

function getStyle(element,attr) {
    return element.currentStyle?element.currentStyle[attr]:window.getComputedStyle(element,null)[attr];
}
//缓动动画函数的封装
function animate(element, json,fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag=true;
        for (var attr in json) {
            if(attr=="opacity"){
                var current = getStyle(element, attr)*100;
                var target=json[attr]*100;
                //每次移动的步数
                var step = (target - current) / 10;
                //每次移动步数都是整数(比较大的数字)
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//移动后的当前的像素
                element.style[attr] = current/100;
            }else if(attr=="zIndex"){
                element.style[attr]=json[attr];
            }else{
                var current = parseInt(getStyle(element, attr));
                var target=json[attr];
                //每次移动的步数
                var step = (target - current) / 10;
                //每次移动步数都是整数(比较大的数字)
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//移动后的当前的像素
                element.style[attr] = current + "px";
            }
            if (current != target) {//到达目标后停止计时器
                flag=false;
            }
        }
        if(flag){
            clearInterval(element.timeId);//清理计时器
            if(fn){
                fn();
            }
        }
        console.log("target:" + target + ",current:" + current + ",step:" + step);
    }, 20);
}


//关于事件参数对象的工具的代码
var evtTools={
    //事件参数
    evt:function (e) {
        return window.event?window.event:e;
    },
    //页面向左卷曲出去的距离
    left:function () {
        return window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft||0;
    },
    //页面向上卷曲出去的距离
    top:function () {
        return window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop||0;
    },
    //事件参数对象中的属性封装---可视区域的横坐标
    clientX:function (e) {
        return this.evt(e).clientX;
    },
    //事件参数对象中的属性封装---可视区域的纵坐标
    clientY:function (e) {
        return this.evt(e).clientY;
    },
    pageX:function (e) {
        return this.evt(e).pageX?this.evt(e).pageX:this.left()+this.clientX(e);
    },
    pageY:function (e) {
        return this.evt(e).pageY?this.evt(e).pageY:this.top()+this.clientY(e);
    }
};

//当浏览器的宽度发生变化,就获取浏览器(页面可视区域的宽度)
function getClient() {
    return{
        width:window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth||0,
        height:window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight||0
    }
}
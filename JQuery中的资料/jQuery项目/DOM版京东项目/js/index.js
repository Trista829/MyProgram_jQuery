$(function () {
    //关闭顶部广告
    $("#J_event_close").click(function () {
        //设置当前所在的div隐藏
        $("#J_event").fadeOut(500);
    });
    
    //手机二维码
    $("#phone-erweima-img").mouseenter(function () {
        //显示大图二维码
        $("#phone-img").show();
    });
    //隐藏大图二维码
    $("#phone-img").mouseleave(function () {
        $(this).hide();
    });


    //显示其他城市
    var address = [
        "北京",
        "上海",
        "天津",
        "重庆",
        "河北",
        "山西",
        "河南",
        "辽宁",
        "吉林",
        "黑龙江",
        "内蒙古",
        "江苏",
        "山东",
        "安徽",
        "浙江",
        "福建",
        "湖北",
        "湖南",
        "广东",
        "广西",
        "江西",
        "四川",
        "海南",
        "贵州",
        "云南",
        "西藏",
        "陕西",
        "甘肃",
        "青海",
        "宁夏",
        "新疆",
        "港澳",
        "台湾",
        "钓鱼岛",
        "海外"
    ];
    //获取显示城市的div
    var area=$("#sendTo .send-area");
    $("#sendTo").mouseenter(function () {
        $("#sendTo .send-area").show();
        $("#address").addClass("dv-dt-show");
    });
    $("#sendTo").mouseleave(function () {
        $("#sendTo .send-area").hide();
        $("#address").removeClass("dv-dt-show");
    });
    address.forEach(function (ele) {
        //创建元素
        $("<div class='item'><a href='javascript:void(0)'>"+ele+"</a></div>").appendTo(area);
    });
    //设置第一个a标签应用类样式
    area.children("div").children("a").first().attr("id","currentArea");
    //循环所有的a标签
    area.children("div").children("a").mouseenter(function () {
        $(this).addClass("current");
    });
    area.children("div").children("a").mouseleave(function () {
        $(this).removeClass("current");
    });

    //中间搜索栏功能
    $("#key").focus(function () {
        if($(this).css("color")==="rgb(152, 152, 152)"){
            $(this).css("color","black");
            $(this).val("");
        }
    });
    $("#key").blur(function () {
        if($(this).val().length===0){
            $(this).css("color","rgb(152, 152, 152)");
            $(this).val("爆款低至5折");
        }
    });
    //输入内容后
    $("#key").keyup(function () {
        var data = [
            {"衬衫": ["衬衫男", "衬衫女", "衬衫长款", "衬衫短款"]},
            {"裙子": ["裙子长款", "裙子短款", "裙子夏天", "裙子冬天"]},
            {"裤子": ["裤子男", "裤子女", "裤子夏季", "裤子冬季"]},
            {"衣服": ["衣服男", "衣服女", "衣服 运动", "衣服 休闲"]},
            {"运动鞋": ["运动鞋男", "运动鞋女", "运动鞋夏季", "运动鞋冬季"]}
        ];
        if($("#dv")){
            $("#dv").remove();
        }
        var tempArr=[];
        //文本框的内容在数组中存在
        for(var i=0;i<data.length;i++){
            var dt=data[i];
            if(dt[$(this).val()]){
                tempArr=dt[$(this).val()];
            }
        }
        //有则删除
        if($(this).val().length===0||tempArr.length===0){
            if($("#dv").length!=0){
                $("#dv").remove();
            }
            return;
        }
        //创建div
        var dvObj=$("<div id='dv'></div>").appendTo($("#J_search"));
        dvObj.css({"width":"498px","marginLeft":"-1px","border":"1px solid #989898","backgroundColor":"white","zIndex":"100","position":"relative","marginTop":"33px"});
        dvObj.mouseleave(function () {
            $(this).remove();//鼠标离开div后移除这个div
        });
        //创建p标签
        for(var i=0;i<tempArr.length;i++){
            var pObj=$("<p><a href='javascript:void(0)' style='text-align: left;color: #4169e1'>"+tempArr[i]+"</a><a href='javascript:void(0)' style='float: right;color: #4169e1'>约1072004个商品</a></p>").appendTo(dvObj);
            pObj.css({"clear":"both","marginLeft":"3px","marginTop":"3px","cursor":"pointer"}).mouseenter(function () {
                $(this).css("backgroundColor","#CCC");
            }).mouseleave(function () {
                $(this).css("backgroundColor","");
            }).click(function () {
                //鼠标点击p的时候把a中内容加入到搜索框
                $("#key").val($(this).children("a").first().text());
                dvObj.remove();//鼠标点击p后移除div
            });

        }
    });

    //右侧登录下的切换效果
    $("#userbtm").children("a").mouseenter(function () {
        $(this).css({"backgroundColor":"#E01222","color":"white"});
    }).mouseleave(function () {
        $(this).css({"backgroundColor":"","color":"#E01222"});
    });

    //右侧tab切换

    var liOdd=$("#news-ul").children("li:even");
    liOdd.first().mouseenter(function () {
        $("#dv-line").css("position","absolute").animate({"left":0},300);
            $("#news-dv").children("ul:first").addClass("current");
            $("#news-dv").children("ul:last").removeClass("current");

    });
    liOdd.first().next().next().children("a").mouseenter(function () {
        $("#dv-line").css("position","absolute").animate({"left":"40px"},300);
        $("#news-dv").children("ul:first").removeClass("current");
        $("#news-dv").children("ul:last").addClass("current");
    });


    //轮播图

    var ulObj=$("#slider>.lunbotu");
    var pic=0;
    $("#slider>.slder-item>ul>li").mouseenter(function () {
        pic=$(this).index();
        $(this).addClass("color-red").siblings("li").removeClass("color-red");
        //移动
        //var moveWidth=$(this).index()*$("#slider").width();
        //ulObj.animate({"left":-moveWidth});
        ulObj.children("li").fadeOut(300);
        ulObj.children("li:eq("+$(this).index()+")").fadeIn(300);
    });

    var timeId=null;

    //显示和隐藏左右焦点的div
    $("#slider").mouseenter(function () {
        $(this).children(".pages").animate({"opacity":1},500);
        clearInterval(timeId);
    }).mouseleave(function () {
        $(this).children(".pages").animate({"opacity":0},500);
        timeId=setInterval(function () {
            aObjs.last().click();
        },1000);
    });
    //获取按钮
    var aObjs=$("#slider>.pages").children("a");
    //右边按钮
    aObjs.last().click(function () {
        if(pic==ulObj.children("li").length-1){
            pic=0;
        }
        pic++;
        ulObj.children("li").fadeOut(300);
        ulObj.children("li:eq("+pic+")").fadeIn(300);
        if(pic==ulObj.children("li").length-1){
            $("#slider>.slder-item>ul>li:eq(0)").addClass("color-red").siblings("li").removeClass("color-red");
        }else{
            $("#slider>.slder-item>ul>li:eq("+pic+")").addClass("color-red").siblings("li").removeClass("color-red");
        }
    });
    //左边按钮
    aObjs.first().click(function () {
        if(pic==0){
            pic=ulObj.children("li").length-1;
        }
        pic--;
        ulObj.children("li").fadeOut(300);
        ulObj.children("li:eq("+pic+")").fadeIn(300);
        $("#slider>.slder-item>ul>li:eq("+pic+")").addClass("color-red").siblings("li").removeClass("color-red");

    });

    timeId=setInterval(function () {
        aObjs.last().click();
    },1000);
});



//
//     //轮播图切换效果实现
//     //获取所有的li标签
//     //获取轮播图外面的ul
//     var ulObj = my$("slider").children[0];
//     var list = my$("slider").children[0].children;
//     //左右焦点的div
//     var page = my$("slider").children[1];
//     //左右焦点中的左边按钮
//     var left = page.children[0];
//     //左右焦点中的右边按钮
//     var right = page.children[1];
//     //获取小按钮
//     var pic = 0;
//     var smallBtn = my$("slider").children[2].children[0].children;
//     for (i = 0; i < smallBtn.length; i++) {
//         smallBtn[i].setAttribute("index", i);
//         smallBtn[i].onmouseover = function () {
//             for (var j = 0; j < smallBtn.length; j++) {
//                 smallBtn[j].className = "";
//             }
//             this.className = "color-red";
//             pic = parseInt(this.getAttribute("index"));
//             animate(ulObj, {"left": -(pic * my$("slider").offsetWidth)});
//         };
//     }
//
//     //自动播放轮播图
//     var timeId = null;
//     timeId = setInterval(rightClickHandle, 1000);
//     //显示左右焦点
//     my$("slider").onmouseover = function () {
//         animate(page, {"opacity": 1});
//         clearInterval(timeId);//干掉自动播放
//     };
//     //隐藏左右焦点
//     my$("slider").onmouseout = function () {
//         animate(page, {"opacity": 0});
//         //继续自动播放
//         timeId = setInterval(rightClickHandle, 1000);
//     };
//     //左按钮
//     left.onclick = function () {
//         if (pic == 0) {
//             pic = list.length - 1;
//             ulObj.style.left = -pic * my$("slider").offsetWidth + "px";
//         }
//         pic--;
//         //移动图片
//         animate(ulObj, {"left": -(pic * my$("slider").offsetWidth)});
//         for (var i = 0; i < smallBtn.length; i++) {
//             smallBtn[i].className = "";
//         }
//         smallBtn[pic].className = "color-red";
//     };
//
//     //右按钮
//     right.onclick = rightClickHandle;
//     function rightClickHandle() {
//         if (pic == list.length - 1) {
//             pic = 0;
//             ulObj.style.left = -pic * my$("slider").offsetWidth + "px";
//         }
//         pic++;
//         animate(ulObj, {"left": -(pic * my$("slider").offsetWidth)});
//
//
//         //移除小按钮的所有的样式
//         for (var i = 0; i < smallBtn.length; i++) {
//             smallBtn[i].className = "";
//         }
//         if (pic == list.length - 1) {//如果最后一个图片,让第一个小按钮有样式
//             smallBtn[0].className = "color-red";
//         } else {
//             //设置对应的小按钮有样式
//             smallBtn[pic].className = "color-red";
//         }
//
//     }
//
//     //右侧的促销和公告
//     var liObjs = my$("news-ul").children;
//     //横线(红色的)
//     var line = my$("dv-line");
//     var count = 0;
//     for (i = 0; i < liObjs.length; i++) {
//         if (i % 2 == 0) {
//             var aObjs = liObjs[i].children[0];
//             aObjs.count = count;
//             count++;
//             //鼠标进入到a标签中设置样式及显示内容
//             aObjs.onmouseover = aObjsmouseover;
//         }
//     }
//     function aObjsmouseover() {
//         animate(line, {"left": this.offsetLeft});
//         var ulObjs = my$("news-dv").getElementsByTagName("ul");
//         for (i = 0; i < ulObjs.length; i++) {
//             ulObjs[i].className = "";
//         }
//         ulObjs[this.count].className = "current";
//
//     }
//
//     //左侧的导航菜单栏
//     var listObjs = my$("banner-left-item").children;
//     //菜单对应的导航
//     divObjs = my$("dvItem").children;
//     my$("banner-left-item").onmouseover = function () {
//         //应用新的类样式
//         my$("dvItem").className = "bannercurrent";
//     };
//     my$("banner-left-item").onmouseout = function () {
//         //恢复原来的类样式
//         my$("dvItem").className = "left-banner-item";
//     };
//     for (i = 0; i < listObjs.length; i++) {
//         listObjs[i].setAttribute("index", i);
//         listObjs[i].onmouseover = function () {
//             for (var j = 0; j < divObjs.length; j++) {
//                 divObjs[j].style.display = "none";
//             }
//             divObjs[parseInt(this.getAttribute("index"))].style.display = "block";
//         };
//     }
// };
//

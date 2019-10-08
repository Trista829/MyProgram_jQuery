/***
 * zoeDylan
 * 表格插件
 * UpdateTime:2014-04-07
 * Versions:1.0.0
 * Quote:jquery-1.10.2.js
 * URL:http://pan.baidu.com/s/1bnnaj5H
***/
(function ($) {
    var//临时变量
        _temp,//当前元素
        _this = $(this),//插件配置
            //这里是插件配置的参数  属性:值
        _setting = {//背景
            background: '#f60',//前景
            color: '#000',//高
            height: 150,//宽
            width: 200,//标题
            title: new Array(),//列表
            item: new Array(new Array()),//每页列表数
            itemNum: 10
        },//当前显示的倍数
        _itemNum = 0,//循环次数
        _forNum = 0
    $.fn.zoeDylan_DataTable = function (op) {
        _this = $(this);
        _setting = $.extend(_setting, op);
        return this.each(function () {
            //插件
            VerifyData();
            SetTemplate();
            SetEvent();
        });
    }
    //数据验证、初始化
    function VerifyData() {
        _setting.width = parseFloat(_setting.width) >= 200 ? parseFloat(_setting.width) : 200;
        _setting.height = parseFloat(_setting.height) >= 150 ? parseFloat(_setting.height) : 150;
        _setting.itemNum = parseInt(_setting.itemNum) > 0 ? parseInt(_setting.itemNum) : 10;
    }
    //模版添加
    function SetTemplate() {
        _this.removeClass().addClass('zd-datatable').css({//初始化元素
            'height': _setting.height,
            'width': _setting.width,
            'background': _setting.background,
            'color': _setting.color,
            //  'font-size': _setting.height / (_setting.itemNum + 1) - 10,
            // 'line-height': _setting.height / (_setting.itemNum + 1) + 'px'
        });
        //添加标题
        _temp = $(document.createElement('div'));
        _temp.addClass('zd-datatable-title').css({
            //   'height': _setting.height / (_setting.itemNum + 1),
            'background': _setting.background,
            'width': _setting.width - 17 + 'px'
        });
        _this.append(_temp);
        for (var i = 0; i < _setting.title.length; i++) {//添加标题
            _temp = $(document.createElement('div'));
            _temp.addClass('zd-datatable-title-item');
            _temp.append('<span>' + _setting.title[i] + '</span>');
            $('.zd-datatable-title').append(_temp);
        }
        //添加列表
        _temp = $(document.createElement('div'));
        _temp.addClass('zd-datatable-item').css({//初始化列表
            'height': _setting.height,
        });
        _this.append(_temp);
        for (var i = 0; i < _setting.itemNum + 2; i++) {
            _temp = $(document.createElement('div'));
            _temp.addClass('zd-datatable-item-item');
            for (var ii = 0; ii < _setting.title.length; ii++) {//添加列表项
                var tempELE = $(document.createElement('div'));
                tempELE.addClass('zd-datatable-title-item');
                tempELE.append('<span></span>');
                _temp.append(tempELE);
            }
            $('.zd-datatable-item').append(_temp);
        }
        Update();//更新数据

        //添加控制器
        _temp = $(document.createElement('div'));
        _temp.addClass('zd-datatable-control').css({
            //   'height': _setting.height / (_setting.itemNum + 1),
            'background': _setting.background,
            'width': _setting.width - 17 + 'px'
        });
        _this.append(_temp);
        //添加控制器按钮
        _temp = $(document.createElement('div'));
        _temp.attr('id', 'd');
        _temp.html('上一页');
        $('.zd-datatable-control').append(_temp);
        //添加控制器按钮
        _temp = $(document.createElement('div'));
        _temp.attr('id', 'u');
        _temp.html('下一页');
        $('.zd-datatable-control').append(_temp);

        //最后确定数据
        if ($('.zd-datatable-title-item').length > 0) {
            $('.zd-datatable-title-item').css({
                'width': _setting.width / _setting.title.length - 15
            });
        }
    }
    //设置事件
    function SetEvent() {
        $('.zd-datatable-item .zd-datatable-title-item').bind('click', function () {
            if (document.selection) {
                var range = document.body.createTextRange();
                range.moveToElementText(this);
                range.select();
            } else if (window.getSelection) {
                var range = document.createRange();
                range.selectNode(this);
                window.getSelection().addRange(range);
            }
        });
        $('.zd-datatable-control #u').bind('click', function () {
            _itemNum = _itemNum + 1;
            Update();
        });
        $('.zd-datatable-control #d').bind('click', function () {
            _itemNum = _itemNum - 1;
            Update();
        });
    }
    //更新列表数据
    function Update() {
        //*检测数据     
        //更新循环数目
        _forNum = _setting.itemNum * (1 + _itemNum) >= _setting.item.length ? _setting.item.length - _itemNum * _setting.itemNum : 10;

        //处理数据倍数
        _itemNum = _itemNum < 0 ? 0 : _forNum < 0 ? _itemNum - 1 : _itemNum;
        if (_forNum > 0) {
            //添加列表
            $('.zd-datatable-item span').html('').attr('title', '');
            for (var i = 0; i < _forNum; i++) {
                for (var ii = 0; ii < _setting.title.length; ii++) {
                    $('.zd-datatable-item').children('.zd-datatable-item-item:eq(' + (i + 1) + ')').children('div:eq(' + ii + ')').children('span').html(_setting.item[i + _itemNum * _setting.itemNum][ii]).attr('title', _setting.item[i + _itemNum * _setting.itemNum][ii]);
                }
            }
        }
    }
})($)
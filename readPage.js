window.onload = function(e) {
    menuApprance();
    document.getElementById("article_content").bindWordsCatcher(["point"]);

    //关闭页面
    var close = document.getElementById("close");
    var wrap = document.getElementById("dic_wrap");
    close.onclick = function () {
        wrap.style.display = "none";
    };
    tabApp("dic_tab","dic_content");
    overlaytab("overlay_tab","inputBox");
    closeOverlay();
};

//字典解释来源选项卡；
function tabApp(tab,list) {
    var tab = document.getElementsByClassName(tab);
    var list = document.getElementsByClassName(list);

    //遍历tab下所有list;
    for (var i = 0; i < tab.length; i++) {

        tab[i].index = i;
        tab[i].onclick = function () {
            display(list[this.index]);
        };
    };

    //拼音所在页滚动时，拼音才显示固定效果
    function display(blk) {
        //清除tab的效果；
        for (var j = 0; j < tab.length; j++) {
            list[j].style.display = "none";
        };

        blk.style.display = "block";        
        var classes = blk.className.split(' ');
        for (var i = 0; i < classes.length; i++) {                            
            if (classes[i] === 'py_fixed' && blk.onscroll === null) {
                blk.onscroll = scrollEffectClosureForPY(blk);
            };
        };
      
        for(var i = 0; i < list.length; i++) {
            list[i].scrollTop = 0;
        }
    };
    list[0].onscroll = display(list[0]);
};    

//滚动页面时，拼音层固定
function scrollEffectClosureForPY(div) {
        //获取第一个拼音；
        var fpy = div.getElementsByClassName("py")[0];

        //固定拼音元素索引值
        var fixed_py_index = 0;

        //获取所有拼音；
        var pys = div.getElementsByClassName("py");
        var otlist = [];

        //存放拼音顶部距离的数组；
        for (var i = 0; i < pys.length; i++) otlist.push(pys[i].offsetTop - pys[i].offsetHeight);

        return function (e) {

            //定义当前滚动的页面；
            var dic_content = e.srcElement;

            // 判断当前ST所在区间
            for (var i = 0; i < pys.length && dic_content.scrollTop >= otlist[i]; ++i);
            i--;

            if (i === 0) { // 第一个拼音区间
                if (dic_content.scrollTop === 0) {
                    fpy.style.position = "relative";
                } else {
                    fpy.style.position = "absolute";
                }
            }
            if (i !== fixed_py_index) { // 顶部拼音改变
                pys[i].style.position = "absolute";
                pys[i].style.top = 0;
                pys[i].style.zindex = 10;
                pys[fixed_py_index].style.position = 'relative';
                pys[fixed_py_index].style.zindex = 0;
                fixed_py_index = i;
            }
        };
}

//页面目录菜单显示隐藏效果
function menuApprance () {
    var icon = document.getElementById("menu_icon");
    var blk = document.getElementById("menu_blk");

     //点击按钮出现或隐藏div，并取消冒泡
    icon.onclick = function show (e) {
        e = e || window.event;
        if (blk.style.display == "none") {
            blk.style.display = "block"
        } else {
            blk.style.display = "none";
        };
        eventUtil.stopPropagation(e);
    };

    //为document添加点击事件，点击关闭div
    document.onclick = function () {
        if(blk.style.display = "block") {
            blk.style.display = "none";
        };
    };

    //点击div时，div不关闭
    blk.onclick = function (e) {
        e = e || window.event;
        eventUtil.stopPropagation(e);
    }
};

//页面滚动事件，侧边栏固定效果
window.onscroll = function () {
    var windowHeight = document.body.scrollTop;
    var cata = document.getElementById("read_catalog");

    //判断滚动距离，大于元素顶端时元素固定
    if(windowHeight > 105) {
        cata.style.position = "fixed";
        cata.style.left = "856px";
        cata.style.top = 0;
    } else {//小于元素顶端时元素恢复
        cata.style.position = "static"
    };
};

//双击滚动页面效果
var timer;
function startScroll() {
    timer = setInterval("scrollwindow()",25);
}
function stopScroll () {
    clearInterval(timer);
}
function scrollwindow() {
    window.scrollBy(0,1);
}
document.ondblclick = startScroll;
document.onmousedown = stopScroll;

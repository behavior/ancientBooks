window.onload = function () {
    var close = document.getElementById("close");
    var wrap = document.getElementById("dic_wrap");

    //字典解释来源选项卡；
    tabApp("dic_tab","dic_content");

    
    //关闭页面
    close.onclick = function() {
        wrap.style.display = "none";
};   

    function tabApp(tab,list) {
        var tab = document.getElementsByClassName(tab);
        var list = document.getElementsByClassName(list);;
        var content = document.getElementsByClassName("dic_content");
        function display(blk) {
            
            //清除tab的效果；
            for (var j = 0; j < tab.length; j++) {
                list[j].style.display = "none";
            }

            blk.style.display = "block";
            var classes = blk.className.split(' ');
            for (var i = 0; i < classes.length; i++) {
                if (classes[i] === 'py_fixed' && blk.onscroll === null) {
                    blk.onscroll = scrollEffectClosureForPY(blk);
                };
            };
            for(var i = 0; i < content.length; i++) {
                content[i].scrollTop = 0;
            }
        };
        
        //遍历tab下所有list;
        for (var i = 0; i < tab.length; i++) {
            tab[i].index = i;
            tab[i].onclick = function () {
                display(list[this.index]);
            };
        };

        display(list[0]);
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
                console.log(fpy)
                // if (dic_content.scrollTop === 0) {
                //     fpy.style.position = "relative";
                //     // fpy.style.top = dic_content.scrollTop + "px";
                //     // fpy.style.position = "absolute";
                // } else {
                //     fpy.style.position = "absolute";
                //     // fpy.style.position = "static"
                // }
            }
            if (i !== fixed_py_index) { // 顶部拼音改变
                pys[i].style.position = 'absolute';
                pys[i].style.top = 0;
                pys[i].style.zindex = 10;
                pys[fixed_py_index].style.position = 'relative';
                pys[fixed_py_index].style.zindex = 0;
                fixed_py_index = i;
            }
        };
    }


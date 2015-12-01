function overlaytab(tab,list) {
    var tab = document.getElementsByClassName(tab);
    var list = document.getElementsByClassName(list);
    list[1].style.display = "none";
    //遍历tab下所有list;
    for (var i = 0; i < tab.length; i++) {
        tab[i].index = i;
        tab[i].onclick = function () {            
            for (var j = 0; j < tab.length; j++) {
                //再次点击时清除之前的显示；
                list[j].style.display = "none";
                tab[j].style.borderBottom = "0px"
            };
            //点击选项卡，相应的内容层显示；
            list[this.index].style.display = "block";
            tab[this.index].style.borderBottom = "2px solid #3283B0";
        };  
    };
};

//点击关闭按钮，遮罩层消失；
function closeOverlay() {
    var close = document.getElementsByClassName("overlay_close")[0];
    var overlay = document.getElementById("overlay");
    close.onclick = function () {
        overlay.style.display = "none";
    }
}
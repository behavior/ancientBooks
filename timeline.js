window.onload = function(){
	//每个时间轴后增加圆点；
	addDot("time");
	addDot("category");
	drawString();
	// addString();
	//类别时间轴选项卡；
	var category =document.getElementsByClassName("category");
	var dotL = document.getElementsByClassName("timeline_left")[0].getElementsByClassName("timeDot");
	// timelineTab(category,list,dotL);
	// timelineTab(dotL,list,category);

	window.onscroll = function() {
	cursorMove();
   };
};

//向每条时间轴前增加圆点
function addDot(classname) {
	var ele = document.getElementsByClassName(classname);
	for (var i = 0; i < ele.length; i ++) {
		var newDiv = document.createElement("li");
		var ul = ele[i].parentNode;
		ul.insertBefore(newDiv,ele[i]);
		newDiv.setAttribute("class","timeDot");
		newDiv.setAttribute("style","width:5px;height:5px;border-radius:6px;background:#A4A4A4;position:relative;top:12px;left:-42px;");
	};
	
	//为圆点添加hover效果；
	var dot = document.getElementsByClassName("timeDot");
	for (var i = 0; i < dot.length; i ++) {
		dot[i].onmouseover = function() {
			this.style.background = "#AD2525";
		}
		dot[i].onmouseout = function() {
			this.style.background = "#ACACAC";
		};
	};
};

//向每个书名作者li后增加横线连接
function addString(){
	//获取每个作者；
	var list = document.getElementsByClassName("author_books");
	for (var i = 0; i < list.length; i ++) {
		
		//获取每个作者的姓名和书名列表；
		// var divs = list[i].getElementsByTagName("div");
		var divs = list[i].children;
		// for (var j = 0; j < divs.length; j ++) {
			var newSpan = document.createElement("span");
			var papa = divs[2].parentNode;
			// papa.insertBefore(newSpan,papa);

			// list[0].insertBefore(newSpan,divs[0])
			// console.log(list[0]);
			// list[i].insertBefore(newSpan,divs[j]);
			// console.log(papa);
			// newDiv.setAttribute("class","string");
		// };		
	};
}

//时间轴选项卡；
function timelineTab(tab,list,dot) {
	// var tab = document.getElementsByClassName(tab);
	for (var i = 0; i < tab.length; i++) {
		list[i].style.display = "none";
		tab[i].index = i;
		tab[i].onclick = function() {
			for (var j = 0; j < tab.length; j ++) {
				list[j].style.display = "none";
				tab[j].style.color = "black";
				dot[j].style.background = "#ACACAC";
			};
			list[this.index].style.display = "block";
			tab[this.index].style.color = "#9795C3";
			dot[this.index].style.background = "#9795C3";
			document.body.scrollTop = "0px";
		}
	};
}

//根据内容显示百分比，时间轴游标相应移动；
function cursorMove(listLength) {
	var cursor = document.getElementsByClassName("")
	var st = document.body.scrollTop; 
	var list;
	var percent;
	for (var i = 0; i < listLength; i++) {
		if(st > bookT) {
			percent = (i/(list.length)*100).toFixed(2);
		}else if(st < list[0].offsetTop + list[0].offsetHeight - 40){
			percent = 0;
		};
	};
}

//获取每个div四个边上中点的坐标；
function getMidpointPosition() {
	var ab = document.getElementsByClassName("author_books");
	var midPoints = new Array();	
	for (var i = 0; i < ab.length; i++) {
		var divs = ab[i].children;
		for (var j = 0; j < divs.length; j ++) {
			var divP = divs[j].getPosition();
			//每个div的四边中点坐标存放在数组内；
			midPoints.push({
				top:[(divP.x2 + divP.x1)/2,divP.y1],
				bottom:[(divP.x2 + divP.x1)/2,divP.y2],
				left:[divP.x1,(divP.y2 + divP.y1)/2],
				right:[divP.x2,(divP.y2 + divP.y1)/2]
			});
		};
	};
	return midPoints;
}

// 扩展DOM获取位置方法;
HTMLElement.prototype.getPosition = function () {
	var oLeft = this.offsetLeft;
	var oTop = this.offsetTop;
	var oWidth = oLeft + this.offsetWidth;
	var oHeight = oTop + this.offsetHeight;
	var oParent = this.offsetParent;
	while (oParent !== null) {
		oLeft += oParent.offsetLeft;
		oParent = oParent.offsetParent;
	};
	return{x1: oLeft, x2: oWidth, y1: oTop, y2: oHeight};
};

//在相邻的两个div之间用画出的直线连接；
function drawString() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var gmp = getMidpointPosition();
	for (var i = 0; i < gmp.length; i++) {
		draw(gmp[i],context);
	};
}

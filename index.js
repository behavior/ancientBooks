HTMLElement.prototype.bindWordsCatcher = function (methods) {
	var container = this;
	var a;

	// 判断处理参数method
	if (methods === undefined) {
		methods = ["point", "select"];
	} else if (typeof(methods) === 'string') {
		methods = [methods];
	} else if (methods.constructor !== Array) {
		throw new Error('The parem is illegal.');
	};

	while(methods.length) {
		var method = methods.shift();
		if (method === "point") {
			if(typeof(document.onmouseup) !== true) {
				pointCatcher(container);
			}
		} else if (method === "select") {
			selectCatcher(container);
		} else {
			throw new Error("The catcher is not exist.");
		};
	};
};

function pointCatcher(container) {
	// 全部字位置信息
	var positions = [];
	cleanWhitespace(container);

	//利用辅助span节点获取容器内每个字符及其坐标;
	function getWordPosition (container) {		
		if (container.innerHTML !== undefined) {
			var content = container.childNodes;
			for (var i = 0; i < content.length; i++) {
				var spans = [];	
				var c = [];

				//如果子节点为文本，对其每个节点前插入用于确定字符位置的span标签
				if(content[i].constructor == Text) {

					//遍历每个文本节点
					for (var j = 0; j < content[i].length; j++) {
						//a为每个文本节点
						var a = content[i];
						//把文本节点存放在数组内
						c.push(a);
						//遍历每个文本节点
						for (var k = 0; k < a.length; k++) {

							//b为文本节点；
							var b = c[j];
							//在字符串前插入span，为其内依次赋予字符串文字						
							var span = document.createElement("span");
							container.insertBefore(span,b);
							span.innerText = b.nodeValue[k];
							if (span.offsetWidth === 0) { // 生僻字处理 占两位
								k++
								span.innerText += b.nodeValue[k];
							};
							spans.push(span);
							
							// 获取节点字位置信息并存入字典数组中
							positions.push({word: span.innerText, position: span.getPosition()});

						};
					};	
					// 清空所有插入的辅助节点，还原现场。
					for (var z = 0; z < spans.length; z++) {
						container.removeChild(spans[z]);
					};

				} else { //否则，递归；
						getWordPosition(content[i]);
					}			
			}				
		};
		return positions;
	};
	
	//获取当前光标位置;
	function getMousePosition (ev) {
		var oEvent = ev || event;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		var position = {x: oEvent.pageX, y: oEvent.pageY};
		return position;
	};

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



	//去除空白节点；
	function cleanWhitespace(oEelement) {
		for(var i=0;i<oEelement.childNodes.length;i++) {
			var node=oEelement.childNodes[i];
			if(node.nodeType==3 && !/\S/.test(node.nodeValue)){node.parentNode.removeChild(node)}
	  	};
	};

	//删除左右两端的空格;
	function trim(str) { 
		return str.replace(/(^\s*)|(\s*$)/g, "");
	};

	//输出鼠标所在区域字符;
	function judge (ev) {
		var xy = getMousePosition(ev);
		for (var i = 0; i < p.length; i++) {
			if (xy.x >= p[i].position.x1 && 
			xy.x <= p[i].position.x2 && 
			xy.y >= p[i].position.y1 && 
			xy.y <= p[i].position.y2) 
			{ 	
				dictionary.style.display = "block";
				dictionary.style.left = p[i].position.x2 +"px";
				dictionary.style.top = p[i].position.y2 +"px";
				// dictionary.innerText = p[i].word
				console.log(xy,p[i].position,p[i].word)
			};
		};
	};

	//定时器Handle;
	var timer1,timer2,timer3;
	var dictionary = document.getElementById("dic_wrap");
	var p = getWordPosition(container);
 	
	// 光标移入字符事件定义
	container.onmousemove = function (e) {
		clearTimeout(timer1);
		timer1 = setTimeout(function(e) {
			return function () {
				judge(e);			
			};
		}(e), 1500);
	};

	// 光标移出字符事件定义
	container.onmouseout = function() {
		 timer2 = setTimeout(function() {
			dictionary.style.display = "none";
		},1000);		
	};


	// 光标移入字典框事件定义
	dictionary.onmouseover = function () {
		clearTimeout(timer2);
		clearTimeout(timer3);
		dictionary.style.display = "block";
	};
	
	// 光标移出字典框事件定义
	dictionary.onmouseout = function () {
		timer3 = setTimeout(function() {
			dictionary.style.display = "none"
		},500);
	};
};




// function selectCatcher(container) {
	
// 	//获取选中文字内容;
// 		function createElements (newDiv, target, key, value) {
// 			var newDiv = document.createElement(newDiv);
// 			var target = document.getElementById(target);
// 			target.appendChild(newDiv);
// 			newDiv.setAttribute(key, value);
// 		};
// 	function getSelect() {
// 		var selectTxt;
// 		if (window.getSelection) {//标准浏览器支持的方法
// 			selectTxt = window.getSelection();
// 		};
// 		if (document.selection) {//IE浏览器支持的方法
// 			selectTxt = document.selection.createRange().text;
// 		};
// 		return trim(selectTxt.toString());
// 	};

// 	//删除左右两端的空格;
// 	function trim(str) { 
// 		return str.replace(/(^\s*)|(\s*$)/g, "");
// 	};
	
// 	//鼠标选中事件;
// 	createElements ("div", "webcontainer", "id", "dictionary");
// 	createElements ("p", "dictionary", "id", "word");
// 	container.onmouseup = function(e) {
// 		setTimeout(function() {
// 			var dictionary = document.getElementById("dictionary");
// 			e = e || window.event;
// 			var content = getSelect(e);
// 			var left = e.clientX + 10;
// 			var top = e.clientY + 10;
// 			if (content != "" || null) {
// 				dictionary.style.display = "block";
// 				dictionary.style.backgroundColor = "green";
// 				dictionary.style.left = left + "px";
// 				dictionary.style.top = top + "px";
// 				content = dictionary.innerText;
// 			};
// 		},200);
// 	return a = 1;
// };
// };

// ==UserScript==
// @include        chrome://browser/content/browser.xul
// @name           qrCreatorOnline.uc.js
// @version        0.1
// @charset        UTF-8
// @author         lastdream2013
// ==/UserScript==
 var qrCreatorOnline = {
    generateAddress: function(target_data) {
        return 'http://chart.apis.google.com/chart?cht=qr&chs=350x350&chl=' + encodeURIComponent(target_data);
    },

    targetWindow: null,

    checkLength: function(arg) {
        if (arg ) {
        	if ( arg.length == 0  ) {
        		alert("没有要转化为二维码的内容！" );
        	       return false;
        	}
        	else if (arg.length > 250) { 
        		alert("要转化为二维码的数据超长了！(大于250字节)" );
        	       return false;
        	}else {
        		return true;
        	}
        }
        else {
            return false;
        }
    },

    popupImage: function(target_data, altText) {
        var img_node = content.document.getElementById('qrCreatorOnlineimageboxid');
        if (img_node) {
            img_node.parentNode.removeChild(img_node);
        }
        img_node = this.pinImage(target_data, altText);

        content.document.body.appendChild(img_node);
		this.ImgDrag(img_node);
		content.document.addEventListener('click', function (e) {
			if(img_node && e.button==0 && e.target != img_node) {
				img_node.parentNode.removeChild(img_node);
				this.removeEventListener("click",arguments.callee,true);
			}
		}, true);
    },

    pinImage: function(target_data, altText) {
        var img_node = new Image();
        img_node.setAttribute('style', '-moz-box-shadow: 0 0 4px #000000');
        with (img_node.style) {
            position = 'fixed';
            left = '-moz-calc(50% - 183px)';
            top = '-moz-calc(50% - 183px)';
            zIndex = 99999;
			width = "350px";
			height = "350px";
            border = '8px solid rgba(0,0,0,.5)';
			borderRadius = '5px';
			background = 'transparent';
        }
        img_node.setAttribute('id', 'qrCreatorOnlineimageboxid');
        img_node.setAttribute('src', this.generateAddress(target_data));
        img_node.setAttribute('alt', altText + ': ' + target_data);
        img_node.setAttribute('title', img_node.getAttribute('alt'));

        return img_node;
    },

    onMenuItemCommand: function() {
        if(content.document.getElementById('qrCreatorOnlineimageboxid')) return;
        var target_data = '';
        var altText = "QR码内容[网址]";

        if (gContextMenu) {
            if (gContextMenu.isTextSelected) {
                target_data = content.getSelection().toString();
                altText = "QR码内容[文本]";
            }
            else if (gContextMenu.onLink) {
                target_data = gContextMenu.linkURL;
            }
            else if (gContextMenu.onImage) {
                target_data = gContextMenu.target.src;
            }
            else if ( ( content.document.location == "about:blank" || content.document.location == "about:newtab"  ) ) {
            	altText = "QR码内容[文本]";
            	target_data = prompt("请输入文本创建一个QR码（长度不超过250字节）：", "");
       	}
       	else {
                target_data = content.document.location;
            }
        }

        if (this.checkLength(target_data)) {
                 this.popupImage(target_data, altText);
        }
    },

    init: function() {
		this.ContextMenu();
		var menu=document.getElementById("contentAreaContextMenu");
			menu.addEventListener("popupshowing", this.optionsChangeLabel, false);
    },
    
	ImgDrag: function (node){
		var IsMousedown, LEFT, TOP, img_node = node;
		img_node.onmousedown = function(e) {
			IsMousedown = true;
			e = e||event;
			LEFT = e.clientX - img_node.offsetLeft;
			TOP = e.clientY - img_node.offsetTop;
			return false;
		}

		content.document.addEventListener("mousemove", function(e) {
			e = e||event;
			if (IsMousedown) {
			img_node.style.left = e.clientX - LEFT + "px";
			img_node.style.top = e.clientY - TOP + "px";
			}
		},false);

		content.document.addEventListener("mouseup", function(){
			IsMousedown = false;
		},false);
	},
	
	ContextMenu : function(){
 		var menu=document.getElementById("contentAreaContextMenu");
		var menuItem=document.createElement("menuitem");
			menuItem.setAttribute("id", "qrCreatorOnline.menu");
			menuItem.addEventListener("command", function(){qrCreatorOnline.onMenuItemCommand();}, false);
			menuItem.setAttribute("label", "在线生成QR码");
			menuItem.setAttribute("class", "menuitem-iconic");
			menu.setAttribute("accesskey","S");
			menuItem.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzUlEQVQ4jaWOQYqFMBBE+xgewBO4ceEiIAQaBBHxPjlrFkKWucGbxaf/T/zGYZiCoqraoozwTwhACIHjOCoCt94YQvgM7PterVou762OAGzbRkufvr0H1nWt1stsvtURgGVZvmh3Q6sjPEBVUdWnymvAe4/3ntKX+UkFYJ5nTJ98masXtOCcwzl3m00FYJqmLxrMt1QAxnGs/mz5N30PDMNAS0vedQSg7/vqBWW++mtXYoyoKl3XVQQqvd5UlRgjknMmpcR5nn9iSomcMz9lng2NV0gSXAAAAABJRU5ErkJggg==");
		menu.insertBefore(menuItem, document.getElementById("context-openlinkintab"));

	},
	optionsChangeLabel:function(){
	  var labelText;
        if (gContextMenu) {
            if (gContextMenu.isTextSelected) {
                   labelText = "选区文本";
            }
            else if (gContextMenu.onLink) {
                   labelText = "链接地址";
            }
            else if (gContextMenu.onImage) {
                 labelText = "图象地址";
            }
            else if ( content.document.location == "about:blank" || content.document.location == "about:newtab"  ) {
 			 labelText = "手工输入";
            }
            else {
              	labelText = "当前网址";
            }
            	//Services.console.logStringMessage('[ content.document.location optionsChangeLabel ]: ' + content.document.location );
              	 var currentEntry=document.getElementById("qrCreatorOnline.menu");
		if(currentEntry){	let LABELTEXT = "在线生成QR码 : " + labelText ; currentEntry.setAttribute("label", LABELTEXT);}
		}
	},
};

	qrCreatorOnline.init();
 


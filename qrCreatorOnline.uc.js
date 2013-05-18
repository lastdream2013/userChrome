// ==UserScript==
// @include        chrome://browser/content/browser.xul
// @name           qrCreatorOnline.uc.js
// @version         0.1
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
        		alert("\u6CA1\u6709\u8981\u8F6C\u5316\u4E3A\u4E8C\u7EF4\u7801\u7684\u5185\u5BB9\uFF01" );
        	       return false;
        	}
        	else if (arg.length > 250) { 
        		alert("\u8981\u8F6C\u5316\u4E3A\u4E8C\u7EF4\u7801\u7684\u6570\u636E\u8D85\u957F\u4E86\uFF01(\u5927\u4E8E250\u5B57\u8282)" );
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
        var altText = "QR\u7801\u5185\u5BB9[\u7F51\u5740]";

        if (gContextMenu) {
            if (gContextMenu.isTextSelected) {
                target_data = content.getSelection().toString();
                altText = "QR\u7801\u5185\u5BB9[\u6587\u672C]";
            }
            else if (gContextMenu.onLink) {
                target_data = gContextMenu.linkURL;
            }
            else if (gContextMenu.onImage) {
                target_data = gContextMenu.target.src;
            }
            else if ( ( content.document.location == "about:blank" || content.document.location == "about:newtab"  ) ) {
            	altText = "QR\u7801\u5185\u5BB9[\u6587\u672C]";
            	target_data = prompt("\u8BF7\u8F93\u5165\u6587\u672C\u521B\u5EFA\u4E00\u4E2AQR\u7801\uFF08\u957F\u5EA6\u4E0D\u8D85\u8FC7250\u5B57\u8282\uFF09\uFF1A", "");
       	}
       	else {
                target_data = content.document.location;
            }
        }

        if (this.checkLength(target_data)) {
                 this.popupImage(target_data, altText);
        }
    },

    onLoad: function() {
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
			menuItem.setAttribute("label", "\u5728\u7EBF\u751F\u6210QR\u7801");
			menuItem.setAttribute("class", "menuitem-iconic");
			menu.setAttribute("accesskey","S");
			menuItem.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAzUlEQVQ4jaWOQYqFMBBE+xgewBO4ceEiIAQaBBHxPjlrFkKWucGbxaf/T/zGYZiCoqraoozwTwhACIHjOCoCt94YQvgM7PterVou762OAGzbRkufvr0H1nWt1stsvtURgGVZvmh3Q6sjPEBVUdWnymvAe4/3ntKX+UkFYJ5nTJ98masXtOCcwzl3m00FYJqmLxrMt1QAxnGs/mz5N30PDMNAS0vedQSg7/vqBWW++mtXYoyoKl3XVQQqvd5UlRgjknMmpcR5nn9iSomcMz9lng2NV0gSXAAAAABJRU5ErkJggg==");
		menu.insertBefore(menuItem, document.getElementById("context-openlinkintab"));

	},
	optionsChangeLabel:function(){
	  var labelText;
        if (gContextMenu) {
            if (gContextMenu.isTextSelected) {
                   labelText = "\u9009\u533A\u6587\u672C";
            }
            else if (gContextMenu.onLink) {
                   labelText = "\u94FE\u63A5\u5730\u5740";
            }
            else if (gContextMenu.onImage) {
                 labelText = "\u56FE\u8C61\u5730\u5740";
            }
            else if ( content.document.location == "about:blank" || content.document.location == "about:newtab"  ) {
 			 labelText = "\u624B\u5DE5\u8F93\u5165";
            }
            else {
              	labelText = "\u5F53\u524D\u7F51\u5740";
            }
            	//Services.console.logStringMessage('[ content.document.location optionsChangeLabel ]: ' + content.document.location );
              	 var currentEntry=document.getElementById("qrCreatorOnline.menu");
		if(currentEntry){	let LABELTEXT = "\u5728\u7EBF\u751F\u6210QR\u7801 : " + labelText ; currentEntry.setAttribute("label", LABELTEXT);}
		}
	},
};

if (window.location == "chrome://browser/content/browser.xul") {
	window.addEventListener("load", qrCreatorOnline.onLoad(), false);
}

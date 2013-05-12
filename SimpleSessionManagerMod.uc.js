// ==UserScript==
// @name           Simple Session Manager Mod
// @author         NightsoN
// @description    简易会话管理器
// @include        chrome://browser/content/browser.xul
// @note           testversion, mod by lastdream2013
// @note           20130512  add restore selected session on startup. 
// @note           20130511  don't auto save session on quit if all tabs is about:blank or about:newtab
// @note		   20130510: add restore session list at startup, confirm | auto save session on quit.
// @note           20130424: add restore session at startup and remove all Session menu.
// @version        0.4.1
// @charset        UTF-8
// ==/UserScript==

var gSimpleSessionManager = {
	overwrite : 1, //设置恢复会话时是否覆盖已打开的页面，0为不覆盖，1为覆盖，2为不覆盖且在新窗口恢复会话
	_displayType : 1, // 设置为1为可移动按钮，0 为火狐橙下菜单
	insertafter: 'urlbar-icons',  ////urlbar-icons  status-bar addon-bar searchbar TabsToolbar alltabs-button go-button
	
	init : function () {
		_prefs = null,
		Cc = Components.classes,
		Ci = Components.interfaces,
		Cu = Components.utils,
		SS = Cc["@mozilla.org/browser/sessionstore;1"].getService(Ci.nsISessionStore);
		if (!window.Services) {
			Cu.import("resource://gre/modules/Services.jsm");
		}
		_prefs = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefService)
			.getBranch("SimpleSessionManager.");
		_prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);

		if (!_prefs.prefHasUserValue("restoreSessionOnstart")) {
			_prefs.setIntPref("restoreSessionOnstart", 0);
		}
		// 启动恢复上一次会话时，所指定的会话名称
		if (!_prefs.prefHasUserValue("restoreSessionOnstart.SessionName")) {
			var str = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
			str.data = '';
			_prefs.setComplexValue("restoreSessionOnstart.SessionName", Ci.nsISupportsString, str);
		}
		
		if (!_prefs.prefHasUserValue("SaveSessionOnQuit")) {
			_prefs.setIntPref("SaveSessionOnQuit", 0);
		}
		// 启动恢复上一次会话时，如果是退出时自动保存的会话，恢复后自动删除已恢复的会话
		if (!_prefs.prefHasUserValue("deleteAutoSaveSessionOnRecovery")) {
			_prefs.setBoolPref("deleteAutoSaveSessionOnRecovery", true);

		}

		
		gSimpleSessionManager.loadMenu();
	},
	loadMenu : function () {
		if (1 === this._displayType) {
			var insertPoint = document.getElementById(this.insertafter);
			if (!insertPoint)
				return;
				
			var menu = document.createElement('toolbarbutton');
			menu.id = "ssmm_toolbarbutton";
			menu.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
			menu.setAttribute("label", "会话管理器");
			menu.setAttribute("tooltiptext", "会话管理器");
			menu.setAttribute("type", "menu");
			menu.setAttribute("removable", "true");
			menu.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADi0lEQVQ4jYWSW0yTdxyGf+6QcAUd4MWSGVDAsIXYQ1oQwTEXM0OWxbCZzoyDS1wELGKZQIRCQUFrLdBWaAtkHFYaegZnkHIoA4eyFoVFgbrhRsySJZNM5hY22Pen37uLmc3tZk/y5L17rl4SxGUcKNP0/6Ru6uEbWu18vd6Ger0NJtsoTLZRmJ/R1DfKm/p8YbV5aC1ih2Q/ERHFJu2/fOvOEhbvzbHvH67gwTchfLt8H3/BAwj/I78FIMyt/PAzBPHSeiIiiopPu3hQ0cuLP9CzFHkzhEf12HO0BcnvXkKKXIfUAiOkeQZI8w2Q5RshyW3h3iju4QVxsloiItq+O1NzoGwQ8mo3K9f7cEp3HaW666gwjCBX7YW0yIWssqvILPUiXeFBWrGTe1s1AkF8mpqIiF5OztRkKlww2qeZP7AMu28edt88/IFltNpvYdf7nUg/6UD6SQcOnhlEVqmLy6kb+3fgzbIBaHsnGQAwbhOMbQIAWvqmkKdyoqrVh4I6L7JOe3Co4ionb5hA9LOBtyqv4VKXn4W5dfz4aBWPVlcBbh1G2ySarTcwefs7WLyzyCgdQM65MS5P+wWid6XW/R14p8aHav1n7OHKCu4ufI07d+/jXugB6k3DWF1bB/gtqAweyD7qxpFzQ1yB9nNE7ZBUE9E2iknM0BzX38ShcjfL/tiB14utKKix40L7NZj6JzA3/xVcHg+8g4Ow2h04VaZkJ0pOQ7Yvy0RERDGJGZqiti9xrHmanWgLILtmBGbnNEJzfnSYdQgGZ/B4be3pL8Jwu528QlEIpbLkiVCYvJu2J2ZcLGmfxXHDTVbYNoNc3Q3k1zpwuXscH1aa8Kl9AJu//YInj1cxMTUFwxUjjAZD2GwxQyQRKSk2KVN7pmd+q9AS2Cg2B5jCEmTHWqbZe41+ltc0w+Tnh/iGVis0nV4cqXWgtlEDr9vFnC4nL5FKGkmwM/28svM2VPYQqmyLqLItQtW/hDrXMiq7g6jQ9UJlsEHd6kRR7RVodE3wj49vDQ8PQyaTqYkiInZGxaVeiE1It8Qk7LXEJOy1RCektccm7jNHvbKn02rt3ghzG+E/fv+V2ayfsPaODi60FGK+ER/EYnE2/R+Hcw7rxsbHEAzOwuP1oqunCwuLCzh7tmKKiF4kItpGRM//x+ee7gtE9FJyclK5SCwyC0XCjtdSXrVIUyXayMjIJCKiPwFyW0C1xp2GaQAAAABJRU5ErkJggg==)";
			insertPoint.insertBefore(menu, insertPoint.firstChild);
			document.insertBefore(document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(
					'\
					#ssmm_toolbarbutton {\
					-moz-appearance: none !important;\
					border-style: none !important;\
					border-radius: 0 !important;\
					padding: 0 3px !important;\
					margin: 0 !important;\
					background: transparent !important;\
					box-shadow: none !important;\
					-moz-box-align: center !important;\
					-moz-box-pack: center !important;\
					min-width: 18px !important;\
					min-height: 18px !important;\
					}\
					#ssmm_toolbarbutton > .toolbarbutton-icon {\
						max-width: 18px !important;\
					    padding: 0 !important;\
					    margin: 0 !important;\
					}\
					#ssmm_toolbarbutton dropmarker{display: none !important;}\
							    ') + '"'), document.documentElement);
		} else {
			//在appmenu下生成菜单
			var menu = document.createElement("menu"); //主菜单
			menu.id = "ssm_menu";
			menu.setAttribute("label", "会话"); //弹出菜单
			var it = document.querySelector("#appmenuPrimaryPane>.appmenu-menuseparator:nth-of-type(1)");
			it.parentNode.insertBefore(menu, it);
			
		}
		var menupopup = document.createElement("menupopup");
		//menupopup.id = "ssm_menupopup";
		menupopup.setAttribute("id","ssm_menupopup");
		menu.appendChild(menupopup);

		var scs = document.createElement("menuitem"); //保存当前会话
		scs.setAttribute("label", "保存当前全部会话");
		scs.addEventListener("command", gSimpleSessionManager.saveCurrentSession, false);
		menupopup.appendChild(scs);

		var scws = document.createElement("menuitem"); //保存当前窗口会话
		scws.setAttribute("label", "保存当前窗口会话");
		scws.addEventListener("command", gSimpleSessionManager.saveCurrentWindowSession, false);
		menupopup.appendChild(scws);

		var scds = document.createElement("menuitem"); //删除所有已存会话
		scds.setAttribute("label", "删除所有已存会话");
		scds.addEventListener("command", gSimpleSessionManager.removeAllSessions, false);
		menupopup.appendChild(scds);

		var mids = document.createElement("menu");
		mids.setAttribute("label", "启动时");
		var mids_menupopup = document.createElement("menupopup");
		mids_menupopup.id = "mids_menupopup";
		mids.appendChild(mids_menupopup);
		var subitem = document.createElement("menuitem");
		subitem.setAttribute("label", "直接启动");
		subitem.setAttribute("type", "radio");
		subitem.setAttribute("checked", 0 == gPrefService.getIntPref("SimpleSessionManager.restoreSessionOnstart"));
		subitem.setAttribute("oncommand", 'gPrefService.setIntPref("SimpleSessionManager.restoreSessionOnstart", 0);');
		mids_menupopup.appendChild(subitem);
		subitem = document.createElement("menuitem");
		subitem.setAttribute("label", "自动恢复上一次会话");
		subitem.setAttribute("type", "radio");
		subitem.setAttribute("checked", 1 == gPrefService.getIntPref("SimpleSessionManager.restoreSessionOnstart"));
		subitem.setAttribute("oncommand", 'gPrefService.setIntPref("SimpleSessionManager.restoreSessionOnstart", 1);');
		mids_menupopup.appendChild(subitem);
		subitem = document.createElement("menuitem");
		subitem.setAttribute("label", "从会话列表选择恢复");
		subitem.setAttribute("type", "radio");
		subitem.setAttribute("checked", 2 == gPrefService.getIntPref("SimpleSessionManager.restoreSessionOnstart"));
		subitem.setAttribute("oncommand", 'gPrefService.setIntPref("SimpleSessionManager.restoreSessionOnstart", 2);');
		mids_menupopup.appendChild(subitem);
		
		subitemI = document.createElement("menu");
		subitemI.setAttribute("label", "恢复指定的会话");
		subitemI.setAttribute('class', 'menu-iconic');
    	var ssmlist_popup = subitemI.appendChild(document.createElement('menupopup'));
		ssmlist_popup.setAttribute("id", "SSMgr_POPUP_ID");
		ssmlist_popup.setAttribute("onpopupshowing", "gSimpleSessionManager.buildSessionList();");
		mids_menupopup.appendChild(subitemI);
		
		subitem = document.createElement("menuitem");
		subitem.setAttribute("label", "恢复自动保存会话则删除本次恢复的会话");
		subitem.setAttribute("type", "checkbox");
		subitem.setAttribute("checked", true == gPrefService.getBoolPref("SimpleSessionManager.deleteAutoSaveSessionOnRecovery"));
		subitem.setAttribute("oncommand", 'gPrefService.setBoolPref("SimpleSessionManager.deleteAutoSaveSessionOnRecovery", !gPrefService.getBoolPref("SimpleSessionManager.deleteAutoSaveSessionOnRecovery"));');
		mids_menupopup.appendChild(subitem);
		menupopup.appendChild(mids);

		var miqs = document.createElement("menu");
		miqs.setAttribute("label", "退出时");
		var miqs_menupopup = document.createElement("menupopup");
		miqs_menupopup.id = "miqs_menupopup";
		miqs.appendChild(miqs_menupopup);
		subitem = document.createElement("menuitem");
		subitem.setAttribute("label", "直接退出");
		subitem.setAttribute("type", "radio");
		subitem.setAttribute("checked", 0 == gPrefService.getIntPref("SimpleSessionManager.SaveSessionOnQuit"));
		subitem.setAttribute("oncommand", 'gPrefService.setIntPref("SimpleSessionManager.SaveSessionOnQuit", 0);');
		miqs_menupopup.appendChild(subitem);
		subitem = document.createElement("menuitem");
		subitem.setAttribute("label", "确认保存会话");
		subitem.setAttribute("type", "radio");
		subitem.setAttribute("checked", 1 == gPrefService.getIntPref("SimpleSessionManager.SaveSessionOnQuit"));
		subitem.setAttribute("oncommand", 'gPrefService.setIntPref("SimpleSessionManager.SaveSessionOnQuit", 1);');
		miqs_menupopup.appendChild(subitem);
		subitem = document.createElement("menuitem");
		subitem.setAttribute("label", "自动保存会话");
		subitem.setAttribute("type", "radio");
		subitem.setAttribute("checked", 2 == gPrefService.getIntPref("SimpleSessionManager.SaveSessionOnQuit"));
		subitem.setAttribute("oncommand", 'gPrefService.setIntPref("SimpleSessionManager.SaveSessionOnQuit", 2);');
		miqs_menupopup.appendChild(subitem);
		menupopup.appendChild(miqs);

		var menusep = document.createElement("menuseparator"); //菜单分隔符
		menusep.id = "ssmgr-separator-id";
		menupopup.appendChild(menusep);

		var savedSessions = gSimpleSessionManager.loadFile(); //已保存列表
		for (name in savedSessions) {
			gSimpleSessionManager.makeitems(name);
		}

		if (gPrefService.getIntPref("SimpleSessionManager.restoreSessionOnstart") == 1) {
			window.addEventListener("load", gSimpleSessionManager.restoreSessionStartup(), false);
		} else if (gPrefService.getIntPref("SimpleSessionManager.restoreSessionOnstart") == 2) {
			window.addEventListener("load", gSimpleSessionManager.restoreSessionPopup(), false);
		} else if (gPrefService.getIntPref("SimpleSessionManager.restoreSessionOnstart") == 3) {
			var ssname = gPrefService.getComplexValue("SimpleSessionManager.restoreSessionOnstart.SessionName", Ci.nsISupportsString).data;
			if (ssname != "" )
				window.addEventListener("load", gSimpleSessionManager.restoreSessionStartup(ssname), false);
		}
		if (gPrefService.getIntPref("SimpleSessionManager.SaveSessionOnQuit") > 0) {
			Services.obs.addObserver(gSimpleSessionManager.SSObserve, "quit-application-requested", false);
		}
	},

	SSObserve : function (subject, topic, data) {
		if (topic == "quit-application-requested") {
			if (1 == gPrefService.getIntPref("SimpleSessionManager.SaveSessionOnQuit")) {
				gSimpleSessionManager.saveCurrentSession();
			} else if (2 == gPrefService.getIntPref("SimpleSessionManager.SaveSessionOnQuit")) {
				gSimpleSessionManager.saveCurrentSessionAuto();
			}
		}
	},

	
	//生成已保存会话的弹出菜单
	buildSessionList : function () {
		var rs_popup = document.getElementById("SSMgr_POPUP_ID");
		if ( !rs_popup ) return;
 
		while(rs_popup.hasChildNodes()){
		  rs_popup.removeChild(rs_popup.firstChild);
		}
		
		var data = gSimpleSessionManager.loadFile();
		var i = 0,
		SessionList = [];
		for (name in data) {
			SessionList[i] = name;
			var rs = document.createElement("menuitem");
			rs.setAttribute("label", SessionList[i]);
			rs.setAttribute('class', 'menuitem-iconic');
			rs.setAttribute("type", "radio");
			rs.setAttribute("checked", SessionList[i] == gPrefService.getComplexValue("SimpleSessionManager.restoreSessionOnstart.SessionName", Ci.nsISupportsString).data);
			rs.setAttribute("oncommand",
				'var str = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);str.data = "' + String(SessionList[i]) + '";gPrefService.setComplexValue("SimpleSessionManager.restoreSessionOnstart.SessionName", Ci.nsISupportsString, str);gPrefService.setIntPref("SimpleSessionManager.restoreSessionOnstart", 3)', false);
			rs_popup.appendChild(rs);
			i++;
		}
	},
	
	//生成已保存会话的弹出菜单
	restoreSessionPopup : function () {
		var rs_popup = document.createElement("menupopup");
		var ms = document.createElement("menuitem");
		ms.setAttribute("label", "从列表中选择恢复会话：");
		rs_popup.appendChild(ms);
		var menusep = document.createElement("menuseparator"); //菜单分隔符
		rs_popup.appendChild(menusep);

		var data = gSimpleSessionManager.loadFile();
		var i = 0,
		SessionList = [];
		for (name in data) {
			SessionList[i] = name;
			var rs = document.createElement("menuitem");
			rs.setAttribute("label", SessionList[i]);
			rs.setAttribute('class', 'menuitem-iconic');
			rs.setAttribute("type", "radio");
			rs.setAttribute("oncommand",
				'gSimpleSessionManager.restoreSession("' + String(SessionList[i]) + '");gSimpleSessionManager.deleteRestoredSessionOnStartup("' + String(SessionList[i]) + '");', false);
			rs_popup.appendChild(rs);
			i++;
		}
		if (i == 0)
			return;
		let mainPopupSet = document.getElementById("mainPopupSet");
		mainPopupSet.appendChild(rs_popup);
		rs_popup.openPopupAtScreen(200, 200);
	},

	
	//生成已保存会话的右键菜单
	makeitems : function (name) {
		var menupopup = document.getElementById("ssm_menupopup");
		if (!menupopup)
			return;
		var ss = document.createElement("menu");
		ss.setAttribute("label", name);
		ss.setAttribute("class", "保存会话");

		var ss_popup = document.createElement("menupopup");
		var rs = document.createElement("menuitem");
		rs.setAttribute("label", "恢复");
		rs.addEventListener("command", gSimpleSessionManager.restoreSession, false);

		var rss = document.createElement("menuitem");
		rss.setAttribute("label", "选择性恢复");
		rss.addEventListener("command", gSimpleSessionManager.restoreSessionSelectively, false)

		var rn = document.createElement("menuitem");
		rn.setAttribute("label", "重命名");
		rn.addEventListener("command", gSimpleSessionManager.rename, false);

		var rm = document.createElement("menuitem");
		rm.setAttribute("label", "删除");
		rm.addEventListener("command", gSimpleSessionManager.remove, false);

		ss_popup.appendChild(rs);
		ss_popup.appendChild(rss);
		ss_popup.appendChild(rn);
		ss_popup.appendChild(rm);
		ss.appendChild(ss_popup);
		menupopup.appendChild(ss);
	},
	//文件保存读取函数，取自Griever的UserScriptLoader.uc.js
	saveFile : function (data) {
		var file = Services.dirsvc.get('UChrm', Ci.nsIFile);
		file.append("SimpleSessionManager.json");

		var suConverter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
		suConverter.charset = 'UTF-8';
		data = suConverter.ConvertFromUnicode(data);

		var foStream = Cc['@mozilla.org/network/file-output-stream;1'].createInstance(Ci.nsIFileOutputStream);
		foStream.init(file, 0x02 | 0x08 | 0x20, 0664, 0);
		foStream.write(data, data.length);
		foStream.close();
	},

	loadFile : function () {
		var file = Services.dirsvc.get('UChrm', Ci.nsIFile);
		file.append("SimpleSessionManager.json");
		if (file.exists() === false)
			return false;
		var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
		var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
		fstream.init(file, -1, 0, 0);
		sstream.init(fstream);

		var data = sstream.read(sstream.available());
		try {
			data = decodeURIComponent(escape(data));
		} catch (e) {}
		sstream.close();
		fstream.close();
		if (data === "undefined")
			return false;
		data = JSON.parse(data);
		return data;
	},

	//保存会话
	saveSession : function (ssdata) {
		var defaultName = new Date().toLocaleFormat("%Y-%m-%d %H:%M:%S") + " [ " + content.document.title.replace(/\s-\s.*/i,"").replace(/_[^\[\]【】]+$/,"") + " ]";
		var name = prompt("保存会话：", defaultName);
		if (name != null) {
			var data = gSimpleSessionManager.loadFile();
			if (data === false) {
				data = {};
			}
			if (data[name]) {
				alert("已经存在一个相同名称的会话")
				return;
			}
			data[name] = JSON.parse(ssdata);
			gSimpleSessionManager.saveFile(JSON.stringify(data));
			gSimpleSessionManager.makeitems(name);
		}
	},
	//退出时自动保存会话
	saveCurrentSessionAuto : function () {
		var ssdata = SS.getBrowserState();

		let currentState = JSON.parse(ssdata);
		let RtabCount = 0;
		for (let window of currentState.windows) {
			if ( RtabCount > 0 ) 
				break;
			if (window.isPrivate) {
				continue;
			}
			for (let tab of window.tabs) {
				if ( RtabCount > 0 ) 
					break;
				if (!tab.entries.length)
					continue;
				for (let entry of tab.entries) {
					if (entry.url != "about:blank" && entry.url != "about:newtab") {
						RtabCount++;
						break;
					}
				}
			}
		}
		if (RtabCount == 0) // 全是about:blank, about:newtab类窗口直接退出不保存
			return;
		
		var name = "自动保存：" + new Date().toLocaleFormat("%Y-%m-%d %H:%M:%S") + " [ " + content.document.title.replace(/\s-\s.*/i,"").replace(/_[^\[\]【】]+$/,"") + " ]";
		var data = gSimpleSessionManager.loadFile();
		if (data === false) {
			data = {};
		}
		data[name] = JSON.parse(ssdata);
		gSimpleSessionManager.saveFile(JSON.stringify(data));
		gSimpleSessionManager.makeitems(name);
	},
	//保存所有窗口会话
	saveCurrentSession : function () {
		var ssdata = SS.getBrowserState();
		gSimpleSessionManager.saveSession(ssdata);
	},

	//保存当前窗口会话
	saveCurrentWindowSession : function () {
		var ssdata = SS.getWindowState(window);
		gSimpleSessionManager.saveSession(ssdata);
	},

	//移除会话
	remove : function () {
		var node = this.parentNode.parentNode;
		var name = node.getAttribute("label");
		var cf = confirm("确认删除会话 " + name + "?");
		if (cf === true) {
			node.style.display = "none";
			var data = gSimpleSessionManager.loadFile();
			delete data[name];
			gSimpleSessionManager.saveFile(JSON.stringify(data));
			var ssname = gPrefService.getComplexValue("SimpleSessionManager.restoreSessionOnstart.SessionName", Ci.nsISupportsString).data;
			if ( name == ssname ) {
				var str = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
				str.data = '';
				_prefs.setComplexValue("restoreSessionOnstart.SessionName", Ci.nsISupportsString, str);
			}
		}
	},

	//移除所有会话
	removeAllSessions : function () {
		var cf = confirm("确认删除所有会话?");
		if (cf === true) {
			var savedSessions = gSimpleSessionManager.loadFile(); //已保存列表
			for (name in savedSessions) {
				delete savedSessions[name];
			}
			gSimpleSessionManager.saveFile(JSON.stringify(savedSessions));
			var menupopup = document.getElementById("ssm_menupopup");
			while (menupopup.lastChild.id != "ssmgr-separator-id") {
				menupopup.removeChild(menupopup.lastChild);
			}
			var str = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
			str.data = '';
			_prefs.setComplexValue("restoreSessionOnstart.SessionName", Ci.nsISupportsString, str);
		}
	},

	//重命名
	rename : function () {
		var node = this.parentNode.parentNode;
		var name = node.getAttribute("label");
		var newname = prompt("重命名 " + name + " ", null);
		if (!newname)
			return;
		this.parentNode.parentNode.setAttribute("label", newname);
		var data = gSimpleSessionManager.loadFile();
		var value = data[name];
		data[newname] = value;
		delete data[name];
		gSimpleSessionManager.saveFile(JSON.stringify(data));
	},

	//恢复会话
	restoreSession : function (stateString) {
		if (typeof stateString === "string") {
			var name = stateString;
		} else {
			var name = this.parentNode.parentNode.getAttribute("label");
		}
		var data = gSimpleSessionManager.loadFile();
		var state = JSON.stringify(data[name]);
		if ( !state ) return;
		switch (gSimpleSessionManager.overwrite) {
		case 0:
			SS.setWindowState(window, state, false);
			break;
		case 1:
			SS.setBrowserState(state);
			break;
		case 2:
			var watcher = Cc["@mozilla.org/embedcomp/window-watcher;1"].getService(Ci.nsIWindowWatcher);
			var argstring = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
			var w = watcher.openWindow(null, "chrome://browser/content/browser.xul", "name", "chrome,all,dialog=no", argstring);
			w.addEventListener("load", function () {
				SS.setWindowState(w, state, true);
			}, true);
			break;
		}
	},

	//恢复最后一次会话
	restoreSessionStartup : function (stateString) {
		var data = gSimpleSessionManager.loadFile();
		var i = 0,
		SessionList = [];
		for (ssname in data) {
			SessionList[i] = ssname;
			i++;
		}
		if (i == 0)
			return;
			
		if (typeof stateString === "string") {
			var name = stateString;
		} else {
			var name = SessionList[i - 1];
		}
	
		var state = JSON.stringify(data[name]);
		if ( !state ) return;
		switch (gSimpleSessionManager.overwrite) {
		case 0:
			SS.setWindowState(window, state, false);
			break;
		case 1:
			SS.setBrowserState(state);
			break;
		case 2:
			var watcher = Cc["@mozilla.org/embedcomp/window-watcher;1"].getService(Ci.nsIWindowWatcher);
			var argstring = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
			var w = watcher.openWindow(null, "chrome://browser/content/browser.xul", "name", "chrome,all,dialog=no", argstring);
			w.addEventListener("load", function () {
				SS.setWindowState(w, state, true);
			}, true);
			break;
		}
		gSimpleSessionManager.deleteRestoredSessionOnStartup(name);
	},
	//删除已恢复的自动保存会话
	deleteRestoredSessionOnStartup : function (ssname) {
		if (typeof ssname === "string" && gPrefService.getBoolPref("SimpleSessionManager.deleteAutoSaveSessionOnRecovery")) {
			var data = gSimpleSessionManager.loadFile();
			if ( ssname.slice(0,5) == ('自动保存：') ) {
				delete data[ssname];
				gSimpleSessionManager.saveFile(JSON.stringify(data));

				var menupopup = document.getElementById("ssm_menupopup");
				if ( !menupopup ) return; 
				while (menupopup.lastChild.id != "ssmgr-separator-id") {
					menupopup.removeChild(menupopup.lastChild);
				}
				for (name in data) {
					gSimpleSessionManager.makeitems(name);
				}

			}
		}
	},

	//选择性恢复会话（利用firefox自带的崩溃恢复机制）
	restoreSessionSelectively : function () {
		var name = this.parentNode.parentNode.getAttribute("label");
		var data = gSimpleSessionManager.loadFile();
		var sessionValue = JSON.stringify(data[name]);
		var newTab = gBrowser.addTab("about:sessionrestore");
		var newTabBrowser = gBrowser.getBrowserForTab(newTab);
		newTabBrowser.addEventListener("load", function () {
			var cDoc = newTabBrowser.contentDocument;
			var sessionData = cDoc.getElementById("sessionData");
			sessionData.value = sessionValue;
			cDoc.getElementById("errorTitleText").innerHTML = "选择性恢复会话";
			cDoc.getElementById("errorShortDescText").hidden = true;
			cDoc.getElementById("errorLongDesc").innerHTML = "您准备恢复" + name + ", 会话, 您可以取消选中窗口或标签页从恢复项中排除。";
			var stateStringContainer = cDoc.createElement("div");
			stateStringContainer.id = "stateStringContainer";
			stateStringContainer.style.display = "none";
			cDoc.getElementById("errorPageContainer").appendChild(stateStringContainer);
			var script = cDoc.createElement("script");
			script.innerHTML = 'function restoreTwo() {\
				document.getElementById("errorTryAgain").disabled = true;\
				var ix = gStateObject.windows.length - 1;\
				for (var t = gTreeData.length - 1; t >= 0; t--) {\
					if (treeView.isContainer(t)) {\
						if (gTreeData[t].checked === 0)\
						gStateObject.windows[ix].tabs = gStateObject.windows[ix].tabs.filter(function (aTabData, aIx)\
						gTreeData[t].tabs[aIx].checked);\
						else if (!gTreeData[t].checked)\
						gStateObject.windows.splice(ix, 1);\
						ix--;\
					}\
				}\
				var stateString = JSON.stringify(gStateObject);\
				document.getElementById("stateStringContainer").setAttribute("stateString", encodeURIComponent(stateString));\
				}';
			stateStringContainer.addEventListener("DOMAttrModified", function () {
				this.removeEventListener('DOMAttrModified', arguments.callee, false);
				var stateString = decodeURIComponent(stateStringContainer.getAttribute("stateString"));
				gBrowser.removeCurrentTab();
				restoreSession(stateString);
			}, false);
			cDoc.head.appendChild(script);
			var restoreBtn = cDoc.getElementById("errorTryAgain");
			restoreBtn.setAttribute("oncommand", "restoreTwo();");
		}, true);
		gBrowser.selectedTab = newTab;
	},
};

gSimpleSessionManager.init();

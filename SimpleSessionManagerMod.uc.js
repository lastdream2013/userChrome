// ==UserScript==
// @name           Simple Session Manager Mod
// @author         NightsoN
// @description    简易会话管理器
// @include        chrome://browser/content/browser.xul
// @note           testversion 20130424 mod by lastdream2013: add restore session at startup and remove all Session
// @version        0.4.1
// @charset        UTF-8
// ==/UserScript==
(function () {
    var overwrite = 1, //设置恢复会话时是否覆盖已打开的页面，0为不覆盖，1为覆盖，2为不覆盖且在新窗口恢复会话
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
     
     if (!_prefs.prefHasUserValue("restoreLastSession")) { 
        _prefs.setBoolPref("restoreLastSession", false);
     }

    //文件保存读取函数，取自Griever的UserScriptLoader.uc.js
    function saveFile(data) {
        var file = Services.dirsvc.get('UChrm', Ci.nsIFile);
        file.append("SimpleSessionManager.json");
        
        var suConverter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
        suConverter.charset = 'UTF-8';
        data = suConverter.ConvertFromUnicode(data);
        
        var foStream = Cc['@mozilla.org/network/file-output-stream;1'].createInstance(Ci.nsIFileOutputStream);
        foStream.init(file, 0x02 | 0x08 | 0x20, 0664, 0);
        foStream.write(data, data.length);
        foStream.close();
    }
    
    function loadFile() {
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
    }
    
    //获取当前时间
    function getTime() {
    	return new Date().toLocaleFormat("%Y-%m-%d %H:%M:%S")
    }
    
    //保存会话
    function saveSession(ssdata) {
        var name = prompt("保存为", getTime());
        if (name != null) {
            if (loadFile() === false) {
                var data = {};
            } else {
                var data = loadFile();
            }
            if (data[name]) {
                alert("已经存在一个相同名称的会话")
                return;
            }
            data[name] = JSON.parse(ssdata);
            saveFile(JSON.stringify(data));
            makeitems(name);
        }
    }
    
    //保存所有窗口会话
    function saveCurrentSession() {
        var ssdata = SS.getBrowserState();
        saveSession(ssdata);
    }
    
    //保存当前窗口会话
    function saveCurrentWindowSession() {
        var ssdata = SS.getWindowState(window);
        saveSession(ssdata);
    }
    
    //移除会话
    function remove() {
        var node = this.parentNode.parentNode;
        var name = node.getAttribute("label");
        var cf = confirm("确认删除会话 " + name + "?");
        if (cf === true) {
            node.style.display = "none";
            var data = loadFile();
            delete data[name];
            saveFile(JSON.stringify(data));
        }
    }
    
    //移除所有会话
    function removeAllSessions() {
	    var cf = confirm("确认删除所有会话?");
	    if (cf === true) {
		    var savedSessions = loadFile(); //已保存列表
		    for (name in savedSessions) {
	            delete savedSessions[name];
		    }
		    saveFile(JSON.stringify(savedSessions));
		    var menupopup = document.getElementById("ssm_menupopup");
		    while(menupopup.childNodes.length > 5){ //第5节点之后的都是会话的菜单
		      menupopup.removeChild(menupopup.lastChild);
		    }
		}
    }
    
    //重命名
    function rename() {
        var node = this.parentNode.parentNode;
        var name = node.getAttribute("label");
        var newname = prompt("重命名 " + name + " ", null);
        if (!newname)
            return;
        this.parentNode.parentNode.setAttribute("label", newname);
        var data = loadFile();
        var value = data[name];
        data[newname] = value;
        delete data[name];
        saveFile(JSON.stringify(data));
    }
    
    //恢复会话
    function restoreSession(stateString) {
        if (typeof stateString === "string") {
            var state = stateString;
        } else {
            var name = this.parentNode.parentNode.getAttribute("label");
            var data = loadFile();
            var state = JSON.stringify(data[name]);
        }
        switch (overwrite) {
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
    }
    
    //恢复最后一次会话
    function restoreSessionStartup() {
        var data = loadFile();
        var i = 0, SessionList = [];
	    for (name in data) {
	    	SessionList[i] = name;
			i++;
	    }
	    if ( i == 0 ) return;
		var state = JSON.stringify(data[SessionList[i-1]]);
        switch (overwrite) {
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
    }
    
    //选择性恢复会话（利用firefox自带的崩溃恢复机制）
    function restoreSessionSelectively() {
        var name = this.parentNode.parentNode.getAttribute("label");
        var data = loadFile();
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
    }
    
    //生成已保存会话的右键菜单
    function makeitems(name) {
        var ss = document.createElement("menu");
        ss.setAttribute("label", name);
        ss.setAttribute("class", "保存会话");
        
        var ss_popup = document.createElement("menupopup");
        var rs = document.createElement("menuitem");
        rs.setAttribute("label", "恢复");
        rs.addEventListener("command", restoreSession, false);
        
        var rss = document.createElement("menuitem");
        rss.setAttribute("label", "选择性恢复");
        rss.addEventListener("command", restoreSessionSelectively, false)
        
        var rn = document.createElement("menuitem");
        rn.setAttribute("label", "重命名");
        rn.addEventListener("command", rename, false);
        
        var rm = document.createElement("menuitem");
        rm.setAttribute("label", "删除");
        rm.addEventListener("command", remove, false);
        
        ss_popup.appendChild(rs);
        ss_popup.appendChild(rss);
        ss_popup.appendChild(rn);
        ss_popup.appendChild(rm);
        ss.appendChild(ss_popup);
        menupopup.appendChild(ss);
    }
    
    //在appmenu下生成菜单
    var menu = document.createElement("menu"); //主菜单
    menu.id = "ssm_menu";
    //var it = document.getElementById("appmenu_newTab");
    	var it = document.querySelector("#appmenuPrimaryPane>.appmenu-menuseparator:nth-of-type(1)");
	it.parentNode.insertBefore(menu, it);
    //var it = document.getElementById("appmenu_savePage");
    it.parentNode.insertBefore(menu, it);
    
    menu.setAttribute("label", "会话"); //弹出菜单
    var menupopup = document.createElement("menupopup");
    menupopup.id = "ssm_menupopup";
    menu.appendChild(menupopup);
    
    var scs = document.createElement("menuitem"); //保存当前会话
    scs.setAttribute("label", "保存当前全部会话");
    scs.addEventListener("command", saveCurrentSession, false);
    menupopup.appendChild(scs);
    
    var scws = document.createElement("menuitem"); //保存当前窗口会话
    scws.setAttribute("label", "保存当前窗口会话");
    scws.addEventListener("command", saveCurrentWindowSession, false);
    menupopup.appendChild(scws);
    
    var scds = document.createElement("menuitem"); //删除所有已存会话
    scds.setAttribute("label", "删除所有已存会话");
    scds.addEventListener("command", removeAllSessions, false);
    menupopup.appendChild(scds);

	var mids = document.createElement("menuitem");
	mids.setAttribute("label", "启动时恢复上一次会话");
	mids.setAttribute("type", "checkbox");
	mids.setAttribute("checked", true == gPrefService.getBoolPref("SimpleSessionManager.restoreLastSession"));
	mids.setAttribute("oncommand", 'gPrefService.setBoolPref("SimpleSessionManager.restoreLastSession", !gPrefService.getBoolPref("SimpleSessionManager.restoreLastSession"));');
	menupopup.appendChild(mids);
    var menusep = document.createElement("menuseparator"); //菜单分隔符
    menupopup.appendChild(menusep);
    
    var savedSessions = loadFile(); //已保存列表
    for (name in savedSessions) {
        makeitems(name);
    }

	if (gPrefService.getBoolPref("SimpleSessionManager.restoreLastSession")) {  
		window.addEventListener("load", restoreSessionStartup(), false);
	}
}
    ());

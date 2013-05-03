// ==UserScript==
// @name           externalSubMenu.uc.js
// @description    多功能左键菜单，可以把小书签，鼠标手势等都放进去
// @include        main
// @author         lastdream2013
// @charset        UTF-8
// @version        20130503  0.1 first release 
// ==/UserScript==


(function(){
function unescapeHTML( input ) {
  	return input.replace(/&amp;/g, '&')
	  .replace(/&quot;/g, '\"')
	  .replace(/&lt;/g, '<')
	  .replace(/&gt;/g, '>')
	  .replace(/&apos;/g, '\'');
};
if (window.gExternalSubMenu) {
	delete window.gExternalSubMenu;
}

window.gExternalSubMenu = {
	autohideEmptySubDirs : true, //自动隐藏没有一个子项目的子目录菜单
	moveSubDirstoBottom : false, //把主菜单下的子目录移动到最下面
	insertafter : 'context-paste', //  context-paste   context-copylink context-openlinkintab
	subdirPopupHash : [],
	subdirMenuHash : [],
	toolbar :
	{
		//在这里定义好主菜单下子目录的名字,以及图标； 可在中间加{name: 'separator'}建立一个目录与目录之间的分隔线
		subdirs : [
			{
				name : '下载',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACY0lEQVQ4jZXLXUuaYRzH8fsl9QZGBh1URlakmU0qLUvzoULNdHlTrW09sdKNnqiNiqKD6KSzDgoiW4E0rRUJdWdEYCRFOEMRvzsTnDtoF3wO/vy+l1Ch1BRp2k2Swe7G6h1+FYPdjabdJFUoNUWCuq1DWt/a5uD4lB8/f73KwfEp61vbqNs6JKHFamd+bZPR6e959oJhorE40VicvWC4YJ9f20Tf3YvQ2tOHZ8RH38fJnIm5JW4fHpld3WB2dYPbh0cm5pbyGs+Ij9aePoRmqwPH0Fge3+IK4chV7g5HrvAtrhR0zVYHgtbUTZf3Qx5x3M9tLE4gGCYQDHMbiyOO+ws6rakbocFgwdw3UOD95DRPiSRPiSRfv63+s2kwWBCUOiNGRz87gSMi0g2h8wj+hWXa7e9IvKRIvKQY/TKPf2GZ0HmEiHTDTuAIo6Mfpc6IUNtkwOT0Ejq7IJlKE396xuwS0dt6SabSJFNpPvlmMLtE4k/PJFNpQmcXmJxeapsMCIpGHSanl5PzCHexe9KZDLuBQzrsHtKZDOlMhs8zC+wGDklnMtzF7jk5j2ByelE06hDk9VrMvSJDY1O02pzs7h+QBe4f4mSBLJD4nSQL7O4f0GpzMjQ2hblXRF6vRSir02BxiahaOnJ29gL8/Xb2AnmNxSVSVqdBKFUosbkHqG7U5bm6juY+X11HC3abe4BShRKhpLIGq0tErTMiV73NUTUbuJSuuZSuUTUb8ja1zojVJVJSWYMgkysktb6TLs8gdu/wq3R5BlHrO5HJFZIgq6guKi6vkt6UVfI/isurJFlFddEf7rWt0PDlgXMAAAAASUVORK5CYII="
			},
			{
				name : '搜索',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQUlEQVQ4jZXRXUjTYRTH8Qd8KV3WNETTyQgNi0QWSai1nDKhzFxpYgYLFMpCROjG8FKwFwukUETShhWV5ktqXSQkiWKoqVE3RsF/WGyNtL/txS1Cv12Iy2WKHfjAc34PnItzRJtSqemPiZQm4tV8SIzbkIl4Nf0xkVKbUqkRfVERklxVibunHc+zzg1x97QjV1XSFxUhieGd0cxVlCMXnf4vcxXljMaqEOOxKuRzRpx36pl/2LKKXHaemewMZrIzALzvGUMm47EqxLvjehYdDlz3Tcx3PmHR4QDg16eP2G9e5dsRnRfg04+odyDenz2Fs+UuNr0Wm16LfKmM5ZotKcKm1/Kvsum1DKkiEG8LDHwvL+WrLtXLMzgAgNPU7JMDPv1AZDjizcks5MrLWA8lezmamwBwNDf55MCf/nAqL8O3I0aO6fk5OYkl+YCX8/GjpYVdvOCTr2RNT+NFWChiWJ8GgKu3F4tOh+1MIQt2O/bGRr4k7V+TNVPPc+U2RE9YKM6n3XjGxliw2wGQa27wWbNvXZajWXSHhCA6FAosOQamExLxjI4tDbhWw3RC4rosOQY6FApEa1Awltx8LCfycI+Mes80V1ePeffeNVly82kNCkZ0R0fjmprCPTSMfKsOR3uXd8gP0z2kuD2rTCelYM4rwLRpM6JLrZZep6VjLjRiNRZjNRYze+U6iy7X0t1LSr35MnOhkcGUg9wOCJREtRCaWr8AqcE/kJUehIbxalc8LVu28vdfg38gtX4BUrUQmt+jtZxHRtsXywAAAABJRU5ErkJggg=="
			},
			{
				name : '翻译',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIElEQVQ4jZXKvU8aYQDH8effaaJyISYGiFF7Ah4oInDAyfEOd71cyUVRe4jGMpAmQtLFoelgOujQdGmda2OHLtWlQ5NuNzRpjfaFGBCPF3+dSvKERYfP9P0Su5NnPLxkRLPryBR27iSaXYeHlwy7k2fIXCBv7B8c4fjkFB8+nt3J8ckp9g+OMBfIGyQQ11DfO0S5+uJe6nuHCKVWQfhUEepGDcraLuXNu2MAgLz6bKgpa7tQN2rgU0UQv6ghq1UpBb2Oi19/0e/fIqHuDPX//KIGMh9VkVArA9Xnr3B+8QfdXp8Se7RNfQm1gvmoCuIOyRCkrYHXb9/D7PaHBNMb1CdIW3CHZBDWn0M4oyOUeTLgE1dw0+nhptODVyjAJ65gKblGPeGMDtafA5laSCGc0eGLFylts4u22cVc5PFQ88WLCGd0TC2kQByciEhWBydolFa7g1a7AzYgDzVO0BDJ6nBwIsiES4CQK2GWVynNaxPNaxNprYJZXsWysk11IVfChEsAsbI8YtImppZkyo/LBq5aJn5eNvDp7CuuWiZs3vSgx6RNWFkexDIdQEIuw7aQpWzXXuL7+W80mm00mm18/vINVufyoCfkMizTAZCRyUXEpRLYoIJxLklhnDGMzEQwMhPB6MMorO44xrkk2KCCuFTC6OQiiMXhM1zBPNJKGfnC0ztJK2W4gnlYHD6DMHYPM2bzGg9sXtzHmM1rMHYP8w+pYGElCLDyYQAAAABJRU5ErkJggg=="
			},
		],

		//1.在这里定义好想要出现在主菜单下,或在主菜单子目录下的程序(subdir没有定义, 或在上面子目录名列表中找不到名称相匹配的[比如写错了], 就会出现在主菜单下面)；
		//2. 可在中间加{name: 'separator'},  分隔线如果定义了子目录名,就出现在子目录下面；没有定义就在主目录下面.
		//    就可以了, 建议先写完上面想要定义, 分类在子目录下的程序, 之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
		//   在这里定义firefox的功能按钮, command就是一小段程序, 可以从firefox api, 小书签或鼠标手势中摘取;可选自定义图标;
		//    同样, 建议先写完上面想要定义, 分类在子目录下的程序,  之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
		configs : [
			{
				name : '谷歌站內搜索',
				subdir : '搜索',
				image :
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC",
				command :
				function () {
					gBrowser.loadURI("javascript:q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22%E8%AF%B7%E8%BE%93%E5%85%A5%E5%85%B3%E9%94%AE%E8%AF%8D:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('http://www.google.com/search?num=30&amp;hl=zh-CN&amp;newwindow=1&amp;q='+q+'&amp;sitesearch='+location.host+'');window.open(qlocation);}%20void%200")
				},
			},
			{
				name : '百度站內搜索',
				subdir : '搜索',
				image :
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACWklEQVQ4jZ2TzUuUURTGf2dmnFHLpCh1kSa0yV2k1iZokRURRNAiSrDAlZFhSUQgRBYGRX+BEFQEISJBENW2hRUlgaLpjBPqaI7mt+i877z3nhbjfKi7Dlw4zzn3Hp77nHOEh4MKgFVQCxYwJoWNBWtT2Ev7Odh4BAC0rYr/Man/iA+r2xLhEUc72md1oD+hAJGwo9GIu/2i8fBh7aaY6yrPO5fk1ctlnj6eJxpxaWyYprkpTjTibilgNzNYXDAEg4I1sLvIL/lBkfk5Q2LdijEq83NmcwHPEMCkGIyPJXnQNqv5BT7qzhTK4rzhcHWImmMFXGsszryZGE9SXpGXYQB3+1RVtev1oh4oGbHHa39bVdXRsKOJdatpGw07evliTC9dmLB/ppKqqsrZLs1oUHkwSHlFnpSUBuT9u1UAbt2Y5nbzNNGIS0/3CtFRlx/fEhIbT2603hLApv51pKaAljt7dCbucagqKC3X4/pryCGU75OZuNH2jn3ypXeNsrKA7i3x52jgpRj4/XDu/E6Zinm0NscZHnIwHrK2aun9vC73Wmf0ybNSiU0kqawMSrYLXlbZ0XCSm01xBgdcPA/JFXx4yJVH9/+yvyJPMhlj8KW7oAo9b5a1/6ejyeT2mVlYsPr9a4KJsZyktQQwWQZ5IcFxFL8f1KLWKj6/iN+HKrC2Zpma9HIGSbMaiMCVq8UyGfMYGXbZVeSTE3WFALztXpGlRUt1bYiTp3dILgOh4ZPqi1PpkAJ9wJaZzVgQqE4DOdqJUP9B8bzsmhq7saobvjXgaWqVM0cz6/8PC5Bp7zdzt94AAAAASUVORK5CYII=",
				command :
				function () {
					gBrowser.loadURI("javascript:var%20ax=prompt('%E7%99%BE%E5%BA%A6%E7%AB%99%E5%86%85%E6%90%9C%E7%B4%A2\n%E8%AF%B7%E8%BE%93%E5%85%A5%E6%90%9C%E7%B4%A2%E5%85%B3%E9%94%AE%E5%AD%97','');if(ax.length&gt;0){window.open('http://www.baidu.com/s?wd=site:'+encodeURIComponent(location.hostname)+'%20'+encodeURIComponent(ax))};void(0)")
				},
			},
			{
				name : 'google翻译当前网页',
				subdir : '翻译',
				image :
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHElEQVQ4jX2Ty2sTYRTFf5NOazNiWkdiMVFpfFFiF0LJpmBxWxBFsDSgm0JpQDetgv9BoZsuXKmr0oXQuFAqFBeiQhMTXAgqWPARqyWPUnXiNI9pMknGxTCTjCSe1fc6595z7/0EgHLxp0ELNK1or2t6hQHfkEAHuP4lxxNxHj9dczzKZT463rRCBHgYjfJtcxOATDYHYO8Bbs5MdeKbAhYy2Rx+3xGHkLXvBMGy8H5jg3v3HzB3axavR2J+aY1943eaNvagVCmT1iW2CjoAymSPIFoFOxM4DsCjlSgnAgECF6fJ1v8bHDlaNVytB9fDE2SyOWKvE2TrsiP6jC/DXCDP0e5y+xqou3lerccdJAsj+xWGpSINo86Y7CahdAOgqTuINb1CVtkltCQTm7xE4Y+C1+dnQTE9A4z4NAC28yWu9v9ggWFb3AUQWjLTPR/1Exw6jdcj8akIaV0CIOhWiac1nldOAjAq62jqjingX3R0ksG7vXR1NQdvTN6jXjf4oMC60gvAVN9n+14AEG9/tSettnhKEMKrxsEr4wC8OPsOr0eiqldtkqrVuPb2MKlfqmmhoZpD01BzuKZjBkD+yTNGZZ0+t8ibbZ1IUiSSFFn+YmY3MZBvZmCRAIyi4rCUmj9GJCkSLzfb+vJcCoALsX5ss+1EekKD5t2BQza5UfjtCND2mwrhVcNYuSwEl78bparzIxq6Zq+3bgSFv7Bp4KZzDo3/AAAAAElFTkSuQmCC",
				command :
				function () {
					gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','http://translate.google.cn/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200")
				},
			}, 
			{
				name : '有道翻译当前网页',
				subdir : '翻译',
				image :
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4jc1QsQ3CMBB0R5seJJ/F2wPQpUtHSwN1RoiYgA0YgVEYIQNQuEFCiS1lhNDg5IE4gQpO+ub0d39/QvwVaujcK9N6ZVoP3dwACCFErWjH+VGTblGZNhhYIOF8VHyd06K/ZOwU/wYnacWingJfSUoD76DPUYPnRSq6bhRte94c4gagNbtUOlBWSUqdpH2fbLn57IXIhGIHcRE043FDaTxVVDwECyTcoIbORwUO+uhA2WOKr6/H/nbQpQWSaQPo5lU4GfvnuAOO7rs1HAnRyQAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:%20void((function()%20{var%20element%20=%20document.createElement('script');element.id%20=%20'outfox_seed_js';element.charset%20=%20'utf-8',element.setAttribute('src',%20'http://fanyi.youdao.com/web2/seed.js?'%20+%20Date.parse(new%20Date()));document.body.appendChild(element);})())")
				},
			},
			{
				name : '繁简转换',
				subdir : '',
				image :
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADNUlEQVQ4jY3TX0xTZxgG8CMEZvkrBEQ2GyBUMylUN2J0hQCntZW2lhYowjm1lLQd0tFKsZRaKLSJk242tegWITGkyp+uRVTsMl1kihpEN6MzXnhB5EJNdrdl02SLMX7PLtYYWDTxTX6Xz5PvTd6PolaMrkeQeiSqtYfmXdfHb7rvH418Pmrsk5ZS7zNNzvLM0Tnr4sxDLzm12I7RBQOm7jkQvjPwot3LqB3HIlJX8GzDPtuR/LcWeMLqQOhOJ/FfUcE/p4Z/To2jV1QIXm1CaNHzOnzrKQkv/EbOzC39tb8/yKwKl5dTScM/6p54YlXwxKrh/b4a3lg1PLEqDF6sxIl5Fl/O/oSh2WUMXVhGYObXP2vkTRveFOyQZWf4Yg0v7NFS2KNl6JkWoGdaAHu0DAcjfAxdroUrcg59kSW4vlvC4fOPiZIxq1c+Yo3ztPhnW7gEnRPFsMR1ThTDMl4Mz0UZLKHbsIQeoXPsEXrPPHglUjZ8umqNFuc2tm+mgnSMFWKl7qkyYgn1E23gLtjAXeiP3yPN3cdjFEUlrCqQ6vJS249tvW8NfQzTCBemk1yYRrjomhAS1h8jMvc8ZO551B9eIHWOyWs04+S/Ce/tL6pqGy5cMo0UkLbhD6EP5kMfzEdrMB+Gbzei7Rs+5AMDqLD+AKHlEoSWS6g0T/9epTBtoRrs3O3ar/OeM74cML5csL5csF/9h/HlgvHloGUoB4wvD2K7A58YZ7HNcAFb285hh8Y9SmlcGy43DqyDZjALGk8WNN5sNMVpvNnQeLLQOLgO9f2ZULkKIGidRKk2ipLmKWzf45iklAczl+t606Fyxh3KgDpO5UxHXW86lI40KHvSILelQMAGsLk+BF6t72WFpFFO1Zqzf5Ed4EBuS4HClgJFd5wtBXIbB/IuDmRdHMisa7GrI5UU1NgJr9r6bKe4WUtRFEXt1hXpdu1Pei01J0P6xf+YkyExJ0PSkQSRKZFItJtufEarxXw+P23VEUnZIrfYmPySNiZCtAJtTARtSABtSCQSlntDKBSsf+dvrFSUlYtbCsZE+7Ke0a2cv2n92n9oXcYfIuajazUKgZ7H433wtty/EmGelA1I/y4AAAAASUVORK5CYII=",
				command :
				function () {
					gBrowser.loadURI("javascript:(function(){var%20s=document.getElementById(%22tongwenlet_cn%22);if(s!=null){document.body.removeChild(s);}var%20s=document.createElement(%22script%22);s.language=%22javascript%22;s.type=%22text/javascript%22;s.src=%22http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn.js%22;s.id=%22tongwenlet_cn%22;document.body.appendChild(s);%20})();")
				},
			},
			{
				name : '破解右键限制',
				subdir : '',
				image :
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADXUlEQVQ4jW2Te0xTdxTHz723195721pKi7xu4bbcdtBWi3Wtijqr8TVwzOhQGYK6mVjnlk2WkaFEjQIZEvER4+YjbmSyxS0Dx8MxgYiDitIoYl1ggApxsqTs8ed0Lb+zPwybEL7J97/v93NOcnIApuikDEr/1oRVwY8d5Q/LXj7z4LDzs+4PzMUNWxJcAEBPzU9Sxxu6tYPF5r5QpUzGPonHUGn0c5fH4W+H4iM978X+ePH1ONu05a7sqMLHRTHhJ0VaHC2OwtEDCePDJUnPRvYm/jNaYiBPirT4uFCLg+9q/6zJSlgxqdy2WJ3zyKeJDPs0OLJbg8OFMeFja8y5voViom+BJH2aadp48y1DYGS3mjzcocZgvmasyivKAABQYQBN7wZhZDBPwKECFT7YrsZHOzWkOdtw1gugmBiyTQKuJVtXPZQvkF828qRxTXQtAADUO1X5fes50r+Bx4E8gQxsFnAgV8ChAoE0ro6eBNkjAt+Vpb7381oO777KPfsoXbRAy3yh+t4KJfa+xoWr3PHv316vDvWt47FvHY/9OTxpWKabBLnsnvlOcJUSe5expNJt3A5XPZz/TgaL7V7V7zl2mFHljPPcylSFgquVGFypxPtZSlKb8T/klCy4el5hx2/PZ/G0K6YMmuZy/kA6g20L+DE7wAwAgAq73tO5XAj1LGaxJ4PFu0tZcsmtPesFUJySWVfArRjvnsPgifTYcrhk4768kcZg5zxFeI8tyT6xaoVd77m+iAsFXArsdjIYmMeQGqfmwtc2obzLwaDfRpOSOclvw/EUVcFPaRTpsNF4xqE99+J5S616T4tLGbqRxmBnKo1+G0067DRpt9DY/BLz9M10swXyomHmd1bFr60yja02OnxU1u0CAGoCctCq91xxsKFrFhrbZBpbU2hsMVPkRKqu4b9cqaTd1GSmIs0mCpstdOS8zNccMWqW+GJh1sFEXvzcxH1xNYXCH0wUXpEo/MbE/rFttjX1xW2pMrOu+PtkKtyQTGGjRGGjCcYvS9Tf9SbqaZMEpD6JwnojkK8kxV87HaaV0/5DoRybfU5S9tcZgdQZKawVn7tOBPKtCJGjKVHtW+xW57TlCXkl4HZYxcx9FkPlYVl/8ZCsr/7QGrc/d7a8EACYqfl/ASscSowNpGaHAAAAAElFTkSuQmCC",
				command :
				function () {
					gBrowser.loadURI("javascript:(function(){var%20doc=document;var%20bd=doc.body;bd.onselectstart=bd.oncopy=bd.onpaste=bd.onkeydown=bd.oncontextmenu=bd.onmousemove=bd.onselectstart=bd.ondragstart=doc.onselectstart=doc.oncopy=doc.onpaste=doc.onkeydown=doc.oncontextmenu=null;doc.onselectstart=doc.oncontextmenu=doc.onmousedown=doc.onkeydown=function%20(){return%20true;};with(document.wrappedJSObject||document){onmouseup=null;onmousedown=null;oncontextmenu=null;}var%20arAllElements=document.getElementsByTagName('*');for(var%20i=arAllElements.length-1;i&gt;=0;i--){var%20elmOne=arAllElements[i];with(elmOne.wrappedJSObject||elmOne){onmouseup=null;onmousedown=null;}}var%20head=document.getElementsByTagName('head')[0];if(head){var%20style=document.createElement('style');style.type='text/css';style.innerHTML=%22html,*{-moz-user-select:auto!important;}%22;head.appendChild(style);}void(0);})();")
				},
			},
			{
				name : '当前页面google快照',
				subdir : '',
				image :
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADGElEQVQ4jW3RXUyTBxSA4e9yF4sXy+KycDMj1Bik/aDW2krcaMtm3ELmSBhbUMBlgBA0ss0IW1jXimJFGtTA1KJQftJ2OlosWlAqtcAaoP6w4NSFfQhhTiNshEyL6/LuglDTZCd5knNz3psjWM50iJ1en1Td3IPyoIf0w/0U1nkJT9wjPHYLu1pLd2ISfaoUBjM1jH6oJ6DX0q1Ikc4nJIhCu+eK9OfCIpcGZ/Dcnsdze562aw95Mv8cgKd3bzF99hBLQXfMs+sX+L3RjDt5vST0BkP8E42y336HvPb75LXfJ7flLqd9DwB4HB5jWKtm3lgc79Q39GtEhOGb4wAUnRlFc3yErdYwSkuI7PobADz6KYR/TRJ/5L8X53FRFv5NKQjXQncAcAQl3tjfw9pvB1hdeZW8huWAv6iEvrcSuZEoY2zDeibSkpnUyJl5O5WrchlCtsnNyuw5PcQrBR28WeJgfGqOr8+bMZRv4YOKdAqrtvCFWYvxqAZLqZLj+akc0soQUg92sb02gHd0mr/+XorFrJebWWfNZGe3gYo+HVV+Hd8FMqgZfCem0KZBECu72HriJq9/eYlV+W1xAdlRPbldhrijFUeGdBSc1SDI9jpQm4OsKrvIq7vsjE/NxSLN152sNWaww2nAFMiIUxvcxs7vNyMo9rTS6p+MO4zMTcf2H0KXEY/oKPfoqOrNiKnpzyK3YTNCt394+d8jTibqVDyol/PLsQ089NXFIpWOw+TYDVR4dDHm3mx2HFMjXBkYYmnhEb+ekLM08BHRkV28GMxhxqbiSdgFQGvAxfZGPaXOl0zeT3i/Ro3g9QeJRhb5rSmJFz45//oVRPsVLP6YzGzACsBJ3zm2ndKzu+0lk7uATOMmBJe3j2eRCE9/voDUrmW2JYHZlgSkix8TjSwAoK/N4d2Tej61LStuzaLasZv0AyoE67kO6d7kFM8jEf5vbD02ypqKMTpKMbmWVXeW8FlDNqq9Skn4ymIV6212qdnpZkVTp4sDjRbWFel4LU9kdWEaa4qVKMqVKPdtRLlvI2llaZL4uSj+B/6jwzxuLzMiAAAAAElFTkSuQmCC",
				command :
				function () {
					gBrowser.loadURI("javascript:(function(){%20document.location.href='http://webcache.googleusercontent.com/search?q=cache:'+escape(document.location.href)%20})();")
				},
			},
			
			{
				name : '清除隐藏文字',
				subdir : '',
				image :
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACxklEQVQ4jX2SzUuTARzHfzAsqD2F9Q8UjxV4CZZNVzbZTFh4muVBlA6VIHYps2KHhRYdjAgCOxREHVLKWgRFBR2ilUUhJWy1pvVszT209uzNt5yiz6dD7/byhc/t+/2cviJ/RtlltTYupkFRvH/p/pGVd2prgwuXLmFeu4YZCGAGAjAwgHn5Mn01NQP/Hd92OoMLZ87AhQvM9fVhPHhAIRxmrr8fLl7EPHuW/m3brv99XFkZXPD54ORJiqdPk02lGH3xgkQoxPTEBIVz56CnB9Pvp9/h+E2y7JbNFlzYtw8OHGDO76dw/jyZdJo3z56hDQ8zMzVF5tQp8Pvh8GHM9nauVFRcFRER65Il5YbHAy0t0NpKsqeH5Lt35AyDyNOnxL4Lurrg4EFob4c9e4h5PFMislKWl5Rs/FRbi7lzJzQ3k+juJhmNkjMMQoODaK9e8XlykszRo8y3tTHf2gpNTcTq6qZEZLUsLynZOOZ0Mltfj+n1Evf5SEUi5HSdYj7PbKHA/OQkiWPHmI7HGevtxWxoIOZ2/xRoW7Ywvn07Mzt28L6jg8+GQTGTYTabZTabpZjJkHj+nNTICDmvl2J9PaM1NT8F0cpK0k4nebebyP79FJJJxnWdiW+M6zqFZJLRQIBpj4eJujreVld/FSwV2RDctGlGdzhIVVcT2ruXtKZhaBpGLPYVTSOtaUSOHCHndpNxuQiUl38UkVUiItYyRekYtNmKY1VVvHa5eDs0hB6N/kb44UMSLhefnE4C69blV1gsTb9+oVRVlM7HNlsxbrcT3L2bJ3fv8uT+fR7fu0fw5k1eNjaib93KjbKyfKnF0iIi1sVvLFUVpfORzVbUNm9mtKKCmN1O3G7nQ1UVCYeD66r6z/EPyVpFOXRCVUPHVTV8XFXD3aoa7lLVsG/NmuFSi6X5f+PvWSEiqoisX8RaEVm2uPwFgl/ntiLCO0UAAAAASUVORK5CYII=",
				command :
				function () {
					gBrowser.loadURI("javascript:getobjstyle=function(node,prop){return node.ownerDocument.defaultView.getComputedStyle(node,'').getPropertyValue(prop);};RemoveHide=function(objname){var minValue=15;var objs=document.getElementsByTagName(objname);if(objs.length==0){}else{for(var i=objs.length-1;i>=0;i--){var node=objs.item(i);if(getobjstyle(node,'display')=='none' || getobjstyle(node,'visibility')=='hidden' || parseInt(getobjstyle(node,'font-size'))==0){node.parentNode.removeChild(node);}else{if(node.parentNode){var orgNode=node;var orgColor=getobjstyle(orgNode,'color');var orgRGB=CleanHidegetRGB(orgColor);var parentNode=node.parentNode;var parentBgColor=getobjstyle(parentNode,'background-color');var isLast=false;while(parentBgColor=='transparent'){if(parentNode.parentNode==null){isLast=true;break;}parentNode=parentNode.parentNode;parentBgColor=getobjstyle(parentNode,'background-color');if(parentBgColor != 'transparent'){break;}}if(isLast){if((Math.abs(orgRGB[0]-255)<=minValue)&&(Math.abs(orgRGB[1]-255)<=minValue)&&(Math.abs(orgRGB[2]-255)<=minValue)){orgNode.parentNode.removeChild(orgNode);}}else{parentBgRGB=CleanHidegetRGB(parentBgColor);if((Math.abs(orgRGB[0]-parentBgRGB[0])<=minValue)&&(Math.abs(orgRGB[1]-parentBgRGB[1])<=minValue)&&(Math.abs(orgRGB[2]-parentBgRGB[2])<=minValue)){orgNode.parentNode.removeChild(orgNode);}}}}}}var itemFrames=document.getElementsByTagName('frame');var itemiFrames=document.getElementsByTagName('iframe');var frame,iframe;if (itemFrames.length>0){for (var i=0;i<itemFrames.length;i++){frame=itemFrames[i].contentDocument;this.RemoveHide(frame,objname);}}if(itemiFrames.length>0){for(var i=0;i<itemiFrames.length;i++){iframe=itemiFrames[i].contentDocument;this.RemoveHide(iframe,objname);}}};function CleanHidegetRGB(colorString){var RGB=new Array;var tempSting=colorString.substring(4,colorString.length-1);var tempArray=tempSting.split(",");RGB[0]=parseInt(tempArray[0]);RGB[1]=parseInt(tempArray[1]);RGB[2]=parseInt(tempArray[2]);return RGB;};RemoveHide('span');RemoveHide('font');RemoveHide('div');RemoveHide('p');")
				},

			},
			{
				name : 'Mouseover DOM Inspector',
				subdir : '',
				image :
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3ElEQVQ4jaWSvQuDMBDF+0e7ujs6O3YWFycXXQSpQyCgg1LIoAQqSigEER1eJ8X4XTy4IXD53bt399CcGHfyoTkxlpFwASvMpiLDowhyvqrbBNCy2e1mE3YOMP10F2B4FG0/HAPmH0bZQc6huwSFkOcKDI9OgOfrjVp2AKB0/tsDm7DrAACIWLWCXB5hjFp2sAlbQU5NXEb++UJ3yQSJWHUMKISEFWaK3Plq5we1ArT9oGzB9FPlrTkxaNnsAwohFbnLNP303MRxhCurPDSx7QckXCDhYvMGFMCd/AHHS24Twewa9gAAAABJRU5ErkJggg==",
				command :
				function () {
					gBrowser.loadURI("javascript:void(z=document.body.appendChild(document.createElement('script')));void(z.language='javascript');void(z.type='text/javascript');void(z.src='http://slayeroffice.com/tools/modi/modi.js');void(z.id='modi');")
				},

			},
			{
				name : '下载页面内所有图片以ZIP形式保存',
				subdir : '下载',
				command : 
					function() {
						// 保存ディレクトリのパスがない場合は毎回ダイアログで決める
						//var path = "C:\\Users\\azu\\Downloads"; // エスケープしたディレクトリのパス
						var path = "";
						if (!path) {
							// ファイル保存ダイアログ
							var nsIFilePicker = Ci.nsIFilePicker;
							var FP = Cc['@mozilla.org/filepicker;1'].createInstance(nsIFilePicker);
							FP.init(window, 'Choose save folder.', nsIFilePicker.modeGetFolder);

							// ダイアログ表示
							if (FP.show() == nsIFilePicker.returnOK) {
								path = FP.file.path;
							} else {
								return false;
							}
						}
						// ダウンロードしたページを表示するために URI オブジェクト生成
						var hostURL = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService).newURI(location.href, null, null);
						// ページに貼り付けられた画像を保存する
						var links = content.document.images;
						var pack = [];
						for (var i = 0, length = links.length; i < length; i++) {
							// JPEG と PNG を保存する
							if (links[i].src.match(/\.jpe?g|\.png|img\.blogs\.yahoo(.*)folder[^thumb]/i)) {
								pack.push([links[i].src.split("/").pop(), links[i].src]);
							}
						}
						zipDeKure(pack, path);


						function zipDeKure(urls, savePath) {
							const ioService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
							const zipWriter = Components.Constructor("@mozilla.org/zipwriter;1", "nsIZipWriter");
							var uri = content.window.location.href;
							var fileName = uri.substring(uri.lastIndexOf('://') + 3, uri.length);
							fileName = fileName.split(".").join("_");
							fileName = fileName.split("/").join("_");
							fileName = fileName.split("?").join("_");
							var path = savePath + "\\" + fileName + ".zip";
							var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
							file.initWithPath(path);
							var zipW = new zipWriter();
							var ioFlag = 0x04 | 0x08 | 0x20;
							zipW.open(file, ioFlag);
							for (var i = 0, len = urls.length; i < len; i++) {
								var[name, url] = urls[i];
								var ch = ioService.newChannel(url, "UTF-8", null);
								var stream = ch.open();
								zipW.addEntryStream(name, Date.now() * 1000, Ci.nsIZipWriter.COMPRESS_DEFAULT, stream, false);
							}
							zipW.close();
						}
					},
			},
			{
				name : '下载页面媒体联接以ZIP形式保存',
				subdir : '下载',
				command :
				function () {
					// 保存ディレクトリのパスがない場合は毎回ダイアログで決める
					//var path = "C:\\Users\\azu\\Downloads"; // エスケープしたディレクトリのパス
					var path = "";
					if (!path) {
						// ファイル保存ダイアログ
						var nsIFilePicker = Ci.nsIFilePicker;
						var FP = Cc['@mozilla.org/filepicker;1'].createInstance(nsIFilePicker);
						FP.init(window, 'Choose save folder.', nsIFilePicker.modeGetFolder);

						// ダイアログ表示
						if (FP.show() == nsIFilePicker.returnOK) {
							path = FP.file.path;
						} else {
							return false;
						}
					}
					// ダウンロードしたページを表示するために URI オブジェクト生成
					var hostURL = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService).newURI(location.href, null, null);
					var links = content.document.links;
					var pack = [];
					for (var i = 0, length = links.length; i < length; i++) {
						if (links[i].href.match(/mpe?g|wmv|flv|mov|avi|mp4|bmp|gif|jpe?g|png|mp2|mp3|ogg$/i)) {
							pack.push([links[i].href.split("/").pop(), links[i].href]);
						}
					}
					zipDeKure(pack, path);

					function zipDeKure(urls, savePath) {
						const ioService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
						const zipWriter = Components.Constructor("@mozilla.org/zipwriter;1", "nsIZipWriter");
						var uri = content.window.location.href;
						var fileName = uri.substring(uri.lastIndexOf('://') + 3, uri.length);
						fileName = fileName.split(".").join("_");
						fileName = fileName.split("/").join("_");
						fileName = fileName.split("?").join("_");
						var path = savePath + "\\" + fileName + ".zip";
						var file = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
						file.initWithPath(path);
						var zipW = new zipWriter();
						var ioFlag = 0x04 | 0x08 | 0x20;
						zipW.open(file, ioFlag);
						for (var i = 0, len = urls.length; i < len; i++) {
							var[name, url] = urls[i];
							var ch = ioService.newChannel(url, "UTF-8", null);
							var stream = ch.open();
							zipW.addEntryStream(name, Date.now() * 1000, Ci.nsIZipWriter.COMPRESS_DEFAULT, stream, false);
						}
						zipW.close();
					}
				},
			},
			
		],

	},
	_ExternalSubMenuPopup: null,
	_isready: false,
      init: function() {

	  extSubMenu = document.createElement("menu");
	  extSubMenu.setAttribute("id", "ExternalSubMenuID");
	  extSubMenu.setAttribute("label", "多功能菜单");
	  extSubMenu.setAttribute("class", "menu-iconic");
	  extSubMenu.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACiklEQVQ4jZ2SW0iTYRjH//ve79tR80RpokVojBIvwlogFrJiFybmacQaVh4uRLuyA0lYoy6kNKSlGRQGERUSTZGQQDQhA9GWKbIybdE0p2PYdKudny7yItmE6H/7vL8fPO/zB6KEDJDS4C6lZ0i5n0bSM8gAPtq7SNAIiftpynnf8N7pwNi+EE2pKGTO8YffZY/7h9OrCBBtCtsroFhpizFRXwqFXqaSx5Q85u3Z9sL3KmWKxncSvd9BwddJHdQNFl1QL77ub5GQ+474l7tDrCeAAwDSQhzoVVwID8SG6U0c+ftjqyPgz1psna9kS57LAi038W3fiuSphvw/e6+1ymudDbL0gEn2nAZjKNSjmCQjJBsEn4r5I/MnGS3VsrC9hlfb66SPXdVIBAD33cQGjzHe5H8kVJBJTsFnMh91S5QbBB+PMa2tlJFVz3yzOl69UCezORoTCtdubN/jfpj2wNMeF3DfkjQE7sso2CWnn13CwQ2CaQ2vni3gyFrChWfKUfi1QrC4rsbTj840X6ArmVZvSmZXDbJLoRYp+W5LvHRPsnuDwKJC0pRatGgrYjRTzBknC5Btr2K9znNicl8R08pFfsB1lvVSE0/ea8L4tAHiiI80H0LTFw1Hc6Wcb+EUqyIt2PfTXKerTqDlet7rLEHYWw5y10AX9YxD+ZCa87gns0c5mi9jZNOLJmzFGF3U8+SoFchxWORfyETzZmViAIScBMT1HUDj21yRxZyL4GgGaDKPCzmqBbKfYfMGJVIBCEBktbn1gRQAnwUktmciq1VATr+K6RZ0LOioEWjiBK9Zh6O3MVqIILKW8SM2PbM59djyz+DfmTvOKq0lfPN/wQDwQQOFRYWkaLPfDBcdeek0cmkAAAAASUVORK5CYII=");
            var contextMenu = document.getElementById("contentAreaContextMenu");
            //contextMenu.insertBefore(extSubMenu, document.getElementById(gExternalSubMenu.insertafter));
			contextMenu.appendChild(extSubMenu);

	   var ExternalSubMenuPopup = document.createElement('menupopup');
	   ExternalSubMenuPopup.setAttribute('onpopupshowing','event.stopPropagation();gExternalSubMenu.onpopupshowing();');
	   this._ExternalSubMenuPopup = ExternalSubMenuPopup;
   	extSubMenu.appendChild(ExternalSubMenuPopup); 
		setTimeout(function () {  //延时加载菜单，不对启动造成影响，也不影响第一次打开菜单时的响应速度
			window.gExternalSubMenu.loadSubMenu();
		}, 2000);
	},
	loadSubMenu: function() {	   
 	   if (this._isready ) return;
 	   if ( this._ExternalSubMenuPopup == null ) return;
	   //Application.console.log("loadSubMenu do!: ");
 	   var ExternalSubMenuPopup = this._ExternalSubMenuPopup;
         for (var i=0; i<this.toolbar.subdirs.length; i++) {
          if (this.toolbar.subdirs[i].name == 'separator') {
            ExternalSubMenuPopup.appendChild(document.createElement('menuseparator'));
          }
          else {
            var subDirItem = ExternalSubMenuPopup.appendChild(document.createElement('menu'));
            var subDirItemPopup = subDirItem.appendChild(document.createElement('menupopup'));
            subDirItem.setAttribute('class', 'menu-iconic');
            subDirItem.setAttribute('label', this.toolbar.subdirs[i].name);
            subDirItem.setAttribute('image', this.toolbar.subdirs[i].image);
            gExternalSubMenu.subdirPopupHash[this.toolbar.subdirs[i].name] = subDirItemPopup;
            gExternalSubMenu.subdirMenuHash[this.toolbar.subdirs[i].name] = subDirItem;
          }
        }

        for (var i=0; i<this.toolbar.configs.length; i++) {
        	var configItems;
          if (this.toolbar.configs[i].name == 'separator') {
            configItems = document.createElement('menuseparator');
          }
          else {
            configItems= ExternalSubMenuPopup.appendChild(document.createElement('menuitem'));
            configItems.setAttribute('class', 'menuitem-iconic');
            configItems.setAttribute('label', this.toolbar.configs[i].name);
            configItems.setAttribute('image',this.toolbar.configs[i].image);
            configItems.setAttribute('oncommand', unescapeHTML(this.toolbar.configs[i].command.toSource()) + '.call(this, event);'  );
            configItems.setAttribute('tooltiptext', this.toolbar.configs[i].name);
          }
	    if (  this.toolbar.configs[i].subdir && gExternalSubMenu.subdirPopupHash[this.toolbar.configs[i].subdir]  )
               gExternalSubMenu.subdirPopupHash[this.toolbar.configs[i].subdir].appendChild(configItems);
           else
          	   ExternalSubMenuPopup.appendChild(configItems);
        }

	if ( this.autohideEmptySubDirs )
	{
		for (let [name, popup] in Iterator(gExternalSubMenu.subdirPopupHash )) {
			if ( popup.hasChildNodes() ) {
			   continue;
			}
			else {
			    gExternalSubMenu.subdirMenuHash[name].setAttribute("hidden", "true");	
			} 
		}
	}

	if ( this.moveSubDirstoBottom )
	{
		let i = ExternalSubMenuPopup.childNodes.length;
		while ( ExternalSubMenuPopup.firstChild.getAttribute('class') != 'menuitem-iconic' && i-- != 0 )
		{
			ExternalSubMenuPopup.appendChild(ExternalSubMenuPopup.firstChild);
		}
	}
	this._isready = true;
	},
	onpopupshowing: function() {	   
 	   if (!this._isready ) this.loadSubMenu();
	},
}
    window.gExternalSubMenu.init();
})();

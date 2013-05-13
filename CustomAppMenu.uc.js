// ==UserScript==
// @name           CustomAppMenu.uc.js
// @description    Custom firefox App Menu
// @include        main
// @author         lastdream2013
// @charset        UTF-8
// @version        20130513 0.1 Initial release
// ==/UserScript==

var gCustomAppMenu = {
  autohideEmptySubDirs: true,  //自动隐藏没有一个子项目的子目录菜单
	moveSubDirstoBottom: false,  //把主菜单下的子目录移动到最下面
    toolbar :
    {
    	//在这里定义好主菜单下子目录的名字,以及图标(可定义或留空,好图标不好找....)； 可在中间加{name: 'separator'}建立一个目录与目录之间的分隔线
    	subdirs : [
    		{
    			name : '常用功能',
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADq0lEQVQ4jZXUW0wTZhTA8UNCYuBhiQmZNUwiUfF+t1wLvUFbWwqFVi4tK0ipQItFXKGFQEEMZE6iomLIyB7MDNFJjGwMMYQsJpvZ1MzFyECzzG0uQZoo2abP/z2I6+t4+D98D+eXnIfziYjEpas0hTka3UKOVs+K0ugW0lWaQhGJExGJz1RrFk4MXODyzVtcGZ9idOI21yanGZua4cZyY1MzXJucZnTiNlfGp7h88xYnBi6QqdYsiEi8iMiqjFw1JwdHaAh24gtFCHT00tTeQ1O4m0BH79t3uJum9h4CHb34QhEagp2cHBwhI1eNiKwSEUlQZqsI95/FE2jF2xLG09zKwKVPefholqWlv3j5aokHPz2if3AIT3Mr3pYQnkAr4f6zKLNViEiCiEji/swsjkf6cDcGcHr9XL1xk79fv2H+6S+MjU8wNj7B7Nw8/7x+w/Xxr3B6/bgbAxyP9LE/MwsRSRQRSdyjzMAX6sLhrqPn1AAvXy3x+dXr2JzVlLoOU+o6jK2ymv6BcywuRjl9fgiH24Mv1MUeZUYM2rXvAJ5AEIujkjvffsfdH+5jcVRg/7CW0qpayqq9OD2NlLk9lLpqKHQ4KXHW4AkE2bXvQAzavnsvrvqj5FtLmJ2b59LIZxhLyiitOoy1vIrf/njO78//5PzwCHX+ZqrqGjDby3HVH2X77r0xaMuOnRyqrkNtNHPv/gMuDo9QUFiCtcyFocjO3e/v4azxojcXk2+x0fvxabQmK4eq69iyY2cMStu6DVulm2ydgdGrXzB5exqN0YKp5BDag1YCwTZyDSbURgttnREePX5Mjt6IrdJN2tZtMWhD2mYsjkqyNHpq6/3c//EhrR1dqI0WtAetVB9p4JMzg8x8c4e5J08ZGh4hI0+HxVHJhrTNMSh14yZMNgc5OgPKHDXdvX38/OQJp86co7i8AlW+kSxtARl5OpTZeW9TaTDZHKRu3BSD1q1PxWyvQJVvIkdvRJmrobbex5dfT/Lrs2csRqOxFqO8WIySnqfDbK9g3frUGJSckkJZjRdDUSnGYjumYgd6czFaUyFakxWtyYrGWEiewUxugYm8AhNqo5myGi/JKSn/QQmK5OTFonIXR1pCNATb8bV14QtF8IciNIW78YcjNLZ2cuSjdrzHQtQ1B/Eea6Oo3IUiOTn67kRWrU5Kcq1RKKJr1q5lJb2vULxYnZTkene08SLynogoROSDFaZYno2X5U8pfllNWN73/5SwPBMvInH/AlIIOOfCXNavAAAAAElFTkSuQmCC"
    		},
    		{
    			name : '扩展功能',
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADe0lEQVQ4jZXUb0gUZhzA8Z8giAYKvQiLRWh2eDPNhKvAU8/TS+/yTwqJVJL4h5XKUMQdp3TzTwQqipDhG9EIK2aOxpxjbKDeeaemnt5dFiuRrcI7PXVbo6L25rsXnrs3vZgvPvA8DzxfeF78HhGRoOOVAzknqu56E6uH2IsTVXe9xysHckQkSEQkOOHqoLdsyIlpwkPjpIfrFi9m6zottnVa7Ru02jdosa1jtq5z3eKlcdKDacJD2ZCThKuDXhEJFhEJia/op/jBKrp2J1mdLvTdbs71PCHn1jK5vU/J7X1Kzq1lzvU8Qd/tJqvTha7dSfGDVeIr+hGREBGR0LjSPgruPCejzYHu5iJZ7U6yO50YulwYut07ulxkdzrJaneiu7lIRpuDgjvPiSvtQ0RCRUTClBd7yOt9RlrjHFrzPJktDnRtDjJbF9A2z6NtnifdPIfm+mMymx1ozfOkNc6R1/sM5cUeRCRMRCRMcaEDfYcbdf00acZZUr6aQd0wTfbXs4w+9rL15iO/b7yj69sVkuttpBlnUddPo+9wo7jQEQjFnL9BZssSZ2qsqKrG+aJnkb7RVSyuDXx/fcSz/QHPHx/Y+vsfmvrdnKqe4EyNlcyWJWLO3wiEog1mNCYHqsoJTpX/zMuN97zefM9v6+9YWXvLytpbXvj9YH9NUulPqCon0JgcRBvMgdARnZHkujnii8eo6ZhhaeVPll74rbzZ4d/P/7pNWaud+OIxkuvmOKIzBkKH02o5fW0GZf4jZlyb2J2b2N1bnzTt2mLa5UOZ/4jT12Y4nFYbCB1KrkJVbkOhv8+o5SWTCz4mHTssfrv7yQUfY9ZXKPT3UZXbOJRcFQhFqipIKpki5uw9Cqu/40frK+aWtz/pl5k1ir78npiz90gqmSJSVREIHUgsIfGyBYXhIUczBonW9BGl6SU6/TbRWr/02ztnmj6OagdQGB6SeNnCgcSSQGh/XBEnr4yjzB0hNneE2LxhlPnDfF7wDXGFw8QV7qyV+cPE5g0TmzuCMneEk1fG2R9X9F8oNOJY/kZC8SDqWgvqOgspDVZSjVNoTDa0TXa0TXY0JhupxilSGqyo6yyoay0kFA8ScSzPtzsiIfsOpl4Kj9b7IqIM7EV4lGF938HUS7tDGywi4SISKSKf7VGk/26w+D+lYH811P/e/yPUfydYRIL+BSkIj6JbQMVJAAAAAElFTkSuQmCC"
    		},
    		{
    			name : 'separator'
    		},
    		{
    			name : '火狐目录',
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADqUlEQVQ4jZXUW0gbVhzH8SMIYgvzGijTLIu2Tjtb4yXqbC0olFKQUkr7UBTEzc3U2BgxiBSUgujEXrBzs1ovVbxk8RJvXe06ZlpNnErUxLsWLU7Ba72MPfTtu4fY6WP78INz+PH/wHn4HyGEcPJQPUiQ3C5bk2h+5pNyu2zNQ/UgQQjhJIQQzhL1o7UrXWPcsq2TbttAbd9AM7FB5uQm2ilHMic30Uw4unTbBrds61zpGkOifrQmhHAWQggXSXopl/qWiNJPoGyyoWyyEam3E9MyyYWOWS50zBJrnOFc+zQxrVNEGyaJ0k9wqW8JSXopQggXIYRwlageEtf7BmW9jfBqK/3Luwyt7hNZP8Z5wzTnDdOc+3WKGP0U3zRNEtUwgbLeRlzvGySqhwghXIUQ4ph36j1iu2YJe2IlpMzMy4VN+ha3CK0cJLrRTnSjnagGG5H1NpR140TUjBH2xEps1yzeqfcQQhxzQCnFxLROoygbJvj+K74u+o3g4ueE/DRA6OMRQh+PoCgfRvHLMCFlQ5wp/QtF2TAxrdN4pxQfgZILiWyyE3zfQtCPf7Ky/56V/fecLjk863qmmd38F/vaPyQ2jBJU9IrIJjveyYWHkFdSAWF145wu6icgrxfryh7WlX0C8rqxru5jXd3nxcw6LaN/M7a6x+8z6wTkvSSsbhyvpIIj0M27KCpG+SrfhL+um4HFHQYWd/DPNmBZ3MGyuENwjp4zOXoGDu7+2T0oKkbxunn3CHQjj+DSEU7m/oE8y4hpbgvTwhZybTOmhXeYFt7hl2VArjU4urktZBltBJeO4HUj7xDyvHaHoJIh/LJf8IW6FdPcNqb5bWTqJl7Pb/N6fht5Vgdfao2Obm4LaZqBoJIhPK/dOQJdzSWwcBB55nOkaS1Y3+5ifbuHVNWIdXkP6/IeMo0RWUabo1vaxfc7PYGFg3hezT2EPBJ0BBSYkal7kH5vwCe5Gt9va5GqmpGmPkWa+hRZhhFZehs+ydV8nlSFT0ozAQVmPBJ0h5D7ZS2Bhf3IM7rx03Tip2nHT2vEX9fNSV2nIznP8Nf14KdpR65uRa7uJLCwH/fL2v8hV7eL6o1T+S2cLTcTUmFGUWkhrMpCeM0gEbVDRNQOEV4zSFiVBUWlhZAKM2fLzZzKb8HtYsbmhxVxOa68nugWp9p0j1fhHpf2cYlX4Rb/w/px5fXED0vrLIT4TAhxQgjh+4k5cTDrLA4+JecD1fXgvR8T14MZZyGE03+JH4zfQFZkowAAAABJRU5ErkJggg=="
    		},
    		{
    			name : '配置文件',
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADn0lEQVQ4jZXUbUwUdBzA8R8bG4MXvfIFOZyC98CBQpjIJQjh2QHyMPEm4AGipGzHM+wETjh5GB2jxgiiENBpUHoQteWLIBjCbM2ZLh7UCoU0RCHIJCW0evHtBae39SpefF7+vttv+//+IiIuylRLnN/hyjm/I5WsyeHKOWWqJU5EXEREXP0yrHPpZ/ow949xfGCMssEJLEM3qLh0E+vIqopLN7EM3aBscILjA2OY+8dIP9OHX4Z1TkRcRUTcNOnlGM4NE1llJ7LKzq6KT4ioPE9kjR2d7TN0th50th5213YTWWMnsqabyCo7hnPDaNLLERE3ERF3X2MZcS39hFs6Cbd0stN8mj+f/03jl1ewfjpM18gE++t7WPnrHwZHpwkrPUu4pZO4ln58jWWIiLuIiIc6yUxU/UVCizsILe5gR04z84+X+f3pMx4vP+PR0xWerDxn/vEyFWf7eKOwldDiDqLqL6JOMiMiHiIiHipDEXuqe9HmtrDD1ER8WRszC0urFpeYWfzDYYnb9xcINjWizW1hT3UvKkORM6Tcl0dYaRfBxxp47dA72AevMTm7wOTsIpOzi9x2mJxd5M6D39iWWUfwsQYiys+j3JfnDCniswnJaSfQWE334Hf8NLPA+NQDxqceMj79H1MPmXv0hEBjNWHFH6OIz3aGfGKy2H60ma1JVpLNTahicvl86BpXb911+IVvx3/m6q27pJU1o02rYGuSFW12Gz4xWc6Qtz6ToIwG/BMt7Eo7yfc/3kOhN1H5YQ+XR+9weXSKb8amUETloIotRJNYgn+ihdffbsJbn+kMbdJlEJT+LpoEMwq9ifSSJqbvL3L9h3vUtX/BEUszI9cnUUUX4L//BP6JJ9AkmAk69B6bdBnO0MaIVAJSbKhiClFG5eGzOwvvN4/yQddXWN+/QJb1I7r7rpB1sh3fWDOahFJUMYUEpNjYGJHqDG0IS2bLgVoU+lwU+lxU+nw260wYsuuwtfbSeuFr2uwDpBQ1oo4uxjfWjEKfy5YDtWwIS3aGvLQGAox1qKLzUUXno95bhDquGGVUHpvfyn5JGVOAJr4E33gzquh8Aox1eGkNL0Pu64MTfg08WE2IqRVtzim0eW3szG8ntKCN0KL21RdfuEqb14425xQhplYCD1azfnv8wosTcVunDk/1DNq78Oq2WNbCMyh2fp06PPXF0bqKyCsi4ikiXmvk6Zh1Fcen5Oqoujv2/T/cHTOuIuLyL3Tiaqq+A005AAAAAElFTkSuQmCC"
    		},

    	],

    	//1.在这里定义好想要出现在主菜单下,或在主菜单子目录下的程序(subdir没有定义, 或在上面子目录名列表中找不到名称相匹配的[比如写错了], 就会出现在主菜单下面)；
    	//2. 可在中间加{name: 'separator'},  分隔线如果定义了子目录名,就出现在子目录下面；没有定义就在主目录下面.
    	//3. 这里定义的可以重复. 例如IE浏览器我想出现在windows工具下面, 又想出现在子菜单下面,   那么就定义二次:
    	//    {name: 'IE浏览器', path: 'C:\\Program Files\\Internet Explorer\\IEXPLORE.EXE', args: ['%u'], subdir: '系统工具' },
    	//    就可以了, 建议先写完上面想要定义, 分类在子目录下的程序, 之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
    	apps : [
    		//火狐目录
    		{name : 'profile',          subdir : '火狐目录', path : '\\'},
    		{name : 'chrome',           subdir : '火狐目录', path : '\\chrome'},
    		{name : 'CSS',              subdir : '火狐目录', path : '\\chrome\\CSS'},
    		{name : 'SubScript',        subdir : '火狐目录', path : '\\chrome\\SubScript'},
    		{name : 'UserScriptLoader', subdir : '火狐目录', path : '\\chrome\\UserScriptLoader'},

    		//配置文件
    		{name : 'userChrome.css',   subdir : '配置文件', path : '\\chrome\\userChrome.css'},
    		{name : 'userContent.css',  subdir : '配置文件', path : '\\chrome\\userContent.css'},
    		{name : 'prefs.js',         subdir : '配置文件', path : '\\prefs.js'},
    		{name : 'user.js',          subdir : '配置文件', path : '\\user.js'},

    		// 建议把要放在子目录下的程序定义在上面, 下面的定义放在主菜单下的最常用的程序
/*    		{name : 'separator'},
    		{name : 'HyperSnap 7', path : 'E:\\software\\HyperSnap 7\\HprSnap7.exe'},
    		{name : 'Everything',  path : 'E:\\software\\Everything\\Everything.exe'},
    		{name : 'separator'},
    		{name : 'Goagent',path : 'E:\\software\\ProxyTools\\goagent\\local\\goagent.exe'},
    		{name : 'Thunder',path : 'E:\\software\\Thunder7.2.11.3788JayXon\\Program\\Thunder.exe'},
    		{name : 'EmEditor',path : 'E:\\software\\EmEditor\\EmEditor.exe'},
    		{name : 'SourceInsight',path : 'E:\\software\\SourceInsight\\Insight3.exe'},
    		{name : 'separator'},
    		{name : 'chrome',path : '\\chrome'},
*/
    	],
    	//   在这里定义firefox的功能按钮, command就是一小段程序, 可以从firefox api, 小书签或鼠标手势中摘取;可选自定义图标;
    	//    同样, 建议先写完上面想要定义, 分类在子目录下的程序,  之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
    	configs : [
    		//常用功能
    		{
    			name : '打开文件',
    			subdir : '常用功能',
    			command : "BrowserOpenFileWindow();",
    			image : "chrome://browser/skin/places/query.png",
    		},
    		{
    			name : '隐私浏览',
    			subdir : '常用功能',
    			command : "OpenBrowserWindow({private: true});",
    			image : "chrome://browser/skin/Privacy-16.png",
    		},
    		{
    			name : 'separator',
    			subdir : '常用功能',
    		},
    		{
    			name : '代码速记',
    			subdir : '常用功能',
    			command : "Scratchpad.openScratchpad();",
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaElEQVR4XpVTTUhUURT+7n3vzYzjaBIqtTHIWgRFQhbZP22mVi3GhSXuwo0QISWSg/1Bs5xFVIsWQbMYCCR/RrMmy0IYiqRFENjYJnTUzIJSnMmZdzr3vpl0LIK+y/cu9xzud893z31iV+jxt+WfuYoVm0BEWAshAIM/liHn3aasNqVUsSKIbVeHKNl9Ev/C2McvaIm8jpZ5zDPWOhGpTlbon5jFADP2wZn7mAqe9h4cqq3Evea9p3+ks9GsbYOwCrNQtsc0YAhA8CAeOR13LCznbBzbXoVIy76ms9E37Eg0irwXk5kXkJAcVGFi2vnKWg9sRWVHL7K8zoQDWMnZASIDECgWcBsSQgs4sCUw9T2NcKBOswCtq7FOwGUYENoC9KxuPJ3NIbmwhAxbUNhZXcZxQELzTwtCJYQSk/C5TVR1D2k/qStOl0RHPzZ4LSxmiYUEhCiyIH5vLuPN5V2DGDvnx+Fbcfhc0hHg6WnrcfjvPiNpQpiGXBUo5U0Wi5S7DVgXB3C/5QguP5/SHXFbEkQAsZXO+CfcaWxAW0+CVBGo6Y6RwsP3KXoy+ZlwoZduvJilU9FJKrnUT6+mFmg4OUeDE7OkYHX26Vw4MU+brw8rEQ3dQkMtmNNLGXhdha7oHHP1eZdybnoxAwidczI2Ed+6jZdtB3F79C2XbaBp/2403BzT1lzqkjv60NxQB5/HQiTxDjPBE/VQ/8LfUBqM0fmRFHl5LsDbFaP2kRnadO0RAdhTE4pD7Ag+GF2xfEfVS1ND8HCxlxJTYs4W+kVuhA2Fr5C6famgv35LKD4OxzFqmRX4P4wjj18DkA9ZedxQgQAAAABJRU5ErkJggg==",
    		},
    		{
    			name : 'separator',
    			subdir : '常用功能',
    		},
    		{
    			name : '遥测数据',
    			subdir : '常用功能',
    			command : "getBrowser().selectedTab = getBrowser().addTab ('about:telemetry')",
    			image : "chrome://browser/skin/Geolocation-16.png",
    		},
    		{
    			name : '权限管理',
    			subdir : '常用功能',
    			command : "getBrowser().selectedTab = getBrowser().addTab ('about:permissions')",
    			image : "chrome://mozapps/skin/passwordmgr/key.png",

    		},
    		{
    			name : '故障排除',
    			subdir : '常用功能',
    			command : "getBrowser().selectedTab = getBrowser().addTab ('about:support')",
    			image : "chrome://global/skin/icons/error-16.png",

    		},
    		{
    			name : '安全模式',
    			subdir : '常用功能',
    			command : "safeModeRestart();",
    			image : "chrome://mozapps/skin/extensions/alerticon-warning.png",
    		},
    		{
    			name : 'separator',
    			subdir : '常用功能',
    		},
    		{
    			name : '帮助支持',
    			subdir : '常用功能',
    			command : "getBrowser().selectedTab = getBrowser().addTab ('http://support.mozilla.org/zh-CN/products/firefox')",
    			image : "chrome://global/skin/icons/information-16.png",
    		},
    		{
    			name : '关于火狐',
    			subdir : '常用功能',
    			command : "openAboutDialog();",
    			image : "chrome://branding/content/icon16.png",
    		},
    		{
    			name : '破解右键',
    			subdir : '扩展功能',
    			command :
    			function ()
    			{
    				gBrowser.loadURI("javascript:(function(){var%20doc=document;var%20bd=doc.body;bd.onselectstart=bd.oncopy=bd.onpaste=bd.onkeydown=bd.oncontextmenu=bd.onmousemove=bd.onselectstart=bd.ondragstart=doc.onselectstart=doc.oncopy=doc.onpaste=doc.onkeydown=doc.oncontextmenu=null;doc.onselectstart=doc.oncontextmenu=doc.onmousedown=doc.onkeydown=function%20(){return%20true;};with(document.wrappedJSObject||document){onmouseup=null;onmousedown=null;oncontextmenu=null;}var%20arAllElements=document.getElementsByTagName('*');for(var%20i=arAllElements.length-1;i&gt;=0;i--){var%20elmOne=arAllElements[i];with(elmOne.wrappedJSObject||elmOne){onmouseup=null;onmousedown=null;}}var%20head=document.getElementsByTagName('head')[0];if(head){var%20style=document.createElement('style');style.type='text/css';style.innerHTML=%22html,*{-moz-user-select:auto!important;}%22;head.appendChild(style);}void(0);})();")
    			},
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADXUlEQVQ4jW2Te0xTdxTHz723195721pKi7xu4bbcdtBWi3Wtijqr8TVwzOhQGYK6mVjnlk2WkaFEjQIZEvER4+YjbmSyxS0Dx8MxgYiDitIoYl1ggApxsqTs8ed0Lb+zPwybEL7J97/v93NOcnIApuikDEr/1oRVwY8d5Q/LXj7z4LDzs+4PzMUNWxJcAEBPzU9Sxxu6tYPF5r5QpUzGPonHUGn0c5fH4W+H4iM978X+ePH1ONu05a7sqMLHRTHhJ0VaHC2OwtEDCePDJUnPRvYm/jNaYiBPirT4uFCLg+9q/6zJSlgxqdy2WJ3zyKeJDPs0OLJbg8OFMeFja8y5voViom+BJH2aadp48y1DYGS3mjzcocZgvmasyivKAABQYQBN7wZhZDBPwKECFT7YrsZHOzWkOdtw1gugmBiyTQKuJVtXPZQvkF828qRxTXQtAADUO1X5fes50r+Bx4E8gQxsFnAgV8ChAoE0ro6eBNkjAt+Vpb7381oO777KPfsoXbRAy3yh+t4KJfa+xoWr3PHv316vDvWt47FvHY/9OTxpWKabBLnsnvlOcJUSe5expNJt3A5XPZz/TgaL7V7V7zl2mFHljPPcylSFgquVGFypxPtZSlKb8T/klCy4el5hx2/PZ/G0K6YMmuZy/kA6g20L+DE7wAwAgAq73tO5XAj1LGaxJ4PFu0tZcsmtPesFUJySWVfArRjvnsPgifTYcrhk4768kcZg5zxFeI8tyT6xaoVd77m+iAsFXArsdjIYmMeQGqfmwtc2obzLwaDfRpOSOclvw/EUVcFPaRTpsNF4xqE99+J5S616T4tLGbqRxmBnKo1+G0067DRpt9DY/BLz9M10swXyomHmd1bFr60yja02OnxU1u0CAGoCctCq91xxsKFrFhrbZBpbU2hsMVPkRKqu4b9cqaTd1GSmIs0mCpstdOS8zNccMWqW+GJh1sFEXvzcxH1xNYXCH0wUXpEo/MbE/rFttjX1xW2pMrOu+PtkKtyQTGGjRGGjCcYvS9Tf9SbqaZMEpD6JwnojkK8kxV87HaaV0/5DoRybfU5S9tcZgdQZKawVn7tOBPKtCJGjKVHtW+xW57TlCXkl4HZYxcx9FkPlYVl/8ZCsr/7QGrc/d7a8EACYqfl/ASscSowNpGaHAAAAAElFTkSuQmCC",
    		},
    		{
    			name : '下载视频',
    			subdir : '扩展功能',
    			command :
    			function ()
    			{
    				gBrowser.loadURI("javascript:if(typeof%20yXzyxe58==typeof%20alert)yXzyxe58();window.open('http://www.youtubexia.com/?url='%20+encodeURIComponent(document.location.href),'getA','toolbar=no,%20location=no,%20directories=no,%20status=no,%20menubar=no,%20scrollbars=yes,%20resizable=yes,%20copyhistory=yes,%20width=800,%20height=600');void(0);")
    			},
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADUElEQVQ4jSXMW09bBQDA8fM5TNh62tNzP225uAG938tCNhOCCj77oImvc4Dolokw67oMVkyhsCGXYZRyc4yBkA00U2fwY+iDGbABK7Q9fx/8fYCf0P1nN7HdBP7fkoR3Y6SfRUjtpIg/y5B6Gia2HSe9ESW6HSD2JE3ycYK2lQSJtSjdP3+AEN9N0LjchLluoG4o1D/2Ia8aKJs65rKKWfKilkzUkop3rhH5ewtz2sSa1oksphD8z+NY6wbWhoi5JmGsWsjrBo41J/KqibZooi3IGD+68c3UI80rmFMK3kmZSCmOEPs1hrbuxnrkwruqoy/7SC6l+OT5R/jmL+AuaZjzIuacG/NBA+4ZCc+kjDWmEZtPIGS2Q3h/sjBXLLRFD4mVdvaOXnDIP/Tt9GPNNeKadaFNe2m5H0eZ0nBNqsgFD/GZNoTUdgJlSUd5pJEsJfnr6AVV+5AKx+xzQt/WVXyTrYSLbfxysEtwyo+joKPlG8lMZhDiW21IKwrissjHux9yyN9UOeYNZ9RqcGK/ZGg7yx/7exyzz+XxFPqIgTfnJV2MIiQ3Y5g/6CgLBvUzTfRufsq+fYRtQ61SwbZtTjnhzD7jda3MlfFLmDkd/bZOy0QzQmArhuehhTWros0q1I/76Fm/xoF9SLViU+H/BLtKmde0T17GlVVwf+3EXwggpFcSaLMeXA9l5BkHxgMXDaMNDGze5NTe54wa1IAqlDnhSrEDaUDF/aVIaCSIkFmKYU1ZuKc1XN+pSGMm0cIlft/fo1w9BtuGM6BqU+YNncUupBsG52+6aB6JIARWwtQXDTxjGsqYxdv5IDsvn1K2X1GpVShzwJl9zCmHvOJf3pvoRPlMxfm5i2AujBBZSKAXDLSCgvKtGzWv0TTaQvBekujdNMHRDJl7HbQXOnmn2IWR9VLX76TuC5HWbAAhOpdCyZtoozLWXSdGzoH7joj4TR3Oobc4N3ge+bqMeF1C6lMR++uQekScvQ6igwGE5EwGzx0PRk5Hu63hvqUjDaiIAxKOIQfSjXNYvS5cfU6kHgXxWh3uqxLOPoXQV0GErtL7JCaihO+HaB4P4S/ECeXjhIaDBIYv0Dp8kWg2yMWcn5ZsBP+tZiKDYZoH/byb7+A/zBpdx7267WIAAAAASUVORK5CYII=",
    		},
    		{
    			name : '输出网页',
    			subdir : '扩展功能',
    			command :
    			function ()
    			{
    				gBrowser.loadURI("javascript:(function(){if(window['ppw']&amp;&amp;ppw['bookmarklet']){ppw.bookmarklet.toggle();}else{window._pwyl_home='http://www.printwhatyoulike.com/';window._pwyl_pro_id=null;window._pwyl_bmkl=document.createElement('script');window._pwyl_bmkl.setAttribute('type','text/javascript');window._pwyl_bmkl.setAttribute('src',window._pwyl_home+'static/compressed/pwyl_bookmarklet_10.js');window._pwyl_bmkl.setAttribute('pwyl','true');document.getElementsByTagName('head')[0].appendChild(window._pwyl_bmkl);}})();")
    			},
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABt0lEQVQ4jaWRwWsTYRDFf7tNrZjYVLNJl7RQotRrxTZBgqFiQy+tSPHuyb9AEE+SXgXxLCLEiwh6DRQlQhsIulBbqSkm2oDeCkpiEJFmv93xIF27blopPhj4eLw3b+Yb+E9ovcji8mVJjZiE9D6PEyB3+n5A7yMWn2RkdDjOqVHzwMxLZx56vtDu4/bjSRkY6GfEjNF1VMAmIqzWPvKl9c3H67sP5bgkEyexXUXXsQNVWX3Hy1dv2Wh84krBEN8ENx9NSKi/j3DkKLayA+lXzz7zrXrxhu410H+nOwweP4btKLo96m8s3/uhzd46Id4EynUIh49gO8H0a5lSz0u9uNPWYM8VHlRnRdf+aK9nn/uMa9WqjI2PE0skfHzP7ntRLpclMzXF02KRSCRCJpfDME0Gh4Y0b4X9cLdQkJ+dDh+2tnCUotlo8LnZZDKb9TSBBq9XVqReq7Gxvs6FmRm+bm9TXVqiXq8zbBhMpNNEo9H9G5yfntYArEpF3lgW7zc3+d5uk0wmyc/NoXZ26LRah/iDUknWLIuxVAojFkNcl/zCgufTDzID5OfntXPpNIl4HHHdf8kPj18pO7Iti9L4wwAAAABJRU5ErkJggg==",
    		},
    		{
    			name : '阅读助手',
    			subdir : '扩展功能',
    			command :
    			function ()
    			{
    				gBrowser.loadURI("javascript:(function(){readStyle='style-newspaper';readSize='size-large';readMargin='margin-wide';_readability_script=document.createElement('SCRIPT');_readability_script.type='text/javascript';_readability_script.src='http://lab.arc90.com/experiments/readability/js/readability.js?x='+(Math.random());document.getElementsByTagName('head')%5B0%5D.appendChild(_readability_script);_readability_css=document.createElement('LINK');_readability_css.rel='stylesheet';_readability_css.href='http://lab.arc90.com/experiments/readability/css/readability.css';_readability_css.type='text/css';_readability_css.media='screen';document.getElementsByTagName('head')%5B0%5D.appendChild(_readability_css);_readability_print_css=document.createElement('LINK');_readability_print_css.rel='stylesheet';_readability_print_css.href='http://lab.arc90.com/experiments/readability/css/readability-print.css';_readability_print_css.media='print';_readability_print_css.type='text/css';document.getElementsByTagName('head')%5B0%5D.appendChild(_readability_print_css);})();")
    			},
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACE0lEQVQ4jaWTv0sbYRjHP+97l8slNVASEiMBk7qJIC0ScMjg0KE4NUsNhA7+DcWhW5WC+B9oFodaxK2bQwcXoaSNVHAJCB0CWqiSQqVJLnf3vh3uYpNGpz7j8+PL83y/30e8B81/hKnuKQgpEVICoJVCq7s7xwAEgJR4SuGHQwZgSAlKja07voEQuEqRnJ8nUyqB1vw4PqZ9dkZECND6HgAhQAg8pXiyscHjtTUitg1Av9vldGuL0/V1TCkDkBBI1EISNeAAs9UqT/f20FqjfT9oMgyEEHysVGgeHBAdnApIBfQBO59nolBgZmUFrRS+694S6bsuWilmKhUeFArY+Tx9QAHyN5AqFinX67xoNHAdJ7jNsm4BTMsCrfE8j0qjQbleJ7mwQA8wO0Bybo7E5CQAsUyGm8tL3F6PztUVAPF0mohtE8tkiKdSEM60Tk4wnsGb62YTBeQWF/l1cUGn3SaRyzExNUU8nUYYBtfn5wgpSWSzfNrc5Ov2Nvg+4m3I5w3wcn+fbLGIGYnwcHp6RK6frRbKdfler/OuWiUREmn2CVwngS87O5RLJT6srmJGoyMAnuPwfHeXz7UaUko8AoeK16GMCrBiMR4tLdE8PMQdkkoBFjC7vMy3oyP63S5yYJ9XQ8+kQ0mjQgR/MHCdEGilcLTGGgIGMF1GwzAMXN+H0ETDYRoG3j95c6ztjsG/pfHaH8m8z1R4EJkJAAAAAElFTkSuQmCC",
    		},

    		// 建议把要放在子目录下的功能按钮,定义在上面, 下面的定义放在主菜单下的最常用的功能按钮,
    		{
    			name : 'separator'
    		},
    		{
    			name : '书签管理',
    			command : "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');",
    			image : "chrome://browser/skin/places/allBookmarks.png"
    		},
    		{
    			name : '历史记录',
    			command : "PlacesCommandHook.showPlacesOrganizer('History');",
    			image : "chrome://browser/content/abouthome/history.png"
    		},
    		{
    			name : '下载管理',
    			command : "BrowserDownloadsUI();",
    			image : "chrome://browser/skin/places/downloads.png"
    		},
    		{
    			name : '附加组件',
    			command : "getBrowser().selectedTab = getBrowser().addTab ('about:addons')",
    			image : "chrome://mozapps/skin/extensions/category-extensions.png"
    		},
    		{
    			name : 'separator'
    		},
    		{
    			name : '选项设置',
    			command : "openPreferences();",
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADE0lEQVQ4jaXMTUhqaQDG8RfufmZ2bYpDSYkfCzlConCyz4XaIUQPBKVtMsjVDEjQIsl4tbA61GRGC4PatIo+IMvoSOmx9JxFQYtcFCG0nbu9cN/0mUXM4sJlYJgH/ruHHyGEEEmSviwuLv7yX5Ik6QshhJBIJGI5OjrSVVX9WqlU/lJV9eu/9c/n+PhYj0QiFiKK4lq9Xsfa2hoSiQQopaCUYnl5GclkEpRSpFIppFIpUEqRSCSwurqKer0OURTXSDAYlHVdb5pMpu+dnZ0tk8nU6u7ubrW1tbU4jmtxHNdqb29vdXR0tCwWS6urq6tlMpm+a5rWDAaDMgkEArKu63C73WxoaAgOhwOCIIBSitnZWWxubmJqagozMzOwWCwYGBhAf38/0zQNgUBAJn6/X9Y0DYODg8xut2N+fh5LS0t4enrCw8MDKpUKyuUy0uk0KKXweDzo6+tjuq7/CLjdbuZyuZBIJPDx8YGXlxdks1nEYjHs7+/j7e0Nl5eX4Hkevb29rFarwe/3y2RsbEzWdR08z7OFhQU8Pj7i+fkZk5OT4DgORqMRVqsVlFJkMhns7OwgHo+zUqn0CYiiKN/f38PlcrHp6WlomoatrS1wHIdcLgdN0zAyMgJZlvH6+or393ecnJywWq0GURQ/gUqlAqfTydbX13F7e4tYLIaenh5omoZGo4F4PI5yuYxms4m9vT2Mj4+zarUKn88nE5/PJ9/d3cHhcLCJiQmoqorDw0MYjUZIkoRoNIq5uTk0Gg3kcjkIgoBwOMxKpdIn4PV610ulEmw2GwuFQkgmk6hWq9jd3YXT6YTBYMDKygpubm4QDochSRJOT0+Zoijwer3rxOPx/KmqanN4ePibwWBgoVCIbWxssIODA3Z2dsZkWWbRaJTJsszS6TRzuVzMarV+U1W1OTo6ukkEQfg9n8+jUCigUCigWCzi/Pwc+XweiqLg+voaiqLg6uoKxWIRiqLg4uIC+XwegiD8QQghv5rN5pjdbs/yPJ+x2WzbPM9v8zy/bbPZflbGbrdnzWZzjBDyG/m/+xsCyiIj0Yng5AAAAABJRU5ErkJggg=="
    		},
    		{
    			name : '参数设置',
    			command : "getBrowser().selectedTab = getBrowser().addTab ('about:config')",
    			image : "chrome://browser/content/abouthome/settings.png"
    		},
    		{
    			name : '清理痕迹',
    			command : "Cc['@mozilla.org/browser/browserglue;1'].getService(Ci.nsIBrowserGlue).sanitize(window);",
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAACjUlEQVQ4y32TS0iUURTH/+d83/jNjGMjEaJZPnqalQZOD1GMTIogRSqEQmhXKxduXCRCFKYQ2LrCTZIFQZQiBkERYUnmYzCLLB2dYZwpJ2byMY8+594Wzsio2X9zz338f5xz77nAGsnxzQ1B1+XDPr9sO1leUVt7tWpvc//2tq6xekdInyvH/zTy9tp5MQKpf82W3Z3lsmB/qWzurZZ37ZekPi/lm4+T7Q333u9M9FA86Bn41VnATy8Kax7Ss0tFyFXF4ehZ4bcWsdMzIDShcX7GBdgH3yGce7qmMp+eAACvpC4jx6RpD9w/VIyNDvNn901Ut97nfcdt6H7dwy9GGvDwZRYyMtMw9TNii/vUeHCrV3GcsxXmFmeHEf3jE+Gok48UZYmyo/lcueuKMG/J446uJtGnl3Df4sDEOkCqRZn+5AxhIZKMtJQc/uJIhme2kSdcXtzpGGI93A8DZ/GpsiZcLzlw6HHMt1KCynAoTDAwQ1VYECQCwZD4HQojKnShGjVYrJpwhE7AHqgxPWpF6ipAdMHtADEACQnJzAQiMAEgVhjE4CQLa4YonPOF9Wdshh2rALrfOQligAApIWLLsZEEiMCqSViMhBt1jYHUCn1oFWDONzWpKhx7ETBRYokxMhEbVAok9sEKoP9BnZcVBiQgAMEUz0ACRAIAJAgq8/Q/AQDAnDQDAqQA03KPxfaXyUQCRk1zbAiIBP3jRAwpIYgT7wBCSiDJYEDQM7oxYPBZy7BpkxnEChMBMl47wIrCyNmWDvvzlm+JHiVx4v3+oX/O583dfbA4j7UUnvHNYyEYgsqEdHMg6H7V0j47PXYbgL7uM61RpqYZC83WtK1CLMlF/4xrKYpRAJ61B/8CuYEC8ekMENAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTAtMDItMTBUMDU6MzY6MjctMDY6MDB0CLIaAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDA4LTExLTAyVDE2OjUxOjU5LTA2OjAwkQS7ewAAAABJRU5ErkJggg=="
    		},
    		{
    			name : '重启火狐',
    			command : "Application.restart();",
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMOSURBVDhPhZNrSJNRGMefudUG5S0T1AINLMtL2IyEEEy/BUH0xbsoliQYBBl9CqMSS9ShUkIg+qkLMWgWZEQUVop+COfKS0PndJtus225uzn995x5o0+98Oe855zn+T3n/N/nJX4k9yIjHzw7cCDwJi4OmoMHoYmPD4/qmBioo6PxKjYWGtYrfu+PjMTL/fvRolC8vkR0mFKIkgdyc50rnZ1Y7ujAr0eP4Ozqgr2vD0atFnM/f8Lc2wtrQwMs167BdPkyLGVlGFIqN24RldFpolNfjx2D7epVmGpqsFBfj9nWVhhbWuAyGuH1+bDAcP3t25iprMRsfj6M585Bf/QomolukJIoZ5An1upqGGtrYejvxwJXne/uhsdgwCoDTHyq+eFhzA0NQc/V5/LyMM0593cAKSmwFBfD0NMDVzAIr9MJk0oFNwOCfj/mm5rgGB2FD4BBo8FURgZ+sD87gE9JSVioq4OdEzY4yKFWY6a8HB6bDWs81xcVwVBSgnWGrwQCmLxwAWNEu4CP7Li5uRn+tTUELBZMZWdDy24vPnkCx9u3+MEVRYJrYAAhBs63tUG7DchlwAeFAhYGiGrOz5+hjYoKJ2hlsrDEu5CpvR3rHGN9/hxaiWQX8I43jVVVYYCLDdQlJ28CthLDIydYXrwIAxYfP/73BO95MpOeDj/fOcgB+sZG6CIi8J3XhXSsiYsX8Xt5efMK/DnF2q4HTDew7Pz9hYlOlwv6hw8xWViIybNnMX39Oqx8MlF9ZXAQs+zZ1PYVBOALt+aSVAojt6t765gels1qxZLZDFcoFL5eYGwMZqUSJq5u4La+KwCZRKdHEhKwwtQl3rCxgW5u2z/cOCGHAyG3G2sTE/Bym9u5eUSMUy7HIvt0h+gm7SPKfJmY6AqcOQN/Vha8x4/Dk5oKX0EBAqWlCFZUwH/+PDzskZcBPo5ZzcnBSFoayolqxN8YXySRPGiWy791KhQ6lUIxrtq7d1xFFFb71qiSSsfFXsdmjPaKTPb0CNFJAdgjIKwTLLGQ9R+JGL45HSIi+V83JDdbDODDxQAAAABJRU5ErkJggg=="
    		},
    		{
    			name : 'separator'
    		},
    		{
    			name : '错误控制',
    			command : "toJavaScriptConsole();",
    			image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADbklEQVQ4jZXUS09TCRTA8UPShMBi1i7mQ7hhNcQMPmaiqVFDDDHER4ghWmxa+6BXevuilIulra0tfV36flFoeYmYGF3wCQQLOt+AGb/EfxaC3erivzy/5CzOEREZmLHYjLZZ5dTmesEvNauczlhsRhEZEBExWByzp7tv3/HpqMfh52MOeyccHX+hd/KV3sk/Z33l6PgLh70TDj8f8+mox+7bd1gcs6ciYhARGTTbHXw8OKCx3qXV2aS9uc3G9i6dnTd0d/fo7u7R2XnDxvYu7c1tWp1NGutdPh4cYLY7EJFBEZEhk/U5++8/UG60qLba1Nc7NDe+o2vdLda6W7Q6mzQ3utTXO1RbbcqNFvvvP2CyPkdEhkREhqdnzGzt7ZMtVdCrdYr1JqVGi0qrTXVtneraOpVWm1KjRbHeRK/WyZYqbO3tMz1jRkSGRUSGp56YaG/tkMjqpPQimUKZXKlKvlxDr9TRK3Xy5Rq5UpVMoUxKL5LI6rS3dph6YupDDx9PU2tvEI6niKUyxNM5ElmdZG6VVL5AKl8gmVslkdWJp3PEUhnC8RS19gYPH0/3oclHU5TqTRbCMbRYgnA8SeT1CtFkmlgqQyyVIZpME3m9QjieRIslWAjHKNWbTD6a6kMT9x+wUqqgLmj4tWWC4SihyCsWo3G0WAItlmAxGicUeUUwHMWvLaMuaKyUKkzcf9CHxu9NEknrOD0B5gIh1KCGN/QSv7ZMYClCYCmCX1vGG3qJGtSYC4RwegJE0jrj9yb70O27EyzG01gVFYfqx+UL8iIQwh3UUBeWUBeWcAc1XgRCuHxBHKofq6KyGE9z++5EHzLeGWd+OcEzh4JVUbG7fTg9gR/gOeD0BLC7fVgVlWcOhfnlBMY7433o+s1b+JeiPLXYMTsUrC439jkvTtXHrMfPrMePU/Vhn/NidbkxOxSeWuz4l6Jcv3mrD129YWQ+Esdkc2J2KlgVN3a3B6fqw+UN4PIGvkNuD1bFjdmpYLI5mY/EuXrD+AMaunTtr//m/EGS+QLpfIHsaolcsYJerlGo1ClU6ujlGrlihexqiXS+QDJfYM4f5NK1v7+dn8jgxZGRydE/x76Njl1hdOzyT3aFP8Yu/3txZGTy/GgNIvKbiFwQkd9/sQtnswY5e0qGM3XobN+faehsxiAiA/8DDnCW2sYeE5QAAAAASUVORK5CYII="
    		},
    	],
    },

	subdirPopupHash : [],
	subdirMenuHash : [],
	unescapeHTML : function (input) {
		return input.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '\"')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&apos;/g, '\'');
	},
	init : function () {
		this.handleRelativePath(this.toolbar.apps);
		document.insertBefore(document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(
			'\
			#appmenuPrimaryPane,\
			#appmenuSecondaryPane\{display: none !important;}\
			') + '"'), document.documentElement);
		var ExternalAppPopup = document.getElementById('appmenu-popup');
		for (var i = 0; i < this.toolbar.subdirs.length; i++) {
			if (this.toolbar.subdirs[i].name == 'separator') {
				ExternalAppPopup.appendChild(document.createElement('menuseparator'));
			} else {
				var subDirItem = ExternalAppPopup.appendChild(document.createElement('menu'));
				var subDirItemPopup = subDirItem.appendChild(document.createElement('menupopup'));
				subDirItem.setAttribute('class', 'menu-iconic');
				subDirItem.setAttribute('label', this.toolbar.subdirs[i].name);
				subDirItem.setAttribute('image', this.toolbar.subdirs[i].image);
				gCustomAppMenu.subdirPopupHash[this.toolbar.subdirs[i].name] = subDirItemPopup;
				gCustomAppMenu.subdirMenuHash[this.toolbar.subdirs[i].name] = subDirItem;
			}
		}

		for (var i = 0; i < this.toolbar.configs.length; i++) {
			var configItems;
			if (this.toolbar.configs[i].name == 'separator') {
				configItems = document.createElement('menuseparator');
			} else {
				configItems = ExternalAppPopup.appendChild(document.createElement('menuitem'));
				configItems.setAttribute('class', 'menuitem-iconic');
				configItems.setAttribute('label', this.toolbar.configs[i].name);
				configItems.setAttribute('image', this.toolbar.configs[i].image);
				if (typeof this.toolbar.configs[i].command == 'function') {
					configItems.setAttribute('oncommand', this.unescapeHTML(this.toolbar.configs[i].command.toSource()) + '.call(this, event);');
				} else {
					configItems.setAttribute('oncommand', this.toolbar.configs[i].command);
				}
				configItems.setAttribute('tooltiptext', this.toolbar.configs[i].name);
			}
			if (this.toolbar.configs[i].subdir && gCustomAppMenu.subdirPopupHash[this.toolbar.configs[i].subdir])
				gCustomAppMenu.subdirPopupHash[this.toolbar.configs[i].subdir].appendChild(configItems);
			else
				ExternalAppPopup.appendChild(configItems);
		}

		for (var i = 0; i < this.toolbar.apps.length; i++) {
			var appsItems;
			if (this.toolbar.apps[i].name == 'separator') {
				appsItems = document.createElement('menuseparator');
			} else {
				appsItems = document.createElement('menuitem');
				appsItems.setAttribute('class', 'menuitem-iconic');
				appsItems.setAttribute('label', this.toolbar.apps[i].name);
				appsItems.setAttribute('image', 'moz-icon:file://' + this.toolbar.apps[i].path + '?size=16;');
				appsItems.setAttribute('oncommand', "gCustomAppMenu.exec(this.path, this.args);");
				appsItems.setAttribute('tooltiptext', this.toolbar.apps[i].name);
				appsItems.path = this.toolbar.apps[i].path;
				appsItems.args = this.toolbar.apps[i].args;
			}
			if (this.toolbar.apps[i].subdir && gCustomAppMenu.subdirPopupHash[this.toolbar.apps[i].subdir])
				gCustomAppMenu.subdirPopupHash[this.toolbar.apps[i].subdir].appendChild(appsItems);
			else
				ExternalAppPopup.appendChild(appsItems);
		}

		if (this.autohideEmptySubDirs) {
			for (let[name, popup]in Iterator(gCustomAppMenu.subdirPopupHash)) {
				if (popup.hasChildNodes()) {
					continue;
				} else {
					gCustomAppMenu.subdirMenuHash[name].setAttribute("hidden", "true");
				}
			}
		}

		if (this.moveSubDirstoBottom) {
			let i = ExternalAppPopup.childNodes.length;
			while (ExternalAppPopup.firstChild.getAttribute('class') != 'menuitem-iconic' && i-- != 0) {
				ExternalAppPopup.appendChild(ExternalAppPopup.firstChild);
			}
		}
	},

	handleRelativePath : function (apps) {
		for (var i = 0; i < apps.length; i++) {
			if (apps[i].path) {
				apps[i].path = apps[i].path.replace(/\//g, '\\').toLocaleLowerCase();
				var ffdir = Components.classes['@mozilla.org/file/directory_service;1'].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile).path;
				if (/^(\\)/.test(apps[i].path)) {
					apps[i].path = ffdir + apps[i].path;
				}
			}
		}
	},

	exec : function (path, args) {
		args = args || [];
		var args_t = args.slice(0);
		for (var i = 0; i < args_t.length; i++) {
			args_t[i] = args_t[i].replace(/%u/g, gBrowser.currentURI.spec);
		}

		var file = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
		file.initWithPath(path);
		if (!file.exists()) {
			Cu.reportError('File Not Found: ' + path);
			return;
		}

		if (!file.isExecutable()) {
			file.launch();
		} else {
			var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);
			process.init(file);
			process.run(false, args_t, args_t.length);
		}
	},
	};
	gCustomAppMenu.init();

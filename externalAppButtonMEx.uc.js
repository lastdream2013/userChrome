// ==UserScript==
// @name           externalAppButtonMEx.uc.js
// @namespace      ithinc#mozine.cn
// @description    External Applications button Ex 
// @include        main
// @author         ithinc &  lastdream2013
// @charset        UTF-8
// @version        20130511.1.1.6 tidy and merge moveable code 
// @version        20130504.1.1.3 delay load exefile, may speedup firefox startup  
// @version        20130414.1.1.0 support submenu
// @version        20130402.1.0.1 start modified by lastdream2013, add app menu
// @version        20091216.1.0.0 Final release
// @version        20091215.0.0.2 Handle toolbar apps and menu apps separately
// @version        20091212.0.0.1 Initial release
// ==/UserScript==

var gExternalAppbuttonMEx = {
	autohideEmptySubDirs: true,  //自动隐藏没有一个子项目的子目录菜单
	moveSubDirstoBottom: false,  //把主菜单下的子目录移动到最下面
	moveablePositonOrInsertafter: true, //true : ToolbarPalette moveable button  false: insert appbutton in "insertafter" 
	insertafter : 'urlbar-icons', // useless if moveablePositonOrInsertafter is true;  urlbar-icons addon-bar TabsToolbar alltabs-button
	toolbar :
	{
		//在这里定义好主菜单下子目录的名字,以及图标(可定义或留空,好图标不好找....)； 可在中间加{name: 'separator'}建立一个目录与目录之间的分隔线
		subdirs : [
			{
				name : 'windows工具',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADvUlEQVQ4jZXUX0wUBBzA8R+JY4czRxzcGWqZD5SgIgoJd0doSoaMKwSXYIqYhAP/gWPDdGlPbllYE9haohAC4/gXjoADNVI4FQyUvxegEHZ3HCogKYvavj2E3ms8fB9/n+338PuJiDh5RedGLNleYF0SW8is2l5g9YrOjRARJxER50XbLlhjztzlQLGVgyU2kossJBdZSCmxkmKwklJqJbVyhMNlNg6V2jhYYuNAsZWYM3dZtO2CVUScRURcvLaeI/L0ACvSe/BJ6yQ1b5CO358y9vQfuv94RnrRMKs+68HveC9+x8yszOhlRXoPkacH8Np6DhFxERFRLNRnE/6FGZ+DHXgnt9LSN4FtfBrL+DQjE9N8ZxwmLf8eG0528dahO7y5vx3flHbCjvewUJ+NiChERFzV4Zm8d6wD78Tb6FJbePBwmiH7XwyN/tfOL2/Rfu8JoxN/0/rbE0w9E1xpf8z6I7dRh2ciIq4iIq6em06xKb2NN+KukZbTyZ17k5i6H9M7/JS7g5NsTLtMn2UK84Nn9FumGLBO8fm5LkL2N+G56ZQDUoaeYP2BW7wec5WVH9fzmr6EZVHF+O0oZX/mTQ5900L7wKSj/knWJxnRJV1DGXrCAblpMwjdZ2JxRC25l+5jHppkaGSKmhtWQj6tQ3/kKlXXLdzoHqe5Y4yvL3bhtbmcd5KacNNmOKAFgYfR7LpK6J4GWrrG+aX9EY1tjzB1jrE5uYGjWW0s1xezPPIiyzbn4as38OrGSnQJjSwIPOyA5q/eR0BMDemnW6m/YX/Rjz9beD+pjtbuccxDf/Jr7xi9g5PszLiOKqSS4B1XmL96nwOa55tAwAdV5Ff0UVDVT0nNfYzNdk6evU3GVzcxmuwYm+3Um+zUNdnwDjOg0pQT/FE983wTHJDCO5Y1kRWoAr/HbVUWr/idJXS7gbBdlZTWDtLY8pDGFjuNt+zklppxX5OHR1AZ66JrUXjHOiCXpVEEfHgJ9zWFKAMK8QgsQrn2B9z9z5N49AoVxvuY2kYprDKj31uFu38+ygADgVHVuCyNckBzF0ewLroazyADKk0ZKl05al05Kp0Bj7fPo1ybjbv/t7j7Z6EMzEUVXIJnkIF10dXMXRzxAlLMUb874rMlB028Ec1uI9qEBrSfXEab2IB2bz2aPbUEJVQTHP8TmvhaNLvr0MQb8dmSwxz1BvvzE3ERN/84Jw+t/SWljtnk5KG1iZt/3POjdRaRl0VELSKLZpl6ZtZZZp6S84yqmNn3/6SYmXEWEad/AVgWg/PjJEAaAAAAAElFTkSuQmCC"
			},
			{
				name : '常用工具',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADmklEQVQ4jZXUyU8TaBiA8ZeEhMBhjsZEQqCUsohhXwREoKVDpAlBR1oBkSWyVDA2CJQCLYRAo0ABURCQJSJrtYAKKmLgIi6cTQyiXnSYIRP/hWcO4MhlEj08t/f9Jd/h/URE3BQF9TplsW0noKSZX0lZbNtRFNTrRMRNRMRdWWTbKZhew/xyi/pXWzS+/oD1zTbNb7dp2fxEy+Ynmt9uY32zTePrD9S/2sL8couC6TWURbYdEXEXEfEIKLSiX9hEc/MZ2v4VMgZXOTX8gsyRNXSj6+hG18kcWePU8AsyBlfR9q+gufkM/cImAYVWRMRDRMRTeaGJrOkNUjuXUDuWSe99irZvhYxbz8no3+/Wc7R9K6T3PkXtWCa1c4ms6Q2UF5oQEU8RES9lfgOZY+skt7pIsS+Sdv0R6o7HaLqWSO9eJr17GU3XEuqOx6Rdf0SKfZHkVheZY+so8xsQES8RES//3Aa0faskWGZJst7nRIuL5NZ5TrYtkNK+SEr7IifbFkhunedEi4sk630SLLNo+1bxzz0AKQwWUu1PiDVNEF87RYJ5hkTLLImNcyQ1OUlqcpLYOEeiZZYE8wzxtVPEmiZItT9BYbAcgHLqSbI9JNI4QvTlcWJMd4mtniD26j3iaiaJq5kk9uo9YqsniDHdJfryOJHGEZJsD1Hk1P+A/M7WEV/nIqxkgIiyISIrRoi6NEpU5RjRVeNEV40TVTlG1KVRIitGiCgbIqxkgPg6F35n6w5AZ2qJMc0RqO8iOK+HkPM3CLs4RFjpMOFldwgvu0NY6TBhF4cIOX+D4LweAvVdxJjm8DtT+wPyza4hwjiDKrud7S//oNJ3EVo4QGjRbY4VD3KseJDQotuEFg6g0nftzWS3E2GcwTe75gCUVUN46RT+OhvvPu+iOm0nMMdBoKGboHO9BJ3rJdDQTWCOA9VpO+8+7+KvsxFeOoVv1gHIR1dNePkkCp2V5Y33fPz6jY9//k9fv7G88R6Fzkp4+SQ+uuoDUOYVjpudBBmuofqjmaAcG8GGVkJy2zia387R/HZCctsINrQSlGPbmzFc47jZiU/mlf8gT29t5d9x5lHSOhdRd7hI63CicTwgvceFtncebe886T0uNI4HpHU492Y6F4kzj+L9e9Xu9xPxOBSvzzuiMe56a4x4ayp+MiNH1OV/HYrX530/WncR+U1EDouI9y92eH/XXfY/Jfd91XP/vT+T5/6Ou4i4/QuMxVcZdYKnaAAAAABJRU5ErkJggg=="
			},
			{
				name : '网络工具',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADsklEQVQ4jZXUS0wTBhjA8Y+ExMDBZCMqpS2FMh6lUmBTD0v0uMWMg8linMEHIYsHl7BEE2JQeT/EAWGkqQalSDoq70ehvNfW1gryfgghZTOByVqBhW0xGnf57zBcd5yH//H7Jd/h+0REQoyFyoy75Rp/fYWG9+luucZvLFRmiEiIiEioqTjaP+s8iX/1HP7V8wR8Fwn4sni5ls3Ln77+p7VsAr4sAr6L+FfP4189x6zzJKbiaL+IhIqI7DMVqXk+cZwFeyqLg2ksDX/Ms5FPWB49wvLoEZYG01kYSGPensriUDqLg2ks2FN5PnEcU5EaEdknIhJmzFfj8xxjtieFOZuBhf5UFuxpLA6mM9NrYHPFxF9vtnmxbGSqS8+czcBsTwo+zzGM+WpEJExEJLw2T8WK4yhT7XqmOw8z221grtfAnC2V8VY9b1/7efvaz5tXv+Bt1jHdeZipdj0rjqPU5qkQkXARkfDqXCVLI+mMW3U8bU1msl3PVMdhxlt0OJsSWXpcwh/b8yy6S3A0JvC0NZlxq46lkXSqc5VB6PaVKObtBjwPEvBaknjSnMS4VcejBzp+D0zyuCuT1pp4bMZ4frz3EV5LEp4HCczbDdy+EhWEKnIUzHTrcdXH4W6Ix9OYgLshHmfTp/y5vcirXR9b6y52A9OMmLS4G+Jx1ccx062nIkcRhEovK5jsSGTMGIvjjhZXfRxjplgmurLY3fSyNn2fCVsO7odfMlCrwXFHy5gxlsmOREov/wcqvhTJxMMEhms0jNbFMGaMpb9azeqTOnbWXfzqs9PxXQqdt9QMfR/DaF0MwzUaJh4mUHwpMggVZB/Ca4mjv1LNUHU0fbdUOO5/xs6GmwVHJZurPawvdWCr1DBQFc1QdTT9lWq8ljgKsg8FoRsXDuJp0tJXpqK3VInX+hW/vZjk5xkL5rwYeo2fs7PhZcVTja1cycBtNX1lKjxNWm5cOBiErp09gNscQ3exktbrCjae9bHsMdFcpKf5ZhRNeQo8bTlsLPfTlq/AVqaiu1iJ2xzDtbMHgtDV0xE4zVq6SpS03FRgzlVwL1eBtVBJb5WGzspoGq9HYb6moKUgip4yFV0lSpxmLVdPR/wLhX17KuJlW1Us7mYdrh+ScFiScFp0eFqSedKewuO2FFzWZJwWHY+sOtzWJNzNOtqqYsk5FbH17kT2nTmxP/ObLz7YupzxIe9Z4MyJ/ZnvjjZURPaLSKSIqN6zyL3ZUNl7SqF7atjevv+nsL2ZUBEJ+Rs6+oxWuBqWjQAAAABJRU5ErkJggg=="
			},
			{
				name : '编辑工具',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADt0lEQVQ4jZXUT0wTBhTH8UdCQvCwxAtD4x8UCypVxIAoilhEMiOJBxKjAQIiBmVIGbbUxtqOyIrWIRTRWFAobeWfUiilojCULR4Gjj+ZqCAXQwygmBg1nr87gOtVD7/Te++TvMN7IiIBCrU+LVJjmovUlPF9Mc0p1Po0EQkQEQmMKDHNZXYPoBmdRDs2xbnxV+jHp9GOTlI6NkXp2BTa0Un049OcG3+FdmwKzegkmd0DRJSY5kQkUEQkSFFsJL1/CJWrl+TmB6S09qFy+Cj942/efPrCm09f0A0MoXL4SGntI7n5ASpXL+n9QyiKjYhIkIhI8IYzBg71PCHxtockuxeVw0divZuZj5853uLjeIuPmY+fSax3o3L4SLJ7Sbzt4VDPEzacMSAiwSIiy8IL9KR2PCLhxj322NzsvdXFTusdJubfk+P0kOP0MPH2PTutd9h7q4s9NjcJN+6R2vGI8AI9IrJMRGTZ+nwdyS19xF9tZpe1jYTau8RZGsl3eZle+MD0wgdOubzEWRpJqL3LLmsb8VebSW7pY32+zg+ty9OSZO8hpqyeHZcdxP/uIt7iYJuxlgrvIBXeQbYZa4m3LNZ2XHYQU1ZPkr2HdXlaPxSWe5Y4aysFDV62X7hJtNFGrLmRrYbrVHQ/pqL7MVsN14k1NxJttLH9wk0KGrzEWVsJyz3rh9ZmFxNjdvJydoGR17OkXmoi2mQjSlfDRfcAF90DROlqiDbZSL3UxMjrWV7OLhBjdrI2u9gPrcksQnm+DufgMO6hf9mstqDUXWNjSSWm9oeY2h+ysaQSpe4ayl+u0P3Pc5yDwyjP17Ems8gPrT5WyGZ9HWEZGn5rv091z19Eqq8QobZgbO3F2NpLhNpCpPoK1p4/KW+7T1iGhs36OlYfK/RDq44UoDQ2EZ5rZGOeAdfgUzqHJjha6aCio5+Kjn6OVjrwDD/HNfiUTScvEJ5rRGlsYtWRAj+0Mj2fLWUOFKfNhJ80oThhILfGiW/kBc9m5nk2M49v5AW5NU4UJwyLPafNbClzsDI93w+tOJxHXFUbUZpqokqrUWqr2FRkJrKwnMiff11MYTmbiswotVVElVYTpakmrqqNFYfz/oeCf0zLfhtrtrHP7kFl97C/yUOKvYuUxk4ONHRwoKGDlMZOUuxd7G9a7Nln9xBrthF6KOfd1xMJWr47LSPkp6x3IQezCDmY+Y3JIuRg5vzy3WkZX482UER+EJFQEVn1nQldmg2UpacUuKQGL+37LQlemgkUkYD/AEq2dU4D+CN7AAAAAElFTkSuQmCC"
			},
			{
				name : '图像影音',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADm0lEQVQ4jZXU3U8TVhiA8ZekicGLJSaTcCFqzNA4EzXGkKhZGiLq6gcyFOlkWFtcaKmytVhXAlTLR1kjgwY/Kh91VRxi3Yg4Nxt1mMxNGStYKYNSKiJTUcRtZn/AswvqmixezItfck5yzpOci/eIiCRs3qPfmqktntyu+4Q3kaktnty8R79VRBJERBRbNMZJ9/ku/HeC+HuCXPvlHjd6B/ghEKI7MMiN3gH8PXe5ersf/527+HuC+O8EcZ/vYovGOCkiChGRWao8PZ7L3djc7dibO6hu9eE4/TWfe7/B4fHxxdlO+oai9A1FKT/Rhr25A5u7Hc/lblR5ekRklohI4kb1Php9V7G6zlB2rA3bya+wu89T1dRBWeMZBkfHefHyb+pOX6TU9SVlx9qwus7Q6LvKRvU+RCRRRGR2eraG2rZLmJxNWOpasdS1UnK0eWZ9tJlbgQGqj3vZX+nCVOvm4NEWTM4matsukZ6tQURmi4jMVmbuxt7iw2hvxFDRwBGXl5s9QX4KhKj3XOBIg4fvum8TGAjTcaUbQ3k9Rnsj9hYfyszd8dBa1U5KXefQHnRgdZ7i0dPnPHk2zeNn0zz/4y+m/3zJk6kXPHo6xeOpaWz1HnSWWkpd51ir2hkPpWVsx+zwoi4q58atXiJjvzNyf4LIgwkiDx7FTDByf4LW9kvkGsrQmKoxO7ykZWyPh1YpVRhsJ8nUmrk3NEpoOEooPPZalfUt7Nj3GblFFRhsJ1mlVMVDy9dloLM28P7u/fwcCNEXGqE/FKF/8D9CETq6rrFtr5kPCg6hszawfF1GPLQ0TUm+2cmGnELO+q7QGxwiMBB+rVD4Pk1tnWxSG8k3O1mapoyHUleuIfdADet3FGKwVNM/OMLd3yIx0ZiZff/gCBe/vU569sfkHqghdeWaeGjhstXkFNnZsEvPe9s0tHd+z3B0nOHoQ8Ixw9GHDEfHCYWj7CooIT27gJwiOwuXrY6HUpasQF1cxaYPjazPKUSVW8iV6z8yNDqG90IXDafOcvP2r4TCUcwVTpRZWjaqi1AXV5GyZMW/ocTkRe8+y9JZ0B8+gcF2Ap21jnxTFR+ZKtlrqUF7yEG+qZK8T4+wp8SBvuIY+sPHydJZSF60dOrViMyak7QgLykldWru/MXMTZnx9rzU15o7L3XmzPzFJM1/5+mcpAV5r4ZWISJviUiyiMx7Q8mxuwqJfUqKWDUx9t7/IzF2RyEiCf8AaBijWJqLC6wAAAAASUVORK5CYII="
			},
			{
				name : 'separator'
			},
			{
				name : '常用目录',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACEElEQVQ4jd3SvWtTURzG8Q7ubv4BCi5tVUgTEB0FcXIRXXwDEdR2kCqFimALNhHEQmkUBbEUtUOpdSgOTmIFX9Lapk1sbm7TmLQ2NMHm5r7f3JfzdbA2wcFFJx944PyWzzkHfi0t/0eyU6FkYfqsW3x3vqnnXPnV4ZWFyT27Zsd37/y9b/padmwD8lTYESIABAgBW2fPrrD2obO++r7T+dX12V57PXG9KL3cf7IBTHbUhG/jfBvEzA9hFkawihMIT0EEBsLXEb76c/aqELh1eTKcbnxhPKIFroqZj2PkhtG+9LOZuEJlpgslNYCy2IeSvEF1vofqfDeeXSb7IqQ3AR2uZ22gpONU5+5QfnsNq/wJ4Wtbt2sIv9Z4AQJ5PGI3gOcRFwQEDgQW+CbC1/EtCacUx14bwPrag7l8CUM6jW9kkJ+Gm4DRcF34Fr72EU95jft9gvrGY+y1u1iFm1i5LszsGYyl4+ipI/h6EnmkCZAfhZ3A1XA3p6iXn+GU7mOvDmDlezCXL2JkTqGnj6EtHEKdO4CnzSI/bAbiYVu4CvXyKM76EHaxHyvfjSlfwMicQE8dRUseRP28j9rMXjwtgRxvAqTBUMlVcjVjZSwwlp+gyw/QpUH0TBQtfQst1Yu62I2a7EKdv4xTmRbZe6HaNrB0u/VqJtY+JkXbK1Kszf5jo222FGtTM9HW4b/Z/n+XHynp6NSPz0b4AAAAAElFTkSuQmCC"
			},
			{
				name : 'firefox目录',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACEElEQVQ4jd3SvWtTURzG8Q7ubv4BCi5tVUgTEB0FcXIRXXwDEdR2kCqFimALNhHEQmkUBbEUtUOpdSgOTmIFX9Lapk1sbm7TmLQ2NMHm5r7f3JfzdbA2wcFFJx944PyWzzkHfi0t/0eyU6FkYfqsW3x3vqnnXPnV4ZWFyT27Zsd37/y9b/padmwD8lTYESIABAgBW2fPrrD2obO++r7T+dX12V57PXG9KL3cf7IBTHbUhG/jfBvEzA9hFkawihMIT0EEBsLXEb76c/aqELh1eTKcbnxhPKIFroqZj2PkhtG+9LOZuEJlpgslNYCy2IeSvEF1vofqfDeeXSb7IqQ3AR2uZ22gpONU5+5QfnsNq/wJ4Wtbt2sIv9Z4AQJ5PGI3gOcRFwQEDgQW+CbC1/EtCacUx14bwPrag7l8CUM6jW9kkJ+Gm4DRcF34Fr72EU95jft9gvrGY+y1u1iFm1i5LszsGYyl4+ipI/h6EnmkCZAfhZ3A1XA3p6iXn+GU7mOvDmDlezCXL2JkTqGnj6EtHEKdO4CnzSI/bAbiYVu4CvXyKM76EHaxHyvfjSlfwMicQE8dRUseRP28j9rMXjwtgRxvAqTBUMlVcjVjZSwwlp+gyw/QpUH0TBQtfQst1Yu62I2a7EKdv4xTmRbZe6HaNrB0u/VqJtY+JkXbK1Kszf5jo222FGtTM9HW4b/Z/n+XHynp6NSPz0b4AAAAAElFTkSuQmCC"
			},
			{
				name : 'firefox配置文件',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADTElEQVQ4jV3SW0xTBxjA8fOyhz3Ppz3s0fmwLCxshiUs0SzZgmQxMzgVpDwwp2TDzWwZilkiC5egCGzowiXoQgEJNx0akHFpi9qGCtK11BXOgV64tyscVNqec3r63wN6luxLvsf/L9/DJwgvx9S9uN/UE7SXjYYpGVqneGCVM3eWKegJyqbe0FJBT3CmoCc4ZeoNjph6g10nuwPZ6U1Tr73qhbxOqbjGGub/80LRCT/XmIsk8KwmsPt36Hy8QX7XYjT3lpj/H9DmK2+2RwAIbSVZk3Ui2zqbOzrbCZ24qqMmd9G4lsI6/4Jc83zYAI7d9Pza4Yyg6eDd0PFFdMSwjj+qE5J1lrd1luVd4bvfAygaVN33YwA5zTPtA64ocgycQZWpJQ3XkoZnVcO7oeHbSCKGk+jAuVY3trlNjjbPrBjAkQbniG1OJhjVsM4rTEgKjxYVHAEVZ0hlOqTinR3G13Ec8Y8KXK2f0HXt5GUD+Kz2wbxvbQf3isrovMKoqGARVWwLuzvj6mNtvATZfQ+er7Dl7sVR8+m6AWRXjSpyLInDrzAmKVgkFZuo8mBBZdo1QNRbhrI0wJr1CjFPP8nAQzw3T8UFQRCED891v55dMUxcS2GTFCxSAouUwComcLrH2Jz9CT32kNjCN0SdxfxtLsTdkv/P5NXP9wqCIAiZJd1vHakcRkmmsEgKFjGBVUow+WSETc8F9LiDHamAeCiPZ09Lcf+WpTsvH0gzzj/wfee+LyqH0FMpJhZVLJLK2Hgfa49LXsYm4sFctmcvIjZlc6r0qteI079q2pN51txT0+9lRdZpc8S5M3gb7/CP6LEJ4v5CEqF8ZM8FpMZDjNunyTzbftcAMk63HMsouhE7UXGPix1zXKquwztYyl9D9SxPHmXHn0fUdR7X9cO4fQHaRnxkFLXeMID9hU3VFe0O4/e7qz+GZwF8zTmMl77Jo8Ys7LVZNNyyI66rXL/9hA8KG68YwHv5DWeK6+9j/vMpd+1+yk+/i+K4hjL5C5MVB+n/+m3kFR/+iMbqlsalVhvppoZvDWDviZo9aXl15Wl59ea03LrBnI/e0CtN+1IjVYdoKctJZX1ZxcGiZg7/YKbg5z7Scuvm3jle+/6r/l9E3rT3AA8mrAAAAABJRU5ErkJggg=="
			},
			{
				name : 'firefox常用功能',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADq0lEQVQ4jZXUW0wTZhTA8UNCYuBhiQmZNUwiUfF+t1wLvUFbWwqFVi4tK0ipQItFXKGFQEEMZE6iomLIyB7MDNFJjGwMMYQsJpvZ1MzFyECzzG0uQZoo2abP/z2I6+t4+D98D+eXnIfziYjEpas0hTka3UKOVs+K0ugW0lWaQhGJExGJz1RrFk4MXODyzVtcGZ9idOI21yanGZua4cZyY1MzXJucZnTiNlfGp7h88xYnBi6QqdYsiEi8iMiqjFw1JwdHaAh24gtFCHT00tTeQ1O4m0BH79t3uJum9h4CHb34QhEagp2cHBwhI1eNiKwSEUlQZqsI95/FE2jF2xLG09zKwKVPefholqWlv3j5aokHPz2if3AIT3Mr3pYQnkAr4f6zKLNViEiCiEji/swsjkf6cDcGcHr9XL1xk79fv2H+6S+MjU8wNj7B7Nw8/7x+w/Xxr3B6/bgbAxyP9LE/MwsRSRQRSdyjzMAX6sLhrqPn1AAvXy3x+dXr2JzVlLoOU+o6jK2ymv6BcywuRjl9fgiH24Mv1MUeZUYM2rXvAJ5AEIujkjvffsfdH+5jcVRg/7CW0qpayqq9OD2NlLk9lLpqKHQ4KXHW4AkE2bXvQAzavnsvrvqj5FtLmJ2b59LIZxhLyiitOoy1vIrf/njO78//5PzwCHX+ZqrqGjDby3HVH2X77r0xaMuOnRyqrkNtNHPv/gMuDo9QUFiCtcyFocjO3e/v4azxojcXk2+x0fvxabQmK4eq69iyY2cMStu6DVulm2ydgdGrXzB5exqN0YKp5BDag1YCwTZyDSbURgttnREePX5Mjt6IrdJN2tZtMWhD2mYsjkqyNHpq6/3c//EhrR1dqI0WtAetVB9p4JMzg8x8c4e5J08ZGh4hI0+HxVHJhrTNMSh14yZMNgc5OgPKHDXdvX38/OQJp86co7i8AlW+kSxtARl5OpTZeW9TaTDZHKRu3BSD1q1PxWyvQJVvIkdvRJmrobbex5dfT/Lrs2csRqOxFqO8WIySnqfDbK9g3frUGJSckkJZjRdDUSnGYjumYgd6czFaUyFakxWtyYrGWEiewUxugYm8AhNqo5myGi/JKSn/QQmK5OTFonIXR1pCNATb8bV14QtF8IciNIW78YcjNLZ2cuSjdrzHQtQ1B/Eea6Oo3IUiOTn67kRWrU5Kcq1RKKJr1q5lJb2vULxYnZTkene08SLynogoROSDFaZYno2X5U8pfllNWN73/5SwPBMvInH/AlIIOOfCXNavAAAAAElFTkSuQmCC"
			},
			{
				name : 'about',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADe0lEQVQ4jZXUb0gUZhzA8Z8giAYKvQiLRWh2eDPNhKvAU8/TS+/yTwqJVJL4h5XKUMQdp3TzTwQqipDhG9EIK2aOxpxjbKDeeaemnt5dFiuRrcI7PXVbo6L25rsXnrs3vZgvPvA8DzxfeF78HhGRoOOVAzknqu56E6uH2IsTVXe9xysHckQkSEQkOOHqoLdsyIlpwkPjpIfrFi9m6zottnVa7Ru02jdosa1jtq5z3eKlcdKDacJD2ZCThKuDXhEJFhEJia/op/jBKrp2J1mdLvTdbs71PCHn1jK5vU/J7X1Kzq1lzvU8Qd/tJqvTha7dSfGDVeIr+hGREBGR0LjSPgruPCejzYHu5iJZ7U6yO50YulwYut07ulxkdzrJaneiu7lIRpuDgjvPiSvtQ0RCRUTClBd7yOt9RlrjHFrzPJktDnRtDjJbF9A2z6NtnifdPIfm+mMymx1ozfOkNc6R1/sM5cUeRCRMRCRMcaEDfYcbdf00acZZUr6aQd0wTfbXs4w+9rL15iO/b7yj69sVkuttpBlnUddPo+9wo7jQEQjFnL9BZssSZ2qsqKrG+aJnkb7RVSyuDXx/fcSz/QHPHx/Y+vsfmvrdnKqe4EyNlcyWJWLO3wiEog1mNCYHqsoJTpX/zMuN97zefM9v6+9YWXvLytpbXvj9YH9NUulPqCon0JgcRBvMgdARnZHkujnii8eo6ZhhaeVPll74rbzZ4d/P/7pNWaud+OIxkuvmOKIzBkKH02o5fW0GZf4jZlyb2J2b2N1bnzTt2mLa5UOZ/4jT12Y4nFYbCB1KrkJVbkOhv8+o5SWTCz4mHTssfrv7yQUfY9ZXKPT3UZXbOJRcFQhFqipIKpki5uw9Cqu/40frK+aWtz/pl5k1ir78npiz90gqmSJSVREIHUgsIfGyBYXhIUczBonW9BGl6SU6/TbRWr/02ztnmj6OagdQGB6SeNnCgcSSQGh/XBEnr4yjzB0hNneE2LxhlPnDfF7wDXGFw8QV7qyV+cPE5g0TmzuCMneEk1fG2R9X9F8oNOJY/kZC8SDqWgvqOgspDVZSjVNoTDa0TXa0TXY0JhupxilSGqyo6yyoay0kFA8ScSzPtzsiIfsOpl4Kj9b7IqIM7EV4lGF938HUS7tDGywi4SISKSKf7VGk/26w+D+lYH811P/e/yPUfydYRIL+BSkIj6JbQMVJAAAAAElFTkSuQmCC"
			},
		],
        	
        //1.在这里定义好想要出现在主菜单下,或在主菜单子目录下的程序(subdir没有定义, 或在上面子目录名列表中找不到名称相匹配的[比如写错了], 就会出现在主菜单下面)； 
        //2. 可在中间加{name: 'separator'},  分隔线如果定义了子目录名,就出现在子目录下面；没有定义就在主目录下面.
        //3. 这里定义的可以重复. 例如IE浏览器我想出现在windows工具下面, 又想出现在子菜单下面,   那么就定义二次:
        //    {name: 'IE浏览器', path: 'C:\\Program Files\\Internet Explorer\\IEXPLORE.EXE', args: ['%u'], subdir: '系统工具' },
        //    就可以了, 建议先写完上面想要定义, 分类在子目录下的程序, 之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
        apps: [
       {name: 'IE浏览器', path: 'C:\\Program Files\\Internet Explorer\\IEXPLORE.EXE', args: ['%u'], subdir: 'windows工具' },
            {name: '记事本', path: 'C:\\Windows\\notepad.exe', subdir: 'windows工具'},
            {name: '计算器', path: 'C:\\Windows\\System32\\calc.exe', subdir: 'windows工具'},
            {name: '命令行', path: 'C:\\WINDOWS\\system32\\cmd.exe',  subdir: 'windows工具'},
/*         
            {name: 'HyperSnap 7', path: 'E:\\software\\HyperSnap 7\\HprSnap7.exe',  subdir: '常用工具'},
            {name: 'Photoshop', path: 'E:\\software\\Photoshop7.0\\Photoshop.exe', subdir: '常用工具'},
            {name: 'separator', subdir: '常用工具'},
            {name: 'Total Commander', path: 'E:\\software\\Total Commander\\TOTALCMD.EXE', subdir: '常用工具' },
            {name: 'Everything', path: 'E:\\software\\Everything\\Everything.exe', subdir: '常用工具' },
            {name: 'HostsX', path: 'E:\\software\\HostsX\\HostsX.exe', subdir: '常用工具'},
            {name: 'Lingoes', path: 'E:\\software\\Lingoes\\Lingoes.exe', subdir: '常用工具'},
            {name: 'PDFXCview', path: 'E:\\software\\PDF Viewer\\PDFXCview.exe', subdir: '常用工具'},

            {name: 'Goagent', path: 'E:\\software\\ProxyTools\\goagent\\local\\goagent.exe', subdir: '网络工具'},
            {name: 'opera', path: 'E:\\software\\Opera\\opera.exe', args: ['%u'],  subdir: '网络工具'},
            {name: 'Becky!', path: 'E:\\software\\Becky!\\B2.exe', subdir: '网络工具'},
            {name: 'QQ', path: 'E:\\software\\QQ2013\\Bin\\QQ.exe', subdir: '网络工具'},
            {name: 'AliIM', path: 'E:\\software\\AliWangWang\\AliIM.exe', subdir: '网络工具'},
            {name: 'Fetion', path: 'E:\\software\\Fetion2012\\Fetion.exe', subdir: '网络工具'},
            {name: 'Thunder', path: 'E:\\software\\Thunder7.2.11.3788JayXon\\Program\\Thunder.exe', subdir: '网络工具'},

            {name: 'foobar2000', path: 'E:\\software\\Foobar2000\\foobar2000.exe', subdir:  '图像影音'},
            {name: 'PotPlayer', path: 'E:\\software\\PotPlayer\\PotPlayerMini.exe', subdir:  '图像影音'},
            {name: 'Imagine', path: 'E:\\software\\Imagine\\Imagine.exe', subdir:  '图像影音'},
            {name: 'i_view32', path: 'E:\\software\\IrfanView\\i_view32.exe', subdir:  '图像影音'},
            {name: 'Inpaint.exe', path: 'E:\\software\\Inpaint\\Inpaint.exe',  subdir: '图像影音'},
            {name: 'MangaMeeya', path: 'E:\\software\\MangaMeeya\\MangaMeeya.exe',  subdir: '图像影音'},
            {name: 'openCanvas', path: 'E:\\software\\openCanvas\\oC55.chs.exe',  subdir: '图像影音'},
            
            {name: 'EmEditor', path: 'E:\\software\\EmEditor\\EmEditor.exe', subdir: '编辑工具'},
            {name: 'SublimeText2', path: 'E:\\software\\SublimeText2\\SublimeText.exe',  subdir: '编辑工具'},
            {name: 'AkelPad', path: 'E:\\software\\AkelPad\\AkelPad.exe',  subdir: '编辑工具'},
            {name: 'SourceInsight', path: 'E:\\software\\SourceInsight\\Insight3.exe',  subdir: '编辑工具'},
            {name: 'WinHex', path: 'E:\\software\\WinHex\\WinHex.exe',  subdir: '编辑工具'}, 

            {name: 'Software', path: 'E:\\software', subdir:'常用目录'}, 
            {name: 'Downloads', path: 'I:\\Downloads', subdir:'常用目录'}, 
            {name: 'TDDownloads', path: 'I:\\TDDownload', subdir:'常用目录'}, 
*/
            {name: 'profile', path: '\\', subdir:'firefox目录'}, 
            {name: 'chrome', path: '\\chrome', subdir:'firefox目录'}, 
            {name: 'CSS', path: '\\chrome\\CSS',  subdir:'firefox目录'}, 
            {name: 'SubScript', path: '\\chrome\\SubScript',  subdir:'firefox目录'}, 
            {name: 'UserScriptLoader', path: '\\chrome\\UserScriptLoader',  subdir:'firefox目录'}, 

            {name: 'userChrome.css', path: '\\chrome\\userChrome.css',  subdir:'firefox配置文件'},
            {name: 'userContent.css', path: '\\chrome\\userContent.css',  subdir:'firefox配置文件'},
            {name: 'prefs.js', path: '\\prefs.js',  subdir:'firefox配置文件'},
            {name: 'user.js', path: '\\user.js',  subdir:'firefox配置文件'},
         
           // 建议把要放在子目录下的程序定义在上面, 下面的定义放在主菜单下的最常用的程序
/*            {name: 'separator'},
            {name: 'HyperSnap 7', path: 'E:\\software\\HyperSnap 7\\HprSnap7.exe'},
            {name: 'Photoshop', path: 'E:\\software\\Photoshop7.0\\Photoshop.exe'},
            {name: 'Everything', path: 'E:\\software\\Everything\\Everything.exe'},
            {name: 'HostsX', path: 'E:\\software\\HostsX\\HostsX.exe'},
            {name: 'separator'},
            {name: 'Goagent', path: 'E:\\software\\ProxyTools\\goagent\\local\\goagent.exe'},
            {name: 'Thunder', path: 'E:\\software\\Thunder7.2.11.3788JayXon\\Program\\Thunder.exe'},
            {name: 'EmEditor', path: 'E:\\software\\EmEditor\\EmEditor.exe'},
            {name: 'SourceInsight', path: 'E:\\software\\SourceInsight\\Insight3.exe'},
            {name: 'separator'},
            {name: 'Software', path: 'E:\\software'}, 
*/ 
		],

		//   在这里定义firefox的功能按钮, command就是一小段程序, 可以从firefox api, 小书签或鼠标手势中摘取;可选自定义图标;
		//    同样, 建议先写完上面想要定义, 分类在子目录下的程序,  之后从中摘出你最常用的, 去掉后面的subdir定义, 放在最下面
		configs : [
			{
				name : 'separator'
			},
			{
				name : 'about:firefox',
				subdir : 'about',
				command : "openAboutDialog();",
			},
			{
				name : 'about:about',
				subdir : 'about',
				command : "getBrowser().selectedTab = getBrowser().addTab ('about:about')",
			},
			{
				name : 'about:addons',
				subdir : 'about',
				command : "getBrowser().selectedTab = getBrowser().addTab ('about:addons')",
			},
			{
				name : 'about:cache',
				subdir : 'about',
				command : "getBrowser().selectedTab = getBrowser().addTab ('about:cache')",
			},
			{
				name : 'about:config',
				subdir : 'about',
				command : "getBrowser().selectedTab = getBrowser().addTab ('about:config')",
			},
			{
				name : 'about:memory',
				subdir : 'about',
				command : "getBrowser().selectedTab = getBrowser().addTab ('about:memory')",
			},
			{
				name : 'about:mozilla',
				subdir : 'about',
				command : "getBrowser().selectedTab = getBrowser().addTab ('about:mozilla')",
			},
			{
				name : 'about:plugins',
				subdir : 'about',
				command : "getBrowser().selectedTab = getBrowser().addTab ('about:plugins')",
			},
			{
				name : 'about:robots',
				subdir : 'about',
				command : "getBrowser().selectedTab = getBrowser().addTab ('about:robots')",
			},
			{
				name : 'about:support',
				subdir : 'about',
				command : "getBrowser().selectedTab = getBrowser().addTab ('about:support')",
			},
			{
				name : '选项',
				subdir : 'firefox常用功能',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADE0lEQVQ4jaXMTUhqaQDG8RfufmZ2bYpDSYkfCzlConCyz4XaIUQPBKVtMsjVDEjQIsl4tbA61GRGC4PatIo+IMvoSOmx9JxFQYtcFCG0nbu9cN/0mUXM4sJlYJgH/ruHHyGEEEmSviwuLv7yX5Ik6QshhJBIJGI5OjrSVVX9WqlU/lJV9eu/9c/n+PhYj0QiFiKK4lq9Xsfa2hoSiQQopaCUYnl5GclkEpRSpFIppFIpUEqRSCSwurqKer0OURTXSDAYlHVdb5pMpu+dnZ0tk8nU6u7ubrW1tbU4jmtxHNdqb29vdXR0tCwWS6urq6tlMpm+a5rWDAaDMgkEArKu63C73WxoaAgOhwOCIIBSitnZWWxubmJqagozMzOwWCwYGBhAf38/0zQNgUBAJn6/X9Y0DYODg8xut2N+fh5LS0t4enrCw8MDKpUKyuUy0uk0KKXweDzo6+tjuq7/CLjdbuZyuZBIJPDx8YGXlxdks1nEYjHs7+/j7e0Nl5eX4Hkevb29rFarwe/3y2RsbEzWdR08z7OFhQU8Pj7i+fkZk5OT4DgORqMRVqsVlFJkMhns7OwgHo+zUqn0CYiiKN/f38PlcrHp6WlomoatrS1wHIdcLgdN0zAyMgJZlvH6+or393ecnJywWq0GURQ/gUqlAqfTydbX13F7e4tYLIaenh5omoZGo4F4PI5yuYxms4m9vT2Mj4+zarUKn88nE5/PJ9/d3cHhcLCJiQmoqorDw0MYjUZIkoRoNIq5uTk0Gg3kcjkIgoBwOMxKpdIn4PV610ulEmw2GwuFQkgmk6hWq9jd3YXT6YTBYMDKygpubm4QDochSRJOT0+Zoijwer3rxOPx/KmqanN4ePibwWBgoVCIbWxssIODA3Z2dsZkWWbRaJTJsszS6TRzuVzMarV+U1W1OTo6ukkEQfg9n8+jUCigUCigWCzi/Pwc+XweiqLg+voaiqLg6uoKxWIRiqLg4uIC+XwegiD8QQghv5rN5pjdbs/yPJ+x2WzbPM9v8zy/bbPZflbGbrdnzWZzjBDyG/m/+xsCyiIj0Yng5AAAAABJRU5ErkJggg==",
				command : "openPreferences();",
			},
			{
				name : '书签管理',
				subdir : 'firefox常用功能',
				image : "chrome://browser/skin/places/allBookmarks.png",
				command : "PlacesCommandHook.showPlacesOrganizer('AllBookmarks');",
			},
			{
				name : '历史',
				subdir : 'firefox常用功能',
				image : "chrome://browser/content/abouthome/history.png",
				command : "PlacesCommandHook.showPlacesOrganizer('History');",
			},
			{
				name : 'separator',
				subdir : 'firefox常用功能',
			},
			{
				name : '重启',
				subdir : 'firefox常用功能',
				command : "Application.restart();",
			},

			// 建议把要放在子目录下的功能按钮,定义在上面, 下面的定义放在主菜单下的最常用的功能按钮,

			{
				name : '下载管理',
				image : "chrome://browser/skin/places/downloads.png",
				command : "BrowserDownloadsUI();",
			},
			{
				name : '附加组件',
				image : "chrome://mozapps/skin/extensions/extensionGeneric-16.png",
				command : "getBrowser().selectedTab = getBrowser().addTab ('about:addons')",
			},
			{
				name : 'about:config',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABxElEQVQ4jZXQzYsScRzH8d/f16lTFCwRdOoSUYddtlrUaXTVEdR1xqfysLtUrC2EujNjbplPjIGtJIZB6YLMjqu105/w7tQhMB8+99f7C18hVpiiKGiaRjqdJplMsor5B6dSKWzbxnVdVFVdL6CqKuPxmMlkgmmaxOPx9QKapmHbNt1uF0VREEKISCRCOBxmd3d3eSyRSDAcDmk2m4RCIYLBIPl8nsFggCzLiwOyLBOLxej3+7TbbSqVCuVymVqtRqPRQJKk+QE5bSLnPhGNRrEsi06ng2VZtFot6vU61WoVn883Hz/TDLLmhOSJQ/j1N3q9HqVSiUAggCzLSJKE1+udjyXNIKs7VLq/KZ+5hI/HbGd6+P3+5c/yqQYp3eHdmcvL6pT900sK7V94Ds656/+4OOBN6CSLDuXPLocfpqjFC56bE45bP9nKjbjjNf8f2Eno7BUcjI7L4fspe4ULMrrDm8aMzRcjbnuMxde3ckP0zhX7p5fE3tqkTxzy9RmPsiM2dpZgIYS4r32n0L4iY0xIFh2O6jMeZkfceroCFkKIe4qF5+Cco9qMV9UZD1I/uPl4Rfx3G7LFdd9Xrj35wo3t9fAfyK1fDftrXK0AAAAASUVORK5CYII=",
				command : "getBrowser().selectedTab = getBrowser().addTab ('about:config')",
			},
			{
				name : '错误控制台',
				image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADbklEQVQ4jZXUS09TCRTA8UPShMBi1i7mQ7hhNcQMPmaiqVFDDDHER4ghWmxa+6BXevuilIulra0tfV36flFoeYmYGF3wCQQLOt+AGb/EfxaC3erivzy/5CzOEREZmLHYjLZZ5dTmesEvNauczlhsRhEZEBExWByzp7tv3/HpqMfh52MOeyccHX+hd/KV3sk/Z33l6PgLh70TDj8f8+mox+7bd1gcs6ciYhARGTTbHXw8OKCx3qXV2aS9uc3G9i6dnTd0d/fo7u7R2XnDxvYu7c1tWp1NGutdPh4cYLY7EJFBEZEhk/U5++8/UG60qLba1Nc7NDe+o2vdLda6W7Q6mzQ3utTXO1RbbcqNFvvvP2CyPkdEhkREhqdnzGzt7ZMtVdCrdYr1JqVGi0qrTXVtneraOpVWm1KjRbHeRK/WyZYqbO3tMz1jRkSGRUSGp56YaG/tkMjqpPQimUKZXKlKvlxDr9TRK3Xy5Rq5UpVMoUxKL5LI6rS3dph6YupDDx9PU2tvEI6niKUyxNM5ElmdZG6VVL5AKl8gmVslkdWJp3PEUhnC8RS19gYPH0/3oclHU5TqTRbCMbRYgnA8SeT1CtFkmlgqQyyVIZpME3m9QjieRIslWAjHKNWbTD6a6kMT9x+wUqqgLmj4tWWC4SihyCsWo3G0WAItlmAxGicUeUUwHMWvLaMuaKyUKkzcf9CHxu9NEknrOD0B5gIh1KCGN/QSv7ZMYClCYCmCX1vGG3qJGtSYC4RwegJE0jrj9yb70O27EyzG01gVFYfqx+UL8iIQwh3UUBeWUBeWcAc1XgRCuHxBHKofq6KyGE9z++5EHzLeGWd+OcEzh4JVUbG7fTg9gR/gOeD0BLC7fVgVlWcOhfnlBMY7433o+s1b+JeiPLXYMTsUrC439jkvTtXHrMfPrMePU/Vhn/NidbkxOxSeWuz4l6Jcv3mrD129YWQ+Esdkc2J2KlgVN3a3B6fqw+UN4PIGvkNuD1bFjdmpYLI5mY/EuXrD+AMaunTtr//m/EGS+QLpfIHsaolcsYJerlGo1ClU6ujlGrlihexqiXS+QDJfYM4f5NK1v7+dn8jgxZGRydE/x76Njl1hdOzyT3aFP8Yu/3txZGTy/GgNIvKbiFwQkd9/sQtnswY5e0qGM3XobN+faehsxiAiA/8DDnCW2sYeE5QAAAAASUVORK5CYII=",
				command : "toJavaScriptConsole();",
			},
			{
				name : 'separator',
			},
			{
				name : '破解右键限制',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADXUlEQVQ4jW2Te0xTdxTHz723195721pKi7xu4bbcdtBWi3Wtijqr8TVwzOhQGYK6mVjnlk2WkaFEjQIZEvER4+YjbmSyxS0Dx8MxgYiDitIoYl1ggApxsqTs8ed0Lb+zPwybEL7J97/v93NOcnIApuikDEr/1oRVwY8d5Q/LXj7z4LDzs+4PzMUNWxJcAEBPzU9Sxxu6tYPF5r5QpUzGPonHUGn0c5fH4W+H4iM978X+ePH1ONu05a7sqMLHRTHhJ0VaHC2OwtEDCePDJUnPRvYm/jNaYiBPirT4uFCLg+9q/6zJSlgxqdy2WJ3zyKeJDPs0OLJbg8OFMeFja8y5voViom+BJH2aadp48y1DYGS3mjzcocZgvmasyivKAABQYQBN7wZhZDBPwKECFT7YrsZHOzWkOdtw1gugmBiyTQKuJVtXPZQvkF828qRxTXQtAADUO1X5fes50r+Bx4E8gQxsFnAgV8ChAoE0ro6eBNkjAt+Vpb7381oO777KPfsoXbRAy3yh+t4KJfa+xoWr3PHv316vDvWt47FvHY/9OTxpWKabBLnsnvlOcJUSe5expNJt3A5XPZz/TgaL7V7V7zl2mFHljPPcylSFgquVGFypxPtZSlKb8T/klCy4el5hx2/PZ/G0K6YMmuZy/kA6g20L+DE7wAwAgAq73tO5XAj1LGaxJ4PFu0tZcsmtPesFUJySWVfArRjvnsPgifTYcrhk4768kcZg5zxFeI8tyT6xaoVd77m+iAsFXArsdjIYmMeQGqfmwtc2obzLwaDfRpOSOclvw/EUVcFPaRTpsNF4xqE99+J5S616T4tLGbqRxmBnKo1+G0067DRpt9DY/BLz9M10swXyomHmd1bFr60yja02OnxU1u0CAGoCctCq91xxsKFrFhrbZBpbU2hsMVPkRKqu4b9cqaTd1GSmIs0mCpstdOS8zNccMWqW+GJh1sFEXvzcxH1xNYXCH0wUXpEo/MbE/rFttjX1xW2pMrOu+PtkKtyQTGGjRGGjCcYvS9Tf9SbqaZMEpD6JwnojkK8kxV87HaaV0/5DoRybfU5S9tcZgdQZKawVn7tOBPKtCJGjKVHtW+xW57TlCXkl4HZYxcx9FkPlYVl/8ZCsr/7QGrc/d7a8EACYqfl/ASscSowNpGaHAAAAAElFTkSuQmCC",
				command :
				function ()
				{
					gBrowser.loadURI("javascript:(function(){var%20doc=document;var%20bd=doc.body;bd.onselectstart=bd.oncopy=bd.onpaste=bd.onkeydown=bd.oncontextmenu=bd.onmousemove=bd.onselectstart=bd.ondragstart=doc.onselectstart=doc.oncopy=doc.onpaste=doc.onkeydown=doc.oncontextmenu=null;doc.onselectstart=doc.oncontextmenu=doc.onmousedown=doc.onkeydown=function%20(){return%20true;};with(document.wrappedJSObject||document){onmouseup=null;onmousedown=null;oncontextmenu=null;}var%20arAllElements=document.getElementsByTagName('*');for(var%20i=arAllElements.length-1;i&gt;=0;i--){var%20elmOne=arAllElements[i];with(elmOne.wrappedJSObject||elmOne){onmouseup=null;onmousedown=null;}}var%20head=document.getElementsByTagName('head')[0];if(head){var%20style=document.createElement('style');style.type='text/css';style.innerHTML=%22html,*{-moz-user-select:auto!important;}%22;head.appendChild(style);}void(0);})();")
				},
			},
			
			{
				name : '轻松下视频',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADUElEQVQ4jSXMW09bBQDA8fM5TNh62tNzP225uAG938tCNhOCCj77oImvc4Dolokw67oMVkyhsCGXYZRyc4yBkA00U2fwY+iDGbABK7Q9fx/8fYCf0P1nN7HdBP7fkoR3Y6SfRUjtpIg/y5B6Gia2HSe9ESW6HSD2JE3ycYK2lQSJtSjdP3+AEN9N0LjchLluoG4o1D/2Ia8aKJs65rKKWfKilkzUkop3rhH5ewtz2sSa1oksphD8z+NY6wbWhoi5JmGsWsjrBo41J/KqibZooi3IGD+68c3UI80rmFMK3kmZSCmOEPs1hrbuxnrkwruqoy/7SC6l+OT5R/jmL+AuaZjzIuacG/NBA+4ZCc+kjDWmEZtPIGS2Q3h/sjBXLLRFD4mVdvaOXnDIP/Tt9GPNNeKadaFNe2m5H0eZ0nBNqsgFD/GZNoTUdgJlSUd5pJEsJfnr6AVV+5AKx+xzQt/WVXyTrYSLbfxysEtwyo+joKPlG8lMZhDiW21IKwrissjHux9yyN9UOeYNZ9RqcGK/ZGg7yx/7exyzz+XxFPqIgTfnJV2MIiQ3Y5g/6CgLBvUzTfRufsq+fYRtQ61SwbZtTjnhzD7jda3MlfFLmDkd/bZOy0QzQmArhuehhTWros0q1I/76Fm/xoF9SLViU+H/BLtKmde0T17GlVVwf+3EXwggpFcSaLMeXA9l5BkHxgMXDaMNDGze5NTe54wa1IAqlDnhSrEDaUDF/aVIaCSIkFmKYU1ZuKc1XN+pSGMm0cIlft/fo1w9BtuGM6BqU+YNncUupBsG52+6aB6JIARWwtQXDTxjGsqYxdv5IDsvn1K2X1GpVShzwJl9zCmHvOJf3pvoRPlMxfm5i2AujBBZSKAXDLSCgvKtGzWv0TTaQvBekujdNMHRDJl7HbQXOnmn2IWR9VLX76TuC5HWbAAhOpdCyZtoozLWXSdGzoH7joj4TR3Oobc4N3ge+bqMeF1C6lMR++uQekScvQ6igwGE5EwGzx0PRk5Hu63hvqUjDaiIAxKOIQfSjXNYvS5cfU6kHgXxWh3uqxLOPoXQV0GErtL7JCaihO+HaB4P4S/ECeXjhIaDBIYv0Dp8kWg2yMWcn5ZsBP+tZiKDYZoH/byb7+A/zBpdx7267WIAAAAASUVORK5CYII=",
				command :
				function ()
				{
					gBrowser.loadURI("javascript:if(typeof%20yXzyxe58==typeof%20alert)yXzyxe58();window.open('http://www.youtubexia.com/?url='%20+encodeURIComponent(document.location.href),'getA','toolbar=no,%20location=no,%20directories=no,%20status=no,%20menubar=no,%20scrollbars=yes,%20resizable=yes,%20copyhistory=yes,%20width=800,%20height=600');void(0);")
				},
			},
			{
				name : 'PrintWhatYouLike',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABt0lEQVQ4jaWRwWsTYRDFf7tNrZjYVLNJl7RQotRrxTZBgqFiQy+tSPHuyb9AEE+SXgXxLCLEiwh6DRQlQhsIulBbqSkm2oDeCkpiEJFmv93xIF27blopPhj4eLw3b+Yb+E9ovcji8mVJjZiE9D6PEyB3+n5A7yMWn2RkdDjOqVHzwMxLZx56vtDu4/bjSRkY6GfEjNF1VMAmIqzWPvKl9c3H67sP5bgkEyexXUXXsQNVWX3Hy1dv2Wh84krBEN8ENx9NSKi/j3DkKLayA+lXzz7zrXrxhu410H+nOwweP4btKLo96m8s3/uhzd46Id4EynUIh49gO8H0a5lSz0u9uNPWYM8VHlRnRdf+aK9nn/uMa9WqjI2PE0skfHzP7ntRLpclMzXF02KRSCRCJpfDME0Gh4Y0b4X9cLdQkJ+dDh+2tnCUotlo8LnZZDKb9TSBBq9XVqReq7Gxvs6FmRm+bm9TXVqiXq8zbBhMpNNEo9H9G5yfntYArEpF3lgW7zc3+d5uk0wmyc/NoXZ26LRah/iDUknWLIuxVAojFkNcl/zCgufTDzID5OfntXPpNIl4HHHdf8kPj18pO7Iti9L4wwAAAABJRU5ErkJggg==",
				command :
				function ()
				{
					gBrowser.loadURI("javascript:(function(){if(window['ppw']&amp;&amp;ppw['bookmarklet']){ppw.bookmarklet.toggle();}else{window._pwyl_home='http://www.printwhatyoulike.com/';window._pwyl_pro_id=null;window._pwyl_bmkl=document.createElement('script');window._pwyl_bmkl.setAttribute('type','text/javascript');window._pwyl_bmkl.setAttribute('src',window._pwyl_home+'static/compressed/pwyl_bookmarklet_10.js');window._pwyl_bmkl.setAttribute('pwyl','true');document.getElementsByTagName('head')[0].appendChild(window._pwyl_bmkl);}})();")
				},
			},
			{
				name : '阅读助手',
				subdir : '',
				image :"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACE0lEQVQ4jaWTv0sbYRjHP+97l8slNVASEiMBk7qJIC0ScMjg0KE4NUsNhA7+DcWhW5WC+B9oFodaxK2bQwcXoaSNVHAJCB0CWqiSQqVJLnf3vh3uYpNGpz7j8+PL83y/30e8B81/hKnuKQgpEVICoJVCq7s7xwAEgJR4SuGHQwZgSAlKja07voEQuEqRnJ8nUyqB1vw4PqZ9dkZECND6HgAhQAg8pXiyscHjtTUitg1Av9vldGuL0/V1TCkDkBBI1EISNeAAs9UqT/f20FqjfT9oMgyEEHysVGgeHBAdnApIBfQBO59nolBgZmUFrRS+694S6bsuWilmKhUeFArY+Tx9QAHyN5AqFinX67xoNHAdJ7jNsm4BTMsCrfE8j0qjQbleJ7mwQA8wO0Bybo7E5CQAsUyGm8tL3F6PztUVAPF0mohtE8tkiKdSEM60Tk4wnsGb62YTBeQWF/l1cUGn3SaRyzExNUU8nUYYBtfn5wgpSWSzfNrc5Ov2Nvg+4m3I5w3wcn+fbLGIGYnwcHp6RK6frRbKdfler/OuWiUREmn2CVwngS87O5RLJT6srmJGoyMAnuPwfHeXz7UaUko8AoeK16GMCrBiMR4tLdE8PMQdkkoBFjC7vMy3oyP63S5yYJ9XQ8+kQ0mjQgR/MHCdEGilcLTGGgIGMF1GwzAMXN+H0ETDYRoG3j95c6ztjsG/pfHaH8m8z1R4EJkJAAAAAElFTkSuQmCC",
				command :
				function ()
				{
					gBrowser.loadURI("javascript:(function(){readStyle='style-newspaper';readSize='size-large';readMargin='margin-wide';_readability_script=document.createElement('SCRIPT');_readability_script.type='text/javascript';_readability_script.src='http://lab.arc90.com/experiments/readability/js/readability.js?x='+(Math.random());document.getElementsByTagName('head')%5B0%5D.appendChild(_readability_script);_readability_css=document.createElement('LINK');_readability_css.rel='stylesheet';_readability_css.href='http://lab.arc90.com/experiments/readability/css/readability.css';_readability_css.type='text/css';_readability_css.media='screen';document.getElementsByTagName('head')%5B0%5D.appendChild(_readability_css);_readability_print_css=document.createElement('LINK');_readability_print_css.rel='stylesheet';_readability_print_css.href='http://lab.arc90.com/experiments/readability/css/readability-print.css';_readability_print_css.media='print';_readability_print_css.type='text/css';document.getElementsByTagName('head')%5B0%5D.appendChild(_readability_print_css);})();")
				},
			},
			{
				name : '查看浏览器UA',
				subdir : '',
				image :	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADCElEQVQ4jXWTbUwUBBzG/3fHoR4cd9zxctxZqYC4NqasTYaNXWzUZNAtlHPtwnxjl6cNs4saG9MatqZzWC0uK8nVlBXG0mkxZyRUqy319A7uOhA4kKbFeLlF40Dhfn2ojVHd8/V59vvw7HlE4siy+QS2z3+irjNESXuIeLn/yPyEm+PDs1yPxuidjRGYjXEjGuN4+A8e3fNOXJBCRCQlfzeFris0fHKJ7k+P8N30A76ffsBXkTmODUYo9fiIje+juyJzKWj0qWWMN5rp36XF//zD+KvT8fwW5YvIPO2ReV72juHoCFN8tAfuf0i0v5r5yRcWIVONZkK2ZfTatPirUunfa+KeQ8OJhgM0/T7H67/OsDcwTcXXkxiK3BDdz3nP5kXA7coV9DypwVuahPdpPbdffISFuR9Zta0Zx7fjbOkYo6T1Ltm151lZ9S6RDitzfcV/A/5szg0GyzT4y7XcsukI7rEw2rCegqabbGoZ4PGPB8hznsVS1YzF7sHfc5qFoS3c7yni8sY8ZOqt7Ku9FTp8W1PxPmvklCUBi/NLVtd9w5r6LrLru1jlvkx66ZsYrIdpPGRjpnM9M515RHwlyOjOzLs/bFzOra0GLhWo6dqgIOy2YNrRRtbuc4y8V0zWrnPoCutI3nCABd9jTJxeTeQzMxPvpxwUEZFWvYJr5XpCNZncqUrgzLrlhN0Whg5m0VWuJ8l6lMS1NShWOrjzRgYTH6Ux9rZ2scT2LDUntUq8diN9LhNhVzqSVonkvITkH0bWvYrk1TN+0sBUi47h1xIJVcvSLTTrE+i26vDajYScJgZqzQzWZpBrMHFzv45BVwITx4wMv5JIX42K2JB9KaDNqKJRreDqJi3XbHr8jjSCO4z8slNHcLuGwHYt944YGGtKZtKj+99JZ9SmJrV9kK6mJU3F9XIdAXsSw84URpwaRlzJBJ5T8XNZASKSE+8POSJy6GK2igtr1VzJV3LDqsRXmUho3wqeyVW2ikiBiCjjnUr+MTNFpFBEykSkQkSKROQhEVH/O/wXIje61Jlc+AEAAAAASUVORK5CYII=",
				command :
				function ()
				{
					gBrowser.loadURI("javascript:var%20x=navigator.userAgent;%20var%20y='%';%20for%20(var%20i=0;i&lt;x.length;i++)%7B%20y+=x.charCodeAt(i).toString(16)+'%';%20%7D%20y=unescape(decodeURI(y.replace(/\%$/,'')));%20alert(x+'\n'+y);%20void(0);")
				},
			},
			{
				name : 'WOT',
				subdir : '',
				image :	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADCElEQVQ4jZ2TXWhbZQCGn++ck5Ock3OSJlvaZv1BcdZZHdRm4M9S5thARAsynYpjigyLP5d6Iwqe4oY4SxWdF6I4GQxlHZN5MdRtOGzNxuwEnR3aVcW6hC1d2qxJ83NOcj4vZIVe7Mb3/n14eOFFvm05sjiSSscYlKO2BNhoskaO2nIqf6jvbP7Dvsm5j/q5QYQsjqRofjGU7pocnpjdkP1m8rnvHtjw8eZXziW5qV2w5BUQaKwKJ4lbq4/8cmL1DudZp7YMSMcYlHXOTZRPZptyAFWM89K+ncwGcxAHPQBSglcHKxBjfXcv7bbZsWvd8dx/Bu9GJDt7aMYyy1rqwn1wYJrt5UWM9aDGQDOhUoRywaQn2Uqys7v75bXf/yNkcSSVEw8eXGNfvq0hB9DEOE98sAWtC2a/5GzlCnlF5+FgO7RthMhaWMxFCSotv32+/e/bhbe4717N/Szz+tEKux8xeWz/JE8/1OHuTWVv/qFC7rrVPYOUfBNr1d3Q1gfF7C3UF/4IKdonr2a+/mkrpc7f4cA09h1w8Kvs0MQb1tCKuT12qC7MT0H5ChjWPKrd+6hS2PXjntCdUSpWk8HsIsEEmD0cHa6Wd8vM8BbHcRTuR6sLTgtA8aEwA5peQzRFr3IhPyU8ajQlGP2ABC/GrfSijF369ZTjOD6naJhR1iEpCQHVEgjVR9PFM8r5/JkxOxjH0AALPJda1GDzFOiPXxiTqSEC6ReIiTjv+AGCIgBBG5peCHyOq8c+zVzu29bhiPAMcyUXtwZBmwE9zEIXXMWkJRBir3eVtC8wlBZEKCkIGQkOPzXTrwB8e/7MHrXWid0C7hLa9M/CyP5pjOhh/SK+cnrpmtjmK4TVOEJENYy4KetV+xKAuD5yerSzEGsrxs1IGbcG1xZUahULCi7KfBVC4IcV9ESE1kSCQ09eFCsAAJve6xr3mm7ar1YQbh3RaKAIiQyoSF1HmAbRUIRjz/+13FsBANj6fuKuhtBfc2VjQJN+Kwh8JFJoVUVrvDn+4txbN3rm/8q/o1YkiCTYFGUAAAAASUVORK5CYII=",
				command :
				function ()
				{
					gBrowser.loadURI("javascript:(function%28%29%7Bvar%20f%3Ddocument.getElementById%28%27wot-bookmarklet%27%29%3Bif%28f%29%7Bf.parentNode.removeChild%28f%29%3Breturn%3B%7Dvar%20l%3Dlocation.hostname%3Bif%28l%26%26l.length%29%7Bf%3Ddocument.createElement%28%27iframe%27%29%3Bif%28f%29%7Bf.setAttribute%28%27id%27%2C%27wot-bookmarklet%27%29%3Bf.setAttribute%28%27src%27%2C%27http%3A//www.mywot.com/bookmarklet/%27+encodeURIComponent%28location.hostname%29%29%3Bf.setAttribute%28%27frameborder%27%2C0%29%3Bf.setAttribute%28%27scrolling%27%2C%27no%27%29%3Bf.setAttribute%28%27style%27%2C%27position%3Afixed%3Btop%3A10px%3Bleft%3A10px%3B%27+%27width%3A135px%3Bheight%3A235px%3Bborder%3A0%3Bmargin%3A0%3Bpadding%3A0%3Bz-index%3A10487575%3B%27%29%3Bif%28document.body%29%7Bdocument.body.appendChild%28f%29%3B%7D%7D%7D%7D)()")
				},
			},
		],
      },
	
    subdirPopupHash : [],
    subdirMenuHash : [],
    _externalAppPopup : null,
    _isready : false,
	unescapeHTML : function(input) {
			return input.replace(/&amp;/g, '&')
		  .replace(/&quot;/g, '\"')
		  .replace(/&lt;/g, '<')
		  .replace(/&gt;/g, '>')
		  .replace(/&apos;/g, '\'');
	},
    init : function () {
    	this.handleRelativePath(this.toolbar.apps);

    	var ExternalAppBtn = document.createElement('toolbarbutton');
    	ExternalAppBtn.id = "ExternalAppbtnMEx-ID";
    	ExternalAppBtn.setAttribute("label", "扩展程序按钮");
    	ExternalAppBtn.setAttribute("onclick", "event.preventDefault();event.stopPropagation();");
    	ExternalAppBtn.setAttribute("tooltiptext", "扩展程序按钮,可以自定义扩展程序和功能");
    	ExternalAppBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
    	ExternalAppBtn.setAttribute("type", "menu");
    	ExternalAppBtn.setAttribute("removable", "true");
    	ExternalAppBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADcklEQVQ4jWWT7U+aBxTFn+/8LfswkqbTJWucMZuN6zTrXupmUzur9X2uIGq164xWFOO68PJIsYCo6GQIxaFF0cegRkBofKhWoKXosCjVDbvalgS9Zx/arJv7JTc3J7nnfjqHYY6hNbuEPfopVmdbDGqt8wda6/yBzra43qOfYrVml/D4/T/IDA5Bm2ZCrRzl0m4+BE8gDE8gDO+b7Q6EoTJx6VbNhFpmcAj+YxbJDILKLhOnveOisRkPxpxuMjvdMDvdr/WMl8ZmvBib8ZLO5qKyjmFOJDO8fVLV/au6QWWBVG+HvHcYS9+VIVz1Ce43n8Mwq0CHdhxS/W9vxo4GlYVKO4bUDMMwTGWXWZhdrUx/06LF100aGqgpx37dO3Rw6wRemN4jF1sMjb2NamU/40KLgr6VdqFcJqfsakW6+PqAkDnbMsievMQis0yNzEsqLDeexgtzBlIrp5AKZ6H/thgPnv6IhY0voPflo8FZgDOSGzhZIsdp8W2WyW8yhIQVOsqsG0FeTR/tKzLwjMuiV+FsvNzJpX7zLfy+b6LVnatwhM9Q1+x5ZFzuoxNV/cgV6ULMqVpd6oN6M3KabCi8akQ7a4TS7IJmyA5W1YY5fhI7z514uKfAfPRzXBttRI7EiqwGK96vMaSYHIk59dG1u5R3/S4qjH5S8nF4t5L05NlLDE77qddqgXZyhIycEnJrPV3sMeJTKUd5bU58KLGkmKJuZyhfyqGgfRpiexgdy1uYeryH4O5zjEw7cPiKx/7TO0hsiHAQyUWZeg6FrAef9SzgnNQZYkrkC+zZmwtU0ruEclOI6rkNKPk4WdbimFsepMODARz91UxHu7lY95dQsf4eig08FfZ6UXRzgWXEWp/wS4U7XT7E44IxgPO/rODi+BrE06tIxktx9EcBjrazcPjwXZhmf0KlJYgKUxBFfffSlVrf62iLR1fVl03rVDsRoStzG7iytElidwTWFSVtrn+FROBj8npK0TK7TN9PRVFte0R1o6vqt1E28ALR+CNONBujRk8crfcT6A7toieUwI21J2jmY2jwxyDxbEHsikE0+ZgTGfhjfXDwgtbFmLrJu53uXt8lTTQJw2aS9JtJsNE/qTO4iyb/dvqHxZha5Dhm/jddvriwcy3BKiN7IXYjmVJFkyl5ZC/U+SDBtvvi/6vz31LBdk6sWYzpAAAAAElFTkSuQmCC)";

    	var ExternalAppPopup = document.createElement('menupopup');
    	ExternalAppPopup.setAttribute('onpopupshowing', 'event.stopPropagation();gExternalAppbuttonMEx.onpopupshowing();');
    	this._externalAppPopup = ExternalAppPopup;
    	ExternalAppBtn.appendChild(ExternalAppPopup);
    	setTimeout(function () { //延时加载菜单，不对启动造成影响，也不影响第一次打开菜单时的响应速度
    		gExternalAppbuttonMEx.loadSubMenu();
    	}, 3000);
    	document.insertBefore(document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(
    	'\
			#ExternalAppbtnMEx-ID {\
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
			#ExternalAppbtnMEx-ID > .toolbarbutton-icon {\
				max-width: 18px !important;\
				padding: 0 !important;\
				margin: 0 !important;\
			}\
			#ExternalAppbtnMEx-ID dropmarker{display: none !important;}\
    	') + '"'), document.documentElement);

    	if (this.moveablePositonOrInsertafter) {
    		var navigator = document.getElementById("navigator-toolbox");
    		if (!navigator || navigator.palette.id !== "BrowserToolbarPalette")
    			return;
    		navigator.palette.appendChild(ExternalAppBtn);
    		this.updateToolbar();
    	} else {
    		var navigator = document.getElementById(this.insertafter);
    		if (!navigator)
    			return;
    		navigator.insertBefore(ExternalAppBtn, navigator.firstChild);
    	}
    },
    loadSubMenu : function () {
    	if (this._isready)
    		return;
    	if (this._externalAppPopup == null)
    		return;
    	var ExternalAppPopup = this._externalAppPopup;
    	for (var i = 0; i < this.toolbar.subdirs.length; i++) {
    		if (this.toolbar.subdirs[i].name == 'separator') {
    			ExternalAppPopup.appendChild(document.createElement('menuseparator'));
    		} else {
    			var subDirItem = ExternalAppPopup.appendChild(document.createElement('menu'));
    			var subDirItemPopup = subDirItem.appendChild(document.createElement('menupopup'));
    			subDirItem.setAttribute('class', 'menu-iconic');
    			subDirItem.setAttribute('label', this.toolbar.subdirs[i].name);
    			subDirItem.setAttribute('image', this.toolbar.subdirs[i].image);
    			gExternalAppbuttonMEx.subdirPopupHash[this.toolbar.subdirs[i].name] = subDirItemPopup;
    			gExternalAppbuttonMEx.subdirMenuHash[this.toolbar.subdirs[i].name] = subDirItem;
    		}
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
    			appsItems.setAttribute('oncommand', "gExternalAppbuttonMEx.exec(this.path, this.args);");
    			appsItems.setAttribute('tooltiptext', this.toolbar.apps[i].name);
    			appsItems.path = this.toolbar.apps[i].path;
    			appsItems.args = this.toolbar.apps[i].args;
    		}
    		if (this.toolbar.apps[i].subdir && gExternalAppbuttonMEx.subdirPopupHash[this.toolbar.apps[i].subdir])
    			gExternalAppbuttonMEx.subdirPopupHash[this.toolbar.apps[i].subdir].appendChild(appsItems);
    		else
    			ExternalAppPopup.appendChild(appsItems);
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
    		if (this.toolbar.configs[i].subdir && gExternalAppbuttonMEx.subdirPopupHash[this.toolbar.configs[i].subdir])
    			gExternalAppbuttonMEx.subdirPopupHash[this.toolbar.configs[i].subdir].appendChild(configItems);
    		else
    			ExternalAppPopup.appendChild(configItems);
    	}
    	if (this.autohideEmptySubDirs) {
    		for (let[name, popup]in Iterator(gExternalAppbuttonMEx.subdirPopupHash)) {
    			if (popup.hasChildNodes()) {
    				continue;
    			} else {
    				gExternalAppbuttonMEx.subdirMenuHash[name].setAttribute("hidden", "true");
    			}
    		}
    	}

    	if (this.moveSubDirstoBottom) {
    		let i = ExternalAppPopup.childNodes.length;
    		while (ExternalAppPopup.firstChild.getAttribute('class') != 'menuitem-iconic' && i-- != 0) {
    			ExternalAppPopup.appendChild(ExternalAppPopup.firstChild);
    		}
    	}
    	this._isready = true;
    },
    onpopupshowing : function () {
    	if (!this._isready)
    		this.loadSubMenu();
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
    updateToolbar : function () {
    	let toolbars = Array.slice(document.querySelectorAll('#navigator-toolbox > toolbar'));
    	toolbars.forEach(function (toolbar) {
    		var currentset = toolbar.getAttribute("currentset");
    		if (currentset.split(",").indexOf("ExternalAppbtnMEx-ID") < 0)
    			return;
    		toolbar.currentSet = currentset;
    		try {
    			BrowserToolboxCustomizeDone(true);
    		} catch (ex) {}
    	});
    }
};
    gExternalAppbuttonMEx.init();

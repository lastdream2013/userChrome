// ==UserScript==
// @name           externalAppButtonM.uc.js
// @namespace      ithinc#mozine.cn
// @description    External Applications button
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

var gExternalAppbuttonM = {
	autohideEmptySubDirs: true,  //自动隐藏没有一个子项目的子目录菜单
	moveSubDirstoBottom: false,  //把主菜单下的子目录移动到最下面
	moveablePositonOrInsertafter: true, //true : ToolbarPalette moveable button  false: insert appbutton in "insertafter" 
	insertafter: 'urlbar-icons',  // useless if moveablePositonOrInsertafter is true;  urlbar-icons addon-bar TabsToolbar alltabs-button
    toolbar: {
     //在这里定义好主菜单下子目录的名字,以及图标(可定义或留空,好图标不好找....)； 可在中间加{name: 'separator'}建立一个目录与目录之间的分隔线
        subdirs: [
            {name: 'windows工具',  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADvUlEQVQ4jZXUX0wUBBzA8R+JY4czRxzcGWqZD5SgIgoJd0doSoaMKwSXYIqYhAP/gWPDdGlPbllYE9haohAC4/gXjoADNVI4FQyUvxegEHZ3HCogKYvavj2E3ms8fB9/n+338PuJiDh5RedGLNleYF0SW8is2l5g9YrOjRARJxER50XbLlhjztzlQLGVgyU2kossJBdZSCmxkmKwklJqJbVyhMNlNg6V2jhYYuNAsZWYM3dZtO2CVUScRURcvLaeI/L0ACvSe/BJ6yQ1b5CO358y9vQfuv94RnrRMKs+68HveC9+x8yszOhlRXoPkacH8Np6DhFxERFRLNRnE/6FGZ+DHXgnt9LSN4FtfBrL+DQjE9N8ZxwmLf8eG0528dahO7y5vx3flHbCjvewUJ+NiChERFzV4Zm8d6wD78Tb6FJbePBwmiH7XwyN/tfOL2/Rfu8JoxN/0/rbE0w9E1xpf8z6I7dRh2ciIq4iIq6em06xKb2NN+KukZbTyZ17k5i6H9M7/JS7g5NsTLtMn2UK84Nn9FumGLBO8fm5LkL2N+G56ZQDUoaeYP2BW7wec5WVH9fzmr6EZVHF+O0oZX/mTQ5900L7wKSj/knWJxnRJV1DGXrCAblpMwjdZ2JxRC25l+5jHppkaGSKmhtWQj6tQ3/kKlXXLdzoHqe5Y4yvL3bhtbmcd5KacNNmOKAFgYfR7LpK6J4GWrrG+aX9EY1tjzB1jrE5uYGjWW0s1xezPPIiyzbn4as38OrGSnQJjSwIPOyA5q/eR0BMDemnW6m/YX/Rjz9beD+pjtbuccxDf/Jr7xi9g5PszLiOKqSS4B1XmL96nwOa55tAwAdV5Ff0UVDVT0nNfYzNdk6evU3GVzcxmuwYm+3Um+zUNdnwDjOg0pQT/FE983wTHJDCO5Y1kRWoAr/HbVUWr/idJXS7gbBdlZTWDtLY8pDGFjuNt+zklppxX5OHR1AZ66JrUXjHOiCXpVEEfHgJ9zWFKAMK8QgsQrn2B9z9z5N49AoVxvuY2kYprDKj31uFu38+ygADgVHVuCyNckBzF0ewLroazyADKk0ZKl05al05Kp0Bj7fPo1ybjbv/t7j7Z6EMzEUVXIJnkIF10dXMXRzxAlLMUb874rMlB028Ec1uI9qEBrSfXEab2IB2bz2aPbUEJVQTHP8TmvhaNLvr0MQb8dmSwxz1BvvzE3ERN/84Jw+t/SWljtnk5KG1iZt/3POjdRaRl0VELSKLZpl6ZtZZZp6S84yqmNn3/6SYmXEWEad/AVgWg/PjJEAaAAAAAElFTkSuQmCC"},
            {name: '常用工具', image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADmklEQVQ4jZXUyU8TaBiA8ZeEhMBhjsZEQqCUsohhXwREoKVDpAlBR1oBkSWyVDA2CJQCLYRAo0ABURCQJSJrtYAKKmLgIi6cTQyiXnSYIRP/hWcO4MhlEj08t/f9Jd/h/URE3BQF9TplsW0noKSZX0lZbNtRFNTrRMRNRMRdWWTbKZhew/xyi/pXWzS+/oD1zTbNb7dp2fxEy+Ynmt9uY32zTePrD9S/2sL8couC6TWURbYdEXEXEfEIKLSiX9hEc/MZ2v4VMgZXOTX8gsyRNXSj6+hG18kcWePU8AsyBlfR9q+gufkM/cImAYVWRMRDRMRTeaGJrOkNUjuXUDuWSe99irZvhYxbz8no3+/Wc7R9K6T3PkXtWCa1c4ms6Q2UF5oQEU8RES9lfgOZY+skt7pIsS+Sdv0R6o7HaLqWSO9eJr17GU3XEuqOx6Rdf0SKfZHkVheZY+so8xsQES8RES//3Aa0faskWGZJst7nRIuL5NZ5TrYtkNK+SEr7IifbFkhunedEi4sk630SLLNo+1bxzz0AKQwWUu1PiDVNEF87RYJ5hkTLLImNcyQ1OUlqcpLYOEeiZZYE8wzxtVPEmiZItT9BYbAcgHLqSbI9JNI4QvTlcWJMd4mtniD26j3iaiaJq5kk9uo9YqsniDHdJfryOJHGEZJsD1Hk1P+A/M7WEV/nIqxkgIiyISIrRoi6NEpU5RjRVeNEV40TVTlG1KVRIitGiCgbIqxkgPg6F35n6w5AZ2qJMc0RqO8iOK+HkPM3CLs4RFjpMOFldwgvu0NY6TBhF4cIOX+D4LweAvVdxJjm8DtT+wPyza4hwjiDKrud7S//oNJ3EVo4QGjRbY4VD3KseJDQotuEFg6g0nftzWS3E2GcwTe75gCUVUN46RT+OhvvPu+iOm0nMMdBoKGboHO9BJ3rJdDQTWCOA9VpO+8+7+KvsxFeOoVv1gHIR1dNePkkCp2V5Y33fPz6jY9//k9fv7G88R6Fzkp4+SQ+uuoDUOYVjpudBBmuofqjmaAcG8GGVkJy2zia387R/HZCctsINrQSlGPbmzFc47jZiU/mlf8gT29t5d9x5lHSOhdRd7hI63CicTwgvceFtncebe886T0uNI4HpHU492Y6F4kzj+L9e9Xu9xPxOBSvzzuiMe56a4x4ayp+MiNH1OV/HYrX530/WncR+U1EDouI9y92eH/XXfY/Jfd91XP/vT+T5/6Ou4i4/QuMxVcZdYKnaAAAAABJRU5ErkJggg==" },
            {name: '网络工具',  image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADsklEQVQ4jZXUS0wTBhjA8Y+ExMDBZCMqpS2FMh6lUmBTD0v0uMWMg8linMEHIYsHl7BEE2JQeT/EAWGkqQalSDoq70ehvNfW1gryfgghZTOByVqBhW0xGnf57zBcd5yH//H7Jd/h+0REQoyFyoy75Rp/fYWG9+luucZvLFRmiEiIiEioqTjaP+s8iX/1HP7V8wR8Fwn4sni5ls3Ln77+p7VsAr4sAr6L+FfP4189x6zzJKbiaL+IhIqI7DMVqXk+cZwFeyqLg2ksDX/Ms5FPWB49wvLoEZYG01kYSGPensriUDqLg2ks2FN5PnEcU5EaEdknIhJmzFfj8xxjtieFOZuBhf5UFuxpLA6mM9NrYHPFxF9vtnmxbGSqS8+czcBsTwo+zzGM+WpEJExEJLw2T8WK4yhT7XqmOw8z221grtfAnC2V8VY9b1/7efvaz5tXv+Bt1jHdeZipdj0rjqPU5qkQkXARkfDqXCVLI+mMW3U8bU1msl3PVMdhxlt0OJsSWXpcwh/b8yy6S3A0JvC0NZlxq46lkXSqc5VB6PaVKObtBjwPEvBaknjSnMS4VcejBzp+D0zyuCuT1pp4bMZ4frz3EV5LEp4HCczbDdy+EhWEKnIUzHTrcdXH4W6Ix9OYgLshHmfTp/y5vcirXR9b6y52A9OMmLS4G+Jx1ccx062nIkcRhEovK5jsSGTMGIvjjhZXfRxjplgmurLY3fSyNn2fCVsO7odfMlCrwXFHy5gxlsmOREov/wcqvhTJxMMEhms0jNbFMGaMpb9azeqTOnbWXfzqs9PxXQqdt9QMfR/DaF0MwzUaJh4mUHwpMggVZB/Ca4mjv1LNUHU0fbdUOO5/xs6GmwVHJZurPawvdWCr1DBQFc1QdTT9lWq8ljgKsg8FoRsXDuJp0tJXpqK3VInX+hW/vZjk5xkL5rwYeo2fs7PhZcVTja1cycBtNX1lKjxNWm5cOBiErp09gNscQ3exktbrCjae9bHsMdFcpKf5ZhRNeQo8bTlsLPfTlq/AVqaiu1iJ2xzDtbMHgtDV0xE4zVq6SpS03FRgzlVwL1eBtVBJb5WGzspoGq9HYb6moKUgip4yFV0lSpxmLVdPR/wLhX17KuJlW1Us7mYdrh+ScFiScFp0eFqSedKewuO2FFzWZJwWHY+sOtzWJNzNOtqqYsk5FbH17kT2nTmxP/ObLz7YupzxIe9Z4MyJ/ZnvjjZURPaLSKSIqN6zyL3ZUNl7SqF7atjevv+nsL2ZUBEJ+Rs6+oxWuBqWjQAAAABJRU5ErkJggg=="},
            {name: '编辑工具',  image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADt0lEQVQ4jZXUT0wTBhTH8UdCQvCwxAtD4x8UCypVxIAoilhEMiOJBxKjAQIiBmVIGbbUxtqOyIrWIRTRWFAobeWfUiilojCULR4Gjj+ZqCAXQwygmBg1nr87gOtVD7/Te++TvMN7IiIBCrU+LVJjmovUlPF9Mc0p1Po0EQkQEQmMKDHNZXYPoBmdRDs2xbnxV+jHp9GOTlI6NkXp2BTa0Un049OcG3+FdmwKzegkmd0DRJSY5kQkUEQkSFFsJL1/CJWrl+TmB6S09qFy+Cj942/efPrCm09f0A0MoXL4SGntI7n5ASpXL+n9QyiKjYhIkIhI8IYzBg71PCHxtockuxeVw0divZuZj5853uLjeIuPmY+fSax3o3L4SLJ7Sbzt4VDPEzacMSAiwSIiy8IL9KR2PCLhxj322NzsvdXFTusdJubfk+P0kOP0MPH2PTutd9h7q4s9NjcJN+6R2vGI8AI9IrJMRGTZ+nwdyS19xF9tZpe1jYTau8RZGsl3eZle+MD0wgdOubzEWRpJqL3LLmsb8VebSW7pY32+zg+ty9OSZO8hpqyeHZcdxP/uIt7iYJuxlgrvIBXeQbYZa4m3LNZ2XHYQU1ZPkr2HdXlaPxSWe5Y4aysFDV62X7hJtNFGrLmRrYbrVHQ/pqL7MVsN14k1NxJttLH9wk0KGrzEWVsJyz3rh9ZmFxNjdvJydoGR17OkXmoi2mQjSlfDRfcAF90DROlqiDbZSL3UxMjrWV7OLhBjdrI2u9gPrcksQnm+DufgMO6hf9mstqDUXWNjSSWm9oeY2h+ysaQSpe4ayl+u0P3Pc5yDwyjP17Ems8gPrT5WyGZ9HWEZGn5rv091z19Eqq8QobZgbO3F2NpLhNpCpPoK1p4/KW+7T1iGhs36OlYfK/RDq44UoDQ2EZ5rZGOeAdfgUzqHJjha6aCio5+Kjn6OVjrwDD/HNfiUTScvEJ5rRGlsYtWRAj+0Mj2fLWUOFKfNhJ80oThhILfGiW/kBc9m5nk2M49v5AW5NU4UJwyLPafNbClzsDI93w+tOJxHXFUbUZpqokqrUWqr2FRkJrKwnMiff11MYTmbiswotVVElVYTpakmrqqNFYfz/oeCf0zLfhtrtrHP7kFl97C/yUOKvYuUxk4ONHRwoKGDlMZOUuxd7G9a7Nln9xBrthF6KOfd1xMJWr47LSPkp6x3IQezCDmY+Y3JIuRg5vzy3WkZX482UER+EJFQEVn1nQldmg2UpacUuKQGL+37LQlemgkUkYD/AEq2dU4D+CN7AAAAAElFTkSuQmCC"},
            {name: '图像影音',  image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADm0lEQVQ4jZXU3U8TVhiA8ZekicGLJSaTcCFqzNA4EzXGkKhZGiLq6gcyFOlkWFtcaKmytVhXAlTLR1kjgwY/Kh91VRxi3Yg4Nxt1mMxNGStYKYNSKiJTUcRtZn/AswvqmixezItfck5yzpOci/eIiCRs3qPfmqktntyu+4Q3kaktnty8R79VRBJERBRbNMZJ9/ku/HeC+HuCXPvlHjd6B/ghEKI7MMiN3gH8PXe5ersf/527+HuC+O8EcZ/vYovGOCkiChGRWao8PZ7L3djc7dibO6hu9eE4/TWfe7/B4fHxxdlO+oai9A1FKT/Rhr25A5u7Hc/lblR5ekRklohI4kb1Php9V7G6zlB2rA3bya+wu89T1dRBWeMZBkfHefHyb+pOX6TU9SVlx9qwus7Q6LvKRvU+RCRRRGR2eraG2rZLmJxNWOpasdS1UnK0eWZ9tJlbgQGqj3vZX+nCVOvm4NEWTM4matsukZ6tQURmi4jMVmbuxt7iw2hvxFDRwBGXl5s9QX4KhKj3XOBIg4fvum8TGAjTcaUbQ3k9Rnsj9hYfyszd8dBa1U5KXefQHnRgdZ7i0dPnPHk2zeNn0zz/4y+m/3zJk6kXPHo6xeOpaWz1HnSWWkpd51ir2hkPpWVsx+zwoi4q58atXiJjvzNyf4LIgwkiDx7FTDByf4LW9kvkGsrQmKoxO7ykZWyPh1YpVRhsJ8nUmrk3NEpoOEooPPZalfUt7Nj3GblFFRhsJ1mlVMVDy9dloLM28P7u/fwcCNEXGqE/FKF/8D9CETq6rrFtr5kPCg6hszawfF1GPLQ0TUm+2cmGnELO+q7QGxwiMBB+rVD4Pk1tnWxSG8k3O1mapoyHUleuIfdADet3FGKwVNM/OMLd3yIx0ZiZff/gCBe/vU569sfkHqghdeWaeGjhstXkFNnZsEvPe9s0tHd+z3B0nOHoQ8Ixw9GHDEfHCYWj7CooIT27gJwiOwuXrY6HUpasQF1cxaYPjazPKUSVW8iV6z8yNDqG90IXDafOcvP2r4TCUcwVTpRZWjaqi1AXV5GyZMW/ocTkRe8+y9JZ0B8+gcF2Ap21jnxTFR+ZKtlrqUF7yEG+qZK8T4+wp8SBvuIY+sPHydJZSF60dOrViMyak7QgLykldWru/MXMTZnx9rzU15o7L3XmzPzFJM1/5+mcpAV5r4ZWISJviUiyiMx7Q8mxuwqJfUqKWDUx9t7/IzF2RyEiCf8AaBijWJqLC6wAAAAASUVORK5CYII="},
            {name: 'separator'},
            {name: '常用目录' , image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACEElEQVQ4jd3SvWtTURzG8Q7ubv4BCi5tVUgTEB0FcXIRXXwDEdR2kCqFimALNhHEQmkUBbEUtUOpdSgOTmIFX9Lapk1sbm7TmLQ2NMHm5r7f3JfzdbA2wcFFJx944PyWzzkHfi0t/0eyU6FkYfqsW3x3vqnnXPnV4ZWFyT27Zsd37/y9b/padmwD8lTYESIABAgBW2fPrrD2obO++r7T+dX12V57PXG9KL3cf7IBTHbUhG/jfBvEzA9hFkawihMIT0EEBsLXEb76c/aqELh1eTKcbnxhPKIFroqZj2PkhtG+9LOZuEJlpgslNYCy2IeSvEF1vofqfDeeXSb7IqQ3AR2uZ22gpONU5+5QfnsNq/wJ4Wtbt2sIv9Z4AQJ5PGI3gOcRFwQEDgQW+CbC1/EtCacUx14bwPrag7l8CUM6jW9kkJ+Gm4DRcF34Fr72EU95jft9gvrGY+y1u1iFm1i5LszsGYyl4+ipI/h6EnmkCZAfhZ3A1XA3p6iXn+GU7mOvDmDlezCXL2JkTqGnj6EtHEKdO4CnzSI/bAbiYVu4CvXyKM76EHaxHyvfjSlfwMicQE8dRUseRP28j9rMXjwtgRxvAqTBUMlVcjVjZSwwlp+gyw/QpUH0TBQtfQst1Yu62I2a7EKdv4xTmRbZe6HaNrB0u/VqJtY+JkXbK1Kszf5jo222FGtTM9HW4b/Z/n+XHynp6NSPz0b4AAAAAElFTkSuQmCC"},
            {name: 'firefox目录',  image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACEElEQVQ4jd3SvWtTURzG8Q7ubv4BCi5tVUgTEB0FcXIRXXwDEdR2kCqFimALNhHEQmkUBbEUtUOpdSgOTmIFX9Lapk1sbm7TmLQ2NMHm5r7f3JfzdbA2wcFFJx944PyWzzkHfi0t/0eyU6FkYfqsW3x3vqnnXPnV4ZWFyT27Zsd37/y9b/padmwD8lTYESIABAgBW2fPrrD2obO++r7T+dX12V57PXG9KL3cf7IBTHbUhG/jfBvEzA9hFkawihMIT0EEBsLXEb76c/aqELh1eTKcbnxhPKIFroqZj2PkhtG+9LOZuEJlpgslNYCy2IeSvEF1vofqfDeeXSb7IqQ3AR2uZ22gpONU5+5QfnsNq/wJ4Wtbt2sIv9Z4AQJ5PGI3gOcRFwQEDgQW+CbC1/EtCacUx14bwPrag7l8CUM6jW9kkJ+Gm4DRcF34Fr72EU95jft9gvrGY+y1u1iFm1i5LszsGYyl4+ipI/h6EnmkCZAfhZ3A1XA3p6iXn+GU7mOvDmDlezCXL2JkTqGnj6EtHEKdO4CnzSI/bAbiYVu4CvXyKM76EHaxHyvfjSlfwMicQE8dRUseRP28j9rMXjwtgRxvAqTBUMlVcjVjZSwwlp+gyw/QpUH0TBQtfQst1Yu62I2a7EKdv4xTmRbZe6HaNrB0u/VqJtY+JkXbK1Kszf5jo222FGtTM9HW4b/Z/n+XHynp6NSPz0b4AAAAAElFTkSuQmCC" },
            {name: 'firefox配置文件',  image:  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADTElEQVQ4jV3SW0xTBxjA8fOyhz3Ppz3s0fmwLCxshiUs0SzZgmQxMzgVpDwwp2TDzWwZilkiC5egCGzowiXoQgEJNx0akHFpi9qGCtK11BXOgV64tyscVNqec3r63wN6luxLvsf/L9/DJwgvx9S9uN/UE7SXjYYpGVqneGCVM3eWKegJyqbe0FJBT3CmoCc4ZeoNjph6g10nuwPZ6U1Tr73qhbxOqbjGGub/80LRCT/XmIsk8KwmsPt36Hy8QX7XYjT3lpj/H9DmK2+2RwAIbSVZk3Ui2zqbOzrbCZ24qqMmd9G4lsI6/4Jc83zYAI7d9Pza4Yyg6eDd0PFFdMSwjj+qE5J1lrd1luVd4bvfAygaVN33YwA5zTPtA64ocgycQZWpJQ3XkoZnVcO7oeHbSCKGk+jAuVY3trlNjjbPrBjAkQbniG1OJhjVsM4rTEgKjxYVHAEVZ0hlOqTinR3G13Ec8Y8KXK2f0HXt5GUD+Kz2wbxvbQf3isrovMKoqGARVWwLuzvj6mNtvATZfQ+er7Dl7sVR8+m6AWRXjSpyLInDrzAmKVgkFZuo8mBBZdo1QNRbhrI0wJr1CjFPP8nAQzw3T8UFQRCED891v55dMUxcS2GTFCxSAouUwComcLrH2Jz9CT32kNjCN0SdxfxtLsTdkv/P5NXP9wqCIAiZJd1vHakcRkmmsEgKFjGBVUow+WSETc8F9LiDHamAeCiPZ09Lcf+WpTsvH0gzzj/wfee+LyqH0FMpJhZVLJLK2Hgfa49LXsYm4sFctmcvIjZlc6r0qteI079q2pN51txT0+9lRdZpc8S5M3gb7/CP6LEJ4v5CEqF8ZM8FpMZDjNunyTzbftcAMk63HMsouhE7UXGPix1zXKquwztYyl9D9SxPHmXHn0fUdR7X9cO4fQHaRnxkFLXeMID9hU3VFe0O4/e7qz+GZwF8zTmMl77Jo8Ys7LVZNNyyI66rXL/9hA8KG68YwHv5DWeK6+9j/vMpd+1+yk+/i+K4hjL5C5MVB+n/+m3kFR/+iMbqlsalVhvppoZvDWDviZo9aXl15Wl59ea03LrBnI/e0CtN+1IjVYdoKctJZX1ZxcGiZg7/YKbg5z7Scuvm3jle+/6r/l9E3rT3AA8mrAAAAABJRU5ErkJggg==" },
        ],
        	
        //1.在这里定义好想要出现在主菜单下,或在主菜单子目录下的程序(subdir没有定义, 或在上面子目录名列表中找不到名称相匹配的[比如写错了], 就会出现在主菜单下面)； 
        //2. 可在中间加{name: 'separator'},  分隔线如果定义了子目录名,就出现在子目录下面；没有定义就在主目录下面.
        //3. 这里定义的可以重复. 例如IE浏览器我想出现在windows工具下面, 又想出现在子菜单下面,   那么就定义二次:
        //    {name: 'IE浏览器', path: 'C:\\Program Files\\Internet Explorer\\IEXPLORE.EXE', args: ['%u'], subdir: 'windows工具' },
        //	  {name: 'IE浏览器', path: 'C:\\Program Files\\Internet Explorer\\IEXPLORE.EXE', args: ['%u'] },
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
            {name: 'chrome', path: '\\chrome'}, 
        ],
	},
	
    subdirPopupHash : [],
    subdirMenuHash : [],
    _externalAppPopup : null,
    _isready : false,
    init : function () {
    	this.handleRelativePath(this.toolbar.apps);

    	var ExternalAppBtn = document.createElement('toolbarbutton');
    	ExternalAppBtn.id = "gExternalAppbuttonM-ID";
    	ExternalAppBtn.setAttribute("label", "外部程序按钮");
    	ExternalAppBtn.setAttribute("onclick", "event.preventDefault();event.stopPropagation();");
    	ExternalAppBtn.setAttribute("tooltiptext", "外部程序按钮,可以自定义外部程序和路径");
    	ExternalAppBtn.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
    	ExternalAppBtn.setAttribute("type", "menu");
    	ExternalAppBtn.setAttribute("removable", "true");
    	ExternalAppBtn.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADcklEQVQ4jWWT7U+aBxTFn+/8LfswkqbTJWucMZuN6zTrXupmUzur9X2uIGq164xWFOO68PJIsYCo6GQIxaFF0cegRkBofKhWoKXosCjVDbvalgS9Zx/arJv7JTc3J7nnfjqHYY6hNbuEPfopVmdbDGqt8wda6/yBzra43qOfYrVml/D4/T/IDA5Bm2ZCrRzl0m4+BE8gDE8gDO+b7Q6EoTJx6VbNhFpmcAj+YxbJDILKLhOnveOisRkPxpxuMjvdMDvdr/WMl8ZmvBib8ZLO5qKyjmFOJDO8fVLV/au6QWWBVG+HvHcYS9+VIVz1Ce43n8Mwq0CHdhxS/W9vxo4GlYVKO4bUDMMwTGWXWZhdrUx/06LF100aGqgpx37dO3Rw6wRemN4jF1sMjb2NamU/40KLgr6VdqFcJqfsakW6+PqAkDnbMsievMQis0yNzEsqLDeexgtzBlIrp5AKZ6H/thgPnv6IhY0voPflo8FZgDOSGzhZIsdp8W2WyW8yhIQVOsqsG0FeTR/tKzLwjMuiV+FsvNzJpX7zLfy+b6LVnatwhM9Q1+x5ZFzuoxNV/cgV6ULMqVpd6oN6M3KabCi8akQ7a4TS7IJmyA5W1YY5fhI7z514uKfAfPRzXBttRI7EiqwGK96vMaSYHIk59dG1u5R3/S4qjH5S8nF4t5L05NlLDE77qddqgXZyhIycEnJrPV3sMeJTKUd5bU58KLGkmKJuZyhfyqGgfRpiexgdy1uYeryH4O5zjEw7cPiKx/7TO0hsiHAQyUWZeg6FrAef9SzgnNQZYkrkC+zZmwtU0ruEclOI6rkNKPk4WdbimFsepMODARz91UxHu7lY95dQsf4eig08FfZ6UXRzgWXEWp/wS4U7XT7E44IxgPO/rODi+BrE06tIxktx9EcBjrazcPjwXZhmf0KlJYgKUxBFfffSlVrf62iLR1fVl03rVDsRoStzG7iytElidwTWFSVtrn+FROBj8npK0TK7TN9PRVFte0R1o6vqt1E28ALR+CNONBujRk8crfcT6A7toieUwI21J2jmY2jwxyDxbEHsikE0+ZgTGfhjfXDwgtbFmLrJu53uXt8lTTQJw2aS9JtJsNE/qTO4iyb/dvqHxZha5Dhm/jddvriwcy3BKiN7IXYjmVJFkyl5ZC/U+SDBtvvi/6vz31LBdk6sWYzpAAAAAElFTkSuQmCC)";

    	var ExternalAppPopup = document.createElement('menupopup');
    	ExternalAppPopup.setAttribute('onpopupshowing', 'event.stopPropagation();gExternalAppbuttonM.onpopupshowing();');
    	this._externalAppPopup = ExternalAppPopup;
    	ExternalAppBtn.appendChild(ExternalAppPopup);
    	setTimeout(function () { //延时加载菜单，不对启动造成影响，也不影响第一次打开菜单时的响应速度
    		gExternalAppbuttonM.loadSubMenu();
    	}, 3000);
    	document.insertBefore(document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(
    	'\
			#gExternalAppbuttonM-ID {\
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
			#gExternalAppbuttonM-ID > .toolbarbutton-icon {\
				max-width: 18px !important;\
				padding: 0 !important;\
				margin: 0 !important;\
			}\
			#gExternalAppbuttonM-ID dropmarker{display: none !important;}\
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
    			gExternalAppbuttonM.subdirPopupHash[this.toolbar.subdirs[i].name] = subDirItemPopup;
    			gExternalAppbuttonM.subdirMenuHash[this.toolbar.subdirs[i].name] = subDirItem;
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
    			appsItems.setAttribute('oncommand', "gExternalAppbuttonM.exec(this.path, this.args);");
    			appsItems.setAttribute('tooltiptext', this.toolbar.apps[i].name);
    			appsItems.path = this.toolbar.apps[i].path;
    			appsItems.args = this.toolbar.apps[i].args;
    		}
    		if (this.toolbar.apps[i].subdir && gExternalAppbuttonM.subdirPopupHash[this.toolbar.apps[i].subdir])
    			gExternalAppbuttonM.subdirPopupHash[this.toolbar.apps[i].subdir].appendChild(appsItems);
    		else
    			ExternalAppPopup.appendChild(appsItems);
    	}

    	if (this.autohideEmptySubDirs) {
    		for (let[name, popup]in Iterator(gExternalAppbuttonM.subdirPopupHash)) {
    			if (popup.hasChildNodes()) {
    				continue;
    			} else {
    				gExternalAppbuttonM.subdirMenuHash[name].setAttribute("hidden", "true");
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
    		if (currentset.split(",").indexOf("gExternalAppbuttonM-ID") < 0)
    			return;
    		toolbar.currentSet = currentset;
    		try {
    			BrowserToolboxCustomizeDone(true);
    		} catch (ex) {}
    	});
    }
};
    gExternalAppbuttonM.init();

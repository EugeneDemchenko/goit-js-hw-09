const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=document.querySelector("body");e.setAttribute("disabled",""),t.addEventListener("click",(function(){e.removeAttribute("disabled"),t.setAttribute("disabled",""),timerID=setInterval((()=>{r.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(function(){clearInterval(null),t.removeAttribute("disabled"),e.setAttribute("disabled","")}));
//# sourceMappingURL=01-color-switcher.09e3371e.js.map

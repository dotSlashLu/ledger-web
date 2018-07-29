// document.ready                                  
function ready(callback) {                         
    // in case the document is already rendered    
    if (document.readyState!='loading') callback();
    // modern browsers                             
	else if (document.addEventListener) 
		document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

function formatTime(t) {
	if (!t) return ""
	let ret = ""
	if (!(t instanceof Date))
		t = new Date(t)
	let options = {  
	    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
	    hour12: false 
	};  

	return t.toLocaleTimeString("zh-cn", options)
}

export { ready, formatTime }
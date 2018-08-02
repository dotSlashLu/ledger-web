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

function readyFor(callback, ...urls) {
    if (arguments.length == 1)
        return ready(callback)

    let pathname = window.location.pathname
    console.log(urls)
    urls.forEach(url => {
        if (pathname.endsWith(url))
            return ready(callback)
    })
}

/*
[
    {
        paths: ["index.html", "/"]
        modules: [initA, initB],
        before: [promiseA, promiseB]
    }, ...
]
*/
class Route {
    constructor(routeConfig) {
        this.config = routeConfig
        this.init()
    }

    init() {
        console.debug("init router")
        this.config.forEach(route => {
            console.debug("init route", route)
            let urlCB = () => {
                console.debug("url cb")

                if (route.before) { 
                    route.beforePromises = route.before.map(b => {return b()})
    
                    return Promise.all(route.beforePromises).then(() => {
                        route.modules.forEach(m => {
                            console.debug("should load module")
                            m()
                        })
                    })
                }

                route.modules.forEach(m => {
                    console.debug("should load module")
                    m()
                })
            }
            readyFor(urlCB, ...route.paths)
        })
    }
}

export { ready, readyFor, formatTime, Route }
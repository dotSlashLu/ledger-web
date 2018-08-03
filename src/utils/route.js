import { readyFor } from "./dom"

function isPromise(obj) {
    return obj && typeof obj.then === 'function'
}

function waterfall(list) {
    // malformed argument
    list = Array.prototype.slice.call(list);
    if (!Array.isArray(list) // not an array
        ||
        typeof list.reduce !== "function" // update your javascript engine
        ||
        list.length < 1 // empty array
    ) {
        return Promise.reject("Array with reduce function is needed.")
    }

    if (list.length == 1) {
        if (typeof list[0] != "function")
            return Promise.reject("First element of the array should be a " +
                "function, got " + typeof list[0])
        return Promise.resolve(list[0]())
    }

    return list.reduce(function(l, r) {
        // first round
        // execute function and return promise
        var isFirst = (l == list[0])
        if (isFirst) {
            if (typeof l != "function")
                return Promise.reject("List elements should be function to" +
                    " call.")

            var lret = l()
            if (!isPromise(lret))
                return Promise.reject("Function return value should be a " +
                    "promise.")
            else
                return lret.then(r)
        }

        // other rounds
        // l is a promise now
        // priviousPromiseList.then(nextFunction)
        else {
            if (!isPromise(l))
                Promise.reject("Function return value should be a promise.")
            else
                return l.then(r)
        }
    })
}

function pathMatchCB(route) {
    return () => {
        console.log("url cb")
        var oneByOnePromise = new Promise((resolve) => {resolve()})
        if (route.beforeOneByOne) {
            console.log("one by one...")
            oneByOnePromise = waterfall(route.beforeOneByOne)
        }

        if (route.before) {
            route.beforePromises = route.before.map(b => {
                return b()
            })

            return oneByOnePromise.then(() => {
                console.log("one by one done, executing before")
                Promise.all(route.beforePromises)
            })
            .then(() => {
                route.modules.forEach(moduleInit => {
                    console.log("should load module")
                    moduleInit()
                })
            })
        }

        oneByOnePromise.then(() => {
            route.modules.forEach(moduleInit => {
                console.log("should load module")
                moduleInit()
            })
        })
    }
}

class Route {
    constructor(routeConfig) {
        this.config = routeConfig
        this.init()
    }

    init() {
        console.log("init router")
        this.config.forEach(route => {
            console.log("init route", route)
            readyFor(pathMatchCB(route), ...route.paths)
        })
    }
}

export default Route
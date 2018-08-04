const http = require("axios")

import config from "../config"

export default () => {
	return http.get(config.apiBase + "/user/status")
	.then(resp => {
		if (!resp.data.login && 
			!window.location.pathname.endsWith("login.html")) {
			console.log("not logged in, should jump to login page")
			throw("not logged in")
		}
	})
	.catch(err => {
		// console.error(err)
		if (!window.location.pathname.endsWith("login.html"))
			window.location.href = "/login.html"
		// throw an uncaught exception to stop the execution of the promise 
		// chain
		throw("not logged in")
	})
}
const http = require("axios")

import config from "../config"

export default () => {
	return http.get(config.apiBase + "/user/status")
	.then(resp => {
		if (!resp.data.login && !window.location.pathname.endsWith("login.html"))
			window.location.href = "/login.html"
	})
	.catch(err => {
		console.error(err)
		if (!window.location.pathname.endsWith("login.html"))
			window.location.href = "/login.html"
	})
}
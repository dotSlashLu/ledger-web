import "./models/category"

import statInit from "./stat"
import addInit from "./add"
import recentInit from "./recent"

import loginInit from "./login"

import Route from "./utils/route"
import loginStatus from "./models/login_status"
import category from "./models/category"

const routes = [{
	paths: ["/", "index.html"],
	modules: [statInit, addInit, recentInit],
	beforeOneByOne: [loginStatus, category.load]
}, {
	paths: ["login.html"],
	modules: [loginInit]
}]
new Route(routes)
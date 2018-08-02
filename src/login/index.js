const http = require("axios")

import { readyFor } from "../utils/util"
import config from "../config"

export default function init() {
    console.log("login loaded")

    http.post(config.apiBase + "/user/login", {
        username: "test",
        password: "test"
    })
}
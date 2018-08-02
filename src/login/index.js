const http = require("axios")

import { readyFor } from "../utils/util"
import config from "../config"

readyFor(() => {
    console.log("login loaded")

    http.post(config.apiBase + "/user/login", {
        username: "test",
        password: "test"
    })
}, "login.html")
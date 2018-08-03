const http = require("axios")

import { readyFor } from "../utils/util"
import config from "../config"

var $form

function bindForm() {
    $form.addEventListener('submit', e => {
        e.preventDefault()
        const f = new FormData(e.target);
        var data = {}
        for (const [key, value]  of f.entries()) {
            data[key] = value;
        }
        console.log("submit data", data)

        http.post(config.apiBase + "/user/login", data)
        .then(resp => {
            if (resp.data.status == "ok")
                return window.location.href = "/"
            alert("登录失败")
        })
        .catch(err => {
            alert("登录失败：" + err)
        })
    })
}

export default function init() {
    console.log("login loaded")
    $form = document.querySelector("form")

    bindForm()


}
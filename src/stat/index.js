const http = require("axios")
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/bar')
require('echarts/lib/component/title')

import { ready } from "../utils/util"
import config from "../config"
import category from "../models/category"
import chartOptions from "./chart_options"

import "./stat.css"

var $overviewBlock, $statBlock

function renderCat() {
    category.promise.then(() => {
        return http.get(config.apiBase + "/stat/class_group", {
            params: {
                from: defaultBillCycleFrom().toISOString(),
                to: new Date().toISOString()
            }
        })
    }).then(resp => {
        let data = resp.data.map(o => {
            let cat = category.map[o.class] ? category.map[o.class]["name"] : 
                "Unkonwn"
            return {
                value: o.cost,
                name: cat
            }
        })
        
        let chart = echarts.init(
            $statBlock.querySelector(".stat-chart.cat-group")
        )

        chart.setOption(chartOptions.catPie(data))
    })
    .catch(e => {
        if (e.response && e.response.status == 405) {
            console.log("unauthorized, should be redirected to login soon")
            return
        }
        console.error("failed to render cat", e)
        alert("failed to render cat")
    })
}

function renderTrend() {
    // 最终目标结合category 比例做成堆叠
    // http://gallery.echartsjs.com/editor.html?c=bar-y-category-stack
    let now = new Date(),
    from = new Date(now.getFullYear() - 1, now.getMonth(), 1),
    to = now
    http.get(config.apiBase + "/stat/month_group", {
        params: {
            from: from.toISOString(),
            to: to.toISOString()
        }
    }).then(resp => {
        console.log("trend", resp.data)
        let x = [], y = []
        resp.data.forEach(o => {
            x.push(o.month)
            y.push(o.cost_sum)
        })
        let chart = echarts.init(
            $statBlock.querySelector(".stat-chart.month-group")
        )
        chart.setOption(chartOptions.monthBar(x, y))
    })
}

function defaultBillCycleFrom() {
    let now = new Date()
    if (now.getDate() >= 15) {
        // this month 15 ~ now
        // new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
        return new Date(now.getFullYear(), now.getMonth(), 15)
    } else {
        // prev month 15 ~ now
        return new Date(now.getFullYear(), now.getMonth() - 1, 15)
    }
}

function renderOverview() {
    let $from = $overviewBlock.querySelector(".range-from"),
        $to = $overviewBlock.querySelector(".range-to"),
        from = $from.value, to = $to.value, now = new Date()
    if (!from) {
        from = defaultBillCycleFrom()
    } else {
        from = new Date(from)
    }
    if (!to) {
        to = new Date()
    } else {
        to = new Date(to)
    }

    http.get(config.apiBase + "/stat/overview", {
        params: {
            from: from.toISOString(),
            to: to.toISOString()
        }
    }).then(resp => {
        const data = resp.data
        let $today = $overviewBlock.querySelector(".overview-stat.today"),
            $avg = $overviewBlock.querySelector(".overview-stat.avg"),
            $sum = $overviewBlock.querySelector(".overview-stat.sum"),
            $predict = $overviewBlock.querySelector(".overview-stat.predict")
        $today.innerHTML = data.today_sum.toFixed(2)
        $avg.innerHTML = data.cost_daily_avg.toFixed(2)
        $sum.innerHTML = data.cost_sum
        $predict.innerHTML = (data.cost_daily_avg * 31).toFixed(2)
    }).catch(e => {
        if (e.response && e.response.status == 405) {
            console.log("unauthorized, should be redirected to login soon")
            return
        }
        console.error("failed to render overview", e)
        alert("failed to render overview")
    })
}

function bindOverviewRangeToggle() {
    $overviewBlock.querySelector(".range-toggle").onclick = () => {
        let $range = $overviewBlock.querySelector(".range")
        let cls = $range.className
        if (cls.indexOf("d-none") >= 0) {
            cls = cls.replace("d-none", "")
        } else {
            cls += " d-none"
        }
        $range.className = cls
    }
}

function init() {
    console.log("stat ready")
    $overviewBlock = document.querySelector("#block-overview")
    $statBlock = document.querySelector("#block-stat")

    bindOverviewRangeToggle()
    renderOverview()
    renderCat()
    renderTrend()
}

export default init

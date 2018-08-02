const http = require("axios")
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/bar')
require('echarts/lib/component/title')

import { ready } from "../utils/util"
import config from "../config"
import category from "../models/category"

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
        let option = {
            title: {
                text: '',
                left: '50%',
            },
            // color:['#f6da22','#bbe2e8','#6cacde','#1cadde','#3cadde'],
            series: [{
                type: 'pie',
                data: data,
                radius: ['25%', '75%'],
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                }
            }]
        }

        chart.setOption(option)
    })
    .catch(err => {
        alert("failed to render cat: " + err)
        console.error(err)
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
        // http://gallery.echartsjs.com/editor.html?c=bar-tick-align
        let option = {
            // color: ['#3398DB'],
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [{
                type : 'category',
                data : x,
                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis : [{
                type : 'value',
                axisLabel: {
                    show: true
                }
            }],
            series : [{
                // name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data: y
            }]
        }
        chart.setOption(option)
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
        let $avg = $overviewBlock.querySelector(".overview-stat.avg"),
            $sum = $overviewBlock.querySelector(".overview-stat.sum"),
            $predict = $overviewBlock.querySelector(".overview-stat.predict")
        $avg.innerHTML = data.cost_daily_avg
        $sum.innerHTML = data.cost_sum
        $predict.innerHTML = data.cost_daily_avg * 31
    }).catch(err => {
        alert("render overview failed:" + err)
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
    let path = window.location.pathname
    if (!path.endsWith("/") && !path.endsWith("/index.html"))
        return
    console.log("stat ready")
    $overviewBlock = document.querySelector("#block-overview")
    $statBlock = document.querySelector("#block-stat")

    bindOverviewRangeToggle()
    renderOverview()
    renderCat()
    renderTrend()
}

export default init

// ready(() => {
//     let path = window.location.pathname
//     if (!path.endsWith("/") && !path.endsWith("/index.html"))
//         return
//     console.log("stat ready")
//     $overviewBlock = document.querySelector("#block-overview")
//     $statBlock = document.querySelector("#block-stat")

//     bindOverviewRangeToggle()
//     renderOverview()
//     renderCat()
//     renderTrend()
// })
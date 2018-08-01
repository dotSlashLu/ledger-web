const http = require("axios")
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/title')

import { ready } from "../utils/util"
import config from "../config"

var $overviewBlock, $statOverviewBlock

function renderCat() {
    var myChart = echarts.init(document.getElementById('test'));

    var data = [];
    var labelData = [];
    var serill=['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'];
    for (var i = 0; i < 5; ++i) {
        data.push({
            value: 1,
            name: i + ':00'
        });
        labelData.push({
            value: 1,
            name:serill[i]
        });
    }

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
        }, {
            type: 'pie',
            data: labelData,
            radius: ['75%', '75%'],
            zlevel: 1,
            labelLine: {
                normal: {
                    show: true
                }
            },
            label: {
                normal: {
                    show: true
                }
            }
        }]
    };

    myChart.setOption(option);
}

function defaultBillCycle() {
    let now = new Date()
    if (now.getDate() >= 15) {
        // this month 15 ~ now
    } else {
        // prev month 15 ~ now
    }
}

function renderOverview() {
    let $from = $overviewBlock.querySelector(".range-from"),
        $to = $overviewBlock.querySelector(".range-to"),
        from = $from.value, to = $to.value, n = new Date()
    if (!from) {
        from = new Date(n.getFullYear().toString() + "-" + n.getMonth().toString() + "-15 00:00:00")
        console.log(n.getFullYear().toString() + "-" + n.getMonth() - 1 + "-15 00:00:00")
    } else {
        from = new Date(from)
    }
    if (!to) {
        to = new Date(n.getFullYear().toString() + "-" + (n.getMonth() + 1).toString() + "-15 00:00:00")
    } else {
        to = new Date(to)
    }

    http.get(config.apiBase + "/stat/overview", {
        params: {
            from: from.toISOString(),
            to: to.toISOString()
        }
    })
    .then((resp) => {
        const data = resp.data
        let $avg = $overviewBlock.querySelector(".overview-stat.avg"),
            $sum = $overviewBlock.querySelector(".overview-stat.sum"),
            $predict = $overviewBlock.querySelector(".overview-stat.predict")
        $avg.innerHTML = data.cost_daily_avg
        $sum.innerHTML = data.cost_sum
        $predict.innerHTML = data.cost_daily_avg * 31
    })
}
ready(() => {
    $overviewBlock = document.querySelector("#block-overview")

    console.log("stat ready")
    renderOverview()
    renderCat()
})
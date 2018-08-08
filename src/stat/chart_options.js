function catPie(data) {
    return {
        title: {
            text: '',
            left: '50%',
        },
        // color:['#f6da22','#bbe2e8','#6cacde','#1cadde','#3cadde'],
        series: [{
            type: 'pie',
            data: data,
            radius: ['25%', '70%'],
            labelLine: {
                normal: {
                    show: true
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}\n{c}\n{d}%'
                }
            }
        }]
    }
}

function monthBar(x, y) {
    // http://gallery.echartsjs.com/editor.html?c=bar-tick-align
    return {
        // color : ['#3398DB'],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: x,
            axisTick: {
                alignWithLabel: true
            }
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                show: true
            }
        }],
        series : [{
            // name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data: y,
            label: {
                show: true,
                position: "top"
            }
        }]
    }
}

export default {
    catPie: catPie,
    monthBar: monthBar
}
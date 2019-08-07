let echarts = require('echarts/lib/echarts')

require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/map')
require('echarts/lib/chart/scatter')
require('echarts/lib/chart/effectScatter')
require('echarts/lib/component/geo')
require('echarts/map/js/china.js')
require('echarts/map/js/province/anhui')
// 引入所需组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

// 数据分布 柱状图图表
export function setDataMask(id) {
  let dom = echarts.init(document.getElementById(id))
  dom.setOption({
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
  })
  dom.resize()
}

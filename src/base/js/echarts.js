let echarts = require("echarts/lib/echarts");

require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/map");
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/effectScatter");
require("echarts/lib/component/geo");
// 引入所需组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");

// 首页 任务概况
export function setTaskStatus(id, data) {
  let dom = echarts.init(document.getElementById(id));
  dom.setOption({
    color: ["#35C1CE", "#5473E7"],
    tooltip: {
      trigger: "axis",
    },
    xAxis: [
      {
        type: "category",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0
        },
        data: data.tagName
      }
    ],
    yAxis: [{
      type: "value",
      show: false,
      axisTick: {
        show: false
      }
    }],
    series: [
    {
      name: "Forest",
      type: "bar",
      barGap: '10%',
      barCategoryGap: '40%',
      barGap: 0,
      data: data.totalNum
    },
    {
      name: "Steppe",
      type: "bar",
      barGap: '10%',
      barCategoryGap: '40%',
      data: data.statsNum
    }]
  });
  dom.resize();
}

// 首页 项目状态
export function setProjectStatus(id, tagName, data) {
  let dom = echarts.init(document.getElementById(id));
  dom.setOption({
    color: ["#5473E7", "#67CE34", '#35C1CE', '#AF5ACF', '#E6559F', '#E9AB00'],
    tooltip: {
      trigger: "axis",
      formatter: "{b}:{c}"
    },
    legend: {
      icon: "circle",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 20,
      bottom: '10',
      orient: 'horizontal',
      left: 'center',
      data: tagName
    },
    series: [{
      name: '访问来源',
      x1: '10%',
      type: 'pie',
      radius : '60%',
      center: ['50%', '40%'],
      label: {
        show: true,
        position: 'inside',
        formatter: '{d}%',
        formatter: function(data){
          return data.percent.toFixed(0)+"%"
        } 
      },
      data: data
    }]
  });
  dom.resize();
}

// 术语映射统计
export function setMapStatic(id, data) {
  let dom = echarts.init(document.getElementById(id));
  dom.setOption({
    color: ['#0364FF'],
    tooltip: {
      trigger: 'axis',
      formatter: '{b}:{c}'
    },
    xAxis: [{
      type: 'category',
      splitLine: {show: true},
      axisTick: {show: false},
      data: data.name
    }],
    yAxis: [{
      type: 'value',
      axisTick: {show: false},
    }],
    series: [{
      name: 'Forest',
      type: 'bar',
      barCategoryGap: '80%',
      data: data.num
    }]
  })
  dom.resize()
}

let echarts = require("echarts/lib/echarts");

require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/map");
require("echarts/lib/chart/scatter");
require("echarts/lib/chart/effectScatter");
require("echarts/lib/component/geo");
require("echarts/map/js/china.js");
require("echarts/map/js/province/anhui");
// 引入所需组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");

// 数据分布 柱状图图表
export function setDataMask(id) {
  let dom = echarts.init(document.getElementById(id));
  dom.setOption({
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  });
  dom.resize();
}

export function setInitAtlas(id) {
  let dom = echarts.init(document.getElementById(id));
  dom.setOption({
    series: [
      {
        name: "Les Miserables",
        type: "graph",
        layout: "force",
        data: [
          { id: "0", name: "Myriel" },
          { id: "1", name: "Napoleon" },
          { id: "2", name: "MlleBaptistine" }
        ],
        links: [{ source: "1", target: "0" }, { source: "2", target: "0" }],
        label: {
          normal: {
            show: true,
            position: "right"
          },
          emphasis: {
            show: true,
            position: "inside"
          }
        },
        force: {
          repulsion: 100
        }
      }
    ]
  });
  dom.resize();
}

export function setInitTree(id, data) {
  let dom = echarts.init(document.getElementById(id));
  dom.setOption({
    series: [
      {
        type: "tree",
        data: [data],
        top: "10%",
        left: "20%",
        bottom: "10%",
        right: "20%",
        symbolSize: 7,
        label: {
          normal: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 13,
            color: '#FFA65F'
          }
        },
        leaves: {
          label: {
            normal: {
              position: "right",
              verticalAlign: "middle",
              align: "left"
            }
          }
        }
      }
    ]
  });
  dom.resize();
}

export function setmaptree(diskData,id){
  function colorMappingChange(value) {
    console.log(value);
    var levelOption = getLevelOption(value);
    chart.setOption({
      series: [{
        levels: levelOption
      }]
    });
  }

var formatUtil = echarts.format;

  function getLevelOption() {
    return [
      {
        itemStyle: {
          normal: {
            borderWidth: 0,
            gapWidth: 5
          }
        }
      },
      {
        itemStyle: {
          normal: {
            gapWidth: 1
          }
        }
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          normal: {
            gapWidth: 1,
            borderColorSaturation: 0.6
          }
        }
      }
    ];
  }
  let myChart = echarts.init(document.getElementById(id))
  myChart.setOption({

    title: {
      text: 'Disk Usage',
      left: 'center'
    },

    tooltip: {
      formatter: function (info) {
        /*var value = info.value;
        var treePathInfo = info.treePathInfo;
        var treePath = [];

        for (var i = 1; i < treePathInfo.length; i++) {
          treePath.push(treePathInfo[i].name);
        }

        return [
          '<div class="tooltip-title">' + formatUtil.encodeHTML(treePath.join('/')) + '</div>',
          'Disk Usage: ' + formatUtil.addCommas(value) + ' KB',
        ].join('');*/
      }
    },

    series: [
      {
        name:'Disk Usage',
        type:'treemap',
        visibleMin: 300,
        label: {
          show: true,
          formatter: '{b}'
        },
        itemStyle: {
          normal: {
            borderColor: '#fff'
          }
        },
        levels: getLevelOption(),
        data: diskData
      }
    ]
  });
}

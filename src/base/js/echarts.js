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

export function setmaptree(rawData,id){
let myChart = echarts.init(document.getElementById(id))
function convert(source, target, basePath) {
  for (var key in source) {
      var path = basePath ? (basePath + '.' + key) : key;
      if (key.match(/^\$/)) {

      }
      else {
          target.children = target.children || [];
          var child = {
              name: path
          };
          target.children.push(child);
          convert(source[key], child, path);
      }
  }

  if (!target.children) {
      target.value = source.$count || 1;
  }
  else {
      target.children.push({
          name: basePath,
          value: source.$count
      });
  }
}
var data = [];
//convert(rawData, data, '');
//console.log(data)
myChart.setOption({
  title: {
      // text: 'ECharts 配置项查询分布',
      // subtext: '2016/04',
      left: 'leafDepth'
  },
  tooltip: {},
  series: [{
      name: 'option',
      type: 'treemap',
      visibleMin: 300,
      //data: data.children,
      data:rawData,
      leafDepth: 2,
      levels: [
          {
              itemStyle: {
                  normal: {
                      borderColor: '#555',
                      borderWidth: 4,
                      gapWidth: 4
                  }
              }
          },
          {
              colorSaturation: [0.3, 0.6],
              itemStyle: {
                  normal: {
                      borderColorSaturation: 0.7,
                      gapWidth: 2,
                      borderWidth: 2
                  }
              }
          },
          {
              colorSaturation: [0.3, 0.5],
              itemStyle: {
                  normal: {
                      borderColorSaturation: 0.6,
                      gapWidth: 1
                  }
              }
          },
          {
              colorSaturation: [0.3, 0.5]
          }
      ]
  }]
})

}

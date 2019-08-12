let echarts = require("echarts/lib/echarts");
import { common } from "api/index.js";
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

export function setmaptree(rawData,id,userId){
let myChart = echarts.init(document.getElementById(id))
console.log(rawData)
var option={
  title: {
      // text: 'ECharts 配置项查询分布',
      // subtext: '2016/04',
      left: 'leafDepth'
  },
  tooltip: {
    formatter: function (info) {
      var value = info.value;
      return [
        '<div class="tooltip-title">' + info.name + '</div>',
        '标准术语数量: &nbsp;&nbsp;' + value[0] + '<br>',
        '同义词数量: &nbsp;&nbsp;' + value[1] + '<br>',
        '医院数量: &nbsp;&nbsp;' + value[2] + '<br>',
    ].join('');
  }
  },
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
}

myChart.setOption(option);
let isClick=true;
myChart.on('click',function (params) {

  console.log(params)
if(params.data){
  if(!params.data.children){
      var termid=params.data.id;
      console.log(params.data);
      let obj={
        uid:userId,
        id:termid,
        action:'getIndexInfo'
      }
      initChart(obj,termid)
  }
}
  console.log(rawData);       
      
});
function initChart(obj,termid){
  common.index(obj.action,obj.uid,obj.id).then((res)=>{
  console.log(res)
  if(res.code==200){
    //isClick=false;
      var newList = res.list.map(item=> {
        let arr=[];
        let child=[];
        arr.push(Number(item.num_st));
        arr.push(Number(item.num_sy));
        arr.push(Number(item.num_hx));
        if(item.children){
          child=item.children
        }
        return {
        name: item.name_cn,
        value:arr,
        id:item.id,
        //children:child,
      }            
    });
    console.log(newList)
    
    dataconvert(newList,rawData,termid)
        
  }
})
}
function dataconvert(source,target,termid){
  for(var key in target){
    if(termid==target[key].id){
      target[key].children=source;
      console.log(rawData);
    }
    if(target[key].children){
      dataconvert(source,target[key].children,termid)
    }
  }
    myChart.setOption(option)
  
}

}

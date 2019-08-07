<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.contant {
  width: 100%;
  .tab {
    height: 57px;
    line-height: 57px;
    padding-left:30px;
    background: #fff;
    color:#999;
    .cur{
      color:#333;
    }
  }
  .search{
    float:right;
  }
  .home-title {
    width: 100%;
    display: flex;
    & > div {
      float: left;
      flex: 1;
      height: 130px;
      background: #fff;
      border-radius: 6px;
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      .title-left,
      .title-right {
        float: left;
      }
      .title-left {
        flex: 2;
        text-align: left;
        p {
          font-size: 16px;
          line-height: 28px;
        }
        div {
          font-size: 36px;
          font-weight: bold;
          line-height: 60px;
          i {
            vertical-align: middle;
            font-size: 20px;
          }
          .el-icon-bioup {
            color: $upcolor;
          }
          .el-icon-biodown {
            color: $maincolor;
          }
        }
      }
      .title-right {
        flex: 1;
        & > div {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          margin: 10px auto;
          text-align: center;
          i {
            font-size: 40px;
            vertical-align: middle;
            margin-top: 18px;
            color: #fff;
          }
        }
        & > div.biolung {
          i {
            font-size: 50px;
            margin-top: 10px;
          }
          background: #2f4056;
        }
        & > div.biocolorectum {
          background: #ff5722;
        }
        & > div.biobreast {
          background: #f7b824;
        }
        & > div.biogastric {
          background: #009688;
        }
        & > div.biocarcinoma {
          background: #01aaed;
        }
      }
    }
    & > div + div {
      margin-left: 20px;
    }
  }
  .home-echarts {
    min-height: 600px;
    text-align: center;
    & > div {
      background: #fff;
      border-radius: 6px;
      padding: 20px;
      .ecahrt-title {
        height: 50px;
        text-align: left;
        line-height: 50px;
        font-weight: bold;
        font-size: 18px;
        i {
          font-size: 24px;
          vertical-align: middle;
          color: $maincolor;
          margin-top: 5px;
        }
      }
      .echart-main {
        width: 100%;
        height: 510px;
        padding: 15px 30px;
        box-sizing: border-box;
        .line-title {
          width: 100%;
          height: 85px;
          display: flex;
          & > div {
            flex: 1;
            float: left;
            box-sizing: border-box;
            border-left: 1px solid #ddd;
            p {
              font-size: 14px;
              line-height: 28px;
              margin-top: 15px;
            }
            span {
              font-weight: bold;
              font-size: 28px;
            }
            i {
              font-size: 20px;
            }
            .el-icon-bioup {
              color: $upcolor;
            }
            .el-icon-biodown {
              color: $maincolor;
            }
          }
          & > div:first-of-type {
            border-left: 1px solid rgba($color: #000000, $alpha: 0);
          }
          & > div:hover,
          .line-active {
            background: #ddd;
          }
        }
        #linecharts {
          width: 100%;
          height: 425px;
        }
      }
      #piecharts {
        width: 100%;
        height: 510px;
      }
    }
    & > div + div {
      margin-left: 20px;
    }
    .leftchart {
      flex: 1;
    }
    .rightchart {
      flex: 1.17;
      border-left:1px solid #DFE3E9;
      .topchart{
        padding:8px 15px 11px 15px;
      }
    }
  }
}
</style>

<template>
  <div class="contant">
    <div class="tab" style="border-bottom:1px solid #DFE3E9">
      <el-row>
        <el-col :span="6">
          <i class="el-icon-arrow-left"></i>术语展示 / <span class="cur">术语搜索</span>
        </el-col>
        <el-col :span="18">
      <div class="search">
        <div style="margin-top: 0px;">
          <el-select v-model="ctype" placeholder="模糊匹配" style="width:160px;margin-right:0px;">
            <el-option
              v-for="item in ctypelist"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-input placeholder="请输入内容" v-model="inputTxt" class=""  style="width:460px;height:36px;margin-left:13px;">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
    </div>
        </el-col>
      </el-row>
    <div>
    <div class="home-echarts">
      <el-row>
        <el-col :span="11">
      <div class="leftchart">
        <div class="ecahrt-title">
          <span></span>
        </div>
        <div class="echart-main">
          <div class="line-title">

          </div>
          <div id="linecharts"></div>
        </div>
      </div>
        </el-col>
        <el-col :span="13">
      <div class="rightchart">
        <div class="topchart">
          <el-row>
            <el-col :span="12">
              <div class="piecharts">
                <div style="height:48px;line-height:48px;background:rgba(84,115,232,0.2);">语义标签</div>
                <el-table :data="tableData3" :show-header=false border style="width:160">
                  <el-table-column prop="name" label=""></el-table-column>
                  <el-table-column prop="num" label=""></el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="piecharts" style="margin-left:12px;">
                <el-table :data="termstable" border style="width:460">
                  <el-table-column prop="hospital" label="临床术语中文"></el-table-column>
                  <el-table-column prop="dept" label="英文同义词"></el-table-column>
                  <el-table-column prop="applyName" label="英文标准"></el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="bottomchart">
          <el-row>
            <el-col :span="6">
            <div class="chartTitle">同义词</div>
            </el-col>
            <el-col :span="18">
            <div class="chartTitle">概念图谱</div>
            </el-col>
          </el-row>
          </div>
        </div>
        </el-col>
      </el-row>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
import {common} from 'api/index.js';
export default {
  data() {
    return {
      allData:{},
      loading:true,
      semanticTags:{},
      termstable:[
        {
          hospital: "87201",
          dept: "同义词",
          applyName:'个',
        },{
          hospital: "87201",
          dept: "同义词",
          applyName:'个',
        },{
          hospital: "87201",
          dept: "同义词",
          applyName:'个',
        },{
          hospital: "87201",
          dept: "同义词",
          applyName:'个',
        },
      ],
      tableData3:[
        {
          name: "病患",
          num: "12",
        },
        {
          name: "病患",
          num: "12",
        },
        {
          name: "病患",
          num: "12",
        },
        {
          name: "病患",
          num: "12",
        },
      ],
      ctypelist:[
        {
          name:'模糊匹配（英文）',
          id:2
        },
        {
          name:'模糊匹配（中文）',
          id:3
        },
      ],
      inputTxt:'',
      ctype:'',
    };
  },
  methods: {
    getIndex(){

    },
  },
  created() {
    // this.drawLine();
    // this.drawPie();
    this.getIndex()
  }
};
</script>


<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.contant {
  width: 100%;
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
    margin-top: 20px;
    min-height: 600px;
    text-align: center;
    display: flex;
    display: flex;
    & > div {
      float: left;
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
    }
  }
}
</style>

<template>
  <div class="contant">
    <div>
    <div class="home-echarts">
      <div class="leftchart">
        <div class="ecahrt-title">
          <span>数据录入情况</span>
        </div>
        <div class="echart-main">
          <div class="line-title">

          </div>
          <div id="linecharts"></div>
        </div>
      </div>
      <div class="rightchart">
        <div class="topchart">
          <div class="piecharts">
            <div>语义标签</div>

            <el-table :data="tableData3" :show-header=false height="300" border style="width:160">
              <el-table-column prop="name" label=""></el-table-column>
              <el-table-column prop="num" label=""></el-table-column>
            </el-table>
          </div>
          <div class="piecharts">
            <el-table :data="termstable" height="300" border style="width:460">
              <el-table-column prop="hospital" label="临床术语中文"></el-table-column>
              <el-table-column prop="dept" label="英文同义词"></el-table-column>
              <el-table-column prop="applyName" label="英文标准"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="bottomchart">
          <div id="">
            <div class="chartTitle">同义词</div>
          </div>
          <div id="">
            <div class="chartTitle">概念图谱</div>
          </div>
        </div>
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
      ]
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


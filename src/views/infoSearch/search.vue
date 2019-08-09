<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.contant {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  .tab {
    height: 57px;
    line-height: 57px;
    background: #fff;
    color: #000;
  }
  .home-echarts{
    height: 100%;
  }
  .bottomchart{
    margin-top: 20px;
    border-top: 2px solid #EFF3F6;
    .synonym{
      margin: 10px;
      .chartTitle{
        margin: 20px 0px;
        font-size: 18px;
      }
      p{
        margin: 10px 0px;
        font-size: 16px;
      }
      .similar{
        width: 100px;
        height: 30px;
        line-height: 30px;
        background: #D7F3F5;
        border-radius: 5px;
        margin: 10px 0px;
        text-align: center;
        color: #57CCD7;
        font-size: 16px;
      }
    }
  }
}
</style>
<style lang="less">
.semantic-tags{
  border-radius: 10px;
  background: #E6E6E6;
  width: 40px;
  color: #fff;
}
</style>

<template>
  <div class="contant">
    <div class="tab" style="border-bottom:1px solid #DFE3E9">
      <el-row>
        <el-col :span="12">
          <span style="margin-left: 30px;">术语搜索</span>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="6">
              <div style="margin-left: 10px;">
                <el-select v-model="ctype" placeholder="模糊匹配">
                  <el-option
                    v-for="item in ctypelist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="18">
              <div style="margin: 0px 20px;">
                <el-input v-model="inputTxt" placeholder="请输入内容">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="home-echarts">
      <el-row style="height: 100%;">
        <el-col :span="12" style="height: 100%; border-right: 2px solid #EFF3F6;">
          <!-- <div id="tree" style="width: 500px; height: 500px;"></div> -->
          <div id="chart">
            <term style="width: 100%;" :info="info"></term>
          </div>
        </el-col>
        <el-col :span="12" style=" height: 100%; margin-top:10px;">
          <div class="rightchart">
            <el-row style="height: 100%;">
              <el-col :span="6">
                <div style="margin-left: 10px;">
                  <el-table :data="tableData3" border :header-cell-style="headerStyle">
                    <el-table-column label='语义标签' header-align="center">
                      <el-table-column prop="name"></el-table-column>
                      <el-table-column prop="num" align="center">
                        <template slot-scope="scope">
                          <div class="semantic-tags">{{ scope.row.num }}</div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
              <el-col :span="18">
                <div class="piecharts" style="margin: 0px 20px;">
                  <el-table :data="termstable" border :header-cell-style="tableHeaderStyle">
                    <el-table-column prop="hospital" label="临床术语中文" align="center"></el-table-column>
                    <el-table-column prop="dept" label="英文同义词" align="center"></el-table-column>
                    <el-table-column prop="applyName" label="英文标准" align="center"></el-table-column>
                  </el-table>
                </div>
              </el-col>
            </el-row>
            <div class="bottomchart">
              <el-row>
                <el-col :span="8" style="border-right: 2px solid #EFF3F6;">
                  <div class="synonym">
                    <div class="chartTitle">同义词</div>
                    <p>标准概念中文: {{chinese}}</p>
                    <p>标准概念英文: {{english}}</p>
                    <p>标准概念编码: {{code}}</p>
                    <el-row>
                      <el-col :span="12" v-for="(val,index) in similar" :key="index">
                        <div class="similar">
                          {{val}}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="synonym">
                    <div class="chartTitle">概念图谱</div>
                    <div id="atlas" style="width: 400px; height: 400px;"></div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import Axios from "../../base/js/axios";
import * as ECHART from '../../base/js/echarts.js'
import Term from "../../components/term";
export default {
  data() {
    return {
      allData: {},
      loading: true,
      semanticTags: {},
      info: {
        col1: [
          {
            conceptId: 1,
            conceptName: "COPD"
          }
        ],
        col2: [
          {
            conceptId: 62950007,
            conceptName: "Encephalomyelitis",
            parentNode: [1]
          },
          {
            conceptId: 127341005,
            conceptName: "Acutenervous",
            parentNode: [1]
          },
          {
            conceptId: 6118003,
            conceptName: "Demyelinating",
            parentNode: [1]
          },
          {
            conceptId: 611800344,
            conceptName: "nervoussystem",
            parentNode: [1]
          }
        ],
        col3: [
          {
            conceptId: 83942000,
            conceptName: "Acute",
            parentNode: [62950007, 127341005, 6118003]
          }
        ],
        col4: [
          {
            conceptId: 182961000119101,
            conceptName: "Acutedisseminated",
            parentNode: [83942000, 1]
          }
        ]
      },
      termstable: [
        {
          hospital: "87201",
          dept: "同义词",
          applyName: "个"
        },
        {
          hospital: "87201",
          dept: "同义词",
          applyName: "个"
        },
        {
          hospital: "87201",
          dept: "同义词",
          applyName: "个"
        },
        {
          hospital: "87201",
          dept: "同义词",
          applyName: "个"
        }
      ],
      tableData3: [
        {
          name: "病患",
          num: "12"
        },
        {
          name: "病患",
          num: "12"
        },
        {
          name: "病患",
          num: "12"
        },
        {
          name: "病患",
          num: "12"
        }
      ],
      ctypelist: [
        {
          name: "模糊匹配（英文）",
          id: 2
        },
        {
          name: "模糊匹配（中文）",
          id: 3
        }
      ],
      inputTxt: "",
      ctype: "",
      chinese: '',
      english: '',
      code: '',
      similar: ['这是近义词','近义词','近义词'],
      treedata: {},
      tree: []
    };
  },
  methods: {
    getIndex() {
      ECHART.setInitAtlas('atlas')
    },
    getTree(){
      Axios.post('/getTreeList.php').then(res => {
        this.tree = res.data
      })
      this.treedata = {
        name: 'COPD',
        children: [
          {name: '父类临床术语', children: [{name: '子类'}], collapsed: true},
          {name: '父类临床术语', children: [{name: '子类'}], collapsed: true},
          {name: '父类临床术语', children: [{name: '子类'}], collapsed: true},
          {name: '父类临床术语', children: [{name: '子类'}], collapsed: true},
          {name: '父类临床术语', children: [{name: '子类'}], collapsed: true}
        ]
      }
      ECHART.setInitTree('tree', this.treedata)
    },
    headerStyle(param){
      if (param.rowIndex == '1') {
        return { display: 'none' }
      } else if (param.rowIndex == '0') {
        return { background: '#DDE3FA'}
      }
    },
    tableHeaderStyle(param){
      if (param.rowIndex == '0') {
        return { background: '#5473E8', color: '#fff'}
      }
    }
  },
  mounted() {
    this.getIndex();
    this.getTree();
  },
  components: {
    Term
  }
};
</script>


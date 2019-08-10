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
                <el-input v-model="searchText" placeholder="请输入内容">
                  <el-button slot="append" icon="el-icon-search" @click="searchAllList"></el-button>
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
          <div id="tree" style="width: 600px; height: 500px;"></div>
          <!-- <div id="chart">
            <term style="width: 100%;" :info="info"></term>
          </div> -->
        </el-col>
        <el-col :span="12" style=" height: 100%; margin-top:10px;">
          <div class="rightchart">
            <el-row style="height: 100%;">
              <el-col :span="6">
                <div style="margin-left: 10px;">
                  <el-table class="tag-table" 
                    :data="tagDataList" border 
                    :header-cell-style="headerStyle"
                    max-height="300"
                    @row-click="tagClickList">
                    <el-table-column label='语义标签' header-align="center">
                      <el-table-column prop="tagName"></el-table-column>
                      <el-table-column prop="tagNum" align="center">
                        <template slot-scope="scope">
                          <div class="semantic-tags">{{ scope.row.tagNum }}</div>
                        </template>
                      </el-table-column>
                    </el-table-column>
                  </el-table>
                </div>
              </el-col>
              <el-col :span="18">
                <div class="piecharts" style="margin: 0px 20px;">
                  <el-table class="tag-table" :data="searchDataList" border :header-cell-style="tableHeaderStyle" max-height="300">
                    <el-table-column prop="name_cn" label="临床术语中文" align="center"></el-table-column>
                    <el-table-column prop="name_en" label="英文同义词" align="center"></el-table-column>
                    <el-table-column prop="fsn" label="英文标准" align="center"></el-table-column>
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
import { mapGetters } from 'Vuex'
import echarts from 'echarts'
import {common} from 'api/index.js';
import * as ECHART from '../../base/js/echarts.js'
import Term from "../../components/term";
export default {
  data() {
    return {
      allData: {},
      loading: true,
      semanticTags: {},
      info: {},
      searchDataList: [],
      tagDataList: [],
      ctypelist: [
        {
          name: "模糊匹配（中文）",
          id: 1
        },
        {
          name: "模糊匹配（英文）",
          id: 2
        }
      ],
      searchText: "",
      ctype: '',
      chinese: '',
      english: '',
      code: '',
      similar: [],
      treedata: {},
      tree: []
    };
  },
  computed: {
    ...mapGetters(['userId'])
  },
  methods: {
    getIndex() {
      common.getSearchList(this.userId).then(res => {
        this.tagDataList = res.tagList
        this.searchDataList = res.searchList
      })
      ECHART.setInitAtlas('atlas')
    },
    getTree(){
      common.treeList().then(res => {
        this.treedata = res
        this.treedata.collapsed = false
        this.treedata.children.forEach(n => {
          n.collapsed = true
        })
        let dom = echarts.init(document.getElementById('tree'))
        dom.on('click', this.clickTree)
        dom.setOption({
          series: [
            {
              type: "tree",
              data: [this.treedata],
              top: "10%",
              left: "20%",
              bottom: "2%",
              right: "40%",
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
              },
              expandAndCollapse: true,
            }
          ]
        });
        dom.resize();
      })
      // ECHART.setInitTree('tree', this.treedata)
    },
    clickTree(param){
      let obj = {
        type: 1,
        keyword: '',
        id: param.data.id,
        tag: '',
        uid: this.userId
      }
      this.searchAll(obj)
    },
    // 语义标签表头样式
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
    },
    // 搜索按钮
    searchAllList(){
      if(this.searchText && this.ctype){
        let obj = {
          type: this.ctype,
          keyword: this.searchText,
          id: '',
          tag: '',
          uid: this.userId
        }
        this.searchAll(obj)
      } else {
        this.getIndex()
      }
    },
    tagClickList(param){
      console.log(param)
      let obj = {
        type: 1,
        keyword: '',
        id: '',
        tag: param.tagName,
        uid: this.userId
      }
      this.searchAll(obj)
    },
    // 搜索接口调用
    searchAll(obj){
      common.searchAll(obj).then(res => {
        console.log(res)
        if(res.code === 200){
          this.searchDataList = res.searchList
          this.tagDataList = res.tagList
          this.similar = res.syList
        } else {
          this.$message.error(res.msg);
        }
      })
    },
  },
  mounted() {
    this.getIndex();
    this.getTree();
  },
  computed: {
    ...mapGetters(['userId'])
  },
  components: {
    Term
  }
};
</script>


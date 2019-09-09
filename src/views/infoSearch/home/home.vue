<style lang="less">
.home-project .el-table td {
  border-bottom: 1px solid #fff;
  padding: 5px 0px;
}
.home-project .el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
<template>
  <div class="home-page">
    <div style="margin: 0px 20px;">
      <el-row :gutter="5">
        <el-col :span="8" v-for="(item,index) in homeList" :key="index">
          <div
            class="home-list"
            :class="{'color-a':index===0, 'color-b': index===1, 'color-c': index===2}"
          >
            <div>
              <span>{{item.number}}</span>
            </div>
            <span>{{item.name}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="7">
          <div class="charge">
            <ul>
              <li :class="size === '1' ? 'change' : 'choose'" @click="handInChange('1')">我参与的项目</li>
              <li :class="size === '2' ? 'change' : 'choose'" style="margin-left: 10px;" @click="handInChange('2')">我负责的项目</li>
            </ul>
          </div>
          <div style="clear: both;"></div>
          <div class="home-project">
            <div class="home-tables">
              <el-table
                :data="tableData"
                :show-header="false"
                @row-click="handleTable"
                style="margin-left: 10%; width: 80%;"
              >
                <el-table-column>
                  <template slot-scope="scope">
                    <div class="project-list">
                      <span>{{scope.row.projectName}}</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div style="margin: 20px 0px;">
            <span style="font-size: 20px;">
              <b>任务概况</b>
            </span>
          </div>
          <div class="home-project">
            <el-row style="height: 100%;">
              <el-col :span="16" style="height: 100%;">
                <div id="status" style="width: 100%; height: 100%;"></div>
              </el-col>
              <el-col :span="8">
                <div class="survey-list" v-for="(item,index) in surveyList" :key="index">
                  <div style="padding-top: 15px;">
                    <span style="font-size: 14px;">
                      <b>{{item.termName}}</b>
                    </span>
                  </div>
                  <span style="color: #999998;">{{item.termDesc}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="7">
          <div style="margin: 20px 0px;">
            <span style="font-size: 20px;">
              <b>项目状态</b>
            </span>
          </div>
          <div class="home-project">
            <div id="project" style="width: 100%; height: 100%;"></div>
          </div>
        </el-col>
      </el-row>
      <div style="margin-bottom: 10px;">
        <div style="margin: 20px 0px;">
          <span style="font-size: 20px;">
            <b>我的错误日志</b>
          </span>
        </div>
        <el-table :data="logTableData" :show-header="false">
          <el-table-column prop="logRecord">
            <template slot-scope="scope">
              <div style="font-size: 15px;">
                <span>{{scope.row.conceptName}}</span>
                <img style="height: 25px; width: 80px;" src="./img/right.png" alt="">
                <span>{{scope.row.mappingOld}}</span>
                <img style="height: 25px; width: 80px;" src="./img/right.png" alt="">
                <span>{{scope.row.mappingNew}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="180" prop="username"></el-table-column>
          <el-table-column width="180" prop="addtime"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "Vuex";
import { common } from "api/index.js";
import * as ECHART from "@/base/js/echarts.js";
export default {
  data() {
    return {
      homeList: [],
      size: '1',
      surveyList: [], // 概况数据
      tableData: [],
      logTableData: [],
    };
  },
  mounted() {
    this.getLog()
    this.getInit()
  },
  methods: {
    // 顶部数据
    getInit(){
      this.homeList = []
      common.homeProjectList(this.userId).then(res => {
        if(res.code === 200){
          let dataInfo = res.dataInfo
          for(let i in dataInfo){
            let obj = {
              number: '',
              name: ''
            }
            if(i === 'taskNum') {
              obj.name = '映射任务'
            } else if(i === 'ontologyNum'){
              obj.name = '临床术语'
            } else if(i === 'rate'){
              obj.name = '正确率'
            }
            obj.number = dataInfo[i]
            this.homeList.push(obj)
          }
        } else {
          this.$message.error(res.msg)
        }
      })

      this.handInChange('1')
    },
    // 参与/负责项目数据
    handInChange(num){
      if(num === '1'){
        this.size = '1'
        common.getPartakeProjectList(this.userId).then(res => {
          if(res.code === 200){
            this.tableData = res.list
            if(this.tableData[0]){
              this.getColumnPic(this.tableData[0].projectId, this.size)
              this.getPiePic(this.tableData[0].projectId, this.size)
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if(num === '2'){
        this.size = '2'
        common.getResponsProjcetList(this.userId).then(res => {
          if(res.code === 200){
            this.tableData = res.list
            this.getColumnPic(this.tableData[0].projectId, this.size)
            this.getPiePic(this.tableData[0].projectId, this.size)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 参与/负责项目行点击事件
    handleTable(param){
      this.getColumnPic(param.projectId, this.size)
      this.getPiePic(param.projectId, this.size)
    },
    // 柱状图
    getColumnPic(projectId, typeId){
      let obj = {
        uid: this.userId,
        projectId: projectId,
        typeId: typeId
      }
      this.surveyList = []
      common.getColumnPic(obj).then(res => {
        if(res.code === 200){
          let data = res.list
          ECHART.setTaskStatus("status", data)
          let projectInfo = res.projectInfo
          for(let i in projectInfo){
            let obj = {
              termName: '',
              termDesc: ''
            }
            if(i === 'endTime') {
              obj.termDesc = '截止日期'
            } else if(i === 'noCompleteNum'){
              obj.termDesc = '尚未完成'
            } else if(i === 'taskStatus'){
              obj.termDesc = '任务状态'
            } else if(i === 'taskTime'){
              obj.termDesc = '预估时间'
            }
            obj.termName = projectInfo[i]
            this.surveyList.push(obj)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 饼图
    getPiePic(projectId, typeId){
      let obj = {
        uid: this.userId,
        projectId: projectId,
        typeId: typeId
      }
      common.getPiePic(obj).then(res => {
        if(res.code === 200){
          let data = res.list.num
          let tagName = res.list.tagName
          ECHART.setProjectStatus("project", tagName, data)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取日志
    getLog(){
      common.getErrorLogList(this.userId).then(res => {
        if(res.code === 200) {
          this.logTableData = res.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  },
  computed: {
    ...mapGetters(['userId'])
  },
};
</script>
<style lang="less" scoped>
@import url(./index.less);
</style>
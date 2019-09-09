<template>
  <div class="project-task-allocate">
    <div class="allocation project-title-name">
      <span><i class="el-icon-arrow-left"></i> 
        <span style="cursor: pointer;" @click="tranMyProject">我的项目</span>
        <span>/ 任务分配</span>
      </span>
    </div>
    <div class="allocation project-mapping-menu">
      <ul>
        <li :class="onmy === '1' ? 'isMenu':''" 
          @click="terminologyMapping('1')"
        >术语映射</li>
        <li :class="onmy === '2' ? 'isMenu':''"
          style="margin-left: 40px;"
          @click="terminologyMapping('2')"
        >映射质检</li>
      </ul>
    </div>
    <div style="clear: both;"></div>
    <div class="project-mapping-container">
      <div style="margin: 20px 0px;">
        <span>
          <span>项目创建者:</span>
          <span style="margin-left: 10px;">{{projectCreatUser}}</span>
        </span>
        <span style="margin-left: 50px;">
          <span>状态:</span>
          <span style="margin-left: 10px;">{{projectStatus}}</span>
        </span>
        <span style="margin-left: 50px;">
          <span>项目时间节点:</span>
          <span style="margin-left: 10px;">{{projectTime}}</span>
        </span>
      </div>
      <div class="project-onmy-number">
        <el-row :gutter="10">
          <el-col :span="8" v-for="(item, index) in onmyNumber" :key="index">
            <div class="onmy-item-number"
              :class="{'color-a':index===0, 'color-b': index===1, 'color-c': index===2}"
            >
              <div><span style="font-size: 18px;"><b>{{item.number}}</b></span></div>
              <span>{{item.name}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="margin: 20px 0px;">
        <el-form ref="formData" :model="formData" label-width="120px" :label-position="labelPosition">
          <el-form-item label="项目负责人：">
            <el-select v-model="formData.projectLeader" multiple placeholder="请选择项目负责人">
              <el-option
                v-for="item in projectLeaderList"
                :key="item.userId"
                :label="item.username"
                :value="item.userId"
              ></el-option>
            </el-select>
            （管理项目资源：分配项目任务）
          </el-form-item>
          <el-form-item label="映射术语标准：">
            <el-input style="width: 219px;" v-model="formData.projectOnStand" placeholder="请输入映射术语标准"></el-input>
          </el-form-item>
          <el-form-item v-if="onmy === '2'" label="审校负责人：">
            <el-select v-model="formData.pSjLeaderArr" @visible-change="changeMappingUser(pSjLeaderArrList, formData.pSjLeaderArr, '2')" multiple placeholder="请选择审校负责人">
              <el-option
                v-for="item in pSjLeaderArrList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="onmy === '2'" label="参与审校人员：">
            <el-select v-model="formData.projectSjUser" @visible-change="changeMappingUser(projectSjUserList, formData.projectSjUser, '4')" multiple placeholder="请选择参与审校人员">
              <el-option
                v-for="item in projectSjUserList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="onmy === '1'" label="参与映射人员：">
            <el-select v-model="formData.projectMpUser" @visible-change="changeMappingUser(projectMpUserList, formData.projectMpUser, '3')" multiple placeholder="请选择参与映射人员">
              <el-option
                v-for="item in projectMpUserList"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="project-task-info">
      <div class="info-title-name">
        <span><b>任务分配</b></span>
      </div>
      <ul class="project-task-desc">
        <li v-for="(item, index) in distributionArr">
          <div style="margin: 20px 0px;"><span>{{item.taskTerm}}:</span></div>
          <el-row>
            <el-col :span="4">词频:
              <span style="margin-left: 10px;">{{item.frequency}}</span>
            </el-col>
            <el-col :span="4">总频次占比:
              <span style="margin-left: 10px;">{{item.frepercent}}%</span>
            </el-col>
            <el-col :span="4">词汇量:
              <span style="margin-left: 10px;">{{item.frequencyNum}}</span>
            </el-col>
            <el-col :span="4">
              <div v-if="item.status === '已完成'" class="icon info-icon-success">
                <i class="el-icon-success"></i>
                <span style="margin-left: 10px;">已完成</span>
              </div>
              <div v-if="item.status === '进行中'" class="icon info-icon-time">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px;">进行中</span>
              </div>
            </el-col>
          </el-row>
          <div class="project-task-list">
            <div v-if="item.status === '已完成'">
              <el-row :gutter="40">
                <el-col :span="8" v-for="(val,index) in item.distributionInfo" :key="index">
                  <div>{{val.username}}: {{val.taskInfo.taskNum}}条</div>
                </el-col>
              </el-row>
            </div>
           <div>
              <el-row v-if="item.status === '进行中'" :gutter="40">
                <el-col :span="8" v-for="(val,index) in item.distributionInfo" :key="index">
                  <div>{{val.username}}: {{val.taskInfo.finishNum}}/{{val.taskInfo.taskNum}}条</div>
                  <div style="margin-top: 5px;">
                    <el-progress :show-text="false" :percentage="val.percent" :color="customColorMethod"></el-progress>
                  </div>
                </el-col>
              </el-row>
           </div>
          </div>
          <div style="clear: both;"></div>
        </li>
      </ul>
      <div class="project-task-add" @click="addNewTask">
        <i class="el-icon-circle-plus"></i>
        <span>追加新任务</span>
      </div>
    </div>
    <el-dialog
      :title="addTitleName"
      :visible.sync="dialogVisible"
      width="23%">
      <div class="project-task-dialog">
        <div v-if="onmy === '1'">
          <div class="desc">词频:</div>
          <el-input v-model="wordFrequency" @change="changeFrequency" placeholder="填入词频"></el-input>
        </div>
        <div v-if="onmy === '2'">
          <el-radio-group v-model="radioMpingList">
            <div v-for="(item,index) in exisTenceProjectMping" :key="index">
              <el-radio :label="item.id" border>
                <span class="desc">词频: {{item.frequency}}</span>
                <span class="desc">词汇量: {{item.frequencyNum}}</span>
              </el-radio>
            </div>
          </el-radio-group>
        </div>
        <div v-if="onmy === '1'" class="desc">统计:</div>
        <div v-if="onmy === '1'" class="project-task-statistics">
          <div class="add-word">
            <el-row :gutter="10">
              <el-col :span="12">
                <div class="word">
                  <span style="margin-left: 10px;">新增词频量: <b>{{addPercent}}%</b></span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="word">
                  <span style="margin-left: 10px;">新增词汇量: <b>{{addRecordNum}}</b></span>
                </div>
              </el-col>
            </el-row>
            <div class="word" style="margin-top: 5px;">
              <span style="margin-left: 10px;">当前人员预估工期: <b>{{durationTime}}天+</b></span>
            </div>
          </div>
        </div>
        <ul class="allocate">
          <li v-if="onmy === '1'" v-for="item in mappingRevisionUserList">
            <div class="desc">{{item.username}}:</div>
            <el-input v-model="item.desc" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" placeholder="填入分配量，不填默认剩余值均分"></el-input>
          </li>
          <li v-if="onmy === '2'" v-for="item in mappingRevisionUserList">
            <div class="desc">{{item.username}}:</div>
            <el-input v-model="item.desc" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" placeholder="填入分配量，不填默认剩余值均分"></el-input>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button style="width: 100px;" @click="dialogVisible = false">取 消</el-button>
        <el-button style="width: 100px;" type="primary" @click="addCheckTaskAllocation">新 增</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {mapGetters} from 'Vuex'
import { common } from "api/index.js";
export default {
  props: [
  ],
  data(){
    return {
      onmy: '1',
      projectCreatUser: '', // 项目创建人
      projectStatus: '', // 项目状态
      projectTime: '', // 项目时间节点
      onmyNumber: [], // 术语量数据
      projectLeaderList: [], // 项目负责人列表
      projectMpUserList: [], // 映射人员列表
      pSjLeaderArrList: [], // 审校负责人列表
      projectSjUserList: [], // 审校人员列表
      labelPosition: 'left',
      formData: {
        projectLeader: [],
        projectOnStand: '',
        pSjLeaderArr: [],
        projectSjUser: [],
        projectMpUser: []
      },
      distributionArr: [], // 任务分配列表
      exisTenceProjectMping: [],
      radioMpingList: [],
      addTitleName: '新名称',
      dialogVisible: false,
      wordFrequency: '', // 映射 词频
      prooFreading: '', // 审校 词频
      vocaBulary: '', //审校 词汇量
      newPercent: 0, // 词频占比
      addPercent: 0, // 新增词频量
      addRecordNum: 0, // 新增词汇量
      durationTime: 0, // 当前人员预估工期
      mappingRevisionUserList: [], // 获取映射/审校人员列表
    }
  },
  methods: {
    // 跳转到我的项目列表
    tranMyProject(){
      this.$router.push({
        path: '/task-manager-page'
      })
    },
    // 获取任务分配-术语映射
    mappingDistributionAction(){
      let obj = {
        uid: this.userId,
        projectId: this.$route.query.projectId
      }
      common.mappingDistributionAction(obj).then(res => {
        let data = res.list
        this.onmyNumber = []
        if(res.code === 200){
          this.formData.projectMpUser = []
          this.formData.projectLeader = []
          data.projectMpUser.forEach(item => {
            this.formData.projectMpUser.push(item.userId)
          }) // 获取映射人员
          data.projectLeader.forEach(item => {
            this.formData.projectLeader.push(item.userId)
          }) // 获取项目负责人列表
          this.distributionArr = data.distributionArr
          this.projectLeaderList = data.projectLeader
          this.formData.projectOnStand = data.projectOnStand
          this.projectCreatUser = data.projectCreatUser
          this.projectStatus = data.status
          this.projectTime = data.projectTime
          for(let i in data){
            if(i === 'projectOntoNum' || i === 'projectMpNum' || i === 'projectFreNum'){
              let obj = {
                name: '',
                number: ''
              }
              if(i === 'projectOntoNum'){
                obj.name = '总临床术语量'
                obj.number = data[i]
              } else if(i === 'projectMpNum'){
                obj.name = '中央库匹配量'
                obj.number = data[i]
              } else if(i === 'projectFreNum'){
                obj.name = '临床术语总词频量'
                obj.number = data[i]
              }
              this.onmyNumber.push(obj)
            }
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //获取任务分配-术语审校
    sjDistributionAction(){
      let obj = {
        uid: this.userId,
        projectId: this.$route.query.projectId
      }
      common.sjDistributionAction(obj).then(res => {
        let data = res.list
        this.onmyNumber = []
        if(res.code === 200){
          this.formData.projectLeader = []
          this.formData.projectSjUser = []
          this.formData.pSjLeaderArr = []
          data.projectLeader.forEach(item => {
            this.formData.projectLeader.push(item.userId)
          }) // 获取项目负责人列表
          data.projectSjUser.forEach(item => {
            this.formData.projectSjUser.push(item.userId)
          }) // 获取审校人员
          data.pSjLeaderArr.forEach(item => {
            this.formData.pSjLeaderArr.push(item.userId)
          }) // 获取审校负责人
          this.distributionArr = data.distributionArr
          this.projectLeaderList = data.projectLeader
          this.formData.projectOnStand = data.projectOnStand
          this.projectCreatUser = data.projectCreatUser
          this.projectStatus = data.status
          this.projectTime = data.projectTime
          for(let i in data){
            if(i === 'projectOntoNum' || i === 'projectMpNum' || i === 'projectFreNum'){
              let obj = {
                name: '',
                number: ''
              }
              if(i === 'projectOntoNum'){
                obj.name = '总临床术语量'
                obj.number = data[i]
              } else if(i === 'projectMpNum'){
                obj.name = '中央库匹配量'
                obj.number = data[i]
              } else if(i === 'projectFreNum'){
                obj.name = '临床术语总词频量'
                obj.number = data[i]
              }
              this.onmyNumber.push(obj)
            }
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 术语映射 映射质检
    terminologyMapping(params){
      if(params === '1'){
        this.onmy = '1'
        this.mappingDistributionAction()
        this.getMpSjUserList()
      } else {
        this.onmy = '2'
        this.sjDistributionAction()
        this.getMpSjUserList()
      }
    },
    // 取消
    cancleAllocation(){
      this.$router.push({
        path: '/task-manager-page'
      })
    },
    // 确定
    checkAllocation(){
      this.$router.push({
        path: '/task-manager-page'
      })
    },
    customColorMethod(percentage){
      if(percentage<100){
        return '#32BFCC'
      } else {
        return '#67C23A'
      }
    },
    // 选择映射人员改变
    changeMappingUser(arr, arr1,val){
      let obj = {
        uid: this.userId,
        projectId: this.$route.query.projectId,
        type: val,
        userJson: '',
      }, objUserJson = {}
      this.getMpRevisionList(arr, arr1)
      this.mappingRevisionUserList.forEach(item => {
        objUserJson[item.id] = item.username
      })
      obj.userJson = JSON.stringify(objUserJson);
      common.addProjectUserAction(obj).then(res => {
        if(res){
          if(res.code === 200){
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    },
    // 追加新任务
    addNewTask(){
      this.dialogVisible = true
      this.addTitleName = '第' + (this.distributionArr.length + 1) + '期任务描述'

      if(this.onmy === '1'){
        this.getMpRevisionList(this.projectMpUserList, this.formData.projectMpUser)
      } else if(this.onmy === '2'){
        this.getProjectMpingList()
        this.getMpRevisionList(this.projectSjUserList, this.formData.projectSjUser)
      }
    },
    // 获取映射项目的映射任务列表
    getProjectMpingList(){
      let obj = {
        uid: this.userId,
        projectId: this.$route.query.projectId
      }
      common.getProjectMpingList(obj).then(res => {
        this.exisTenceProjectMping = res.list
      })
    },
    // 获取映射/审校人员列表
    getMpRevisionList(mapList, newVal){
      this.mappingRevisionUserList = []
      mapList.forEach(item => {
        newVal.forEach(val => {
          if(item.id === val){
            item.desc = ''
            let obj = {
              username: item.username,
              desc: item.desc,
              id: item.id
            }
            this.mappingRevisionUserList.push(obj)
          }
        })
      })
    },
    // 查找词频的相关统计信息
    changeFrequency(){
      let obj = {
        uid: this.userId,
        projectId: this.$route.query.projectId,
        frequency: this.wordFrequency,
        type: '1'
      }
      common.getStatisticsByF(obj).then(res => {
        if(res.code === 200){
          this.newPercent = res.list.newPercent
          this.addPercent = res.list.addPercent
          this.addRecordNum = res.list.addRecordNum
          this.durationTime = res.list.time
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取映射/审校人员列表
    getMpSjUserList(){
      let obj = {
        uid: this.userId,
        type: this.onmy
      }
      common.getMpSjUserList(obj).then(res => {
        if(res.code === 200){
          this.projectMpUserList = res.list
          this.pSjLeaderArrList = res.list
          this.projectSjUserList = res.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 新增任务分配
    addCheckTaskAllocation(){
      if(this.onmy === '1'){
        let obj = {
          uid: this.userId,
          projectId: this.$route.query.projectId,
          frequency: this.wordFrequency,
          percent: this.newPercent,
          frenum: this.addRecordNum,
          type: this.onmy,
          distributionJson: '',
          fid: ''
        }, objJson = {}
        this.mappingRevisionUserList.forEach(item => {
          objJson[item.id] = item.desc
        })
        obj.distributionJson = JSON.stringify(objJson);
        common.addDistributionAction(obj).then(res => {
          if(res.code === 200){
            this.$message.success(res.msg)
            this.mappingDistributionAction()
            this.dialogVisible = false
          } else {
            this.$message.error(res.msg)
          }
        })
      } else if(this.onmy === '2'){
        let obj = {
          uid: this.userId,
          projectId: this.$route.query.projectId,
          frequency: '',
          percent: '',
          frenum: '',
          type: this.onmy,
          distributionJson: '',
          fid: ''
        }, objJson = {}
        this.exisTenceProjectMping.forEach(item => {
          if(item.id === this.radioMpingList){
            obj.frequency = item.frequency
            obj.percent = item.frepercent
            obj.frenum = item.frequencyNum
            obj.fid = item.id
          }
        })
        this.mappingRevisionUserList.forEach(item => {
          objJson[item.id] = item.desc
        })
        obj.distributionJson = JSON.stringify(objJson);
        console.log(obj)
        common.addDistributionAction(obj).then(res => {
          console.log(res)
          if(res.code === 200){
            this.$message.success(res.msg)
            this.sjDistributionAction()
            this.dialogVisible = false
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
  },
  mounted(){
    this.mappingDistributionAction()
    this.getMpSjUserList()
  },
  computed: {
    ...mapGetters([
      'userId',
    ])
  }
}
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
<style lang="less">
.el-progress-bar__outer{
  height: 12px !important;
}
.project-task-dialog{
  .el-radio-group{
    width: 100%;
  }
}
.project-task-dialog .el-radio.is-bordered{
  width: 100%;
  margin: 10px 0px;
}
</style>
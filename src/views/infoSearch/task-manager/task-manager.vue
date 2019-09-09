<style lang="less">
.role-list-pagination{
  .el-pagination.is-background .el-pager li{
    margin: 0px;
    border: 1px solid #E3E8EB;
    width: 40px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .el-pagination.is-background .btn-prev{
    margin: 0px;
    width: 40px;
    height: 40px;
    border: 1px solid #E3E8EB;
    background-color: #fff;
  }
  .el-pagination.is-background .btn-next{
    margin: 0px;
    width: 40px;
    height: 40px;
    border: 1px solid #E3E8EB;
    background-color: #fff;
  }
}
.task-page .el-dialog__header{
  background: #F4F4F4;
  padding: 20px;
}
.task-page .el-dialog__footer{
  padding: 20px;
  background: #EFF2F7;
  text-align: center;
}
.origin-table-data .el-input__inner{
  height: 28px;
  line-height: 28px;
}
</style>
<template>
  <div class="task-page">
    <div>
      <div class="task-role">
        <span style="margin-left: 40px;font-size: 20px;">任务管理</span>
        <div class="input-with-button">
          <el-input placeholder="搜索" v-model="searchContent" style="width: 300px;">
            <el-button slot="append" icon="el-icon-search" @click="searchProject"></el-button>
          </el-input>
          <el-select v-model="typeOfSearch" placeholder="请选择搜索类型">
            <el-option
              v-for="item in typeOfSearchList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="task-role-list">
        <ul>
          <li>
            <span style="cursor: pointer;" @click="addNewProject">
              <i class="el-icon-circle-plus"></i>
              <span>新增项目</span>
            </span>
          </li>
          <li v-for="(val,index) in projectList" :key="index" @click="changeTaskAllocation(val)">
            <div class="role-list-name">
              <span><b>{{val.projectName}}</b></span>
            </div>
            <div class="type-list-name">
              <div>
                <span>
                  当前状态：
                  <span style="color: #E27D3C;">{{val.status}}</span>
                </span>
                <span style="margin-left: 40px;">{{val.totalNum}}条</span>
              </div>
              <div v-if="val.role.pLearder">
                <span>
                  项目负责人：
                  <span v-for="(item, index1) in val.role.pLearder" :key="index1">{{item}}
                    <span v-if="index1 !== val.role.pLearder.length - 1">、</span>
                  </span>
                </span>
              </div>
              <div v-if="val.role.pSjuser">
                <span>
                  审校负责人：
                  <span v-for="(item, index1) in val.role.pSjuser" :key="index1">{{item}}
                    <span v-if="index1 !== val.role.pSjuser.length - 1">、</span>
                  </span>
                </span>
              </div>
              <div v-if="val.role.pMappingUser">
                <span>
                  映射人员：
                  <span v-for="(item, index1) in val.role.pMappingUser" :key="index1">{{item}}
                    <span v-if="index1 !== val.role.pMappingUser.length - 1">、</span>
                  </span>
                </span>
              </div>
              <div v-if="val.role.pCheckUser">
                <span>
                  质检人员：
                  <span v-for="(item, index1) in val.role.pCheckUser" :key="index1">{{item}}
                    <span v-if="index1 !== val.role.pCheckUser.length - 1">、</span>
                  </span>
                </span>
              </div>
              <div v-if="val.percent.totalNum">
                <span>
                  映射进度：
                  <span class="side-edge">{{val.percent.finishNum}}/{{val.percent.totalNum}}</span>
                </span>
                <span style="margin-left: 40px;">({{val.percent.percentM}}%)</span>
              </div>
              <div v-if="val.percent.totalNumZ">
                <span>
                  质检进度：
                  <span class="side-edge">{{val.percent.finishNumZ}}/{{val.percent.totalNumZ}}</span>
                </span>
                <span style="margin-left: 40px;">({{val.percent.percentZ}}%)</span>
              </div>
              <div>
                <span>
                  映射类型:
                  <span v-if="val.mpingType === '1'" style="margin-left: 10px;">诊断</span>
                  <span v-else-if="val.mpingType === '2'" style="margin-left: 10px;">药品</span>
                  <span v-else-if="val.mpingType === '3'" style="margin-left: 10px;">手术</span>
                  <span v-else-if="val.mpingType === '4'" style="margin-left: 10px;">检验</span>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div style="clear: both;"></div>
      <div class="role-list-pagination" style="margin: 40px; float: right;">
        <el-pagination
          background
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="totalList"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="项目初始信息"
      :visible.sync="dialogVisible"
      width="25%">
      <div>
        <div class="alone"><b>项目名称:</b></div>
        <el-input v-model="entryName" placeholder="请填入项目名称"></el-input>
        <div class="alone"><b>任务阶段:</b></div>
        <el-select style="width: 100%;" v-model="taskPhase" placeholder="请选择">
          <el-option
            v-for="item in taskPhaseList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="alone"><b>项目负责人:</b></div>
        <el-select style="width: 100%;" v-model="searchTypeCharge" multiple placeholder="请选择">
          <!-- <el-input v-model="chargePerson" placeholder="搜索"></el-input> -->
          <el-option
            v-for="(item,index) in searchTypeListProject"
            :key="item.id"
            :label="item.username"
            :value="item.id">
            </el-table>
          </el-option>
        </el-select>
      </div>
      <div class="alone" style="margin: 20px 0px">
        <span><b>操作人员:</b> {{userName}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col :span="8">
            <el-button type="info" @click="dialogVisible = false">取 消</el-button>
          </el-col>
          <el-col :span="8">
            <el-upload
              class="upload-demo"
              :action="urlLoad()"
              :before-upload = 'uploadParams'
              :show-file-list = 'showFileList'
              :on-success = 'fileUploadSuccess'
              :on-error = 'fileUploadError'
            ><div class="button">
                <el-button type="primary">导 入</el-button>
              </div>
            </el-upload>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="saveImportExcel">确 定</el-button>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
    <el-dialog
      title="项目数据与标准数据对齐"
      :visible.sync="standardVisible"
      width="40%">
      <div class="origin-table-data">
        <el-table :data="originalTable" stripe>
          <el-table-column prop="originName" label="原始表" align="center"></el-table-column>
          <el-table-column label="标准表">
            <template slot-scope="scope">
              <div>
                <el-select
                style="width: 70%;"
                v-model="scope.row.name"
                filterable
                allow-create
                default-first-option
                placeholder="请选择"
                size="mini">
                <el-option
                  v-for="item in nameList"
                  :key="item.name"
                  :value="item.name"
                  :label="item.name"
                ></el-option>
              </el-select>
                <span style="margin-left: 20px;color: #EC496A;cursor: pointer;" @click="delAlignment(scope.row)">
                  <i class="el-icon-remove"></i>
                </span>
              </div>
              <div style="margin: 10px 0px;font-size: 11px; color: #000;" v-if="scope.row.name === '映射状态'">映射状态: 未映射，精准，向上，存疑，无法映射</div>
              <div style="margin: 10px 0px;font-size: 11px; color: #000;" v-if="scope.row.name === '词评价'">词评价: 正常，无效，待分词</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-row>
        <el-col :span="12">
          <div style="margin-top: 20px;text-align: center;color: #5473E7;">
            <span style="cursor: pointer;" @click="addAlignment">
              <i class="el-icon-circle-plus"></i>
              <span>新增</span>
            </span>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="standardVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveImportTable">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="填写基础信息及术语标准"
      :visible.sync="basicFillTermVisible"
      width="25%">
      <div>
        <div style="margin: 10px 0px; font-size: 18px;">基础信息:</div>
        <el-date-picker
          v-model="dataInfo"
          style="width: 100%;"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
        <el-input style="margin: 5px 0px;" v-model="hospitalInfo" placeholder="请填入医院信息"></el-input>
        <el-input v-model="departInfo" placeholder="请填入科室信息"></el-input>
        <div style="margin: 10px 0px; font-size: 18px;">选择术语标准:</div>
        <el-select style="width: 100%;" v-model="searchTypeTask" placeholder="映射类型选择">
          <el-option
            v-for="item in searchTypeListTask"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select style="margin: 5px 0px; width: 100%;" v-model="standardConcept" placeholder="映射术语体系选择">
          <el-option
            v-for="item in standardConceptListTask"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-select style="width: 100%;" v-model="sopData" placeholder="映射SOP选择">
          <el-option
            v-for="item in sopListTask"
            :key="item.id"
            :label="item.sopname"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="basicFillTermVisible = false">取 消</el-button>
        <el-button type="primary" @click="successBasicFillTermVisible">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'Vuex'
import { common } from "api/index.js";
import { apiUrl } from "base/js/base.js"
export default {
  data() {
    return {
      searchContent: '', // 搜索文本
      typeOfSearch: '', // 搜索类型
      typeOfSearchList: [
        {id: '0', name: '全部'},
        {id: '1', name: '医院'},
        {id: '2', name: '科室'},
        {id: '3', name: '项目名称'},
      ], // 搜索类型列表
      projectList: [], // 项目数据列表
      projectId: '', // 项目ID
      totalList: 0, // 项目总数
      pageSize: 7, // 每页条数
      currentPage: 1, // 当前页数

      dialogVisible: false, // 项目初始信息 显示、隐藏
      entryName: '', // 项目初始信息 项目名称
      taskPhase: '', // 项目初始信息 任务阶段
      taskPhaseList: [{value: '1', label: '映射'},{value: '2', label: '审校'}],// 项目初始信息 任务阶段列表
      searchTypeCharge: '', // 项目初始信息 项目负责人
      chargePerson: '', // 项目初始信息 搜索
      searchTypeListProject: [], // 项目初始信息 项目负责人列表

      showFileList: false, // 上传文件列表是否展示
      baseUrl: apiUrl, // 上传请求地址
      fileName: '', // 上传文件名称
      fileId: '', // 上传文件ID

      originalTable: [], // 项目数据与标准数据对齐 原始表
      nameList: [
        {name: '临床术语'},
        {name: '参考编码'},
        {name: '词频'},
        {name: '上下文信息'}
      ], // 项目数据与标准数据对齐 标准字段列表
      standardVisible: false, // 项目数据与标准数据对齐 显示、隐藏
      
      basicFillTermVisible: false, // 基础信息 显示、隐藏
      dataInfo: '', // 基础信息 日期
      hospitalInfo: '', // 基础信息 医院信息
      departInfo: '', // 基础信息 科室信息
      searchTypeTask: '', // 基础信息 映射类型选择
      searchTypeListTask: [
        {id: '1', name: '诊断'},
        {id: '2', name: '药品'},
        {id: '3', name: '手术'},
        {id: '4', name: '检验'},
      ], // 基础信息 映射类型选择列表
      standardConcept: '', // 基础信息 标准术语体系
      standardConceptListTask: [], // 基础信息 标准术语体系列表
      sopData: '', // 基础信息 映射SOP选择
      sopListTask: [], // 基础信息 映射SOP选择列表
    }
  },
  mounted() {
    this.getInit()
  },
  methods: {
    // 上传请求地址
    urlLoad(){
      let url = this.baseUrl.apiUrl + 'uploadFile.php?file=' + this.fileName + '&userId=' + this.userId
      return url
    },
    // 初始化项目
    getInit(){
      this.getProjectList()
    },
    // 获取项目列表
    getProjectList(){
      let obj = {
        uid: this.userId,
        page: this.currentPage,
        pagesize: 7,
        type: this.typeOfSearch,
        hospitalName: this.searchContent,
        departmentName: this.searchContent,
        projectName: this.searchContent,
      }
      common.getProjectList(obj).then(res => {
        if(res.code === 200){
          this.projectList = res.list
          this.totalList = res.pageInfo.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 搜索按钮
    searchProject(){
      this.getProjectList()
    },
    // 页数改变
    handleCurrentChange(val){
      this.currentPage = val
      this.getProjectList()
    },
    // 新增项目按钮
    addNewProject(){
      this.dialogVisible = true
      this.getProjectUserList() // 新增 项目负责人列表
    },
    // 获取项目负责人列表
    getProjectUserList(){
      common.getProjectUserList(this.userId).then(res => {
        if(res.code === 200){
          this.searchTypeListProject = res.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 保存项目名称/任务阶段/负责人
    saveImportExcel(){
      if(this.taskPhase === '2'){
        this.nameList = [{name: '临床术语'},{name: '参考编码'},{name: '词频'},{name: '上下文信息'},
                         {name: '标准术语名称'},{name: '标准术语编码'},{name: '映射状态'},{name: '词评价'}]
      }
      let obj = {
        uid: this.userId,
        projectName: this.entryName,
        type: this.taskPhase,
        pLeaderId: this.searchTypeCharge,
      }
      common.saveProjectInfo(obj).then(res => {
        if(res.code === 200){
          this.projectId = res.projectId
          this.dialogVisible = false
          this.standardVisible = true
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 上传文件之前的钩子函数
    uploadParams(file){
      this.fileName = file.name
    },
    // 文件上传成功
    fileUploadSuccess(file){
      if(file.code === 200){
        this.originalTable = []
        file.execlFiled.forEach((item, index) => {
          let obj = {
            originName: item,
            name: ''
          }
          this.originalTable.push(obj)
        })
        this.$message.success("文件上传成功")
        this.fileId = file.fileId
      } else {
        this.$message.error(file.msg)
      }
    },
    // 文件上传失败
    fileUploadError(){
      this.$message.error('文件上传失败')
    },
    //去除空格
    allTrim(a){
      a = a.replace(/\s*/g,"")
      return a
    },
    // 新增对齐列表
    addAlignment(){
      let len = this.originalTable.length -4
      this.originalTable.push({
        originName: '其他' + len,
        name: ''
      })
    },
    // 删除对齐列表
    delAlignment(row){
      delete this.originalTable[row.originName]
      this.originalTable.forEach((item, index) => {
        if(item.originName === row.originName){
          this.originalTable.splice(index, 1)
        }
      })
    },
    // 项目数据与标准数据对齐
    saveImportTable(){
      if(this.taskPhase === '1'){
        let obj1 = {}, obj = {
          uid: this.userId,
          fileId: this.fileId,
          projectId: this.projectId,
          type: this.taskPhase,
          cname: '',
          conceptCode: '',
          frequency: '',
          conceptText: '',
          otherMapping: {}
        }
        this.originalTable.forEach(item => {
          if(item.name === '临床术语'){
            obj.cname = item.originName
          } else if(item.name === '参考编码'){
            obj.conceptCode = item.originName
          } else if(item.name === '词频'){
            obj.frequency = item.originName
          } else if(item.name === '上下文信息'){
            obj.conceptText = item.originName
          } else {
            obj1[item.originName] = item.name
          }
        })
        obj.otherMapping = JSON.stringify(obj1)
        this.saveFieldMapping(obj)
      } else {
        let obj1 = {}, obj = {
          uid: this.userId,
          fileId: this.fileId,
          projectId: this.projectId,
          type: this.taskPhase,
          cname: '',
          conceptCode: '',
          frequency: '',
          conceptText: '',
          standName: '',
          standCode: '',
          standStatus: '',
          wordAppraise: '',
          otherMapping: {}
        }
        this.originalTable.forEach(item => {
          if(item.name === '临床术语'){
            obj.cname = item.originName
          } else if(item.name === '参考编码'){
            obj.conceptCode = item.originName
          } else if(item.name === '词频'){
            obj.frequency = item.originName
          } else if(item.name === '上下文信息'){
            obj.conceptText = item.originName
          } else if(item.name === '标准术语名称'){
            obj.standName = item.originName
          } else if(item.name === '标准术语编码'){
            obj.standCode = item.originName
          } else if(item.name === '映射状态'){
            obj.standStatus = item.originName
          } else if(item.name === '词评价'){
            obj.wordAppraise = item.originName
          } else {
            obj1[item.originName] = item.name
          }
        })
        obj.otherMapping = JSON.stringify(obj1)
        this.saveFieldMapping(obj)
      }
    },
    // 保存上传文件与标准字段之间映射关系
    saveFieldMapping(obj){
      common.saveFieldMapping(obj).then(res => {
        if(res.code === 200){
          this.$message.success(res.msg)
          this.standardVisible = false
          this.basicFillTermVisible = true
          this.getStandardConcept() // 新增 获取标准术语体系列表
          this.getSopList() // 新增 获取映射SOP列表
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取标准术语体系列表
    getStandardConcept(){
      common.getStandardConcept(this.userId).then(res => {
        if(res.code === 200){
          this.standardConceptListTask = res.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取映射SOP列表
    getSopList(){
      common.getSopList(this.userId).then(res => {
        if(res.code === 200){
          this.sopListTask = res.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 保存项目基础信息
    successBasicFillTermVisible(){
      let obj ={
        uid: this.userId,
        projectId: this.projectId,
        endTime: this.dataInfo,
        hospital: this.hospitalInfo,
        department: this.departInfo,
        mpingType: this.searchTypeTask,
        mpingOntology: this.standardConcept,
        mpingSop: this.sopData
      }
      common.saveProjectOtherInfo(obj).then(res => {
        if(res.code === 200){
          this.$message.success(res.msg)
          this.basicFillTermVisible = false
          this.getProjectList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 跳转 任务分配页面
    changeTaskAllocation(params){
      let obj = {
        uid: this.userId,
        projectId: params.projectId
      }
      common.getProjectStatus(obj).then(res => {
        if(res.status === 21){
          this.$router.push({
            path: '/task-allocation',
            query: params,
          })
        } else {
          this.$message.error('任务进行中，页面无法跳转')
        }
      })
    },
  },
  components: {
  },
  computed: {
    ...mapGetters([
      'userId',
      'userName'
    ])
  },
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>

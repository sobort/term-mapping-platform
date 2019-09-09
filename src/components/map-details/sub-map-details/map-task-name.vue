<template>
  <div>
    <div v-show="showTableList">
      <div class="project-container-details">
        <div class="check-in">
          <span style="float: left;">临床术语信息</span>
          <span style="float: right; cursor: pointer;" @click="showGlossary">
            <span style="color: #5473E7;">
              <i class="el-icon-menu"></i>
            </span>
            <span style="margin-left: 10px;">查看全部</span>
          </span>
        </div>
        <div style="clear: both;"></div>
        <div class="table">
          <span class="left">
            <i class="el-icon-caret-left" @click="moveLeftData"></i>
          </span>
          <div style="margin: 10px 40px;">
            <el-table
              :data="tableData"
              border
              :header-cell-style="{background: '#DCE2F8', color: '#000'}"
            >
              <el-table-column prop="frequency" label="词频" align="center"></el-table-column>
              <el-table-column label="映射状态" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.mstatus === '1'">精准</div>
                  <div v-else-if="scope.row.mstatus === '2'">向上</div>
                  <div v-else-if="scope.row.mstatus === '3'">存疑</div>
                  <div v-else-if="scope.row.mstatus === '4'">无法映射</div>
                </template>
              </el-table-column>
              <el-table-column prop="conceptName" label="临床术语" align="center"></el-table-column>
              <el-table-column prop="standName" label="标准术语" align="center"></el-table-column>
              <el-table-column prop="similar" label="相似度" align="center"></el-table-column>
              <el-table-column prop="conceptCode" label="参考编码" align="center"></el-table-column>
              <el-table-column prop="standCode" label="标准编码" align="center"></el-table-column>
            </el-table>
          </div>
          <span class="right">
            <i class="el-icon-caret-right" @click="moveRightData"></i>
          </span>
        </div>
        <div class="map">
          <el-row :gutter="10">
            <el-col :span="8">
              <div style="margin: 10px 0px;font-size: 15px;">
                <span>上下文信息</span>
              </div>
              <div>
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="context"></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div style="margin: 10px 0px;font-size: 15px;">
                <span>备注</span>
              </div>
              <div>
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="remarks"></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="mapping-radio">
                <el-radio-group v-model="singleRadio">
                  <el-radio :label="1">精准</el-radio>
                  <el-radio :label="2">向上</el-radio>
                  <el-radio :label="3">存疑</el-radio>
                  <el-radio :label="4">无法映射</el-radio>
                </el-radio-group>
                <el-radio-group v-model="wordEvaluation">
                  <el-radio :label="1">正常</el-radio>
                  <el-radio :label="2">无效</el-radio>
                  <el-radio :label="3">待分词</el-radio>
                </el-radio-group>
                <el-button style="width: 100%;" type="primary" @click="moveRightData">映射</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div>
        <MapConcept @changeTableData="changeTableData" :tableData="tableData"></MapConcept>
      </div>
    </div>
    <div v-show="!showTableList">
      <AllGlossary :showTableList="showTableList" @returnPage="returnPage"></AllGlossary>
    </div>
  </div>
</template>
<script>
import { onmy } from 'api/index.js'
import MapConcept from '../../map-concept/map-concept.vue'
import AllGlossary from '../../map-all-glossary/map-all-glossary.vue'
import { mapGetters, mapMutations } from 'Vuex';
export default {
  data() {
    return {
      showTableList: true,
      tableData: [], // 表数据
      context: '', // 上下文信息
      remarks: '', // 备注
      singleRadio: '', // 映射状态
      wordEvaluation: '', // 词评价
      currentPage: 1, // 当前页
      totalList: 0, // 总数
    };
  },
  mounted(){
    this.getMappingList()
  },
  methods: {
    ...mapMutations([
      'getStandCode',
      'getRecordId'
    ]),
    // 获取映射记录
    getMappingList(){
      let obj = {
        uid: this.userId,
        projectId: this.projectId,
        type: '1',
        page: this.currentPage,
        pagesize: 1
      }
      onmy.getUserTaskList(obj).then(res => {
        if(res.code === 200){
          this.tableData = res.list
          this.getRecordId(res.list[0].id)
          this.totalList = parseInt(res.pageInfo.total)
          this.context = res.list[0].conceptText
          this.remarks = res.list[0].remark
          this.getStandCode(res.list[0].standCode)
          this.singleRadio = parseInt(res.list[0].mstatus)
          this.wordEvaluation = parseInt(res.list[0].wordAppraise)
        }
      })
    },
    // 查看全部
    showGlossary(){
      this.showTableList = false
    },
    changeTableData(val){
      this.tableData = val
    },
    // 左移
    moveLeftData(){
      if(this.currentPage > 1){
        this.currentPage--
        this.getMappingList()
      }
    },
    // 右移
    moveRightData(){
      if(this.currentPage < this.totalList){
        this.currentPage++
        this.getMappingList()
      }
    },
    returnPage(val){
      this.showTableList = val
    }
  },
  components: {
    MapConcept,
    AllGlossary
  },
  computed: {
    ...mapGetters([
      'userId',
      'projectId',
      'recordId'
    ])
  }
};
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
<style lang="less">
.el-progress-bar__outer{
  height: 12px !important;
}
.mapping-radio .el-radio{
  color: #000;
  margin-bottom: 17px;
}
.mapping-radio .el-button--primary{
  background-color: #5473E7;
  border: 1px solid #5473E7;
}
</style>

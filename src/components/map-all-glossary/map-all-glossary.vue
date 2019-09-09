<template>
  <div style="margin: 20px 0px;">
    <div v-show="showBatchOperation" style="margin: 0px 40px;">
      <div>
        <el-row>
          <el-col :span="2">
            <el-button type="primary" @click="backMapDetail">返回</el-button>
          </el-col>
          <el-col :span="22">
            <el-input v-model="searchText" placeholder="请输入内容" @keyup.enter.native="searchAllList">
              <el-button slot="append" icon="el-icon-search" @click="searchAllList"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px;">
        <el-table :data="tableData" border :header-cell-style="{background: '#DCE2F8', color: '#000'}">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="词频" prop="frequency" align="center"></el-table-column>
          <el-table-column label="映射状态" prop="mstatus" align="center"></el-table-column>
          <el-table-column label="临床术语" prop="conceptName" align="center"></el-table-column>
          <el-table-column label="标准术语" prop="standName" align="center"></el-table-column>
          <el-table-column label="相似度" prop="similar" align="center"></el-table-column>
          <el-table-column label="参考编码" prop="conceptCode" align="center"></el-table-column>
          <el-table-column label="标准编码" prop="standCode" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="checkDetailPage">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin: 10px 0px; text-align: right;">
        <el-pagination
          background
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="totalList"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <div style="margin: 20px 0px; text-align: right;">
        <el-button type="primary" style="width: 200px;" @click="batchOperate">批量映射</el-button>
      </div>
    </div>
    <div v-show="!showBatchOperation">
      <MapBatchOperate :showBatchOperation="showBatchOperation" @backGlossary="backGlossary"></MapBatchOperate>
    </div>
  </div>
</template>
<script>
import { onmy } from 'api/index.js'
import MapBatchOperate from '../map-batch-operate/map-batch-operate.vue'
import { mapGetters } from 'Vuex'
export default {
  props: [
    'showTableList',
  ],
  data() {
    return {
      searchText: "", // 搜索文本
      showBatchOperation: true,
      tableData: [], // 表数据
      currentPage: 1, // 当前页
      pageSize: 10, // 每页数量
      totalList: 0, // 总数
    };
  },
  mounted(){
    this.getMappingList()
  },
  methods: {
    // 搜索
    searchAllList() {
    },
    // 返回术语映射列表
    backMapDetail() {
      this.$emit("returnPage", true);
    },
    // 批量映射
    batchOperate(){
      this.showBatchOperation = false
    },
    backGlossary(val){
      this.showBatchOperation = val
    },
    getMappingList(){
      let obj = {
        uid: this.userId,
        projectId: this.projectId,
        type: '1',
        page: this.currentPage,
        pagesize: 10,
        keyword: ''
      }
      onmy.getUserTaskList(obj).then(res => {
        if(res.code === 200){
          this.tableData = res.list
          this.totalList = parseInt(res.pageInfo.total)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //  页数改变
    handleCurrentChange(val){
      this.currentPage = val
    },
    // 查看按钮
    checkDetailPage(){
      this.backMapDetail()
    },
  },
  components: {
    MapBatchOperate
  },
  computed: {
    ...mapGetters([
      'userId',
      'projectId'
    ])
  }
};
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
<style lang="less">
.role-list-pagination {
  .el-pagination.is-background .el-pager li {
    margin: 0px;
    border: 1px solid #e3e8eb;
    width: 40px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .el-pagination.is-background .btn-prev {
    margin: 0px;
    width: 40px;
    height: 40px;
    border: 1px solid #e3e8eb;
    background-color: #fff;
  }
  .el-pagination.is-background .btn-next {
    margin: 0px;
    width: 40px;
    height: 40px;
    border: 1px solid #e3e8eb;
    background-color: #fff;
  }
}
</style>
<template>
  <div class="task-page">
    <div>
      <div class="task-role">
        <div style="float: left;margin-left: 20px;font-size: 18px;">
          <span>术语映射</span>
        </div>
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
          <li v-for="(val,index) in projectList" :key="index" @click="changeTaskDetail(val)">
            <div class="role-list-name">
              <span>
                <b>{{val.projectName}}</b>
              </span>
            </div>
            <div class="type-list-name">
              <div class="current">
                <span style="float: left;">
                  当前状态：
                  <span :class="{'typeface': val.status === '映射中', 'speedface': val.status === '映射完成'}">{{val.status}}</span>
                </span>
                <span style="float: right;">{{val.bars}}</span>
              </div>
              <div style="clear: both;"></div>
              <div class="person">
                <div>
                  <span style="margin-left: 20px;">项目负责人：
                    <span v-for="(item,index) in val.projectLeader" :key="index">{{item}}
                      <span v-if="index !== val.projectLeader.length - 1">、</span>
                    </span>
                  </span>
                </div>
                <div>
                  <span style="margin-left: 20px;">映射人员：
                    <span v-for="(item,index) in val.projectUser" :key="index">{{item}}
                      <span v-if="index !== val.projectUser.length - 1">、</span>
                    </span>
                  </span>
                </div>
              </div>
              <div class="progress">
                <div style="margin-bottom: 10px;">映射进度：</div>
                <div>
                  <span style="float: left;color: #5473E8;">
                    <span :class="{'typeface': val.status === '映射中'}">{{val.finishNum}}/</span>
                    <span>{{val.totalNum}}</span>
                  </span>
                  <span style="float: right;">{{val.percent}}%</span>
                </div>
                <div style="clear: both;"></div>
                <div style="margin-top: 10px;">
                  <el-progress :show-text="false" :percentage="val.percent" :color="customColorMethod"></el-progress>
                </div>
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
  </div>
</template>
<script>
import { onmy } from 'api/index.js'
import { apiUrl } from "base/js/base.js";
import MapDetails from '@/components/map-details/map-details.vue'
import { mapGetters } from 'Vuex';
export default {
  data() {
    return {
      searchContent: "", // 搜索文本
      typeOfSearch: '', // 搜索类型
      typeOfSearchList: [
        {id: '0', name: '全部'},
        {id: '1', name: '医院'},
        {id: '2', name: '科室'},
        {id: '3', name: '项目名称'},
      ], // 搜索类型列表
      currentPage: 1, // 当前页数
      pageSize: 8, // 每页条数
      totalList: 0, // 项目总数
      projectList: [], // 项目列表
    };
  },
  mounted() {
    this.getInitList()
  },
  methods: {
    getInitList(){
      let obj = {
        uid: this.userId,
        page: this.currentPage,
        pagesize: 8,
        type: 1,
      }
      onmy.getTaskList(obj).then(res => {
        if(res.code === 200){
          this.projectList = res.taskList
          this.totalList = res.taskList.length
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 搜索
    searchProject(){

    },
    // 页数改变
    handleCurrentChange(val){
      this.currentPage = val
      this.getInitList()
    },
    // 跳转术语映射详情
    changeTaskDetail(params) {
      this.$router.push({
        path: '/map-entry-detail',
        query: params,
      })
    },
    customColorMethod(percentage) {
      if (percentage < 100) {
        return '#F7891C';
      } else {
        return '#39B44A';
      }
    },
  },
  components: {
    MapDetails
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  }
};
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
<style lang="less">
.progress .el-progress-bar__outer{
  height: 6px !important;
}
</style>

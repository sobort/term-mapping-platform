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
.el-dialog__header{
  background: #F4F4F4;
  padding: 20px 30px;
}
.el-dialog__footer{
  padding: 20px;
  text-align: center;
  background: #EFF2F7;
}
.spicel .el-checkbox__inner{
  top: -18px;
}
.multiple-select .el-checkbox__inner{
  border-radius: 10px;
}
.multiple-select .el-checkbox{
  margin-bottom: 10px;
}
.super{
  color: #000;
}
.setadd{
  margin-left: 10px;
  color: #CACACA;
}
</style>
<template>
  <div class="role-page">
    <div class="task-role">
      <div style="float: left;margin-left: 20px;font-size: 18px;">
        <span>角色管理</span>
      </div>
      <div class="input-with-button">
        <el-input placeholder="搜索" v-model="searchContent" style="width: 300px;">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-select v-model="searchType" placeholder="请选择">
          <el-option
            v-for="item in searchTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="task-role-list">
      <ul>
        <li>
          <span style="cursor: pointer;" @click="addNewRole">
            <i class="el-icon-circle-plus"></i>
            <span>新增角色</span>
          </span>
        </li>
        <li v-for="(val,index) in projectList" :key="index">
          <div class="role-list-name">
            <span>
              <i style="color: #5473E7;" class="el-icon-s-custom"></i>
              <b>{{val.username}}</b>
            </span>
          </div>
          <div class="type-list-name">
            <div class="current">
              <el-row>
                <el-col :span="6">
                  <span><b>角色：</b></span>
                </el-col>
                <el-col :span="18">
                  <span style="font-size: 13px;" v-for="(item, index) in val.rolename">
                    {{item}}
                    <span v-if="index !== val.rolename.length - 1">、</span>
                  </span>
                </el-col>
              </el-row>
            </div>
            <div class="current">
              <el-row>
                <el-col :span="6">
                  <span><b>权限：</b></span>
                </el-col>
                <el-col :span="18">
                  <div class="jurisdiction" v-for="item in val.powername">
                    <span style="margin-left: 10px;">{{item}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div style="clear: both;"></div>
    <div class="role-list-pagination" style="margin: 40px; float: right;">
      <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
    </div>
    <el-dialog
      title="角色新增"
      :visible.sync="dialogVisible"
      width="40%">
      <div class="set-user">
        <div>
          <el-row :gutter="30">
            <el-col :span="12">
              <div class="users">姓名:</div>
              <el-input v-model="userInfoName" placeholder="输入用户姓名"></el-input>
              <div class="users">设置密码:</div>
              <el-input v-model="userPassword" placeholder="设置用户密码"></el-input>
            </el-col>
            <el-col :span="12">
              <div class="users">ID:</div>
              <el-input v-model="userInfoID" placeholder="设置用户ID"></el-input>
              <div class="users">确认密码:</div>
              <el-input v-model="userCheckPassword" placeholder="确认用户密码"></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="multiple-select">
          <div style="margin: 20px 0px;font-size: 18px;">
            <span>角色管理</span>
          </div>
          <el-checkbox-group v-model="roleCheckList">
            <el-checkbox label="1">
              <span class="super">角色管理员</span>
              <span class="setadd">(增加用户，设置用户权限)</span>
            </el-checkbox>
            <el-checkbox label="2">
              <span class="super">项目管理员</span>
              <span class="setadd">(创建项目，分配项目中角色资源，负责评估初始化，改进评估规则)</span>
            </el-checkbox>
            <el-checkbox label="3">
              <span class="super">映射人员</span>
              <span class="setadd">(负责术语映射)</span>
            </el-checkbox>
            <el-checkbox class="spicel" label="4">
              <div>
                <span class="super">校验管理员</span>
                <span class="setadd">
                  (负责术语质检，可以进行质检板块任务分配，查看全部数据，</br>
                  <span style="margin-left: 85px;">更改项目组成员映射/质检结果)</span>
                </span>
              </div>
            </el-checkbox>
            <el-checkbox label="5">
              <span class="super">校验人员</span>
              <span class="setadd">(负责术语映射质检，质检管理员自动为质检人员)</span>
            </el-checkbox>
          </el-checkbox-group>
          <div style="margin: 20px 0px;font-size: 18px;">
            <span>权限控制</span>
          </div>
          <el-checkbox-group v-model="privilegeControl">
            <el-checkbox label="1">
              <span class="super">模糊匹配规则使用权限</span>
              <span class="setadd">(创建项目时，系统启动模糊匹配规则进行映射的权限)</span>
            </el-checkbox>
            <el-checkbox class="spicel" label="2">
              <span class="super">SOP修改权限</span>
              <span class="setadd">
                (SOP增加、修改权限及查看所有SOP的权限，注参与映射及质检的 </br>
                <span style="margin-left: 100px;">人员均可以查看其项目所使用的SOP)</span>
              </span>
            </el-checkbox>
            <el-checkbox label="3">
              <span class="super">中央库使用权限</span>
              <span class="setadd">(创建项目时，通过中央库进行映射，及查看中央库同义词的权限)</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { user } from "api/index.js";
import { apiUrl } from "base/js/base.js";
import MapDetails from '@/components/map-details/map-details.vue'
import { mapGetters } from 'Vuex';
export default {
  data() {
    return {
      dialogVisible: false,
      searchContent: "", // 搜索内容
      searchType: "", // 角色管理
      searchTypeList: [], // 角色列表
      projectList: [], // 用户列表
      userInfoName: '', // 输入用户姓名
      userPassword: '', // 设置用户密码
      userInfoID: '', // 设置用户ID
      userCheckPassword: '', // 确认用户密码
      roleCheckList: [], // 角色管理 多选
      privilegeControl: [], // 权限控制 多选
    };
  },
  mounted() {
    this.getInitRoleList()
  },
  methods: {
    getInitRoleList(){
      user.getUserList(this.userId).then(res => {
        this.projectList = res.list
      })
    },
    // 新增角色
    addNewRole(){
      this.userInfoName = ''
      this.userPassword = ''
      this.userInfoID = ''
      this.roleCheckList = []
      this.privilegeControl = []
      this.dialogVisible = true
    },
    addUser(){
      if(this.userInfoName && this.userPassword && this.userInfoID && 
         this.roleCheckList.length>0 && this.privilegeControl.length>0){
        let obj = {
          username: this.userInfoName,
          passwd: this.userPassword,
          accessId: this.userInfoID,
          role: JSON.stringify(this.roleCheckList),
          power: JSON.stringify(this.privilegeControl),
        }
        user.addUser(obj).then(res => {
          if(res.code === 200){
            this.$message.success('用户注册成功')
          } else {
            this.$message.error('用户注册失败')
          }
        })
      } else {
        this.$message.error('添加用户信息不全')
      }
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

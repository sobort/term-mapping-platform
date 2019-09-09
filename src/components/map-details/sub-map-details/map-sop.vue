<template>
  <div class="detail-sop">
    <div class="sop-content">
      <div class="content">
        <span>{{sopcontent}}</span>
      </div>
    </div>
    <div class="content">
      <div>
        <span>待修订SOP</span>
        <el-button style="float: right;" type="primary" @click="addRules">增加规则</el-button>
      </div>
      <div style="clear: both;"></div>
      <div class="check">
        <div style="padding: 20px;">
          <el-row>
            <el-col :span="22">
              <div style="word-wrap: break-word">{{sopcontent}}</div>
            </el-col>
            <el-col :span="2">
              <div class="button" style="float: left; color: #36C02D;">完成</div>
              <div class="button" style="float: right; color: #FF1717;">删除</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="map-dialog">
      <el-dialog
        :visible.sync="dialogVisible"
        width="40%"
        :show-close="false">
        <div>
          <div class="title">
            <span style="color: #5473E8;">
              <i class="el-icon-edit"></i>
            </span>
            <span>标题标题标题</span>
          </div>
          <div style="margin: 20px 0px;">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="textContent">
            </el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="info" style="width: 100px;" @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" style="width: 100px;" @click="addSopRule">增加SOP</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { onmy } from 'api/index.js'
import { mapGetters } from 'Vuex'
export default {
  data(){
    return {
      dialogVisible: false,
      textContent: '', // 修改内容
      sopcontent: '',
      sopId: '', // sopId
    }
  },
  mounted(){
    this.getProjectSopInfo()
  },
  methods: {
    // 增加规则按钮
    addRules(){
      this.dialogVisible = true
    },
    // 获取项目所用SOP
    getProjectSopInfo(){
      let obj = {
        uid: this.userId,
        projectId: this.projectId
      }
      onmy.getProjectSopInfo(obj).then(res => {
        if(res.code === 200){
          this.sopcontent = res.list.sopcontent
          this.sopId = res.list.sopId
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 增加规则确定
    addSopRule(){
      let obj = {
        uid: this.userId,
        sopId: this.sopId,
        content: this.textContent
      }
      onmy.updateSopAction(obj).then(res => {
        if(res.code === 200){
          this.$message.success(res.msg)
          this.dialogVisible = false
          this.getProjectSopInfo()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  },
  computed: {
    ...mapGetters([
      'userId',
      'projectId'
    ])
  }
}
</script>
<style lang="less">
.map-dialog .el-dialog__body{
  position: relative;
}
.map-dialog{
  .title{
    position: absolute;
    top: 0px;
    font-size: 20px;
  }
}
.map-dialog .el-dialog__footer{
  text-align: center;
}
</style>
<style lang="less" scoped>
.detail-sop{
  color: #000;
  .sop-content{
    height: 300px;
    border-bottom: 1px solid #EEF3F6;
  }
  .content{
    margin: 40px;
    font-size: 16px;
    .check{
      margin-top: 20px; 
      height: 100px;
      width: 100%;
      box-shadow: #EEF3F6 2px 2px 10px 5px;
      .button{
        margin-top: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>

<template>
  <div style="margin: 40px;">
    <el-table :data="tableData" border :header-cell-style="{background: '#DCE2F8', color: '#000'}">
      <el-table-column label="映射状态" prop="mstatus" header-align="center"></el-table-column>
      <el-table-column label="临床术语" prop="conceptName" header-align="center"></el-table-column>
      <el-table-column label="标准术语" prop="standName" header-align="center"></el-table-column>
      <el-table-column label="词评价" prop="wordAppraise" header-align="center"></el-table-column>
      <el-table-column label="用户名" prop="username" header-align="center"></el-table-column>
      <el-table-column label="操作时间"  prop="createtime" header-align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import {onmy} from 'api/index.js'
import { mapGetters } from 'Vuex';
export default {
  data(){
    return {
      tableData: []
    }
  },
  mounted(){
    this.getUpdateLogAction()
  },
  methods: {
    getUpdateLogAction(){
      let obj = {
        uid: this.userId,
        id: this.recordId
      }
      onmy.getUpdateLogAction(obj).then(res => {
        this.tableData = res.list
      })
    }
  },
  computed: {
    ...mapGetters([
      'recordId',
      'userId'
    ])
  }
}
</script>
<style lang="less" scoped>
</style>

<template>
  <div>
    <div class="map-static">
      <ul>
        <li>
          <div class="circle">
            <div>
              <span>任务总完成情况</span>
            </div>
            <div style="margin: 20px 0px;text-align: center;">
              <el-progress type="circle" :percentage="totalPercent" :color="colorStatus"></el-progress>
            </div>
          </div>
        </li>
        <li>
          <div class="circle">
            <div>
              <span>第一期映射</span>
            </div>
            <div style="margin: 20px 0px;text-align: center;">
              <el-progress type="circle" :percentage="25" :color="colors"></el-progress>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div style="clear: both;"></div>
    <div class="static-list">
      <div><span>术语映射统计</span></div>
      <div>
        <div id="static" style="width: 100%; height: 400px;"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {onmy} from 'api/index.js'
import * as ECHART from '@/base/js/echarts.js'
import { mapGetters } from 'Vuex';
export default {
  data(){
    return {
      colors: '#8160E6',
      colorStatus: [
        {color: '#FE9948', percentage: 20},
        {color: '#F4834C', percentage: 40},
        {color: '#E46550', percentage: 60},
        {color: '#D54755', percentage: 80},
      ],
      typeId: '1',
      totalPercent: 0,
      clList: ''
    }
  },
  methods: {
    getMapStatic(){
      let obj = {
        uid: this.userId,
        projectId: this.projectId,
        type: this.typeId
      }
      onmy.getTaskStatisticsAction(obj).then(res => {
        if(res.code === 200){
          this.totalPercent = res.list.totalPercent
          this.clList = res.list.clList
          ECHART.setMapStatic('static', this.clList)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  mounted(){
    this.getMapStatic()
  },
  computed: {
    ...mapGetters([
      'userId',
      'projectId'
    ])
  }
}
</script>
<style lang="less" scoped>
.map-static{
  ul{
    li{
      width: 300px;
      height: 300px;
      border: 1px solid #EEF3F6;
      float: left;
      list-style: none;
    }
  }
  .circle{
    margin: 40px;
    font-size: 18px;
  }
}
.static-list{
  margin: 40px;
  font-size: 18px;
}
</style>
<style lang="less">
.map-static .el-progress-circle{
  height: 150px !important;
  width: 150px !important;
}
</style>

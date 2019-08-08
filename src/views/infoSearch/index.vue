<template>
  <div class="home-display">
    <div class="home-title">
      <el-row>
        <el-col :span="10">
          <span style="margin-left: 30px; font-size: 16px;">术语展示</span>
        </el-col>
        <el-col :span="14">
          <el-select v-model="displayMenu" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input placeholder="请输入内容" v-model="homeValue" style="width: 70%">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="14" style="border-right: 1px solid #dfe3e9;">
        <el-col :span="8">
          <div class="home-content">
            <span>87201个</span>
            同义词
          </div>
        </el-col>
        <el-col :span="8">
          <div class="home-content">
            <span>78家</span>
            医院数据完成互联互通
          </div>
        </el-col>
        <el-col :span="8">
          <div class="home-content">
            <span>12308条</span>
            呼吸病学标准临床术语
          </div>
        </el-col>
        <div>
          <div id="bar" style="width: 300px; height: 300px;"></div>
        </div>
      </el-col>
      <el-col :span="10">诊断</el-col>
    </el-row>
  </div>
</template>
<script>
import * as ECHART from '../../base/js/echarts.js'
export default {
  data() {
    return {
      options: [],
      displayMenu: "",
      homeValue: ""
    };
  },
  mounted(){
    this.initChart()
  },
  methods: {
    initChart(){
      ECHART.setDataMask('bar')
    },
  }
};
</script>
<style lang="less" scoped>
.home-display {
  height: 100%;
}
.home-title {
  height: 60px;
  width: 100%;
  line-height: 60px;
  border-bottom: 1px solid #dfe3e9;
}
.home-content{
  width: 250px;
  height: 100px;
  line-height: 100px;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 20px;
  text-align: center;
  border: 1px solid #dfe3e9;
}
</style>

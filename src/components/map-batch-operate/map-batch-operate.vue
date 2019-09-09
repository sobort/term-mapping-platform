<template>
  <div class="batch-operate">
    <div class="batch-rule">
      <div class="rules">
        <el-row>
          <el-col :span="2">
            <div class="current">
              <span>当前规则:</span>
            </div>
          </el-col>
          <el-col :span="10">
            <el-input type="text" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="1">
            <div class="current" style="text-align: center;">=</div>
          </el-col>
          <el-col :span="11">
            <el-input type="text" placeholder="请输入"></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="border: 2px solid #EEF3F6;">
      <MapConcept></MapConcept>
    </div>
    <div style="margin: 20px 40px;">
      <el-row>
        <el-col :span="13">
          <div style="height: 2px;"></div>
        </el-col>
        <el-col :span="11">
          <el-select v-model="ruleData">
            <el-option
              v-for="item in mapList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button style="margin-left: 20px;width: 150px;" type="primary">创建规则&执行</el-button>
          <el-button style="width: 150px;" type="info" @click="cancleCreateRule">取消</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import MapConcept from "../map-concept/map-concept.vue";
export default {
  props: [
    'showBatchOperation'
  ],
  data() {
    return {
      ruleData: '',
      mapList: [],
    };
  },
  methods: {
    // 取消创建规则
    cancleCreateRule(){
      this.$emit('backGlossary', true)
    }
  },
  components: {
    MapConcept
  }
};
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
<style lang="less">
</style>


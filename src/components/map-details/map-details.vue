<template>
  <div class="project-task-allocate">
    <div class="allocation project-title-name">
      <span>
        <span style="cursor: pointer;" @click="backOnmyMapList">
          <i class="el-icon-arrow-left"></i>
          术语映射 / 
        </span>
        <span>映射详情</span>
      </span>
    </div>
    <div class="allocation project-mapping-menu">
      <ul>
        <li :class="onmy === '1' ? 'isMenu':''"
        @click="clickTaskName">任务名称</li>
        <li :class="onmy === '2' ? 'isMenu':''"
        style="margin-left: 40px;"
        @click="clickMappingSop">映射SOP</li>
        <li :class="onmy === '3' ? 'isMenu':''"
        style="margin-left: 40px;"
        @click="clickChangeLog">修改日志</li>
        <li :class="onmy === '4' ? 'isMenu':''"
        style="margin-left: 40px;"
        @click="clickOther">其他</li>
      </ul>
    </div>
    <div style="clear: both;"></div>
    <div v-if="onmy === '1'">
      <MapTaskName></MapTaskName>
    </div>
    <div v-else-if="onmy === '2'">
      <MapSOP></MapSOP>
    </div>
    <div v-else-if="onmy === '3'">
      <MapModifyLogs></MapModifyLogs>
    </div>
    <div v-else-if="onmy === '4'">
      <MapOthers></MapOthers>
    </div>
  </div>
</template>
<script>
import MapOthers from './sub-map-details/map-others'
import MapModifyLogs from './sub-map-details/map-modify-logs'
import MapSOP from './sub-map-details/map-sop'
import MapTaskName from './sub-map-details/map-task-name'
import { mapMutations } from 'Vuex';
export default {
  props: [],
  data(){
    return {
      onmy: '1',
      menId: '1',
      switchId: '1',
      showTableList: true,
      tableData: [],
      context: '', // 上下文信息
      remarks: '', // 备注
      singleRadio: '',
      projectData: ''
    }
  },
  created(){
    console.log(this.$route.query)
    this.getProjectId(this.$route.query.projectId)
  },
  methods: {
    ...mapMutations([
      'getProjectId'
    ]),
    // 返回术语映射列表
    backOnmyMapList(){
      this.$router.back(-1)
    },
    // 任务名称
    clickTaskName(){
      this.onmy = '1'
    },
    // 映射SOP
    clickMappingSop(){
      this.onmy = '2'
    },
    // 修改日志
    clickChangeLog(){
      this.onmy = '3'
    },
    // 其他
    clickOther(){
      this.onmy = '4'
    },
  },
  components: {
    MapTaskName,
    MapSOP,
    MapModifyLogs,
    MapOthers
  }
}
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
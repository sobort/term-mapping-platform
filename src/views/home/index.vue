<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.main {
  background: #fff;
  color: $backcolor;
  height: 100%;
  .header{
    border-bottom: 1px solid #EFF3F6;
  }
}
</style>
<template>
  <el-container class="main">
    <el-header class="header" style="height: 45px;">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="150px">
        <Tab></Tab>
      </el-aside>
      <el-main style="padding: 0px;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Tab from '../tab/tab'
import Header from '../header/header'
export default {
  data() {
    return {
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
    
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted(){
  },
  components: {
    Header,
    Tab
  }
};
</script>

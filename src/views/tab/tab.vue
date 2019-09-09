<template>
  <div class="aside">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      router
      @open="handleOpen"
      @close="handleClose"
      background-color="#222C3C"
      text-color="#fff"
      active-text-color="#fff"
    >
      <el-menu-item index="/home-page">
        <div class="icon">
          <i class="iconfont icon-Rulemanagement"></i>
        </div>
        <span style>首页</span>
      </el-menu-item>
      <el-menu-item index="/task-manager-page">
        <div class="icon">
          <i class="iconfont icon-taskmanagement"></i>
        </div>
        <span slot="title">任务管理</span>
      </el-menu-item>
      <el-menu-item index="/map-entry">
        <div class="icon">
          <i class="iconfont icon-Terminologymapping"></i>
        </div>
        <span slot="title">术语映射</span>
      </el-menu-item>
      <el-menu-item index="/reviser-entry">
        <div class="icon">
          <i class="iconfont icon-Terminologyrevision"></i>
        </div>
        <span slot="title">术语审校</span>
      </el-menu-item>
      <el-menu-item index="/role-manager">
        <div class="icon">
          <i class="iconfont icon-Rolemanagement"></i>
        </div>
        <span slot="title">角色管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(){
    },
    handleClose(){
    }
  }
};
</script>
<style lang="less" scoped>
.aside {
  height: 100%;
  background: #222c3c;
  .el-menu {
    border-right: solid 1px #000;
    .el-menu-item [class^="el-icon-"] {
      font-size: 28px;
      color: #fff;
      text-align: center;
    }
    .el-menu-item {
      height: 70px;
      padding: 0 10px !important;
    }
    .icon {
      margin-top: 20px;
      text-align: center;
      height: 30px;
      .iconfont{
        font-size: 25px;
        color:#fff;
      }
    }
    span {
      font-size: 16px;
      text-align: center;
      display: inherit;
    }
  }
}
</style>

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
      <el-menu-item index="/indexpage">
        <div class="icon">
          <i class="iconfont icon-taskmanagement" style="color:#fff;"></i>
        </div>
        <span style>术语展示</span>
      </el-menu-item>
      <el-menu-item index="/searchpage">
        <div class="icon">
          <i class="iconfont icon-Terminologysearch" style="color:#fff;"></i>
        </div>
        <span slot="title">术语搜索</span>
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
      text-align: center;
      height: 30px;
    }
    span {
      font-size: 14px;
      text-align: center;
      display: inherit;
    }
  }
}
</style>

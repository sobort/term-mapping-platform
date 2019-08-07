<template>
  <div>
    <div style="height: 60px; line-height: 60px; float: left;">
      <img src="static/img/logo.png" alt />
      <p class="left">
        <b>术语智能一体化平台</b>
      </p>
    </div>
    <div class="exit">
      退出
      <i class="iconfont el-icon-biorights"></i>
    </div>
    <div class="right">
      <i class="iconfont el-icon-biouserinfo" style="font-size:26px;"></i>
      <span style="margin-right: 20px;">user</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    exit() {
      this.$store.commit("resetState");
      this.$router.push("/");
    }
  }
};
</script>
<style lang="less" scoped>
img {
  margin-right: 14px;
  margin-top: 22px;
  width: 129px;
  float: left;
}
.left {
  font-size: 16px;
  float: left;
}
.exit {
  margin-left: 20px;
  margin-top: 13px;
  font-size: 20px;
  float: right;
  cursor: pointer;
}
.right {
  margin-top: 13px;
  font-size: 20px;
  border-right: 1px solid;
  float: right;
}
</style>

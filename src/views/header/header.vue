<template>
  <div style="width:100%;height:45px;">
    <div class="logo" >
      <img src="static/img/logo.png" alt >
      <p>术语智能一体化平台</p>
    </div>
    <div class="userinfo">
      <div>
        <i class="iconfont icon-touxiang" style="font-size:26px;line-height: 45px;"></i>
      </div>
      <div>{{userName}}&nbsp;&nbsp;&nbsp;&nbsp;|</div>
      <div @click="exit" style="padding-left:0px;">
        &nbsp;&nbsp;退出
          <i class="iconfont icon-Close" style="font-size:14px;"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
  data() {
    return {};
  },
  methods: {
    exit() {
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(['userName'])
  },
  mounted(){
    console.log(this.userName)
  },
};
</script>
<style lang="less" scoped>
  .logo {
    width: 500px;
    height: 44px;
    padding:16px 27px 16px ;
    background: #fff;
    float:left;
    img {
      width: 118px;
      height: 14px;
      margin-right:14px;
      float: left;
    }
    p{
      float: left;
      margin-top:-2px;
    }
  }
  .userinfo {
    float: right;
    color: #333;
    & > div {
      float: left;
      font-size: 14px;
      line-height:45px;
    }
    & > div + div {
      margin-left: 10px;
    }
  }
</style>

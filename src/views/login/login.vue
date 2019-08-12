<style lang='scss' scoped>
@import "../../base/css/base-var.scss";
.el-header {
  width: 100%;
  height: 50px;
  .logoLeft {
    float: left;
    width: auto;
    height: 50px;
    img {
      width: 118px;
      height: 14px;
      margin: 18px 150px;
    }
  }
  .logoRight {
    float: right;
    width: auto;
    height: 50px;
    img {
      width: 84px;
      height: 21px;
      margin: 15px 150px;
    }
  }
}
.login-info {
  width: 425px;
  height: 324px;
  position: absolute;
  top: 220px;
  left: 180px;
  color: #fff;
  font-size: 14px;
  line-height: 24px;
  h2 {
    margin-bottom: 27px;
    font-size: 32px;
  }
}
.login-main {
  width: 368px;
  height: 324px;
  position: absolute;
  top: 204px;
  right: 217px;
  h1 {
    font-size: 36px;
    font-weight: 400;
    margin-bottom: 30px;
    text-align: center;
  }
  .login {
    width: 400px;
    height: 360px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 0 20px rgba(95, 95, 95, 0.5);
    padding: 0 50px;
    .image_box {
      text-align: center;
      padding-top: 30px;
      h1 {
        font-size: 18px;
        color: #333;
        font-weight: bold;
      }
    }
    .login-input {
      margin: 24px 0;
    }
    .remember {
      text-align: left;
    }
    .loginbtn {
      .el-button--success {
        width: 100%;
        letter-spacing: 20px;
        background-color: #0088ff;
        border-color: #0088ff;
      }
    }
  }
}
.el-footer {
  height: 36px;
  font-size: 12px;
  color: #333;
  text-align: center;
  background: #fff;
  z-index: 9999;
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: 36px;
}
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  // overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>

<template>
  <div style="height:100%;position: relative;">
    <el-header style="height:50px;">
      <div class="logoLeft">
        <img src="../../../static/img/logo.png" alt srcset />
      </div>
      <div class="logoRight">
        <img src="../../../static/img/dch_logo.png" alt srcset />
      </div>
    </el-header>
    <div class="bg">
      <img src="../../../static/img/bg.png" alt srcset />
    </div>
    <div class="login-info">
      <h2>术语智能一体化平台</h2>
      <p>术语智能一体化平台术语智能一体化平台术语智能一体化平台术语智能一体化平台术语智能一体化平台术语智能一体化平台术语智能一体化平台术语智能一体化平台术语智能一体化平台</p>
    </div>
    <div class="login-main">
      <div class="login">
        <div class="image_box">
          <h1>术语智能一体化平台</h1>
        </div>
        <div class="login-input">
          <el-input placeholder="用户名" v-model="email" @keyup.enter.native="login"></el-input>
        </div>
        <div class="login-input">
          <el-input
            placeholder="请输入登录密码"
            type="password"
            v-model="password"
            @keyup.enter.native="login"
          ></el-input>
        </div>
        <div class="login-input" style="height:25px;">
          
        </div>
        <div class="login-input loginbtn">
          <el-button type="success" @click="login">登 录</el-button>
        </div>
      </div>
    </div>
    <el-footer
      style="height:36px;"
    >© 2011-2019 Umeng.com , All Rights Reserved 京ICP备案11021163号-6 | 京公网安备 110108008330</el-footer>
  </div>
</template>
<script>
import { mapMutations } from 'Vuex'
import { common } from "api/index.js"
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      checkbox: "1"
    }
  },
  methods: {
    ...mapMutations([
      'getUserInfo',
      'getUserId'
    ]),
    login() {
      let obj = {
        username: this.email,
        passwd: this.password
      }
      common.login(obj).then(res => {
        if (res.code == 200) {
          this.getUserInfo(res.userinfo.username)
          this.getUserId(res.userinfo.uid)
          this.$router.push("/infoSearch/index")
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>


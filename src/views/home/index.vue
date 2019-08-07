<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.main {
  background: #fff;
  color: $backcolor;
  .el-header{
    width:100%;
    height:45px;
    .logo {
      width: 500px;
      height: 45px;
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
      color: $backcolor;
      & > div {
        float: left;
        font-size: 14px;
        line-height:45px;
      }
      & > div + div {
        margin-left: 10px;
      }
    }

  }
  .aside {

    height:800px;
    background: #222C3C;
    .el-menu{
      border:0;
      .el-menu-item [class^=el-icon-]{
        font-size:28px;
        color:#fff;
        text-align: center;
      }
      .el-menu-item{
        height:70px;
        padding:0 10px!important;
      }
      .el-menu-item:hover{
        background:#313D4F!important;
      }
      .icon{
        text-align:center;
        height:30px;
        margin-top:12px;
        i{
          font-size:28px;
          color:#fff;
        }


      }
      span{
        font-size:14px;
        text-align: center;
        display: inherit;
      }

    }
  }
}

</style>
<template>
  <div class="main">
    <el-header
      style="text-align: right; font-size: 12px;height: 47px;background: #fff;border:1px solid #e9ebee;"
    >
      <div class="logo">
        <img src="static/img/logo.png" alt >
        <p>术语智能一体化平台</p>
      </div>
      <div class="userinfo">
        <div>
          <i class="iconfont icon-touxiang" style="font-size:26px;line-height: 45px;"></i>
        </div>
        <div>user&nbsp;&nbsp;&nbsp;&nbsp;|</div>
        <div @click="exit" style="padding-left:0px;">
          &nbsp;&nbsp;退出
          <i class="iconfont icon-Close" style="font-size:14px;"></i>
        </div>
      </div>
    </el-header>
    <div style="width:100%;">
      <el-row>
        <el-col :span="2">
          <div class="aside">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              router
              @open="handleOpen"
              @close="handleClose"
              background-color="#222C3C"
              text-color="#fff"
              active-text-color="#fff">
              <el-menu-item index="/home">
                <div class="icon"><i class="iconfont icon-taskmanagement"></i></div>
                <span style="">任务管理</span>
              </el-menu-item>
              <el-menu-item index="/home">
                <div class="icon"><i class="iconfont icon-Terminologymapping"></i></div>
                <span slot="title">术语映射</span>
              </el-menu-item>
              <el-menu-item index="/home">
                <div class="icon"><i class="iconfont icon-Terminologyrevision"></i></div>
                <span slot="title">术语审校</span>
              </el-menu-item>
              <el-menu-item index="/infoSearch/search">
                <div class="icon"><i class="iconfont icon-Terminologysearch"></i></div>
                <span slot="title">术语搜索</span>
              </el-menu-item>
              <el-menu-item index="/home">
                <div class="icon"><i class="iconfont icon-Rulemanagement"></i></div>
                <span slot="title">模糊匹配规则管理</span>
              </el-menu-item>
              <el-menu-item index="/home">
                <div class="icon"><i class="iconfont icon-Rolemanagement"></i></div>
                <span slot="title">角色管理</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="22">
          <div class="right">
            <div style="padding: 0;width:100%;box-sing:border-box;">
              <router-view></router-view>
            </div>
          </div>
        </el-col>
      </el-row>


    </div>
  </div>
</template>
<script>
//import {dict} from 'api/index.js';
export default {
  data() {
    return {
      menu: [
        {
          name: "任务管理",
          icon: "iconfont el-icon-biomain",
          path: "/home",
          id:0
        },
        {
          name: "术语映射",
          icon: "iconfont el-icon-biopen",
          path: "/infoentry",
          id:1
        },
        {
          name: "术语审校",
          icon: "iconfont el-icon-biosearch",
          path: "/query",
          id:2
        },
        {
          name: "术语搜索",
          icon: "iconfont el-icon-bioscientific",
          //path: "/scientific",
          id:3,
        },
        {
          name: "模糊匹配规则管理",
          icon: "iconfont el-icon-bionews",
          id:4,

        },
        {
          name: "角色管理",
          icon: "iconfont el-icon-bioshield",
          id:5,
        },
      ],
    };
  },
  computed:{

  },
  watch:{

  },
  methods: {
    exit(){
      this.$store.commit('resetState')
      this.$router.push('/')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }


  },
  mounted(){

  },
  components: {}
};
</script>

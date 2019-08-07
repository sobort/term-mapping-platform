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
    width: 133px;
    float:left;
    height:100%;
    background: #222C3C;
  }
  .right{
    float:left;
    padding-left:133px;
    .tab {
      height: 57px;
      line-height: 57px;
      padding-left:47px;
      background: #fff;
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
          <i class="iconfont el-icon-biouserinfo" style="font-size:26px;line-height: 45px;"></i>
        </div>
        <div>user</div>
        <div>

        </div>
        <div @click="exit" style="border-left:1px solid #999;padding-left:20px;">
          退出
      <i class="iconfont el-icon-biorights"></i>
        </div>
      </div>
    </el-header>
    <div style="width:100%;">
    <div class="aside">

    </div>
    <div class="right">
      <div class="tab" style="border-bottom:1px solid #0D253E">
            <!--{{activeName}}-->
      </div>
      <div style="padding:0px 20px 0;width:100%;box-sing:border-box;">
        <router-view></router-view>
      </div>
    </div>
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
          /*children:[
             {
               name: "展示",
               icon: "",
               path: "/infoSearch/index"
             },
            {
              name: "搜索",
              icon: "",
              path: "/infoSearch/search"
            },
            {
              name: "编辑",
              icon: "",
              path: "/infoSearch/edit"
            },
          ]*/
        },
        {
          name: "模糊匹配规则管理",
          icon: "iconfont el-icon-bionews",
          id:4,
          /*children:[
            // {
            //   name: "科室样本统计",
            //   icon: "",
            //   path: "/preview/sampleStatic"
            // },
            {
              name: "病人数统计",
              icon: "",
              path: "/preview/patientStatic"
            },
            {
              name: "样本亚型统计",
              icon: "",
              path: "/preview/hypotypeStatic"
            },
          ]*/
        },
        {
          name: "角色管理",
          icon: "iconfont el-icon-bioshield",
          id:5,
          /*children: [
            {
              name: "角色管理",
              icon: "",
              path: "/authority/role"
            },
            {
              name: "用户管理",
              icon: "",
              path: "/authority/user"
            },
            {
              name: "部门管理",
              icon: "",
              path: "/authority/depart"
            }
          ]*/
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


  },
  mounted(){

  },
  components: {}
};
</script>

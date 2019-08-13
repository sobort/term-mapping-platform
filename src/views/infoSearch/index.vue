<template>
  <div class="home-display" style="max-height:700px;overflow:hidden;">
    <div class="tab" style="border-bottom:1px solid #DFE3E9">
      <el-row>
        <el-col :span="12">
          <span style="margin-left: 30px;">术语展示</span>
        </el-col>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="18" style="padding:0 14px;">
        <el-col :span="8" style="padding:0 14px;margin-bottom:20px;" v-for="(item,index) in lineList" :key="index">
          <div class="home-content" style="">
            <div>
              <span style="font-size:28px;">{{item.number}}</span>
              <span style="font-size:14px;">{{item.unit}}</span>
            </div>
            <span>{{item.name}}</span>
          </div>
        </el-col>
        <div id="treeMap" style="width: 755px; height: 490px; margin:20px auto;"></div>
      </el-col>
      <el-col :span="6" style="padding:0 20px 20px 20px;;max-height:700px;overflow-y:scroll;border-left: 1px solid #dfe3e9;">
        <div style="margin-bottom:40px;">
          <div class="mode" v-for="(item,index) in list">
            <div style="color:#8095E7;"><i class="iconfont icon-Drugs" style="margin:0 10px;"></i>{{item.name_cn}}</div>
            <div class="leftMode">
              <span class="num">{{item.num_st}}</span><br>
              <span class="term">标准术语</span>
            </div>
            <div class="rightMode">
              <span class="num">{{item.num_sy}}</span><br>
              <span class="term">同义词</span>
            </div>
            <img :src=bg2>
          </div>
        </div>
      </el-col>
    </el-row>
    <div>
      <div id="bar" style="width: 750px; height: 495px;"></div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'Vuex'
  import * as ECHART from '../../base/js/echarts.js'
  import {common} from 'api/index.js';
  export default {
    data() {
      return {
        ctypelist: [
        {
          name: "模糊匹配（中文）",
          id: 1
        },
        {
          name: "模糊匹配（英文）",
          id: 2
        }
      ],
      searchText: "",
      ctype: '',
        lineList: [
          {
            number: "",
            name: "同义词",
            unit:'个',
          },
          {
            number: "",
            name: "医院数据完成互联互通",
            unit:'家',
          },
          {
            number: "",
            name: "呼吸病学标准临床术语",
            unit:'条',
          }
        ],
        bg1:'../static/img/bg_one.png',
        bg2:'../static/img/bg_two.png',
        bg3:'../static/img/bg_three.png',
        bg4:'../static/img/bg_four.png',
        list:[],
        displayMenu: "",
        homeValue: "",
        treedata:'',
      };
    },
    mounted(){
      this.getIndexInfo();
    },
    methods: {
      getIndexInfo(){
          let obj={
            uid:this.userId,
            id:"1",
            action:'getIndexInfo'
          }
          this.initChart(obj,0);
      },
      initChart(obj,type){
          common.index(obj.action,obj.uid,obj.id).then((res)=>{
          if(res.code==200){
            this.lineList[0].number=res.num_hx;
            this.lineList[1].number=res.num_st;
            this.lineList[2].number=res.num_sy;
            this.list=res.list
              var newList = this.list.map(item=> {
                let arr=[];
                arr.push(Number(item.num_st));
                arr.push(Number(item.num_sy));
                arr.push(Number(item.num_hx));
                
                return {
                name: item.name_cn,
                value:arr,
                id:item.id,
                
              }           
            });
              ECHART.setmaptree(newList,'treeMap',this.userId)
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      searchAllList(){
        this.$router.push("/infoSearch/search");
      }
    },
    computed: {
    ...mapGetters(['userId'])
  },
  };
</script>
<style lang="less" scoped>
  .home-display {
    height: 100%;
  }
  .tab {
    height: 57px;
    line-height: 57px;
    background: #fff;
    color: #000;
  }
  .home-content{
    height: 100px;
    padding-top:20px;
    border-radius: 5px;
    margin-top: 20px;
    text-align: center;
    border: 1px solid #dfe3e9;
  }
  .mode{
    height: 128px;
    padding-top:16px;
    border-radius: 4px;
    margin-top: 20px;
    border: 1px solid #dfe3e9;
    .num{
      font-size:28px;
      color:#333;
    }
    .term{
      font-size:14px;
      color:#333;
    }
    img{
      margin:-30px 0 0 25px;
    }
    .leftMode{
      float:left;
      width:50%;
      text-align:left;
      padding-left:43px;
    }
    .rightMode{
      float:left;
      width:50%;
      text-align:right;
      padding-right:43px;
    }
  }
</style>

<template>
  <div class="project-map-status">
    <el-row :gutter="10" style="margin: 0px;">
      <el-col :span="13">
        <el-row style="margin-left: 40px;">
          <el-col :span="6">
            <el-select style="margin-top: 10px;" v-model="ctype" placeholder="模糊匹配">
              <el-option
                v-for="item in ctypelist"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-table
              class="tag-table"
              style="height: 80%; overflow-y:auto;margin-top:10px;"
              :data="tagDataList"
              border
              :header-cell-style="headerStyle"
              :row-class-name="tableRowClassName"
              @row-click="tagClickList"
            >
              <el-table-column label="语义标签" header-align="center">
                <el-table-column prop="tagName"></el-table-column>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="18">
            <div style="margin: 10px 20px;height: 100%;">
              <el-input
                v-model="searchText"
                placeholder="请输入内容"
                @keyup.enter.native="searchAllList"
              >
                <el-button slot="append" icon="el-icon-search" @click="searchAllList"></el-button>
              </el-input>
              <el-table
                class="tag-table"
                :data="searchDataList"
                style="height: 80%; overflow-y:auto;margin-top:10px;"
                :row-class-name="tableSearchClassName"
                :header-cell-style="{background:'#202C3A', color:'#fff'}"
                @row-click="searchClickList"
              >
                <el-table-column prop="nameCn" label="术语(中文)" align="center"></el-table-column>
                <el-table-column prop="nameEn" label="术语(英文)" align="center"></el-table-column>
                <el-table-column prop="FSN" label="FSN(英文)" align="center"></el-table-column>
                <el-table-column prop="code" label="标准编码" align="center"></el-table-column>
                <el-table-column v-if="tableData" label="选择" align="center">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="selectTableData(scope.row)">选择</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin: 10px 0px; float: right;">
                <el-pagination
                  background
                  :current-page="currentPage"
                  :page-size="pageSize"
                  layout="prev, pager, next"
                  :total="totalList"
                  @current-change="handleCurrentChange">
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col style="padding: 0px;border-left: 2px solid #EEF3F6;" :span="11">
        <div class="change">
          <el-row>
            <el-col :span="18">
              <div class="menu">
                <ul>
                  <li :class="menId === '1' ? 'menu-basic' :''" @click="menuBasicInfo">基础信息</li>
                  <li :class="menId === '2' ? 'menu-basic' :''" @click="menuSynonym">同义词</li>
                  <li :class="menId === '3' ? 'menu-basic' :''" @click="menuExtranetSearch">外网搜索</li>
                </ul>
              </div>
            </el-col>
            <el-col :span="6" style="margin-top: 10px;">
              <div class="right switch">
                <ul>
                  <li :class="switchId === '1' ? 'switch-basic' :''" @click="switchChinese">中</li>
                  <li :class="switchId === '2' ? 'switch-basic' :''" @click="switchEnglish">英</li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
        <div v-if="menId === '1'">
          <div class="select">
            <el-row>
              <el-col :span="20">
                <span v-if="ontOlogy === 'SNOMED CT'" style="margin-left: 40px;">FSN: {{FSN}}</span>
                <span style="margin-left: 20px;">ID: {{FSNId}}</span>
              </el-col>
              <el-col v-if="tableData" :span="4">
                <div style="float: right;">
                  <el-button type="primary" size="mini" @click="selectTableData(selectParams)">选择</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="chart-svg">
            <img v-if="ontOlogy === 'SNOMED CT'" :src="srcImg" alt="">
            <i class="el-icon-full-screen"></i>
          </div>
          <div class="relate">
            <div style="font-size: 15px;">上下位关系</div>
            <div class="concept">
              <div>
                <span style="float: left;">父概念：</span>
                <div class="f-number" style="float: right;">{{parentNumber}}</div>
              </div>
              <div style="clear: both;"></div>
              <ul>
                <li v-for="item in parentList" @click="parentSearchContent(item)">{{item.conceptName}}</li>
              </ul>
              <div style="clear: both;"></div>
              <div style="margin-top: 20px;">
                <span style="float: left;">子概念：</span>
                <div class="f-number" style="float: right;">{{childNumber}}</div>
              </div>
              <div style="clear: both;"></div>
              <ul>
                <li v-for="item in childList" @click="childSearchContent(item)">{{item.conceptName}}</li>
              </ul>
              <div style="clear: both;"></div>
            </div>
          </div>
        </div>
        <div v-else-if="menId === '2'">
          <div class="synonym">
            <div style="margin: 10px 0px;">SCT同义词：</div>
            <ul>
              <li v-for="item in standList">{{item}}</li>
            </ul>
            <div style="margin: 10px 0px;">中央库&当前同义词：</div>
            <ul>
              <li v-for="item in zyList">{{item}}</li>
            </ul>
            <div style="margin: 10px 0px;">中央库&当前向上同义词：</div>
            <ul>
              <li v-for="item in upList">{{item}}</li>
            </ul>
          </div>
        </div>
        <div v-else-if="menId === '3'">
          <div style="margin: 20px; text-align:center;">
            <el-radio-group @change="changeSearchRadio" v-model="extranetSearchradio">
              <el-radio :label="baiDu">百度</el-radio>
              <el-radio :label="baiKe">百度百科</el-radio>
              <el-radio :label="medLive">医脉通</el-radio>
            </el-radio-group>
          </div>
          <div>
            <iframe :src="weburlIframe" width="100%" height="500px;" frameborder="0"></iframe>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { onmy } from 'api/index.js'
import { mapGetters } from 'Vuex';
export default {
  props: [
    'tableData'
  ],
  data() {
    return {
      menId: '1', // 导航切换
      switchId: '1', // 中英文切换
      ctype: '模糊匹配（中文）', // 模糊匹配
      ctypelist: [
        {
          name: "模糊匹配（中文）",
          id: 1
        },
        {
          name: "模糊匹配（英文）",
          id: 2
        }
      ], // 模糊匹配列表
      rowId: Number,
      searchId: Number,
      tagDataList: [
        {tagName: '疾病'},
        {tagName: '操作'},
        {tagName: '物质'},
        {tagName: '形态学异常'},
      ], // 语义标签列表
      searchText: '', // 搜索文本
      searchDataList: [],  // 搜索列表
      FSN: '', // FSN
      FSNId: '', // FSNID
      srcImg: '', // svg图片
      ontOlogy: '', // 标准术语体系名称
      parentList: [], // 父概念
      parentNumber: 0, // 父概念数量
      childList: [], // 子概念
      childNumber: 0, // 子概念数量
      standList: [], // SCT同义词
      zyList: [], // 中央库&当前同义词
      upList: [], // 中央库&当前向上同义词
      extranetSearchradio: '',
      weburlIframe: '',
      baiDu: 'https://www.baidu.com/',
      baiKe: 'https://baike.baidu.com/',
      medLive: 'http://www.medlive.cn/',
      currentPage: 1, // 搜索列表 当前页
      pageSize: 5, //每页条数
      totalList: 0, // 总数
      selectParams: {}, 
      newTagName: '',
    }
  },
  mounted(){
    this.getInitBaseInfo()
  },
  methods: {
    // 基础信息
    getInitBaseInfo(){
      if(this.standCode){
        let obj = {
          uid: this.userId,
          projectId: this.projectId,
          en: this.switchId,
          standCode: this.standCode
        }
        this.getBaseInfoByStandCode(obj)
      }
    },
    getBaseInfoByStandCode(obj){
      onmy.getBaseInfoByStandCode(obj).then(res => {
          if(res.code === 200) {
            this.FSN = res.list.fsn
            this.FSNId = res.list.fsnId
            this.srcImg = res.list.svgUrl
            this.ontOlogy = res.list.ontology
            this.parentList = res.list.parentList
            this.parentNumber = this.parentList.length
            this.childList = res.list.childList
            this.childNumber = this.childList.length
            this.selectParams.nameCn = this.FSN
            this.selectParams.code = this.FSNId
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    // 语义标签行点击事件
    tagClickList(params){
      this.newTagName = params.tagName
      this.getSearchList()
    },
    // 搜索
    searchAllList(){
      this.getSearchList()
    },
    // 术语搜索
    getSearchList(){
      if(this.searchText){
        let obj = {
          uid: this.userId,
          projectId: this.projectId,
          type: this.switchId,
          keyword: this.searchText,
          page: this.currentPage,
          pagesize: this.pageSize,
          tagName: this.newTagName,
        }
        onmy.getSearchList(obj).then(res => {
          if(res.code === 200){
            this.searchDataList = res.list
            this.totalList = parseInt(res.pageinfo.total)
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.error('请输入搜索内容')
      }
    },
    // 搜索列表行点击事件
    searchClickList(params){
      let obj = {
        uid: this.userId,
        projectId: this.projectId,
        en: this.switchId,
        standCode: params.code
      }
      this.getBaseInfoByStandCode(obj)
    },
    // 选择按钮
    selectTableData(params){
      let arr = this.tableData
      arr[0].standName = params.nameCn
      arr[0].standCode = params.code
      this.$emit('changeTableData', arr)
    },
    // 父概念点击事件
    parentSearchContent(params){
      let obj = {
        uid: this.userId,
        projectId: this.projectId,
        en: this.switchId,
        standCode: params.conceptId
      }
      this.getBaseInfoByStandCode(obj)
    },
    // 子概念点击事件
    childSearchContent(params){
      let obj = {
        uid: this.userId,
        projectId: this.projectId,
        en: this.switchId,
        standCode: params.conceptId
      }
      this.getBaseInfoByStandCode(obj)
    },
    // 基础信息
    menuBasicInfo(){
      this.menId = '1'
      this.getInitBaseInfo()
    },
    // 页数改变
    handleCurrentChange(val){
      this.currentPage = val
      this.getSearchList()
    },
    // 同义词
    menuSynonym(){
      this.menId = '2'
      if(this.standCode){
        let obj = {
          uid: this.userId,
          projectId: this.projectId,
          en: this.switchId,
          standCode: this.standCode
        }
        onmy.getSynonymList(obj).then(res => {
          if(res.code === 200) {
            this.standList = res.standList
            this.zyList = res.zyList
            this.upList = res.upList
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 外网搜索
    menuExtranetSearch(){
      this.extranetSearchradio = 'https://www.baidu.com/'
      this.weburlIframe = 'https://www.baidu.com/'
      this.menId = '3'
      // let obj = {
      //   uid: this.userId,
      //   projectId: this.projectId,
      //   id: this.recordId,
      //   webname: '百度'
      // }
      // onmy.getInternetSearchList(obj).then(res => {
      //   console.log(res)
      //   if(res.code === 200) {
      //     this.standList = res.standList
      //     this.zyList = res.zyList
      //     this.upList = res.upList
      //   } else {
      //     this.$message.error(res.msg)
      //   }
      // })
    },
    changeSearchRadio(){
      this.weburlIframe = this.extranetSearchradio
    },
    // 中文
    switchChinese(){
      this.switchId = '1'
    },
    // 英文
    switchEnglish(){
      this.switchId = '2'
    },
    // 语义标签表头样式
    headerStyle(param){
      if (param.rowIndex == '1') {
        return { display: 'none' }
      } else if (param.rowIndex == '0') {
        return { background: '#DCE2F8', color: '#000'}
      }
    },
    tableRowClassName({row, rowIndex}){
      row.index = rowIndex
      return rowIndex === this.rowId ? 'warning-row' : ''
    },
    tableSearchClassName({row, rowIndex}){
      row.index = rowIndex
      return rowIndex === this.searchId ? 'warning-row' : ''
    },
  },
  computed: {
    ...mapGetters([
      'userId',
      'standCode',
      'projectId'
    ])
  }
};
</script>
<style lang="less" scoped>
@import url("./index.less");
</style>
<style lang="less">
.semantic-tags{
  border-radius: 10px;
  background: #848181;
  width: 40px;
  color: #fff;
}
.el-table .warning-row {
  background: #DDE3FA;
}
.select .el-button--primary{
  background-color: #35C1CE;
  border: 1px solid #35C1CE;
}
</style>


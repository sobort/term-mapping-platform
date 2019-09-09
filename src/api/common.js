import { apiUrl } from "base/js/base.js"
import Axios from "axios";
export const common = {
  // 登录
  login(obj) {
    return Axios.post(apiUrl.apiUrl + "mrole.php?action=login&username=" + obj.username + "&passwd=" + obj.passwd)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 首页顶部数据
  homeProjectList(uid) {
    return Axios.post(apiUrl.apiUrl + "index.php?action=getTopData&uid=" + uid)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 首页我参与的项目列表
  getPartakeProjectList(uid){
    return Axios.post(apiUrl.apiUrl + "index.php?action=getPartakeProjectList&uid=" + uid)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 首页我负责的项目列表
  getResponsProjcetList(uid){
    return Axios.post(apiUrl.apiUrl + "index.php?action=getResponsProjcetList&uid=" + uid)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 首页根据项目ID获取柱状图
  getColumnPic(obj){
    return Axios.post(apiUrl.apiUrl + "index.php?action=getColumnPic&uid=" + obj.uid + "&projectId=" + obj.projectId + "&typeId=" + obj.typeId)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 首页根据项目ID获取饼图
  getPiePic(obj){
    return Axios.post(apiUrl.apiUrl + "index.php?action=getPiePic&uid=" + obj.uid + "&projectId=" + obj.projectId + "&typeId=" + obj.typeId)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 首页获取错误日志
  getErrorLogList(uid){
    return Axios.post(apiUrl.apiUrl + "index.php?action=getErrorLogList&uid=" + uid)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取项目列表
  getProjectList(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getProjectList&uid=" + obj.uid + '&page=' + obj.page 
                      + '&pagesize=' + obj.pagesize + '&type=' + obj.type + '&hospitalName=' + obj.hospitalName
                      + '&departmentName=' + obj.departmentName + '&projectName=' + obj.projectName)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取项目负责人列表
  getProjectUserList(uid){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getProjectUserList&uid=" + uid)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 保存项目名称/任务阶段/负责人
  saveProjectInfo(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=saveProjectInfo&uid=" + obj.uid + '&projectName=' + obj.projectName + '&type=' + obj.type + '&pLeaderId=' + obj.pLeaderId)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 保存上传文件与标准字段之间映射关系
  saveFieldMapping(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=saveFieldMapping&uid=" + obj.uid + '&fileId=' + obj.fileId
                      + '&type=' + obj.type + '&projectId=' + obj.projectId + '&cname=' + obj.cname 
                      + '&conceptCode=' + obj.conceptCode + '&frequency=' + obj.frequency + '&conceptText=' + obj.conceptText 
                      + '&standName=' + obj.standName + '&standCode=' + obj.standCode + '&standStatus=' + obj.standStatus 
                      + '&wordAppraise=' + obj.wordAppraise + '&otherMapping=' + obj.otherMapping )
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取标准术语体系列表
  getStandardConcept(uid){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getStandardConcept&uid=" + uid)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取标准术语体系列表
  getSopList(uid){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getSopList&uid=" + uid)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 保存项目基础信息
  saveProjectOtherInfo(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=saveProjectOtherInfo&uid=" + obj.uid + '&projectId=' + obj.projectId 
                      + '&endTime=' + obj.endTime + '&hospital=' + obj.hospital + '&department=' + obj.department 
                      + '&mpingType=' + obj.mpingType + '&mpingOntology=' + obj.mpingOntology + '&mpingSop=' + obj.mpingSop)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取任务分配-术语映射
  mappingDistributionAction(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=mappingDistributionAction&uid=" + obj.uid + '&projectId=' + obj.projectId)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取任务分配-术语审校
  sjDistributionAction(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=sjDistributionAction&uid=" + obj.uid + '&projectId=' + obj.projectId)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 新增项目分配任务
  addDistributionAction(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=addDistributionAction&uid=" + obj.uid + '&projectId=' + 
                      obj.projectId + '&frequency=' + obj.frequency + '&percent=' + obj.percent + '&frenum=' + 
                      obj.frenum + '&type=' + obj.type + '&distributionJson=' + obj.distributionJson + '&fid=' + obj.fid)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取映射项目的映射任务列表
  getProjectMpingList(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getProjectMpingList&uid=" + obj.uid + '&projectId=' + obj.projectId)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 查找词频的相关统计信息
  getStatisticsByF(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getStatisticsByF&uid=" + obj.uid + '&projectId=' + 
                      obj.projectId + '&frequency=' + obj.frequency + '&type=' + obj.type)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取映射/审校人员列表
  getMpSjUserList(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getMpSjUserList&uid=" + obj.uid + '&type=' + obj.type)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取项目后台处理状态
  getProjectStatus(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getProjectStatus&uid=" + obj.uid + '&projectId=' + obj.projectId)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 保存项目审校负责人/映射人员/审校人员
  /*
    type: 2审校负责人 3映射人员 4审校人员
    userJson: 格式为{"用户ID1":"用户名1","用户ID2":"用户名"}
  */
  addProjectUserAction(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=addProjectUserAction&uid=" + obj.uid + '&projectId=' + obj.projectId
                      + '&type=' + obj.type + '&userJson=' + obj.userJson)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
}

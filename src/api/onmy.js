import { apiUrl } from "base/js/base.js"
import Axios from "axios";
export const onmy = {
  /*
    params: object
    desc: 获取映射/审校任务列表
    type: 1映射 2审校
  */
  getTaskList(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getTaskList&uid=" + obj.uid + '&type=' + obj.type + '&page=' + 
                      obj.page + '&pagesize=' + obj.pagesize)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取映射/审校记录
  getUserTaskList(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getUserTaskList&uid=" + obj.uid + '&projectId=' + obj.projectId + '&page=' + 
                      obj.page + '&type=' + obj.type + '&pagesize=' + obj.pagesize)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取映射基础信息
  getBaseInfoByStandCode(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getBaseInfoByStandCode&uid=" + obj.uid + '&projectId=' + obj.projectId + '&en=' + 
                      obj.en + '&standCode=' + obj.standCode)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取同义词
  getSynonymList(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getSynonymList&uid=" + obj.uid + '&projectId=' + obj.projectId + '&en=' + 
                      obj.en + '&standCode=' + obj.standCode)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取外网搜索记录
  getInternetSearchList(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getInternetSearchList&uid=" + obj.uid + '&projectId=' + obj.projectId + '&id=' + 
                      obj.id + '&webname=' + obj.webname)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取项目所用SOP
  getProjectSopInfo(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getProjectSopInfo&uid=" + obj.uid + '&projectId=' + obj.projectId)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 修改SOP内容
  updateSopAction(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=updateSopAction&uid=" + obj.uid + '&sopId=' + obj.sopId + '&content=' + obj.content)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 术语搜索
  getSearchList(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getSearchList&uid=" + obj.uid + '&projectId=' + obj.projectId
                      + '&type=' + obj.type + '&keyword=' + obj.keyword + '&page=' + obj.page + '&pagesize=' + obj.pagesize
                      + '&tagName=' + obj.tagName)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取修改日志
  getUpdateLogAction(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getUpdateLogAction&uid=" + obj.uid + '&id=' + obj.id)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 获取任务数据统计
  getTaskStatisticsAction(obj){
    return Axios.post(apiUrl.apiUrl + "task.php?action=getTaskStatisticsAction&uid=" + obj.uid + '&projectId=' + obj.projectId + '&type=' + obj.type)
      .then(res => {
        return Promise.resolve(res.data);
      });
  }
}
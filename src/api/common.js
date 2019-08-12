import { apiUrl } from "base/js/base.js";
export const common = {
  login(obj) {
    return $ajax.post(apiUrl.apiUrl + "index.php?action=login&username=" + obj.username + "&passwd=" + obj.passwd)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },

  treeList(){
    return $ajax.post(apiUrl.apiUrl + "getTreeList.php").then(res => {
      return Promise.resolve(res.data)
    })
  },

  getSearchList(obj){
    return $ajax.post(apiUrl.apiUrl + 'index.php?action=getSearchList&uid=' + obj).then(res => {
      return Promise.resolve(res.data)
    })
  },
  searchAll(obj){
    return $ajax.post(apiUrl.apiUrl + 'index.php?action=search&type=' + obj.type + '&keyword=' + obj.keyword + '&id=' + obj.id + '&tag=' + obj.tag + '&uid=' + obj.uid)
      .then(res => {
        return Promise.resolve(res.data)
      })
  },
  editLog(obj){
    return $ajax.post(apiUrl.apiUrl + 'index.php?action=updateOp&id=' + obj.id + '&name=' + obj.name + '&uid=' + obj.uid)
      .then(res => {
        return Promise.resolve(res.data)
      })
  },
  getEditLog(obj){
    return $ajax.post(apiUrl.apiUrl + 'index.php?action=uploadLog&id=' + obj.id + '&uid=' + obj.uid)
      .then(res => {
        return Promise.resolve(res.data)
      })
  },
  index(action,uid,id) {
    return $ajax.get(apiUrl.apiUrl + 'index.php?action=' + action + '&uid=' + uid + '&id=' + id).then(function (res) {
      return Promise.resolve(res.data)
    })
  },
};

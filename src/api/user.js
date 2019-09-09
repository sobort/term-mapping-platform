import { apiUrl } from "base/js/base.js"
import Axios from "axios";
export const user = {
  // 用户列表
  getUserList(uid){
    return Axios.post(apiUrl.apiUrl + "mrole.php?action=getUserList&uid=" + uid)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 登录
  getRoleList(uid) {
    return Axios.post(apiUrl.apiUrl + "mrole.php?action=getRoleList&uid=" + uid)
      .then(res => {
        return Promise.resolve(res.data);
      });
  },
  // 注册
  addUser(obj){
    return Axios.post(apiUrl.apiUrl + "mrole.php?action=addUser&username=" + obj.username + '&passwd=' + obj.passwd + '&accessId=' + obj.accessId
                      + '&role=' + obj.role + '&power=' + obj.power)
      .then(res => {
        return Promise.resolve(res.data);
      });
  }
}
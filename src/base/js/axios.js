// 引入服务器请求模块
import Axios from "axios";

Axios.defaults.withCredentials = false;
// ajax 请求拦截
Axios.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.common["Authorization"] = token;
  }
  return config;
});

Axios.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error.response);
  }
);
// 全局访问请求对象
window.$ajax = Axios;
// Axios.defaults.baseURL = "http://47.104.241.186/huxi";
// Axios.defaults.uploadURL = "http://47.104.241.186/huxi";
// Axios.default.timeout = 3000;
// export default Axios;

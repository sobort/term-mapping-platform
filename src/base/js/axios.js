// 引入服务器请求模块
import Axios from 'axios';
import router from '../../router';
// var root = process.env.API_ROOT;


Axios.defaults.withCredentials = true;
//Axios.defaults.headers.common['Authorization'] = "Bearer" + '';
// ajax 请求拦截
Axios.interceptors.request.use(
    config => {
        // 如果数据为JSON对象
        // console.log("我是拦截器")
        // config.data = JSON.parse(JSON.stringify(config));
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers.common['Authorization'] = token;
        }
        // config.url = root + config.url;
        return config;
    },
    err => {
        // console.log(err);
    }
);

// ajax 响应拦截
Axios.interceptors.response.use(
    config => {
        // 如果数据为JSON对象
        // console.log("我是拦截器2")
        // console.log(JSON.parse(JSON.stringify(config)));
        return config;
    },
    error => {
        // console.log(error)
        // if (error && error.response) {

        // } else {
        //     sessionStorage.removeItem('token');
        //     delCookie('userid');
        //     router.replace({
        //         path: '/',
        // query: { redirect: router.currentRoute.fullPath }
        //     })
        // }
        // if (error.request.ontimeout.name == 'handleTimeout') {
        //     sessionStorage.removeItem('token');
        //     delCookie('userid');
        //     router.replace({
        //         path: '/',
        //         // query: { redirect: router.currentRoute.fullPath }
        //     })
        // } else {
        return Promise.reject(error.response);
        // }

        // if (error.response) {
        //     switch (error.response.status) {
        //         case 401:
        //             // 返回 401 清除token信息并跳转到登录页面
        //             store.commit(types.LOGOUT);
        //             router.replace({
        //                 path: 'login',
        //                 query: { redirect: router.currentRoute.fullPath }
        //             })
        //     }
        // }
        // return Promise.reject(error.response.data)

    }
);
// 全局访问请求对象
window.$ajax = Axios;
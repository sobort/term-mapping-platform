import Vue from 'vue';
import Vuex from 'Vuex';
// 引入根目录状态
import { state, mutations } from './state.js';
// 本地储存插件
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

// 初始化
export default new Vuex.Store({
    // 状态
    state,
    mutations,
    // 插件
    plugins: [
        // 采用session储存模式 也可以切换为 cookie  localStorage 模式
        createPersistedState({
            storage: window.sessionStorage
        })
    ]
})
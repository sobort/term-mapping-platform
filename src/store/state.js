// 根目录下的状态
export const state = {
    audit: false,
    cancerid: 0,
    patientid: 0,
    row: {},
    entryState: 0,
    nextState: 0,
    edit: false,
    tabState: 0,
    roleid: null,
    userid: null,
    partid: null,
    userId: 0,
    topNavList: [],
    infoform: {},
    projectid: 0,
    zdlist: [],
    activeName: '',
    role: {},
    basicform: {}
};

let copyState = deepClone(state) // 拷贝state对象
function deepClone(obj) {
    var newObj = obj instanceof Array ? [] : {}
    for (var i in obj) {
        newObj[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
    return newObj
}
export const mutations = {
    resetState(state) {
        for (var i in copyState) {
            state[i] = copyState[i] // 递归赋值
        }
    }
}
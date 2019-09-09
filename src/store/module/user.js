export default {
  state: {
    userName: "",
    userId: "",
    standCode: '',
    projectId: '',
    recordId: '',
  },
  getters: {
    userName: state => state.userName,
    userId: state => state.userId,
    standCode: state => state.standCode,
    projectId: state => state.projectId,
    recordId: state => state.recordId,
  },
  mutations: {
    getUserInfo (state, flag) {
      return state.userName = flag;
    },
    getUserId (state, flag) {
      return state.userId = flag;
    },
    getStandCode (state, flag) {
      return state.standCode = flag
    },
    getProjectId (state, flag) {
      return state.projectId = flag
    },
    getRecordId (state, flag) {
      return state.recordId = flag
    }
  },
  actions: {}
};

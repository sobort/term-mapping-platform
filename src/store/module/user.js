export default {
  state: {
    userName: "",
    userId: ""
  },
  getters: {
    userName: state => state.userName,
    userId: state => state.userId
  },
  mutations: {
    getUserInfo (state, flag) {
      return state.userId = flag;
    },
    getUserId (state, flag) {
      return state.userId = flag;
    }
  },
  actions: {}
};

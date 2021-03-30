const mutations = {
  setIsloggedIn(state, payload) {
    state.user.isLoggedIn = payload;
  },
};

export default mutations;

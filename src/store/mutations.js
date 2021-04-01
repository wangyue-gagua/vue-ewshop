const mutations = {
  setIsloggedIn(state, payload) {
    state.user.isLoggedIn = payload;
  },
  addCart(state, payload) {
    state.user.countCart = payload.count
  }
};

export default mutations;

interface STATE {
    user: {
        isLoggedIn: boolean
        countCart: number
    }
}
const mutations = {
  setIsloggedIn(state: STATE, payload: any) {
    state.user.isLoggedIn = payload;
  },
  addCart(state: STATE, payload: any) {
    state.user.countCart = payload.count;
  },
};

export default mutations;

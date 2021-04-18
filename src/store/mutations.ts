// eslint-disable-next-line import/no-cycle
import { STATE } from '@/store/index';

const mutations = {
  setIsloggedIn(state: STATE, payload: any) {
    state.user.isLoggedIn = payload;
  },
  addCart(state: STATE, payload: any) {
    state.user.countCart = payload.count;
    console.log(`add cart: ${state.user.countCart}`);
  },
};

export default mutations;

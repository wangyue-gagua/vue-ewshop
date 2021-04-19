// eslint-disable-next-line import/no-cycle
import { STATE } from '@/store/index';

const mutations = {
  setIsloggedIn(state: STATE, payload: boolean): void {
    state.user.isLoggedIn = payload;
  },
  addCart(state: STATE, payload: { count: number }): void {
    state.user.countCart = payload.count;
  },
};

export default mutations;

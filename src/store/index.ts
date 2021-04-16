import { createStore } from 'vuex';
import mutations from './mutations';
// eslint-disable-next-line import/no-cycle
import actions from './actions';
import getters from './getters';

const state = {
  user: {
    isLoggedIn: !!window.localStorage.getItem('access_token'),
    countCart: 0,
  },
};

export default createStore({
  state,
  mutations,
  actions,
  getters,
});

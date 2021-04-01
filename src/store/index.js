import { createStore } from "vuex";
import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

const state = {
  user: {
    isLoggedIn: window.localStorage.getItem('access_token') ? true : false,
    countCart: 0,
  },
};
export default createStore({
  state,
  mutations,
  actions,
  getters,
});

import {createStore} from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const state = {
    user: {
        isLoggedIn: !!window.localStorage.getItem("access_token"),
        countCart: 0
    }
};

export default createStore({
    state,
    mutations,
    actions,
    getters
});

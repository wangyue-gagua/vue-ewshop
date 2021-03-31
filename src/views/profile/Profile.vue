<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <svg class="icon tab-bar-icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou"></use>
        </svg>
      </template>
      <template v-slot:middle>用户信息</template>
    </nav-bar>

    <van-button @click="logout" round block style="margin-top: 50px;">退出登录</van-button>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import {Logout} from "network/user.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
export default {
  name: 'Profile',
  components: {
    NavBar,
  },
  setup() {
    let router = useRouter();
    let store = useStore();
    const logout = () => {
      Logout().then((res) => {
        if (res.status == 204) {
          Toast.success("成功退出");
          window.localStorage.removeItem("access_token");
          store.commit('setIsloggedIn', false);
          setTimeout(() => {
            router.push({ path: "/login" });
          }, 500);
        }
      });
    };

    return { logout };
  },
};
</script>

<style lang="scss" scoped>
</style>
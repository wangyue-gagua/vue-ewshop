<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <svg class="icon tab-bar-icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou"></use>
        </svg>
      </template>
      <template v-slot:middle>用户注册</template>
    </nav-bar>

    <van-image
      width="10rem"
      height="10rem"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
      style="margin-top: 45px; padding-top: 50px"
    />

    <van-form @submit="onSubmit">
      <van-field
        v-model="userInfo.email"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
        autocomplete="email"
        :rules="[{ required: true, message: '请填写正确邮箱' }]"
      />
      <van-field
        v-model="userInfo.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        autocomplete="new-password"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <div class="login" @click="$router.push({ path: '/register' })">
        没有账号，前往注册
      </div>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          color="#42b983"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import { Login } from 'network/user';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Notify, Toast } from 'vant';
import { useStore } from 'vuex';

export default {
  name: 'Login',
  components: { NavBar },
  setup() {
    const router = useRouter();
    const store = useStore();
    const userInfo = reactive({
      password: '',
      email: '',
    });
    const onSubmit = (values) => {
      Login(userInfo).then((res) => {
        // store access token to local storage
        window.localStorage.setItem('access_token', res.access_token);
        // vuex islogin
        store.commit('setIsloggedIn', true);

        Toast.success('登录成功');
        setTimeout(() => {
          router.go(-1);
        }, 500);
      });
    };

    return {
      userInfo,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  font-size: 12px;
  margin-bottom: 10px;
  color: var(--color-tint);
}
</style>

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
        v-model="userInfo.name"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        autocomplete="username"
        :rules="[{ required: true, message: '请填写用户名' }]"
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
      <van-field
        v-model="userInfo.password_confirmation"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        autocomplete="new-password"
        :rules="[{ required: true, message: '请确认密码' }]"
      />
      <van-field
        v-model="userInfo.email"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
        autocomplete="email"
        :rules="[{ required: true, message: '请填写正确邮箱' }]"
      />
      <div class="login" @click="$router.push({path: '/login'})" >已有帐号，立即登录</div>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          color="#42b983"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import { register } from 'network/user';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Notify, Toast } from 'vant';

export default {
  name: 'Register',
  components: { NavBar },
  setup() {
    const router = useRouter();
    const userInfo = reactive({
      name: '',
      password: '',
      password_confirmation: '',
      email: '',
    });
    const onSubmit = (values) => {
      if (userInfo.password !== userInfo.password_confirmation) {
        Notify('两次密码不一致！');
      } else {
        register(userInfo).then((res) => {
          if (res.status === 201) {
            // gagua 123456 1234567@edu.cn
            Toast.success('注册成功');
            setTimeout(() => {
              router.push({ path: '/login' });
            }, 1000);
          }
        });
      }
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
    color: var(--color-tint)
}
</style>

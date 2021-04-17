<template>
  <div>
    <nav-bar>
      <template #left>
        <svg
          class="icon tab-bar-icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-jiantou" />
        </svg>
      </template>
      <template #middle>
        个人中心
      </template>
    </nav-bar>

    <div class="user-box">
      <div class="user-info">
        <div class="info">
          <img
            src="~assets/logo.png"
            alt="用户头像"
          >
          <div class="user-desc">
            <span>昵称： gagua</span>
            <span>登录名: 1234567@edu.cn</span>
            <span class="name">个性签名：???</span>
          </div>
        </div>
      </div>

      <ul class="user-list">
        <li
          class="van-hairline--bottom"
          @click="jumpTo('/collect')"
        >
          <span>我的收藏</span>
          <van-icon name="arrow" />
        </li>
        <li
          class="van-hairline--bottom"
          @click="jumpTo('/order')"
        >
          <span>我的订单</span>
          <van-icon name="arrow" />
        </li>
        <li
          class="van-hairline--bottom"
          @click="jumpTo('/manage')"
        >
          <span>账号管理</span>
          <van-icon name="arrow" />
        </li>
        <li
          class="van-hairline--bottom"
          @click="jumpTo('/address-list')"
        >
          <span>地址管理</span>
          <van-icon name="arrow" />
        </li>
        <li
          class="van-hairline--bottom"
          @click="jumpTo('/about')"
        >
          <span>关于我们</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>

    <van-button
      @click="logout"
      round
      block
      color="var(--color-tint)"
    >
      退出登录
    </van-button>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import { Logout, getUser } from 'network/user';
import { onMounted, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Toast } from 'vant';

export default {
  name: 'Profile',
  components: {
    NavBar,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const state = {
      user: {},
    };
    const logout = () => {
      Logout().then((res) => {
        if (res.status === 204) {
          Toast.success('成功退出');
          window.localStorage.removeItem('access_token');
          store.commit('setIsloggedIn', false);
          setTimeout(() => {
            router.push({ path: '/login' });
          }, 500);
        }
      });
    };

    // user list jump to
    const jumpTo = (path, query) => {
      router.push({ path, query: query || {} });
    };

    onMounted(() => {
      getUser().then((res) => {
        state.user = res;
      });
    });

    return { logout, jumpTo, ...toRefs(state) };
  },
};
</script>

<style lang="scss" scoped>
.user-box {
  .user-info {
    background: linear-gradient(45deg, var(--color-high-text) 60%, cyan);
    margin: 50px 1vw;
    border-radius: 5px;
    padding: 2em;
    color: #fff;
    line-height: 1.5em;
    .info {
      display: flex;
      img {
        width: 20%;
        padding-inline-end: 1em;
      }

      .user-desc {
        span {
          display: flex;
        }
      }
    }
  }

  .user-list {
    line-height: 10vh;
    .van-hairline--bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        flex: 1;
        text-align: left;
      }
      .van-icon {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>

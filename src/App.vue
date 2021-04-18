<template>
  <router-view />
  <!--  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>-->

  <div id="nav">
    <router-link
      to="/"
      class="tab-bar-item"
    >
      <svg
        class="icon tab-bar-icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-Homehomepagemenu" />
      </svg>
      <div>首页</div>
    </router-link>
    <router-link
      to="/category"
      class="tab-bar-item"
    >
      <svg
        class="icon tab-bar-icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-category" />
      </svg>
      <div>分类</div>
    </router-link>
    <router-link
      to="/shopCart"
      class="tab-bar-item"
    >
      <van-badge
        :content="cartCount"
        max="9"
        @click="showCart"
      >
        <svg
          class="icon tab-bar-icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-shop-cart-" />
        </svg>
      </van-badge>
      <div>购物车</div>
    </router-link>
    <router-link
      to="/profile"
      class="tab-bar-item"
    >
      <svg
        class="icon tab-bar-icon"
        aria-hidden="true"
      >
        <use xlink:href="#icon-04" />
      </svg>
      <div>我的</div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    console.log(store.state);
    const cartCount = ref(store.state.user.countCart);
    const showCart = () => console.log(store.state.user.countCart);
    onMounted(() => {
      // store.dispatch('updateCart');
      console.log(store);
    });
    return { cartCount, showCart };
  },
});
</script>
<style lang="scss">
@import "./assets/css/base.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px 10px 10px;
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #2c3e5021;

  a {
    color: var(--color-text);

    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }

  .tab-bar-item {
    flex: 1;
    font-size: var(--font-size);

    .tab-bar-icon {
      width: 24px;
      height: 24px;
      margin-bottom: 5px;
    }
  }
}
</style>

<template>
  <div class="nav-bar">
    <div
      class="left"
      @click="goBack"
    >
      <slot name="left" />
    </div>
    <div
      class="middle"
      @click="showCount"
    >
      <slot name="middle" />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'NavBar',
  setup() {
    const router = useRouter();
    const store = useStore();
    const showCount = () => {
      console.log(store.state.user.countCart);
    };
    const goBack = () => {
      router.go(-1);
    };

    return {
      goBack,
      showCount,
    };
  },
});
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: 45px;
  line-height: 45px;
  text-align: center;
  box-shadow: 0 2px 0 rgba(100, 100, 100, 0.1);
}

.left, .right {
  width: 65px;
}

.middle {
  flex: 1;
}
</style>

<template>
  <div class="nav-bar">
    <div class="left" @click="goback"><slot name="left"></slot></div>
    <div class="middle"><slot name="middle"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "NavBar",
  setup() {
    const router = useRouter();
    const goback = () => {
      router.go(-1);
    };

    return {
      goback,
    };
  },
};
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
  box-shadow: 0 2px 0px rgba(100, 100, 100, 0.1);
}

.left, .right {
  width: 65px;
}

.middle {
  flex: 1;
}
</style>
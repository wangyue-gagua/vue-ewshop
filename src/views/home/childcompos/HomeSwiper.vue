<template>
  <van-swipe
    v-if="slides.length"
    class="my-swipe"
    :autoplay="3000"
    indicator-color="white"
  >
    <van-swipe-item v-for="(item, index) of slides" :key="index">
      <img :src="item.img_url" alt="" />
    </van-swipe-item>
  </van-swipe>
</template>
<script>
export default {
  name: "HomeSwiper",
  props: {
    slides: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
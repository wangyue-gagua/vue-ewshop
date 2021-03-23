<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <svg class="icon tab-bar-icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou"></use>
        </svg>
      </template>
      <template v-slot:middle>商品首页</template>
    </nav-bar>
    <div class="banners">
      <img src="~assets/logo.png" alt="">
    </div>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import RecommendView from './childcompos/RecommendView.vue';
import getHomeAllData from 'network/home.js';
import { onMounted, ref } from 'vue';

export default {
  name: 'home',
  setup() {
    let recommends = ref([]);
    onMounted(()=>{
      getHomeAllData().then(res=>{
        console.log(res.goods);
        recommends.value = res.goods.data;
        
      })
    })
    return {recommends};
  },
  components: {
    NavBar,
    RecommendView
  },
  
};
</script>

<style scoped>
  .banners img {
    width: 100%;
    height: 25vh;
    margin-top: 45px;
  }
</style>
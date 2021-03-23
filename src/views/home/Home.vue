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

    <tab-control :titles="['畅销','新书','精选']" @tabClick="TabClick"></tab-control>
    <goods-list></goods-list>
    {{tempid}}
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import RecommendView from './childcompos/RecommendView.vue';
import TabControl from 'components/content/tabcontrol/TabControl.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';
import getHomeAllData from 'network/home.js';
import { onMounted, ref } from 'vue';

export default {
  name: 'home',
  setup() {
    let tempid = ref(0);
    let recommends = ref([]);
    onMounted(()=>{
      getHomeAllData().then(res=>{
        console.log(res.goods);
        recommends.value = res.goods.data;
        
      })
    })

    const TabClick = (index)=>{
      tempid.value = index
    }
    return {recommends, TabClick, tempid};
  },
  components: {
    NavBar,
    RecommendView,
    TabControl,
    GoodsList,
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
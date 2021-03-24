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
      <img src="~assets/logo.png" alt="" />
    </div>
    <recommend-view :recommends="recommends"></recommend-view>

    <tab-control :titles="tab_title" @tabClick="TabClick"></tab-control>
    <goods-list :goodsData="ShowGoodsData"></goods-list>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import RecommendView from "./childcompos/RecommendView.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import { getHomeAllData, getHomeGoods } from "network/home.js";
import { computed, onMounted, reactive, ref } from "vue";

export default {
  name: "home",
  setup() {
    let tab_title = ["畅销", "新书", "精选"];
    let queryMap = new Map([
      ["畅销", "sales"],
      ["新书", "new"],
      ["精选", "recommend"],
    ]);
    // define ata model
    let goodsData = reactive({
      sales: { page: 0, data: [] },
      new: { page: 0, data: [] },
      recommend: { page: 0, data: [] },
    });
    let recommends = ref([]);
    onMounted(() => {
      getHomeAllData().then((res) => {
        recommends.value = res.goods.data;
      });
      getHomeGoods("sales").then((res) => {
        goodsData.sales.data = res.goods.data;
      });
      getHomeGoods("new").then((res) => {
        goodsData.new.data = res.goods.data;
      });
      getHomeGoods("recommend").then((res) => {
        goodsData.recommend.data = res.goods.data;
      });
      console.log(goodsData);
    });
    let currentIndex = ref(0);
    let ShowGoodsData = computed(() => {
      return goodsData[queryMap.get(tab_title[currentIndex.value])].data;
    });

    const TabClick = (index) => {
      currentIndex.value = index;
    };
    return { recommends, tab_title, TabClick, ShowGoodsData };
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
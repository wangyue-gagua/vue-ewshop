<template>
  <nav-bar>
    <template v-slot:left>
      <svg class="icon tab-bar-icon" aria-hidden="true">
        <use xlink:href="#icon-jiantou"></use>
      </svg>
    </template>
    <template v-slot:middle>商品首页</template>
  </nav-bar>
  <tab-control
    v-show="isTabFixed"
    :titles="tab_title"
    @tabClick="TabClick"
  ></tab-control>

  <div class="wrapper">
    <div class="content">
      <div ref="banref">
        <HomeSwiper :slides="slides"></HomeSwiper>
        <recommend-view :recommends="recommends"></recommend-view>
      </div>
      <tab-control :titles="tab_title" @tabClick="TabClick"></tab-control>
      <goods-list :goodsData="ShowGoodsData"></goods-list>
    </div>
  </div>

  <up-back v-show="isShowBackTop" @bTop="bTop"></up-back>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import RecommendView from "./childcompos/RecommendView.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import UpBack from "components/common/upback/UpBack.vue";
import HomeSwiper from "views/home/childcompos/HomeSwiper.vue";
import { getHomeAllData, getHomeGoods } from "network/home.js";
import { computed, nextTick, onMounted, reactive, ref, watchEffect } from "vue";
import BScroll from "better-scroll";

export default {
  name: "home",
  setup() {
    let tab_title = ["畅销", "新书", "精选"];
    let queryMap = new Map([
      ["畅销", "sales"],
      ["新书", "new"],
      ["精选", "recommend"],
    ]);
    let isTabFixed = ref(false);
    let isShowBackTop = ref(false);
    // define ata model
    let goodsData = reactive({
      sales: { page: 1, data: [] },
      new: { page: 1, data: [] },
      recommend: { page: 1, data: [] },
    });
    let slides = ref([]);
    let recommends = ref([]);
    let bs = reactive({});
    let banref = ref(null);
    onMounted(() => {
      getHomeAllData().then((res) => {
        recommends.value = res.goods.data;
        slides.value = res.slides;
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

      // build better scroll object
      bs = new BScroll(document.querySelector(".wrapper"), {
        // ...
        probeType: 3,
        click: true,
        pullUpLoad: {threshold:20},
        // wheel: true,
        // scrollbar: true,
        // and so on
      });
      bs.on("scroll", (position) => {
        isShowBackTop.value = isTabFixed.value =
          -position.y > banref.value.offsetHeight;
      });
      bs.on("pullingUp", () => {
        let page = goodsData[currentType.value].page + 1;
        getHomeGoods(currentType.value, page).then((res) => {
          goodsData[currentType.value].data.push(...res.goods.data);
          goodsData[currentType.value].page += 1;

          bs.finishPullUp();
          bs && bs.refresh();
        });

        // finish pullingUp and present data info
      });
    });

    let currentIndex = ref(0);
    let currentType = computed(() => {
      return queryMap.get(tab_title[currentIndex.value]);
    });
    let ShowGoodsData = computed(() => {
      return goodsData[currentType.value].data;
    });

    const TabClick = (index) => {
      currentIndex.value = index;

      nextTick(() => {
        bs && bs.refresh();
      });
    };

    // listen any variable changes
    watchEffect(() => {
      nextTick(() => {
        bs && bs.refresh();
      });
    });

    const bTop = () => {
      bs.scrollTo(0, 0, 500);
    };
    return {
      recommends,
      slides,
      tab_title,
      TabClick,
      ShowGoodsData,
      isTabFixed,
      isShowBackTop,
      banref,
      bTop,
      bs,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    TabControl,
    GoodsList,
    UpBack,
  },
};
</script>

<style scoped lang="scss">
.banners img {
}
.wrapper {
  overflow: hidden;
  height: 100vh;
}

.content {
}
</style>
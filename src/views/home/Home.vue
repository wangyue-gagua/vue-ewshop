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
    <tab-control
      v-show="isTabFixed"
      :titles="tab_title"
      @tabClick="TabClick"
    ></tab-control>

<!--    <div class="wrapper">
      <div class="content">
        <div ref="banref">
          <HomeSwiper :slides="slides"></HomeSwiper>
          <recommend-view :recommends="recommends"></recommend-view>
        </div>
        <tab-control :titles="tab_title" @tabClick="TabClick"></tab-control>
        <goods-list :goodsData="ShowGoodsData"></goods-list>
      </div>
    </div>-->
    <van-list
        v-model:loading="state.loading"
        :finished="state.finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
    >
      <HomeSwiper :slides="slides"></HomeSwiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <tab-control :titles="tab_title" @tabClick="TabClick"></tab-control>
      <goods-list :goodsData="ShowGoodsData"></goods-list>
    </van-list>

    <up-back v-show="isShowBackTop" @bTop="bTop"></up-back>
  </div>
</template>

<script lang="ts">
import NavBar from "components/common/navbar/NavBar.vue";
import RecommendView from "./childcompos/RecommendView.vue";
import TabControl from "components/content/tabcontrol/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import UpBack from "components/common/upback/UpBack.vue";
import HomeSwiper from "views/home/childcompos/HomeSwiper.vue";
import {getHomeAllData, getHomeGoods, HomeGoods} from "@/network/home";
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import {AxiosResponse} from "axios";

export default defineComponent({
  name: "home",
  setup() {
    const tab_title = ["畅销", "新书", "精选"];
    const tab_title_en = ["sales", "new", "recommend"] as const
    let isTabFixed = ref(false);
    let isShowBackTop = ref(false);
    // define ata model

    interface STATE {
      sales: { page: number, data: object[] },
      new: { page: number, data: object[] },
      recommend: { page: number, data: object[] },
    }
    let goodsData = reactive<STATE>({
      sales: { page: 1, data: [] },
      new: { page: 1, data: [] },
      recommend: { page: 1, data: [] },
    });
    let slides = ref([{
      id: 0,
      title: '',
      img_url: '',
    }]);
    let recommends = ref([{id: 0, title: '', cover_url: ''}]);
    let bs = reactive({});
    let banref = ref(null);

    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    });
    /*interface GoodsData {
      id: number;
      title: string
    }
    interface Goods {
      goods: {
        current_page: number,
        data: GoodsData[]
      }
    }
    interface AxiosResponse<T = any> {
      goods: {
        current_page: number,
        data: GoodsData[]
      }
    }*/

    const onLoad = () => {
      // 异步更新数据
          let page = goodsData[currentType.value].page + 1;
      console.log('currentPage' + page);
      getHomeGoods(currentType.value, page).then((res: AxiosResponse<HomeGoods>) => {
            goodsData[currentType.value].data.push(...res.data.goods.data);
            goodsData[currentType.value].page += 1;
            state.loading = false;
          })
    };

    onMounted(() => {
      getHomeAllData().then((res: AxiosResponse<HomeGoods>) => {
        recommends.value = res.data.goods.data;
        slides.value = res.data.slides;
      });
      getHomeGoods("sales").then((res) => {
        goodsData.sales.data = res.data.goods.data;
      });
      getHomeGoods("new").then((res) => {
        goodsData.new.data = res.data.goods.data;
      });
      getHomeGoods("recommend").then((res) => {
        goodsData.recommend.data = res.data.goods.data;
      });

      /*// build better scroll object
      bs = new BScroll(document.querySelector(".wrapper"), {
        // ...
        probeType: 3,
        click: true,
        pullUpLoad: true,
        // wheel: true,
        // scrollbar: true,
        // and so on
      });
      bs.on("scroll", (position) => {
        isShowBackTop.value = isTabFixed.value =
          -position.y > banref.value.offsetHeight;
      });
      // pullingUp for more data info
      bs.on("pullingUp", () => {
        let page = goodsData[currentType.value].page + 1;
        getHomeGoods(currentType.value, page).then((res) => {
          goodsData[currentType.value].data.push(...res.goods.data);
          goodsData[currentType.value].page += 1;
        });
        bs.finishPullUp();
        bs && bs.refresh();

        // finish pullingUp and present data info
      });*/
    });

    let currentIndex = ref(0);
    let currentType = computed(() => {
        return tab_title_en[currentIndex.value];
    });
    let ShowGoodsData = computed(() => {
      return goodsData[currentType.value].data;
    });

    const TabClick = (index: number) => {
      state.finished = false;
      goodsData[currentType.value].data = []
      goodsData[currentType.value].page = 1
      currentIndex.value = index;

      state.loading = true;
      onLoad();
      /*nextTick(() => {
        bs && bs.refresh();
      });*/
    };

/*    // listen any variable changes
    watchEffect(() => {
      nextTick(() => {
        bs && bs.refresh();
      });
    });*/

    const bTop = () => {
      // bs.scrollTo(0, 0, 500);
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
      state,
      onLoad,
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
});
</script>

<style scoped lang="scss">
.banners img {
}
.wrapper {
  // overflow: hidden;
  height: 100vh;
}

.content {
}
</style>
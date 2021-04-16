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
import NavBar from 'components/common/navbar/NavBar.vue';
import TabControl from 'components/content/tabcontrol/TabControl.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';
import UpBack from 'components/common/upback/UpBack.vue';
import HomeSwiper from 'views/home/childcompos/HomeSwiper.vue';
import {
  getHomeAllData, getHomeGoods, GoodsData, HomeGoods,
} from '@/network/home';
import {
  computed, defineComponent, onMounted, reactive, ref,
} from 'vue';
import { AxiosResponse } from 'axios';
import RecommendView from './childcompos/RecommendView.vue';

export default defineComponent({
  name: 'home',
  setup() {
    const TabTitle = ['畅销', '新书', '精选'];
    const TabTitleEN = ['sales', 'new', 'recommend'] as const;
    const isTabFixed = ref(false);
    const isShowBackTop = ref(false);

    // define ata model

    interface STATE {
      sales: { page: number, data: GoodsData[] },
      new: { page: number, data: GoodsData[] },
      recommend: { page: number, data: GoodsData[] },
    }

    const goodsData = reactive<STATE>({
      sales: {
        page: 1,
        data: [],
      },
      new: {
        page: 1,
        data: [],
      },
      recommend: {
        page: 1,
        data: [],
      },
    });
    const slides = ref([{
      id: 0,
      title: '',
      img_url: '',
    }]);
    const recommends = ref([{
      id: 0,
      title: '',
      cover_url: '',
    }]);
    const bs = reactive({});
    const banref = ref(null);

    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    });

    const currentIndex = ref(0);
    const currentType = computed(() => TabTitleEN[currentIndex.value]);
    const ShowGoodsData = computed(() => goodsData[currentType.value].data);

    const onLoad = () => {
      // 异步更新数据
      const page = goodsData[currentType.value].page + 1;
      console.log(`currentPage${page}`);
      getHomeGoods(currentType.value, page)
        .then((res: AxiosResponse<HomeGoods>) => {
          goodsData[currentType.value].data.push(...res.data.goods.data);
          goodsData[currentType.value].page += 1;
          state.loading = false;
        });
    };

    onMounted(() => {
      getHomeAllData()
        .then((res: AxiosResponse<HomeGoods>) => {
          recommends.value = res.data.goods.data;
          slides.value = res.data.slides;
        });
      getHomeGoods('sales')
        .then((res) => {
          goodsData.sales.data = res.data.goods.data;
        });
      getHomeGoods('new')
        .then((res) => {
          goodsData.new.data = res.data.goods.data;
        });
      getHomeGoods('recommend')
        .then((res) => {
          goodsData.recommend.data = res.data.goods.data;
        });

      /* // build better scroll object
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
      }); */
    });

    const TabClick = (index: number) => {
      state.finished = false;
      goodsData[currentType.value].data = [];
      goodsData[currentType.value].page = 1;
      currentIndex.value = index;

      state.loading = true;
      onLoad();
      /* nextTick(() => {
        bs && bs.refresh();
      }); */
    };

    /*    // listen any variable changes
    watchEffect(() => {
      nextTick(() => {
        bs && bs.refresh();
      });
    }); */

    const bTop = () => {
      // bs.scrollTo(0, 0, 500);
    };
    return {
      recommends,
      slides,
      tab_title: TabTitle,
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

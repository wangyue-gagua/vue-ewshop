<template>
  <div>
    <nav-bar>
      <template #left>
        <svg
          class="icon tab-bar-icon"
          aria-hidden="true"
        >
          <use xlink:href="#icon-jiantou" />
        </svg>
      </template>
      <template #middle>
        商品首页
      </template>
    </nav-bar>
    <tab-control
      v-show="isTabFixed"
      :titles="tab_title"
      @tabClick="TabClick"
    />

    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <HomeSwiper :slides="slides" />
      <recommend-view :recommends="recommends" />
      <tab-control
        :titles="tab_title"
        @tabClick="TabClick"
      />
      <goods-list :goods-data="ShowGoodsData" />
    </van-list>

    <up-back
      v-show="isShowBackTop"
      @bTop="bTop"
    />
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
  name: 'Home',
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
    });

    const TabClick = (index: number) => {
      state.finished = false;
      goodsData[currentType.value].data = [];
      goodsData[currentType.value].page = 1;
      currentIndex.value = index;

      state.loading = true;
      onLoad();
    };

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

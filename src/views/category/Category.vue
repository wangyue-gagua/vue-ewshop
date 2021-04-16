<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <svg class="icon tab-bar-icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou"></use>
        </svg>
      </template>
      <template v-slot:middle>商品分类</template>
    </nav-bar>

    <div id="mainbox">
      <div class="ordertab">
        <van-tabs v-model:active="active_tab" @click="TabClick">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评价排序"></van-tab>
        </van-tabs>
      </div>

      <van-sidebar v-model="active" class="leftmenu">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
              v-for="item of categories"
              :key="item.id"
              :title="item.name"
              :name="item.id"
          >
            <van-sidebar-item
                v-for="child of item.children"
                :key="child.id"
                :title="child.name"
                @click="getGoods(child.id)"
            />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>

      <div class="goods-list">
        <div class="content">
          <van-list
              v-model:loading="state.loading"
              :finished="state.finished"
              finished-text="没有更多了"
              @load="onLoad"
          >
            <van-card
                @click="goDetail(item.id)"
                v-for="(item, index) of showGoods"
                :key="index"
                :num="item.collects_count"
                :tag="item.collects_count >= 3 ? 'hot' : 'new'"
                :price="item.price"
                :desc="item.updated_at"
                :title="item.title"
                :thumb="item.cover_url"
                :lazy-load="true"
                origin-price="10.00"
            />
          </van-list>
        </div>
      </div>
    </div>
    <up-back v-show="isShowBackTop" @bTop="bTop"></up-back>
  </div>
</template>

<script lang="ts">
import NavBar from "components/common/navbar/NavBar.vue";
import UpBack from "components/common/upback/UpBack.vue";
import {getCategory, getCategoryGoods} from "@/network/category";
import {ref, reactive, onMounted, computed, watchEffect, defineComponent} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  setup() {
    const active = ref(0);
    let categories = ref([]);
    let activeName = ref("1");
    let active_tab = ref(0);
    let currentOrder = ref<"sales" | "price" | "comments_count">("sales");
    let currentId = ref(0);
    let isShowBackTop = ref(false);
    let router = useRouter();
    // data model
    const GOODSDATA = {
      "id": 1,
      "title": "《产品经理手册》",
      "price": 45,
      "cover": "product/2020-0820-5f3e17d6ed7e8.png",
      "category_id": 21,
      "sales": 0,
      "updated_at": "2021-01-04T00:16:39.000000Z",
      "comments_count": 0,
      "collects_count": 0,
      "cover_url": "https://wqqx2020.oss-cn-beijing.aliyuncs.com/product/2020-0820-5f3e17d6ed7e8.png"
    }
    const goods = reactive({
      sales: {page: 1, list: [GOODSDATA]},
      price: {page: 1, list: [GOODSDATA]},
      comments_count: {page: 1, list: [GOODSDATA]},
    });

    const state = reactive({
      list: [],
      loading: false,
      finished: false,
    });

    const init = () => {
      getCategoryGoods("sales", currentId.value).then((res) => {
        goods.sales.list = res.data.goods.data;
        goods.sales.page = 1;
      });

      getCategoryGoods("price", currentId.value).then((res) => {
        goods.price.list = res.data.goods.data;
        goods.price.page = 1
      });

      getCategoryGoods("comments_count", currentId.value).then((res) => {
        goods.comments_count.list = res.data.goods.data;
        goods.comments_count.page = 1;
      });
    };

    const bTop = () => {
      // bs.scrollTo(0, 0, 500);
    };


    onMounted(() => {
      getCategory().then((res) => {
        categories.value = res.data.categories;
      });
      init();
    });

    const onLoad = () => {
      let page = goods[currentOrder.value].page + 1;
      getCategoryGoods(currentOrder.value, currentId.value, page).then(
          (res) => {
            if (res.data.goods.next_page_url === null) {
              state.finished = true;
            } else {
              goods[currentOrder.value].list.push(...res.data.goods.data);
              goods[currentOrder.value].page += 1;
              state.loading = false;
              console.log("current page:" + page);
            }
          }
      );
    }

    const showGoods = computed(() => {
      return goods[currentOrder.value].list;
    });
    // sort tabs
    const TabClick = (index: number) => {
      const orders = ["sales", "price", "comments_count"] as const;
      currentOrder.value = orders[index];
    };
    // get goods by category
    const getGoods = (id: number) => {
      currentId.value = id;
      init();
      state.finished = false;
      console.log(state.finished);
    };

    watchEffect(() => {
/*      nextTick(() => {
        // bs && bs.refresh();
        onLoad();
      });*/
    });

    return {
      active,
      activeName,
      active_tab,
      categories,
      TabClick,
      getGoods,
      showGoods,
      state,
      onLoad,
      // bs,
      bTop,
      isShowBackTop,
      goDetail: (id: number) => {
        router.push({
          path: "/detail",
          query: {id},
        });
      },
    };
  },
  components: {
    NavBar,
    UpBack,
  },
});
</script>

<style scoped lang="scss">
#mainbox {
  margin-top: 45px;
  display: flex;

  .ordertab {
    flex: 1;
    float: right;
    // background-color: red;
    height: 50px;
    z-index: 9;
    position: fixed;
    top: 45px;
    left: 130px;
    right: 0;
  }

  .leftmenu {
    width: 130px;
    // background-color: yellow;
    position: fixed;
    top: 95px;
    left: 0;
  }

  .goods-list {
    height: 100vh;
    flex: 1;
    // background-color: blue;
    position: absolute;
    top: 100px;
    left: 130px;
    right: 0;
  }
}
</style>
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
        </div>
      </div>
    </div>
    <up-back v-show="isShowBackTop" @bTop="bTop"></up-back>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import UpBack from "components/common/upback/UpBack.vue";
import { getCategory, getCategoryGoods } from "network/category";
import { ref, reactive, onMounted, computed, watchEffect, nextTick } from "vue";
import { useRouter } from "vue-router";
import BScroll from "better-scroll";
export default {
  setup() {
    const active = ref(0);
    let categories = ref([]);
    let activeName = ref("1");
    let active_tab = ref(0);
    let currentOrder = ref("sales");
    let currentId = ref(0);
    let isShowBackTop = ref(false);
    let router = useRouter();
    // data model
    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] },
    });
    const init = () => {
      getCategoryGoods("sales", currentId.value).then((res) => {
        goods.sales.list = res.goods.data;
      });

      getCategoryGoods("price", currentId.value).then((res) => {
        goods.price.list = res.goods.data;
      });

      getCategoryGoods("comments_count", currentId.value).then((res) => {
        goods.comments_count.list = res.goods.data;
      });
    };

    const bTop = () => {
      bs.scrollTo(0, 0, 500);
    };

    let bs = reactive({});

    onMounted(() => {
      getCategory().then((res) => {
        categories.value = res.categories;
      });

      getCategoryGoods("sales", currentId.value).then((res) => {
        goods.sales.list = res.goods.data;
      });

      bs = new BScroll(document.querySelector(".goods-list"), {
        // ...
        probeType: 3,
        click: true,
        pullUpLoad: true,
        // wheel: true,
        // scrollbar: true,
        // and so on
      });
      // register scroll event
      bs.on("scroll", (position) => {
        isShowBackTop.value = -position.y > 300;
      });
      // pullingUp for more data info
      bs.on("pullingUp", () => {
        console.log("pullingUp for more");
        let page = goods[currentOrder.value].page + 1;
        getCategoryGoods(currentOrder.value, currentId.value, page).then(
          (res) => {
            goods[currentOrder.value].list.push(...res.goods.data);
            goods[currentOrder.value].page += 1;
          }
        );
        // finish pullingUp and present data info
        bs.finishPullUp();
        bs && bs.refresh();
        console.log("current page:" + page);
      });
    });

    const showGoods = computed(() => {
      return goods[currentOrder.value].list;
    });
    // sort tabs
    const TabClick = (index) => {
      let orders = ["sales", "price", "comments_count"];
      currentOrder.value = orders[index];
      getCategoryGoods(currentOrder.value, currentId.value).then((res) => {
        goods[currentOrder.value].list = res.goods.data;
        nextTick(() => {
          bs && bs.refresh();
        });
      });

      console.log(orders[index]);
    };
    // get goods by category
    const getGoods = (id) => {
      currentId.value = id;
      init();
      console.log(currentId);
    };

    watchEffect(() => {
      nextTick(() => {
        bs && bs.refresh();
      });
    });

    return {
      active,
      activeName,
      active_tab,
      categories,
      TabClick,
      getGoods,
      showGoods,
      bs,
      bTop,
      isShowBackTop,
      goDetail: (id) => {
        router.push({
          path: "/detail",
          query: { id },
        });
      },
    };
  },
  components: {
    NavBar,
    UpBack,
  },
};
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
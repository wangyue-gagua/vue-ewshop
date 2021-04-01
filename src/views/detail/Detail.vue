<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <svg class="icon tab-bar-icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou"></use>
        </svg>
      </template>
      <template v-slot:middle>商品详情: {{ id }}</template>
    </nav-bar>

    <van-image
      style="margin-top: 50px"
      width="200"
      lazy-load
      :src="goods.cover_url"
    />

    <van-card
      style="text-align: left"
      :num="goods.stock"
      :price="goods.price"
      :desc="goods.description"
      :title="goods.title"
    >
      <template #tags>
        <van-tag plain type="danger">标签</van-tag>
        <van-tag plain type="danger">标签</van-tag>
      </template>
      <template #footer>
        <van-button type="warning" @click="handleAddCart">添加</van-button>
        <van-button type="danger" @click="goToCart">购买</van-button>
      </template>
    </van-card>

    <van-tabs v-model:active="active">
      <van-tab title="概述"
        ><div class="content" v-html="goods.details"></div
      ></van-tab>
      <van-tab title="热评">内容 2</van-tab>
      <van-tab title="相关图书"
        ><goods-list :goodsData="like_goods"></goods-list
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getGoodDetail } from "network/detail.js";
import { addCart } from "network/cart.js";
import { ref, onMounted, reactive, toRefs } from "vue";
import { Toast } from "vant";
export default {
  name: "Detail",
  components: {
    NavBar,
    GoodsList,
  },
  setup() {
    const route = useRoute();
    let router = useRouter();
    let store = useStore();
    let id = ref(0);
    id.value = route.query.id;

    const active = ref(0);

    let book = reactive({
      goods: {},
      like_goods: [],
    });

    onMounted(() => {
      getGoodDetail(id.value).then((res) => {
        book.goods = res.goods;
        book.like_goods = res.like_goods;
      });
    });

    const handleAddCart = () => {
      addCart({ goods_id: id.value, num: 1 }).then((res) => {
        if (res.status === 201 || res.status === 204) {
          Toast.success("添加购物车成功");
          store.dispatch("updateCart");
        }
      });
    };

    const goToCart = () => {
      addCart({ goods_id: id.value, num: 1 }).then((res) => {
        if (res.status === 201 || res.status === 204) {
          Toast.success("添加成功, 跳转至购物车");
          router.push({ path: "/shopcart" });
          store.dispatch("updateCart");
        }
      });
    };

    return { id, active, ...toRefs(book), handleAddCart, goToCart };
  },
};
</script>

<style lang="scss">
.content {
  img {
    width: 100vw;
  }
}
</style>
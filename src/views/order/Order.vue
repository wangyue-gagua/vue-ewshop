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
        订单列表
      </template>
    </nav-bar>
    <van-tabs
      v-model:active="active"
      @click="onTabChange"
    >
      <van-tab title="全部" />
      <van-tab title="待付款" />
      <van-tab title="已支付" />
      <van-tab title="发货" />
      <van-tab title="交易完成" />
      <van-tab title="过期" />
    </van-tabs>

    <div class="content">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
      >
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="order-info"
            @click="goTo(item.id)"
            v-for="item of list"
            :key="item.id"
          >
            <div>订单号： {{ item.order_no }}</div>
            <div>创建时间：{{ item.created_at }}</div>
            <van-card
              v-for="good of item.orderDetails.data"
              :key="good.id"
              :num="good.num"
              :price="good.price"
              :desc="good.goods.description"
              :title="good.goods.title"
              :thumb="good.goods.cover_url"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import { getOrderList } from 'network/order';
import {
  ref, reactive, onMounted, toRefs,
} from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Order',
  components: {
    NavBar,
  },
  setup() {
    const router = useRouter();
    const active = ref(0);
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      totalPage: 0,
      status: 0,
    });

    const onLoad = () => {
      if (!state.refreshing && state.page < state.totalPage) {
        state.page += 1;
        console.log(`${state.page}@@@@@@`);
      }
      if (state.refreshing) {
        state.list = [];
        state.refreshing = false;
      }
      getOrderList({
        page: state.page,
        status: state.status,
        include: 'user,orderDetails.goods',
      }).then((res) => {
        state.list = state.list.concat(res.data);
        state.loading = false;
        state.totalPage = res.meta.pagination.total_pages;
        console.log(state.totalPage);
        if (state.page >= state.totalPage) {
          state.finished = true;
        }
      });
    };

    const onRefresh = () => {
      state.page = 1;
      state.refreshing = true;
      // 清空列表数据
      state.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true;
      onLoad();
    };

    const onTabChange = (name) => {
      state.status = name;
      onRefresh();
    };

    const goTo = (id) => {
      router.push({ path: '/orderDetail', query: { id } });
    };
    onMounted(() => {
      onRefresh();
    });

    return {
      active,
      ...toRefs(state),
      onLoad,
      onRefresh,
      onTabChange,
      goTo,
    };
  },
};
</script>

<style lang="scss" scoped>
.van-tabs {
  margin-top: 45px;
}

.content {
  text-align: left;
  padding: 0 1em;
}

.order-info {
  margin-bottom: 2em;
}
</style>

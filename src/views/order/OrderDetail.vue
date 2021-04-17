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
        订单详情
      </template>
    </nav-bar>

    <div class="detail-box">
      <div class="text-line">
        <span>订单状态： </span>{{ payStatus }}
      </div>
      <div class="text-line">
        <span>订单编号： </span>{{ detail.order_no }}
      </div>
      <div class="text-line">
        <span>下单时间： </span>{{ detail.created_at }}
      </div>
      <van-button
        v-if="detail.status === 1"
        @click="showPayFn"
        type="primary"
        block
      >
        去支付
      </van-button>
      <van-button
        v-if="detail.status === 2"
        @click="handleConfirmOrder"
        plain
        type="primary"
        block
        id="confirm-btn"
      >
        确认订单
      </van-button>
      <div id="order">
        <div class="text-line">
          <span>商品金额： </span>￥{{ total }}.00
        </div>
        <div class="text-line">
          <span>配送方式： </span>{{ detail.express_type }}
        </div>
      </div>

      <van-card
        v-for="item of detail.orderDetails.data"
        :key="item.id"
        :num="item.num"
        :price="item.price"
        :desc="item.goods.description"
        :title="item.goods.title"
        :thumb="item.goods.cover_url"
      />

      <van-popup
        closeable
        v-model:show="showPay"
        :close-on-click-overlay="false"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-grid
          :border="false"
          :column-num="1"
        >
          <van-grid-item>
            支付宝二维码
            <van-image :src="ali_qr" />
          </van-grid-item>
        </van-grid>
      </van-popup>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import {
  getOrderDetail,
  payOrder,
  payOrderStatus,
  confirmOrder,
} from 'network/order';
import {
  toRefs, onMounted, reactive, computed,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Dialog, Toast } from 'vant';

export default {
  name: 'OrderDetail',
  components: { NavBar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      orderId: '',
      detail: {
        orderDetails: {
          data: [],
        },
        status: 0,
        order_no: '',
        created_at: '',
        express_type: '',
      },
      showPay: false,
      ali_qr: '',
    });
    const init = () => {
      const { id } = route.query;
      state.orderId = id;
      getOrderDetail(id).then((res) => {
        console.log(res);
        state.detail = res;
      });
    };
    onMounted(() => {
      Toast.loading({ message: '加载中', forbidClick: true });
      init();
      Toast.clear();
    });
    const payStatus = computed(() => {
      const mapping = {
        1: '新订单',
        2: '支付完成',
        3: '已发货',
        4: '已确认收货',
        5: '已过期',
      };
      return mapping[state.detail.status];
    });

    const total = computed(() => {
      let sum = 0;
      state.detail.orderDetails.data.forEach((item) => {
        sum += parseInt(item.num, 10) * parseFloat(item.goods.price);
      });
      return sum;
    });
    const showPayFn = () => {
      state.showPay = true;
      payOrder(state.orderId, { type: 'aliyun' }).then((res) => {
        state.ali_qr = res.qr_code_url;
      });
      // 轮询请求
      const timer = setInterval(() => {
        payOrderStatus(state.orderId).then((res) => {
          if (res === 2) {
            Toast.success('支付成功');
            state.showPay = false;
            clearInterval(timer);
            init();
          }
        });
      }, 2000);
    };

    const handleConfirmOrder = () => {
      Dialog.confirm({ title: '是否确认订单' }).then(() => {
        confirmOrder(state.orderId).then((res) => {
          Toast.success('确认成功');
          init();
        });
      });
    };

    return {
      ...toRefs(state),
      payStatus,
      total,
      showPayFn,
      handleConfirmOrder,
    };
  },
};
</script>

 <style lang="scss" scoped>
.detail-box {
  margin-top: 45px;
  text-align: left;
  padding: 0 1em;

  .text-line {
    padding-bottom: 5px;
    span {
      color: grey;
    }
  }
  .text-line:first-child {
    padding-top: 1em;
  }

  #confirm-btn {
    border: 0;
    color: black;
    margin-bottom: 10vh;
  }

  #order {
    margin-bottom: 5vh;
  }
}
</style>

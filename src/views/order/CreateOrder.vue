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
        订单预览
      </template>
    </nav-bar>

    <div class="userInfo">
      <div>
        {{ address.name }}<span>{{ address.phone }}</span>
      </div>
      <van-icon
        name="arrow"
        @click="goTo"
      />
      <br>
      <div>
        {{ address.province }} {{ address.city }} {{ address.county }}
        {{ address.address }}
      </div>
    </div>

    <van-card
      v-for="item of cartList"
      :key="item.id"
      :num="item.num"
      :price="item.goods.price"
      :title="item.goods.title"
      :thumb="item.goods.cover_url"
    />

    <van-submit-bar
      :price="total * 100"
      button-text="生成订单"
      @submit="onSubmit"
    >
      <span>商品金额</span>
    </van-submit-bar>

    <van-popup
      closeable
      v-model:show="showPay"
      :close-on-click-overlay="false"
      @close="onClose"
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
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import {
  getOrderPreview,
  createOrder,
  payOrder,
  payOrderStatus,
} from 'network/order';
import {
  reactive, onMounted, toRefs, computed,
} from 'vue';
import { Toast } from 'vant';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'CreateOrder',
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      cartList: [],
      address: {
        name: '',
        phone: '',
        city: '',
        province: '',
        county: '',
        address: '',
      },
      showPay: false,
      orderId: '',
      ali_qr: '',
      wx_qr: '',
    });

    const init = () => {
      Toast.loading({ message: '加载中...', forbidClick: true });

      getOrderPreview().then((res) => {
        const address = res.address.filter((item) => item.is_default === 1);
        if (address.length === 0) {
          state.address = {
            address: '还没有默认地址，请选择或添加默认地址',
          };
        } else {
          // eslint-disable-next-line prefer-destructuring
          state.address = address[0];
        }

        state.cartList = res.carts;
        Toast.clear();
      });
    };
    onMounted(() => {
      init();
    });
    const goTo = () => {
      router.push({
        path: '/address-list',
      });
    };

    const total = computed(() => {
      let sum = 0;
      state.cartList.forEach((item) => {
        sum += parseInt(item.num, 10) * parseFloat(item.goods.price);
      });
      return sum;
    });
    const onSubmit = () => {
      const params = {
        address_id: state.address.id,
      };
      createOrder(params).then((res) => {
        Toast.success('创建成功');
        store.dispatch('updateCart');
        state.showPay = true;

        state.orderId = res.id;
        // AliPay
        payOrder(state.orderId, { type: 'aliyun' }).then((resPay) => {
          state.ali_qr = resPay.qr_code_url;
        });

        // 轮询请求
        const timer = setInterval(() => {
          payOrderStatus(state.orderId).then((resState) => {
            if (resState === 2) {
              clearInterval(timer);
              router.push({ path: '/orderDetail', query: { id: state.orderId } });
            }
          });
        }, 2000);
      });
    };

    const onClose = () => {
      router.push({ path: '/orderDetail', query: { id: state.orderId } });
    };
    return {
      onSubmit,
      onClose,
      ...toRefs(state),
      goTo,
      total,
    };
  },
};
</script>

<style lang="scss" scoped>
.userInfo {
  margin-top: 45px;
  text-align: left;
  padding: 1.5em 1em;
  background-size: 10vw 2px;
  background: linear-gradient(
          135deg,
          #f05959 45%,
          transparent 45% 50%,
          #6363db 50% 95%,
          transparent 95%
  ) repeat-x bottom;

  .van-icon {
    float: right;
  }
}

.van-card {
  text-align: left;
}
.van-submit-bar {
  bottom: 70px;
}
</style>

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
        {{ Address.name }}<span>{{ Address.phone }}</span>
      </div>
      <van-icon
        name="arrow"
        @click="goTo"
      />
      <br>
      <div>
        {{ Address.province }} {{ Address.city }} {{ Address.county }}
        {{ Address.address }}
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
<script lang="ts">
import NavBar from 'components/common/navbar/NavBar.vue';
import {
  getOrderPreview,
  createOrder,
  payOrder,
  payOrderStatus, ORDERPREVIEW,
} from 'network/order';
import {
  reactive, onMounted, toRefs, computed, defineComponent,
} from 'vue';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { AxiosResponse } from 'axios';

export default defineComponent({
  name: 'CreateOrder',
  components: {
    NavBar,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      cartList: [
        {
          id: 2,
          user_id: 1,
          goods_id: 4,
          num: 2,
          is_checked: 1,
          created_at: '',
          updated_at: '',
          goods: {
            id: 4,
            cover: '',
            title: '',
            cover_url: '',
            price: 0,
          },
        },
      ],
      Address: {
        id: 2,
        name: '',
        phone: '',
        city: '',
        province: '',
        county: '',
        address: '',
      },
      showPay: false,
      orderId: 0,
      ali_qr: '',
      wx_qr: '',
    });

    const init = () => {
      Toast.loading({ message: '加载中...', forbidClick: true });

      getOrderPreview().then((res: AxiosResponse<ORDERPREVIEW>) => {
        const address = res.data.address.filter((item) => item.is_default === 1);
        if (address.length === 0) {
          state.Address.address = '还没有默认地址，请选择或添加默认地址';
        } else {
          // eslint-disable-next-line prefer-destructuring
          state.Address = address[0];
        }

        state.cartList = res.data.carts;
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
        sum += item.num * item.goods.price;
      });
      return sum;
    });
    const onSubmit = () => {
      const params = {
        address_id: state.Address.id.toString(),
      };
      createOrder(params).then((res) => {
        Toast.success('创建成功');
        store.dispatch('updateCart');
        state.showPay = true;

        state.orderId = res.data.id;
        // AliPay
        payOrder(state.orderId, { type: 'aliyun' }).then((resPay) => {
          state.ali_qr = resPay.data.qr_code_url;
        });

        // 轮询请求
        const timer = setInterval(() => {
          payOrderStatus(state.orderId).then((resState) => {
            if (resState.data.status === 2) {
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
});
</script>

<style lang="scss" scoped>
.userInfo {
  margin-top: 45px;
  text-align: left;
  padding: 1.5em 1em;
  background-size: 10vw 2px;
  background-repeat: repeat-x;
  background-position: bottom;
  //noinspection CssInvalidFunction
  background-image: linear-gradient(
          135deg,
          #f05959 45%,
          transparent 45% 50%,
          #6363db 50% 95%,
          transparent 95%);
  .van-icon {
    float: right;
  }
}
.van-popup {
  height: 40%;
}
.van-card {
  text-align: left;
}
.van-submit-bar {
  bottom: 70px;
}
</style>

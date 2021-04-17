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
        购物车
      </template>
    </nav-bar>
    <div class="checkbody">
      <van-checkbox-group
        v-model="checked"
        @change="groupChange"
        ref="checkGroup"
      >
        <van-swipe-cell
          v-for="(item, index) of list"
          :key="index"
        >
          <div class="check-wrapper">
            <van-checkbox :name="item.id" />
            <van-card
              :num="item.goods.stock"
              :price="item.goods.price"
              :desc="item.goods.description"
              :title="item.goods.title"
              class="goods-card"
              :thumb="item.goods.cover_url"
            >
              <template
                #footer
              >
                <van-stepper
                  v-model="item.num"
                  :max="item.goods.stock"
                  :name="item.id"
                  integer
                  @change="onChange"
                />
              </template>
            </van-card>
          </div>

          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="deleteItem(item.id)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      :price="total * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox
        @click="checkALL"
        v-model="isAllcheck"
      >
        全选
      </van-checkbox>
      <!-- <template #tip>
        你的收货地址不支持同城送, <span @click="onClickLink">修改地址</span>
      </template> -->
    </van-submit-bar>

    <div
      class="empty"
      v-if="list.length === 0"
    >
      <img
        src="~assets/logo.png"
        alt="empty shop cart"
        class="empty-cart"
      >
      <div class="title">
        购物车空空如也
      </div>
      <van-button
        round
        color="#1baeae"
        type="primary"
        block
        @click="goToShop"
      >
        前往选购
      </van-button>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from 'components/common/navbar/NavBar.vue';
import {
  ref, reactive, toRefs, onMounted, computed, defineComponent,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {
  getCart,
  deleteCartItem,
  modifyCart,
  checkCart, CartList, CartGoods,
} from 'network/cart';
import {
  SwipeCell, Stepper, SubmitBar, Toast,
} from 'vant';
import { AxiosResponse } from 'axios';
import CheckboxGroup from 'vant/lib/checkbox-group/CheckboxGroup';

interface CartInfo {
  list: CartGoods[],
  checked: any[]
}

export default defineComponent({
  name: 'ShopCart',
  components: {
    NavBar,
    'van-swipe-cell': SwipeCell,
    'van-stepper': Stepper,
    'van-submit-bar': SubmitBar,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const isAllcheck = ref(false);
    const checkGroup = ref(CheckboxGroup);
    // data model
    const cartInfo = reactive<CartInfo>({
      list: [],
      checked: [],
    });
    const onSubmit = () => {
      if (cartInfo.checked.length === 0) {
        Toast.fail('请选择商品');
      } else {
        router.push({ path: '/createOrder' });
      }
    };
    const onClickLink = () => Toast('修改地址');
    const goToShop = () => {
      router.push({ path: '/home' });
    };

    const init = () => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      getCart('include=goods')
        .then((res: AxiosResponse<CartList>) => {
          console.log(res);
          cartInfo.list = res.data.data;
          cartInfo.checked = res.data.data
            .filter((item) => item.is_checked === 1)
            .map((item) => item.id);

          isAllcheck.value = cartInfo.list.length === cartInfo.checked.length;
          Toast.clear();
        });
    };

    onMounted(() => {
      init();
    });

    const groupChange = (names: any[]) => {
      cartInfo.checked = names;
      isAllcheck.value = cartInfo.list.length === names.length;
      checkCart({ cart_ids: names });
    };
    const onChange = (value: string, detail: { name: string }) => {
      Toast.loading({
        message: '修改中',
        forbidClick: true,
      });
      modifyCart(parseInt(detail.name, 10), { num: parseInt(value, 10) })
        .then((res) => {
          // update list
          // cartInfo.list.forEach((item) =>{
          //   if(item.id==detail.name){
          //     item.num = value
          //   }
          // })
          Toast.clear();
        });
    };

    const checkALL = () => {
      if (isAllcheck.value === true) {
        // 行为与预期不符，但是可以工作
        checkGroup.value.toggleAll(true);
      } else {
        checkGroup.value.toggleAll(false);
      }
    };

    const deleteItem = (id: number) => {
      deleteCartItem(id)
        .then(() => {
          init();
          store.dispatch('updateCart');
        });
    };

    const total = computed(() => {
      let sum = 0;
      if (cartInfo.list.length > 0) {
        cartInfo.list.filter((item) => cartInfo.checked.includes(item.id))
          .forEach((item) => {
            if (item?.goods !== undefined) {
              sum += item.goods.price * item.num;
            }
          });
      }
      return sum;
    });
    return {
      isAllcheck,
      onSubmit,
      onClickLink,
      ...toRefs(cartInfo),
      goToShop,
      onChange,
      groupChange,
      checkALL,
      checkGroup,
      deleteItem,
      total,
    };
  },
});
</script>

<style lang="scss" scoped>
.checkbody {
  margin-top: 45px;
}

.goods-card {
  margin: 0;
  // background-color: @white;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}

.check-wrapper {
  display: flex;
  text-align: left;

  .van-card {
    flex: 1;
  }
}

.van-submit-bar {
  bottom: 70px;
}

.van-checkbox {
  width: 20px;
}

.empty {
  width: 50vw;
  margin: 0 auto;
}
</style>

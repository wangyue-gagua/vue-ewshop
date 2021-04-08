<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <svg class="icon tab-bar-icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou"></use>
        </svg>
      </template>
      <template v-slot:middle>订单列表</template>
    </nav-bar>
    <van-tabs v-model:active="active">
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款">内容 2</van-tab>
      <van-tab title="已支付">内容 3</van-tab>
      <van-tab title="发货">内容 4</van-tab>
      <van-tab title="交易完成">内容 4</van-tab>
      <van-tab title="过期">内容 4</van-tab>
    </van-tabs>

    <div class="content">
      <div>订单号： 1212</div>
      <div>创建时间：111</div>
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      />
    </div>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { ref } from "vue";
export default {
  name: "Order",
  components: {
    NavBar,
  },
  setup() {
    const active = ref(0);
    return { active };
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
</style>
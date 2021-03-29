<template>
  <div class="goods-item">
    <img v-lazy="good.cover_url" alt="" />
    <div class="goods-info">
      <p>{{good.title}}</p>
      <span class="price"><small>￥</small>{{good.price}}</span>
      <span class="collect">{{good.collects_count}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    good: {
      type: Object,
      default() {
        return {};
      }
    }}
};
</script>

<style lang="scss" scoped>
.goods-item {
  width: 46vw;
  // padding-bottom: 40px;
  img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }
    .price {
      color: red;
      margin-right: 20px;
    }
    .collect {
      position: relative;
    }
    .collect::before {
      content: "";
      position: absolute;
      left: -14px;
      width: 14px;
      height: 14px;
      top: 0px;
      background: url("~assets/collect.png") 0 0/14px 14px;
    }
  }
}
</style>
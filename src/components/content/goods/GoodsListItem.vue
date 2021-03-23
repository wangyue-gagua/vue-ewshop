<template>
  <div class="goods-item">
    <img src="~assets/logo.png" alt="" />
    <div class="goods-info">
      <p>title</p>
      <span class="price">￥300</span>
      <span class="collect">3</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
};
</script>

<style lang="scss" scoped>
.goods-item {
  width: 46vw;
  padding-bottom: 40px;
  position: relative;
  img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    overflow: hidden;
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
<template>
  <div class="goods">
    <GoodsListItem v-for="item of goodsData" :key="item" :good="item"></GoodsListItem>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  name: "GoodsList",
  props: {
    goodsData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px;
  background-color: red;
}
</style>
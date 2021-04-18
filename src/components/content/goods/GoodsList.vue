<template>
  <div class="goods">
    <GoodsListItem
      v-for="(item, index) of goodsData"
      :key="index"
      :good="item"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import GoodsListItem from './GoodsListItem.vue';

export default defineComponent({
  name: 'GoodsList',
  props: {
    goodsData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
});
</script>

<style lang="scss" scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px;
}
</style>

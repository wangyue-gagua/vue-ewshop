<template>
  <div class="recommend">
    <div
      class="recommend-itme"
      v-for="item of recommends.slice(0, 4)"
      :key="item.id"
    >
      <a
        href=""
        @click.prevent="goDetail(item.id)"
      >
        <img
          v-lazy="item.cover_url"
          alt=""
        >
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  setup() {
    const router = useRouter();
    const goDetail = (id: number) => {
      router.push({ path: '/detail', query: { id } });
    };

    return { goDetail };
  },
});
</script>

<style lang="scss" scoped>
.recommend {
  display: flex;
  width: 100%;
  padding: 5px 0 5px;
  border-bottom: 8px solid #eee;
}

.recommend-itme {
  flex: 1;
  img {
    width: 25vw;
    margin-bottom: 5px;
  }
}
</style>

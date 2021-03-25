<template>
  <div class="tab-control">
    <div
      v-for="(item, index) of titles"
      :key="index"
      @click="IndexClick(index)"
      :class="{ active: index === currentIndex }"
      class="tab-control-item"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  setup(props, { emit }) {
    let currentIndex = ref(0);
    const IndexClick = (index) => {
      currentIndex.value = index;
      emit("tabClick", index);
    };

    return { currentIndex, IndexClick };
  },
};
</script>

<style lang="scss" scoped>
.tab-control {
  display: flex;
  line-height: 40px;
  height: 40px;
  background-color: #fff;
  z-index: 10;

  position: sticky;
  top: 45px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  .tab-control-item {
    flex: 1;
  }
  .active {
    color: var(--color-tint);
    span {
      border-bottom: 1px solid var(--color-tint);
    }
  }
}
</style>
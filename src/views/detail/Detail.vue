<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <svg class="icon tab-bar-icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou"></use>
        </svg>
      </template>
      <template v-slot:middle>商品详情: {{ id }}</template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { useRoute } from "vue-router";
import {ref} from 'vue'
export default {
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute();
    let id = ref(0);

    id.value = route.query.id;

    return { id };
  },
};
</script>

<style>
</style>
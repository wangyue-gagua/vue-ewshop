<template>
  <div>
    <nav-bar>
      <template v-slot:middle>
              <h1>home</h1>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'src/components/common/navbar/NavBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>

<style>

</style>
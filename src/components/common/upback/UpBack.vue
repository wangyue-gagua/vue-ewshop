<template>
  <div class="upback" @click="backUp"></div>
</template>
<script>
export default {
  name: "UpBack",
  setup(props, { emit }) {
    return {
      backUp: () => {
        emit("bTop");
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.upback {
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 80px;
  right: 30px;
  z-index: 10;
  border-radius: 50%;
  box-shadow: 5px 5px 5px #888;
  background: rgba($color: #42b983, $alpha: 0.3) no-repeat center/80%
    url("~assets/up_arrow.png");
}
</style>
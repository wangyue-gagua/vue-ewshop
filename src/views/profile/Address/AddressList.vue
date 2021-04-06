<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <svg class="icon tab-bar-icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou"></use>
        </svg>
      </template>
      <template v-slot:middle>地址管理</template>
    </nav-bar>

    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>

  
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import {getAddressList} from 'network/address'
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { AddressList, Toast } from "vant";
export default {
  name: "AddressList",
  components: {
    NavBar,
    "van-address-list": AddressList,
  },
  setup() {
    const chosenAddressId = ref("1");
    const list = ref([]);
    const disabledList = [
    ];

    let router = useRouter();

    onMounted(() => {
      getAddressList().then((res)=> {
        if (res.data.length !== 0)
        list.value = res.data.map(item => {
          return {
            id: item.id,
            name: item.name,
            tel: item.phone,
            address: `${item.province} ${item.city} ${item.county} ${item.address}`,
            isDefault: !!item.is_default}
        })
      })
    })
    const onAdd = () =>
      router.push({
        path: "/address-edit",
        query: { type: "add" },
      });
    const onEdit = (item) =>
      router.push({
        path: "/address-edit",
        query: { type: "edit", addressId: item.id },
      });
    const onSelect = (item) =>
      router.push({ path: "createoder", query: { addressId: item.id } });

    return {
      list,
      onAdd,
      onEdit,
      onSelect,
      disabledList,
      chosenAddressId,
    };
  },
};
</script>

<style lang="scss" >
.van-address-list {
  margin-top: 45px;
  .van-address-list__bottom {
    margin-block-end: 70px;
    button {
      background-color: var(--color-tint);
      border: 1px solid var(--color-tint);
    }
  }
}
</style>
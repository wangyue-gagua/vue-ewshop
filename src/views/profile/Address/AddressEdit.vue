<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <svg class="icon tab-bar-icon" aria-hidden="true">
          <use xlink:href="#icon-jiantou"></use>
        </svg>
      </template>
      <template v-slot:middle>{{ title }}</template>
    </nav-bar>

    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      :show-delete="type === 'edit'"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import { areaList } from 'utils/area.ts';
import {
  addAddress,
  getAddressDetails,
  editAddress,
  deleteAddress,
} from 'network/address';
import {
  ref, reactive, toRefs, onMounted, computed,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { AddressEdit, Toast } from 'vant';

export default {
  name: 'AddressEdit',
  components: {
    NavBar,
    'van-address-edit': AddressEdit,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const searchResult = ref([]);
    const state = reactive({
      type: 'add',
      addressId: 0,
      addressInfo: {},
    });

    onMounted(() => {
      const { type, addressId } = route.query;
      state.type = type;
      state.addressId = addressId;

      if (type === 'edit') {
        getAddressDetails(addressId).then((res) => {
          console.log(res);
          const _areaCode = Object.keys(areaList.county_list).find(
            (key) => areaList.county_list[key] === res.county,
          );

          state.addressInfo = {
            name: res.name,
            tel: res.phone,
            province: res.province,
            city: res.city,
            county: res.county,
            addressDetail: res.address,
            isDefault: !!res.is_default,
            areaCode: _areaCode,
          };
        });
      }
    });

    const title = computed(() => (state.type === 'add' ? '新增地址' : '修改地址'));
    const onSave = (content) => {
      const params = {
        name: content.name,
        address: content.addressDetail,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        is_default: content.isDefault ? 1 : 0,
      };

      if (state.type === 'edit') {
        editAddress(state.addressId, params);
      } else if (state.type === 'add') {
        addAddress(params).then((res) => {
          Toast('添加成功');
        });
      }

      setTimeout(() => {
        router.back();
      }, 1000);
    };
    const onDelete = () => {
      deleteAddress(state.addressId).then((res) => {
        Toast('删除成功');
      });

      setTimeout(() => {
        router.back();
      }, 1000);
    };
    const onChangeDetail = (val) => {
      if (val) {
        searchResult.value = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        searchResult.value = [];
      }
    };

    return {
      onSave,
      onDelete,
      areaList,
      searchResult,
      onChangeDetail,
      title,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.van-address-edit {
  margin-top: 45px;
}
</style>

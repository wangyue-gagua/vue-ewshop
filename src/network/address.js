import { request } from "./request";

//增加地址
export function addAddress(params) {
  return request({
    url: "/api/address",
    method: "POST",
    params,
  });
}
//删除地址
export function deleteAddress(id) {
  return request({
    url: "/api/address/" + id,
    method: "DELETE",
  });
}
// 编辑地址
export function editAddress(id) {
  return request({
    url: "/api/address/" + id,
    method: "PUT",
  });
}
// 地址列表
export function getAddressList() {
  return request({
    url: "/api/address",
  });
}
// 地址详情
export function getAddressDetails(id) {
  return request({
    url: "/api/address/" + id,
    method: "GET",
  });
}

import { request } from "./request";

// 提交订单
export function addOrder(params) {
    //address_id: id
  return request({
    url: "/api/orders",
    method: "POST",
    params,
  });
}
// order preview
export function getOrderPreview() {
  return request({
    url: "/api/orders/preview",
    method: "GET",
  });
}
// order pay
export function payOrder(order, params) {
  return request({
    url: `/api/orders/${order}/pay`,
    method: "GET",
    params
  });
}
// query pay status
export function payOrderStatus(order) {
  return request({
    url: `/api/orders/${order}/status`,
    method: "GET",
  });
}
// order detail
// include: 'goods,user,orderDetails'
export function getOrderDetail(order, params) {
  return request({
    url: `/api/orders/${order}`,
    method: "GET",
    params
  });
}
// order list
export function addOrder(params) {
  return request({
    url: "/api/orders",
    method: "GET",
    params,
  });
}
// express detail
export function getExpress(order) {
  return request({
    url: `/api/orders/${order}/express`,
    method: "GET",
  });
}
// 确认收货
export function conformOrder(order) {
  return request({
    url: `/api/orders/${order}/confirm`,
    method: "PATCH",
  });
}
// comment goods
export function conformOrder(order, params) {
  return request({
    url: `/api/orders/${order}/comment`,
    method: "POST",
    params,
  });
}

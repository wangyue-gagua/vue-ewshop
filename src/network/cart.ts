// eslint-disable-next-line import/no-cycle
import request from './request';

// add shop cart
// eslint-disable-next-line camelcase
export function addCart(data: {goods_id: string, num?: string}) {
  return request({
    url: '/api/carts',
    method: 'POST',
    data,
  });
}

// modify shop cart
export function modifyCart(id: number, data: {num: number}) {
  return request({
    url: `/api/carts/${id}`,
    method: 'PUT',
    data,
  });
}

// get shop cart checkbox state
// 注意： 会把提交过来的购物车数据设置为选中， 未提交过来的购物车数据设置为非选中
// eslint-disable-next-line camelcase
export function checkCart(data: {cart_ids: Array<number>}) {
  return request({
    url: '/api/carts/checked',
    method: 'PATCH',
    data,
  });
}

// get shop cart goods list
export function getCart(data = '') {
  return request({
    url: `/api/carts?${data}`,
    method: 'GET',
    data,
  });
}

// delete shop cart
export function deleteCartItem(id: number) {
  return request({
    url: `/api/carts/${id}`,
    method: 'DELETE',
  });
}

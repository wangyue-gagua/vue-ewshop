import request from './request';

// 提交订单
// eslint-disable-next-line camelcase
export function createOrder(params: { address_id: number }) {
  // address_id: id
  return request({
    url: '/api/orders',
    method: 'POST',
    params,
  });
}

// order preview
export function getOrderPreview() {
  return request({
    url: '/api/orders/preview',
    method: 'GET',
  });
}

// order pay
export function payOrder(order: number, params: 'aliyun' | 'wechat') {
  return request({
    url: `/api/orders/${order}/pay`,
    method: 'GET',
    params,
  });
}

// query pay status
export function payOrderStatus(order: number) {
  return request({
    url: `/api/orders/${order}/status`,
    method: 'GET',
  });
}

// order detail
// include: 'goods,user,orderDetails'
export function getOrderDetail(order: number) {
  return request({
    url: `/api/orders/${order}`,
    method: 'GET',
    params: {
      include: 'user,orderDetails.goods',
    },
  });
}

interface OrderListParams {
  page?: number,
  title?: string,
  status?: string,
  include?: string
}

// order list
export function getOrderList(params: OrderListParams) {
  return request({
    url: '/api/orders',
    method: 'GET',
    params,
  });
}

// express detail
export function getExpress(order: number) {
  return request({
    url: `/api/orders/${order}/express`,
    method: 'GET',
  });
}

// 确认收货
export function confirmOrder(order: number) {
  return request({
    url: `/api/orders/${order}/confirm`,
    method: 'PATCH',
  });
}

interface CommentParams {
  // eslint-disable-next-line camelcase
  goods_id: number,
  content: string,
  rate?: number,
  star?: number
}

// comment goods
export function commentOrder(order: number, params: CommentParams) {
  return request({
    url: `/api/orders/${order}/comment`,
    method: 'POST',
    params,
  });
}

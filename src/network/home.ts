import request from './request';

export interface GoodsData {
    id: number,
    title: string,
  // eslint-disable-next-line camelcase
    cover_url: string
}
interface Slides {
    id: number,
    title: string,
  // eslint-disable-next-line camelcase
    img_url: string,
}
export interface HomeGoods {
    goods: {
      // eslint-disable-next-line camelcase
        current_page: number,
        data: GoodsData[]
    },
    slides: Slides[]
}

export function getHomeAllData() {
  return request({
    url: '/api/index',
  });
}
export function getHomeGoods(cate = 'sales', page = 1) {
  return request({
    url: `/api/index?${cate}=1&page=${page}`,
  });
}

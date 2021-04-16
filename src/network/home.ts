import {request} from './request'

interface GoodsData {
    id: number,
    title: string,
    cover_url: string
}
interface Slides {
    id: number,
    title: string,
    img_url: string,
}
export interface HomeGoods {
    goods: {
        current_page: number,
        data: GoodsData[]
    },
    slides: Slides[]
}

export  function getHomeAllData() {
    return request({
        url: '/api/index',
    })
}
export function getHomeGoods(cate='sales', page=1) {
    return request({
        url: '/api/index?' + cate +'=1&page=' + page,
    })
}
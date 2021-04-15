import {request} from './request'
import {AxiosResponse} from "axios";

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
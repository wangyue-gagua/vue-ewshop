import {request} from './request'

export  function getHomeAllData() {
    return request({
        url: '/api/index',
        
    })
}
export function getHomeGoods(cato='sales', page=1) {
    return request({
        url: '/api/index?' + cato +'=1&page=' + page,
        
    })
}
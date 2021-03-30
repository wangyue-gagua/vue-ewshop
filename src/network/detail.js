import {request} from './request'

export function getGoodDetail(id) {
    return request({
        url: '/api/goods/' + id, 
    })
}
import {request} from './request'

export function getGoodDetail(id: number) {
    return request({
        url: '/api/goods/' + id, 
    })
}
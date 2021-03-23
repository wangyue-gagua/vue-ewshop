import {request} from './request'

export default function getHomeAllData() {
    return request({
        url: '/api/index',
        
    })
}
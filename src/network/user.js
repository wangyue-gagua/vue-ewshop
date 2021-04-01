import {request} from './request'

export function register(data) {
    return request({
        url: '/api/auth/register',
        method: 'POST',
        data: data
    })
}
export function Login(data) {
    return request({
        url: '/api/auth/login',
        method: 'POST',
        data: data
    })
}
export function Logout() {
    return request({
        url: '/api/auth/logout',
        method: 'POST',
    })
}
export function getUser() {
    return request({
        url: '/api/user',
    })
}
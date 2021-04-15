import {request} from './request'

export function register(data: {name: string, email: string, password: string, password_confirmation: string}) {
    return request({
        url: '/api/auth/register',
        method: 'POST',
        data: data
    })
}
export function Login(data: {email: string, password: string}) {
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
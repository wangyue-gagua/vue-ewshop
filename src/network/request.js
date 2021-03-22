import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000,
    })
    // interceptors
    instance.interceptors.request.use(config =>{
        // if need authentication to access an api

        // permit through
        return config;
    }, err =>{

    })

    instance.interceptors.response.use(res =>{
        console.log(res)
        return res.data? res.data: res;
    }, err =>{
        // if need authentication login
        // handling error message
    })

    return instance(config);
}
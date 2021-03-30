import axios from 'axios'
import { Notify } from 'vant';
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
        console.log(err.response.data);
        Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0])
    })

    return instance(config);
}
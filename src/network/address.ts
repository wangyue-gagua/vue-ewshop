import {request} from "./request";

interface Address {
    name: string,
    address: string,
    phone: string,
    province: string,
    city: string,
    county: string,
    is_default?: number
}

//增加地址
export function addAddress(params: Address) {
    return request({
        url: "/api/address",
        method: "POST",
        params,
    });
}

//删除地址
export function deleteAddress(id: number) {
    return request({
        url: "/api/address/" + id,
        method: "DELETE",
    });
}

// 编辑地址
export function editAddress(id: number, params: Address) {
    return request({
        url: "/api/address/" + id,
        method: "PUT",
        params,
    });
}

// 地址列表
export function getAddressList() {
    return request({
        url: "/api/address",
    });
}

// 地址详情
export function getAddressDetails(id: number) {
    return request({
        url: "/api/address/" + id,
        method: "GET",
    });
}

import { request } from "./request";

// add shop cart
export function addCart(data) {
  return request({
    url: "/api/carts",
    method: "POST",
    data: data,
  });
}

// modify shop cart
export function modifyCart(id, data) {
  return request({
    url: `/api/carts/${id}`,
    method: "PUT",
    data: data,
  });
}

// get shop cart checkbox state
export function checkCart(data) {
  return request({
    url: "/api/carts/checked",
    method: "PATCH",
    data: data,
  });
}

// get shop cart goods list
export function getCart(data = "") {
  return request({
    url: `/api/carts?${data}`,
    method: "GET",
    data: data,
  });
}

// delete shop cart
export function deleteCartItem(id) {
  return request({
    url: `/api/carts/${id}`,
    method: "DELETE",
  });
}

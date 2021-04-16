import {request} from './request'

export interface LikeGoods {
    "id": number,
    "title": string,
    "price": number,
    "cover": string,
    "sales": number,
    "cover_url": string,
    "collects_count": number,
}

interface Goods {
    "id": 1,
    "user_id": 1,
    "category_id": 13,
    "title": "Voluptas fugit ex.",
    "description": "Culpa soluta omnis quod rerum ut aut.",
    "price": 62333,
    "stock": 9840,
    "sales": 1,
    "cover": "http://placeimg.com/640/480/any",
    "pics": [
        "http://placeimg.com/640/480/any",
        "http://placeimg.com/640/480/any",
        "http://placeimg.com/640/480/any"
    ],
    "is_on": 1,
    "is_recommend": 1,
    "details": "Aut accusamus adipisci nisi possimus corrupti id aperiam",
    "created_at": "2020-12-22T02:58:34.000000Z",
    "updated_at": "2020-12-22T10:24:50.000000Z",
    "cover_url": "http://placeimg.com/640/480/any",
    "pics_url": [
        "http://placeimg.com/640/480/any",
        "http://placeimg.com/640/480/any",
        "http://placeimg.com/640/480/any"
    ],
    "collects_count": 1,
    "is_collect": 1,
    "comments": [
        {
            "id": 1,
            "user_id": 1,
            "order_id": 1,
            "goods_id": 1,
            "rate": 1,
            "star": 5,
            "content": "不错",
            "reply": null,
            "pics": null,
            "created_at": null,
            "updated_at": null,
            "user": {
                "id": 1,
                "name": "超级管理员",
                "avatar": null,
                "avatar_url": ""
            }
        }
    ]
}
export interface GETGOODDETAIL {
    goods: Goods,
    like_goods: LikeGoods[]
}
export function getGoodDetail(id: number) {
    return request({
        url: '/api/goods/' + id, 
    })
}
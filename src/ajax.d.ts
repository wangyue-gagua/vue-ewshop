/*
declare namespace Ajax {

    // axios 返回数据
    declare module 'axios' {
        export interface AxiosResponse<T = any> {
            goods: {
                current_page: number,
                data: GoodsData[]
            }
        }
    }

    // export interface AxiosResponse {
    //
    //     // data: AjaxResponse
    //     goods: {
    //         current_page: number,
    //         data: GoodsData[]
    //     }
    //
    // }

    // 请求接口数据
    interface GoodsData {
        id: number;
        title: string
    }
    export interface AjaxResponse {

        goods: {
            current_page: number,
            data: GoodsData[]
        }

    }

}
*/

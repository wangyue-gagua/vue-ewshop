declare namespace Ajax {

    // axios 返回数据

    export interface AxiosResponse {

        data: AjaxResponse

    }

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

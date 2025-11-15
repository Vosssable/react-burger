import postOrders from "../../helpers/api/postOrders";

export const LOAD_ORDER_SUCCESS = 'LOAD_ORDER_SUCCESS'
export const LOAD_ORDER_FAILED = 'LOAD_ORDER_FAILED'
export const LOAD_ORDER_REQUEST = 'LOAD_ORDER_REQUEST'
export const ORDER_CLEAN = 'ORDER_CLEAN'

export const loadOrderSuccess = (orderData: { order: number; name: string }) => ({
    type: LOAD_ORDER_SUCCESS,
    payload: orderData
})

export const loadOrderRequest = () => ({
    type: LOAD_ORDER_REQUEST
})

export const loadOrderFailed = (errorMsg: string) => ({
    type: LOAD_ORDER_FAILED,
    payload: errorMsg
})

export const cleanOrder = () => ({
    type: ORDER_CLEAN
})

export const createOrder = (ingredientIds: string[]) => {
    return async (dispatch: any) => {
        try {
            dispatch(loadOrderRequest())
            const response = await postOrders(ingredientIds)

            if (response.success) {
                dispatch(loadOrderSuccess({
                    order: response.order.number,
                    name: response.name
                }))
            } else {
                dispatch(loadOrderSuccess({
                    name: '',
                    order: 0
                }))
            }
        } catch (error: any) {
            if (error && 'status' in error) {
                if (error.status === 404) {
                    dispatch(loadOrderFailed('Неверный адрес!'))
                    console.error(error)
                } else if (error.status === 500) {
                    dispatch(loadOrderFailed('Ошибка на сервере, звони в яндекс!'))
                    console.error(error)
                } else {
                    dispatch(loadOrderFailed('Непредвиденная ошибка!'))
                    console.error(error)
                }
            } else {
                dispatch(loadOrderFailed('Произошла ошибка при создании заказа'))
            }
            dispatch(cleanOrder())
        }
    }
}

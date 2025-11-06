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

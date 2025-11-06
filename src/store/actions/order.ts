export const SET_ORDER = 'SET_ORDER'
export const ORDER_CLEAN = 'ORDER_CLEAN'

export const setOrder = (orderData: { order: number; name: string }) => ({
    type: SET_ORDER,
    payload: orderData
})

export const cleanOrder = () => ({
    type: ORDER_CLEAN
})

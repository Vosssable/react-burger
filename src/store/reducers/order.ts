import {ORDER_CLEAN, SET_ORDER} from "../actions/order";

interface OrderState {
    order: number
    name: string
}

const initialState: OrderState = {
    order: 0,
    name: ''
}

export const orderReducer = (state = initialState, action: any): OrderState => {
    switch (action.type) {
        case SET_ORDER:
            return {
                order: action.payload.order,
                name: action.payload.name
            }
        case ORDER_CLEAN:
            return {
                order: 0,
                name: ''
            }
        default:
            return state
    }
}

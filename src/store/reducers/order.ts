import {LOAD_ORDER_SUCCESS, LOAD_ORDER_REQUEST, LOAD_ORDER_FAILED, ORDER_CLEAN} from "../actions/order";

interface OrderState {
    order: number
    name: string,
    loading: boolean,
    error: null | string,
}

const initialState: OrderState = {
    order: 0,
    name: '',
    loading: false,
    error: null,
}

export const orderReducer = (state = initialState, action: any): OrderState => {
    switch (action.type) {
        case LOAD_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case LOAD_ORDER_SUCCESS:
            return {
                ...action.payload,
                loading: false,
                error: null
            }
        case LOAD_ORDER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ORDER_CLEAN:
            return {
                order: 0,
                name: '',
                loading: false,
                error: null
            }
        default:
            return state
    }
}

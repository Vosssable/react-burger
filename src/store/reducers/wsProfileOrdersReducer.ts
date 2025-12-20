import { WS_PROFILE_CONNECTION_CLOSED, WS_PROFILE_CONNECTION_SUCCESS, WS_PROFILE_CONNECTION_ERROR, WS_PROFILE_GET_MESSAGE } from '../actions/wsActions'
import { IOrder, IWSMessage } from '../middleware/socketMiddleware'

interface WSProfileOrdersState {
    wsConnected: boolean
    orders: IOrder[]
    error: string | null
}

const initialState: WSProfileOrdersState = {
    wsConnected: false,
    orders: [],
    error: null
}

type WSProfileOrdersAction =
    | { type: typeof WS_PROFILE_CONNECTION_SUCCESS }
    | { type: typeof WS_PROFILE_CONNECTION_ERROR; payload: string }
    | { type: typeof WS_PROFILE_CONNECTION_CLOSED }
    | { type: typeof WS_PROFILE_GET_MESSAGE; payload: IWSMessage }

export const wsProfileOrdersReducer = (state = initialState, action: WSProfileOrdersAction): WSProfileOrdersState => {
    switch (action.type) {
        case WS_PROFILE_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                error: null
            }
        case WS_PROFILE_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                error: action.payload
            }
        case WS_PROFILE_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            }
        case WS_PROFILE_GET_MESSAGE:
            const message: IWSMessage = action.payload
            return {
                ...state,
                orders: message.orders
            }
        default:
            return state
    }
}


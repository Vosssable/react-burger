import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_SUCCESS, WS_FEED_CONNECTION_ERROR, WS_FEED_GET_MESSAGE } from '../actions/wsActions'
import { IOrder, IWSMessage } from '../middleware/socketMiddleware'

interface WSFeedState {
    wsConnected: boolean
    orders: IOrder[]
    total: number
    totalToday: number
    error: string | null
}

const initialState: WSFeedState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null
}

type WSFeedAction =
    | { type: typeof WS_FEED_CONNECTION_SUCCESS }
    | { type: typeof WS_FEED_CONNECTION_ERROR; payload: string }
    | { type: typeof WS_FEED_CONNECTION_CLOSED }
    | { type: typeof WS_FEED_GET_MESSAGE; payload: IWSMessage }

export const wsFeedReducer = (state = initialState, action: WSFeedAction): WSFeedState => {
    switch (action.type) {
        case WS_FEED_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
                error: null
            }
        case WS_FEED_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                error: action.payload
            }
        case WS_FEED_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            }
        case WS_FEED_GET_MESSAGE:
            const message: IWSMessage = action.payload
            return {
                ...state,
                orders: message.orders,
                total: message.total,
                totalToday: message.totalToday
            }
        default:
            return state
    }
}


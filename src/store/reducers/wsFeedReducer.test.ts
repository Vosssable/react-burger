import { wsFeedReducer } from './wsFeedReducer'

type WSFeedState = ReturnType<typeof wsFeedReducer>
import {
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_GET_MESSAGE
} from '../actions/wsActions'
import { IOrder } from '../middleware/socketMiddleware'

describe('wsFeed reducer', () => {
    const initialState: WSFeedState = {
        wsConnected: false,
        orders: [],
        total: 0,
        totalToday: 0,
        error: null,
    }

    const mockOrder: IOrder = {
        _id: '643d69a5c3f7b9001cfa093c',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
        status: 'done',
        name: 'Space флюоресцентный антарианский люминесцентный бургер',
        createdAt: '2021-06-23T14:43:22.587Z',
        updatedAt: '2021-06-23T14:43:22.603Z',
        number: 12345,
    }

    it('should return the initial state', () => {
        expect(wsFeedReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState)
    })

    it('should handle WS_FEED_CONNECTION_SUCCESS', () => {
        const action = { type: WS_FEED_CONNECTION_SUCCESS } as const
        const expectedState: WSFeedState = {
            ...initialState,
            wsConnected: true,
            error: null,
        }
        expect(wsFeedReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle WS_FEED_CONNECTION_ERROR', () => {
        const errorMessage = 'WebSocket connection error'
        const action = {
            type: WS_FEED_CONNECTION_ERROR,
            payload: errorMessage,
        } as const
        const expectedState: WSFeedState = {
            ...initialState,
            wsConnected: false,
            error: errorMessage,
        }
        expect(wsFeedReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle WS_FEED_CONNECTION_CLOSED', () => {
        const stateConnected: WSFeedState = {
            ...initialState,
            wsConnected: true,
        }
        const action = { type: WS_FEED_CONNECTION_CLOSED } as const
        const expectedState: WSFeedState = {
            ...stateConnected,
            wsConnected: false,
        }
        expect(wsFeedReducer(stateConnected, action)).toEqual(expectedState)
    })

    it('should handle WS_FEED_GET_MESSAGE', () => {
        const message = {
            success: true,
            orders: [mockOrder],
            total: 100,
            totalToday: 50,
        }
        const action = {
            type: WS_FEED_GET_MESSAGE,
            payload: message,
        } as const
        const expectedState: WSFeedState = {
            ...initialState,
            orders: message.orders,
            total: message.total,
            totalToday: message.totalToday,
        }
        expect(wsFeedReducer(initialState, action)).toEqual(expectedState)
    })
})


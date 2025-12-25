import { wsProfileOrdersReducer } from './wsProfileOrdersReducer'

type WSProfileOrdersState = ReturnType<typeof wsProfileOrdersReducer>
import {
    WS_PROFILE_CONNECTION_SUCCESS,
    WS_PROFILE_CONNECTION_ERROR,
    WS_PROFILE_CONNECTION_CLOSED,
    WS_PROFILE_GET_MESSAGE
} from '../actions/wsActions'
import { IOrder } from '../middleware/socketMiddleware'

describe('wsProfileOrders reducer', () => {
    const initialState: WSProfileOrdersState = {
        wsConnected: false,
        orders: [],
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
        expect(wsProfileOrdersReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState)
    })

    it('should handle WS_PROFILE_CONNECTION_SUCCESS', () => {
        const action = { type: WS_PROFILE_CONNECTION_SUCCESS } as const
        const expectedState: WSProfileOrdersState = {
            ...initialState,
            wsConnected: true,
            error: null,
        }
        expect(wsProfileOrdersReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle WS_PROFILE_CONNECTION_ERROR', () => {
        const errorMessage = 'WebSocket connection error'
        const action = {
            type: WS_PROFILE_CONNECTION_ERROR,
            payload: errorMessage,
        } as const
        const expectedState: WSProfileOrdersState = {
            ...initialState,
            wsConnected: false,
            error: errorMessage,
        }
        expect(wsProfileOrdersReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle WS_PROFILE_CONNECTION_CLOSED', () => {
        const stateConnected: WSProfileOrdersState = {
            ...initialState,
            wsConnected: true,
        }
        const action = { type: WS_PROFILE_CONNECTION_CLOSED } as const
        const expectedState: WSProfileOrdersState = {
            ...stateConnected,
            wsConnected: false,
        }
        expect(wsProfileOrdersReducer(stateConnected, action)).toEqual(expectedState)
    })

    it('should handle WS_PROFILE_GET_MESSAGE', () => {
        const message = {
            success: true,
            orders: [mockOrder],
            total: 100,
            totalToday: 50,
        }
        const action = {
            type: WS_PROFILE_GET_MESSAGE,
            payload: message,
        } as const
        const expectedState: WSProfileOrdersState = {
            ...initialState,
            orders: message.orders,
        }
        expect(wsProfileOrdersReducer(initialState, action)).toEqual(expectedState)
    })
})


import { orderReducer } from './order'

type OrderState = ReturnType<typeof orderReducer>
import {
    LOAD_ORDER_REQUEST,
    LOAD_ORDER_SUCCESS,
    LOAD_ORDER_FAILED,
    ORDER_CLEAN
} from '../actions/order'

describe('order reducer', () => {
    const initialState: OrderState = {
        order: 0,
        name: '',
        loading: false,
        error: null,
    }

    it('should return the initial state', () => {
        expect(orderReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState)
    })

    it('should handle LOAD_ORDER_REQUEST', () => {
        const action = { type: LOAD_ORDER_REQUEST } as const
        const expectedState: OrderState = {
            ...initialState,
            loading: true,
            error: null,
        }
        expect(orderReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle LOAD_ORDER_SUCCESS', () => {
        const orderData = {
            order: 12345,
            name: 'Space флюоресцентный антарианский люминесцентный бургер',
        }
        const action = {
            type: LOAD_ORDER_SUCCESS,
            payload: orderData,
        } as const
        const expectedState: OrderState = {
            ...orderData,
            loading: false,
            error: null,
        }
        expect(orderReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle LOAD_ORDER_FAILED', () => {
        const errorMessage = 'Ошибка загрузки заказа'
        const action = {
            type: LOAD_ORDER_FAILED,
            payload: errorMessage,
        } as const
        const expectedState: OrderState = {
            ...initialState,
            loading: false,
            error: errorMessage,
        }
        expect(orderReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle ORDER_CLEAN', () => {
        const stateWithOrder: OrderState = {
            order: 12345,
            name: 'Space флюоресцентный антарианский люминесцентный бургер',
            loading: false,
            error: 'Some error',
        }
        const action = { type: ORDER_CLEAN } as const
        expect(orderReducer(stateWithOrder, action)).toEqual(initialState)
    })
})


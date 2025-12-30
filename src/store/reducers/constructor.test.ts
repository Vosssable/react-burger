jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mock-uuid-v4'),
}))

import { constructorReducer, TConstructorIngredient, initialState } from './constructor'

type ConstructorState = ReturnType<typeof constructorReducer>
import {
    CONSTRUCTOR_ADD_BUN,
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_REMOVE_INGREDIENT,
    CONSTRUCTOR_MOVE_INGREDIENT,
    CONSTRUCTOR_CLEAN
} from '../actions/constructor'
import { TBurgerIngredient } from '../../helpers/types/burgerTypes'

describe('constructor reducer', () => {
    const mockBun: TBurgerIngredient = {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
    }

    const mockIngredient: TBurgerIngredient = {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0,
    }

    it('should return the initial state', () => {
        expect(constructorReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState)
    })

    it('should handle CONSTRUCTOR_ADD_BUN', () => {
        const action = {
            type: CONSTRUCTOR_ADD_BUN,
            payload: mockBun,
        } as const
        const expectedState: ConstructorState = {
            ...initialState,
            bun: mockBun,
        }
        expect(constructorReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle CONSTRUCTOR_ADD_INGREDIENT', () => {
        const constructorIngredient: TConstructorIngredient = {
            ...mockIngredient,
            uniqueId: 'unique-123',
        }
        const action = {
            type: CONSTRUCTOR_ADD_INGREDIENT,
            payload: constructorIngredient,
        } as const
        const expectedState: ConstructorState = {
            ...initialState,
            ingredients: [constructorIngredient],
        }
        expect(constructorReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle CONSTRUCTOR_REMOVE_INGREDIENT', () => {
        const ingredient1: TConstructorIngredient = {
            ...mockIngredient,
            uniqueId: 'unique-1',
        }
        const ingredient2: TConstructorIngredient = {
            ...mockIngredient,
            uniqueId: 'unique-2',
        }
        const stateWithIngredients: ConstructorState = {
            ...initialState,
            ingredients: [ingredient1, ingredient2],
        }
        const action = {
            type: CONSTRUCTOR_REMOVE_INGREDIENT,
            payload: { uniqueId: 'unique-1' },
        } as const
        const expectedState: ConstructorState = {
            ...initialState,
            ingredients: [ingredient2],
        }
        expect(constructorReducer(stateWithIngredients, action)).toEqual(expectedState)
    })

    it('should handle CONSTRUCTOR_MOVE_INGREDIENT', () => {
        const ingredient1: TConstructorIngredient = {
            ...mockIngredient,
            uniqueId: 'unique-1',
        }
        const ingredient2: TConstructorIngredient = {
            ...mockIngredient,
            uniqueId: 'unique-2',
        }
        const ingredient3: TConstructorIngredient = {
            ...mockIngredient,
            uniqueId: 'unique-3',
        }
        const stateWithIngredients: ConstructorState = {
            ...initialState,
            ingredients: [ingredient1, ingredient2, ingredient3],
        }
        const action = {
            type: CONSTRUCTOR_MOVE_INGREDIENT,
            payload: { fromIndex: 0, toIndex: 2 },
        } as const
        const expectedState: ConstructorState = {
            ...initialState,
            ingredients: [ingredient2, ingredient3, ingredient1],
        }
        expect(constructorReducer(stateWithIngredients, action)).toEqual(expectedState)
    })

    it('should handle CONSTRUCTOR_CLEAN', () => {
        const stateWithData: ConstructorState = {
            bun: mockBun,
            ingredients: [
                { ...mockIngredient, uniqueId: 'unique-1' },
            ],
        }
        const action = { type: CONSTRUCTOR_CLEAN } as const
        expect(constructorReducer(stateWithData, action)).toEqual(initialState)
    })
})


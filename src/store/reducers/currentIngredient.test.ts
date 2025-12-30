import { currentIngredientReducer, initialState } from './currentIngredient'

type CurrentIngredientState = ReturnType<typeof currentIngredientReducer>
import {
    CURRENT_INGREDIENT_SET,
    CURRENT_INGREDIENT_CLEAN
} from '../actions/currentIngredient'
import { TBurgerIngredient } from '../../helpers/types/burgerTypes'

describe('currentIngredient reducer', () => {
    const mockIngredient: TBurgerIngredient = {
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

    it('should return the initial state', () => {
        expect(currentIngredientReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState)
    })

    it('should handle CURRENT_INGREDIENT_SET', () => {
        const action = {
            type: CURRENT_INGREDIENT_SET,
            payload: mockIngredient,
        } as const
        const expectedState: CurrentIngredientState = {
            info: mockIngredient,
        }
        expect(currentIngredientReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle CURRENT_INGREDIENT_CLEAN', () => {
        const stateWithIngredient: CurrentIngredientState = {
            info: mockIngredient,
        }
        const action = { type: CURRENT_INGREDIENT_CLEAN } as const
        expect(currentIngredientReducer(stateWithIngredient, action)).toEqual(initialState)
    })
})


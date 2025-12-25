import { ingredientsReducer } from './ingredients'

type IngredientsState = ReturnType<typeof ingredientsReducer>
import {
    INGREDIENTS_LOAD_REQUEST,
    INGREDIENTS_LOAD_SUCCESS,
    INGREDIENTS_LOAD_FAILED,
    CLEAN_INGREDIENTS
} from '../actions/ingredients'
import { TBurgerIngredient } from '../../helpers/types/burgerTypes'

describe('ingredients reducer', () => {
    const initialState: IngredientsState = {
        items: { ingredients: [] },
        loading: false,
        error: null,
    }

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
        expect(ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState)
    })

    it('should handle INGREDIENTS_LOAD_REQUEST', () => {
        const action = { type: INGREDIENTS_LOAD_REQUEST } as const
        const expectedState: IngredientsState = {
            ...initialState,
            loading: true,
            error: null,
        }
        expect(ingredientsReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle INGREDIENTS_LOAD_SUCCESS', () => {
        const ingredients = [mockIngredient]
        const action = {
            type: INGREDIENTS_LOAD_SUCCESS,
            payload: { ingredients },
        } as const
        const expectedState: IngredientsState = {
            items: { ingredients },
            loading: false,
            error: null,
        }
        expect(ingredientsReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle INGREDIENTS_LOAD_FAILED', () => {
        const errorMessage = 'Ошибка загрузки'
        const action = {
            type: INGREDIENTS_LOAD_FAILED,
            payload: errorMessage,
        } as const
        const expectedState: IngredientsState = {
            ...initialState,
            loading: false,
            error: errorMessage,
        }
        expect(ingredientsReducer(initialState, action)).toEqual(expectedState)
    })

    it('should handle CLEAN_INGREDIENTS', () => {
        const stateWithData: IngredientsState = {
            items: { ingredients: [mockIngredient] },
            loading: false,
            error: 'Some error',
        }
        const action = { type: CLEAN_INGREDIENTS } as const
        expect(ingredientsReducer(stateWithData, action)).toEqual(initialState)
    })
})


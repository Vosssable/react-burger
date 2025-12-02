import type { TBurgerIngredient } from "../../helpers/types/burgerTypes"
import getIngredients from "../../helpers/api/getIngredients"
import {Dispatch} from "redux"

export const INGREDIENTS_LOAD_REQUEST = 'INGREDIENTS_LOAD_REQUEST'
export const INGREDIENTS_LOAD_SUCCESS = 'INGREDIENTS_LOAD_SUCCESS'
export const INGREDIENTS_LOAD_FAILED = 'INGREDIENTS_LOAD_FAILED'
export const CLEAN_INGREDIENTS = 'CLEAN_INGREDIENTS'


export const loadIngredients = () => ({
    type: INGREDIENTS_LOAD_REQUEST,
})

export const loadIngredientsSuccess = (ingredients: TBurgerIngredient[]) => ({
    type: INGREDIENTS_LOAD_SUCCESS,
    payload: {
        ingredients,
    },
})

export const loadIngredientsFailed = (errorMsg: string) => ({
    type: INGREDIENTS_LOAD_FAILED,
    payload: errorMsg,
})

export const cleanIngredients = () => ({
    type: CLEAN_INGREDIENTS
})

export const fetchIngredients = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(loadIngredients())
            const ingredientsResponse = await getIngredients()
            if (ingredientsResponse && 'data' in ingredientsResponse) {
                dispatch(loadIngredientsSuccess(ingredientsResponse.data))
            } else {
                dispatch(loadIngredientsSuccess([]))
            }
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'status' in error) {
                const statusError = error as { status: number };
                if (statusError.status === 404) {
                    dispatch(loadIngredientsFailed('Неверный адрес!'))
                    console.error(error)
                } else if (statusError.status === 500) {
                    dispatch(loadIngredientsFailed('Ошибка на сервере, звони в яндекс!'))
                    console.error(error)
                } else {
                    dispatch(loadIngredientsFailed('Непредвиденная ошибка!'))
                    console.error(error)
                }
                dispatch(cleanIngredients())
            } else {
                dispatch(loadIngredientsFailed('Произошла ошибка при загрузке'))
                dispatch(cleanIngredients())
            }
        }
    }
}

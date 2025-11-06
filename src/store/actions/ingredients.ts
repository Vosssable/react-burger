import {TBurgerIngredient} from "../../helpers/types/burgerTypes"

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

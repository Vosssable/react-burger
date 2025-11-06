import {TBurgerIngredient} from "../../helpers/types/burgerTypes"

export const CURRENT_INGREDIENT_SET = 'CURRENT_INGREDIENT_SET'
export const CURRENT_INGREDIENT_CLEAN = 'CURRENT_INGREDIENT_CLEAN'

export const setCurrentIngredient = (ingredient: TBurgerIngredient) => ({
    type: CURRENT_INGREDIENT_SET,
    payload: ingredient
})

export const cleanCurrentIngredient = () => ({
    type: CURRENT_INGREDIENT_CLEAN,
})

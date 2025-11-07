import {TBurgerIngredient} from "../../helpers/types/burgerTypes"

export const CONSTRUCTOR_ADD_BUN = 'CONSTRUCTOR_ADD_BUN'
export const CONSTRUCTOR_ADD_INGREDIENT = 'CONSTRUCTOR_ADD_INGREDIENT'
export const CONSTRUCTOR_REMOVE_INGREDIENT = 'CONSTRUCTOR_REMOVE_INGREDIENT'
export const CONSTRUCTOR_MOVE_INGREDIENT = 'CONSTRUCTOR_MOVE_INGREDIENT'
export const CONSTRUCTOR_CLEAN = 'CONSTRUCTOR_CLEAN'

export const addBun = (bun: TBurgerIngredient) => ({
    type: CONSTRUCTOR_ADD_BUN,
    payload: bun,
})

export const addIngredient = (ingredient: TBurgerIngredient) => ({
    type: CONSTRUCTOR_ADD_INGREDIENT,
    payload: ingredient,
})

export const removeIngredient = (id: string, index: number) => ({
    type: CONSTRUCTOR_REMOVE_INGREDIENT,
    payload: {
        _id: id,
        index: index
    },
})

export const moveIngredient = (fromIndex: number, toIndex: number) => ({
    type: CONSTRUCTOR_MOVE_INGREDIENT,
    payload: {fromIndex, toIndex},
})

export const cleanConstructor = () => ({
    type: CONSTRUCTOR_CLEAN,
})

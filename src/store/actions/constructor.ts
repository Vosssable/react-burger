import {TBurgerIngredient} from "../../helpers/types/burgerTypes"
import { v4 as uuidv4 } from 'uuid'

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
    payload: {
        ...ingredient,
        uniqueId: uuidv4()
    },
})

export const removeIngredient = (uniqueId: string) => ({
    type: CONSTRUCTOR_REMOVE_INGREDIENT,
    payload: {
        uniqueId: uniqueId
    },
})

export const moveIngredient = (fromIndex: number, toIndex: number) => ({
    type: CONSTRUCTOR_MOVE_INGREDIENT,
    payload: {fromIndex, toIndex},
})

export const cleanConstructor = () => ({
    type: CONSTRUCTOR_CLEAN,
})

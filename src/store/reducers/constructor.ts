import {TBurgerIngredient} from "../../helpers/types/burgerTypes";
import {
    CONSTRUCTOR_ADD_BUN,
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_REMOVE_INGREDIENT,
    CONSTRUCTOR_MOVE_INGREDIENT,
    CONSTRUCTOR_CLEAN
} from '../actions/constructor'

export interface TConstructorIngredient extends TBurgerIngredient {
    uniqueId: string
}

type ConstructorAction =
    | { type: typeof CONSTRUCTOR_ADD_BUN; payload: TBurgerIngredient }
    | { type: typeof CONSTRUCTOR_ADD_INGREDIENT; payload: TConstructorIngredient }
    | { type: typeof CONSTRUCTOR_REMOVE_INGREDIENT; payload: { uniqueId: string } }
    | { type: typeof CONSTRUCTOR_MOVE_INGREDIENT; payload: { fromIndex: number; toIndex: number } }
    | { type: typeof CONSTRUCTOR_CLEAN }

interface ConstructorState {
    bun: TBurgerIngredient | null
    ingredients: TConstructorIngredient[]
}

export const initialState: ConstructorState = {
    bun: null,
    ingredients: [],
}

export const constructorReducer = (state = initialState, action: ConstructorAction): ConstructorState => {
    switch (action.type) {
        case CONSTRUCTOR_ADD_BUN:
            return {
                ...state,
                bun: action.payload
            }
        case CONSTRUCTOR_ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
            }
        case CONSTRUCTOR_REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.uniqueId !== action.payload.uniqueId),
            }
        case CONSTRUCTOR_MOVE_INGREDIENT:
            const ingredients = [...state.ingredients]
            const [movedItem] = ingredients.splice(action.payload.fromIndex, 1)
            ingredients.splice(action.payload.toIndex, 0, movedItem)
            return {
                ...state,
                ingredients,
            }
        case CONSTRUCTOR_CLEAN:
            return {
                bun: null,
                ingredients: [],
            }
        default:
            return state
    }
}

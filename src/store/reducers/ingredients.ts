import { TBurgerIngredient } from "../../helpers/types/burgerTypes";
import {
    CLEAN_INGREDIENTS,
    INGREDIENTS_LOAD_FAILED,
    INGREDIENTS_LOAD_REQUEST,
    INGREDIENTS_LOAD_SUCCESS
} from "../actions/ingredients";

type IngredientsAction = 
    | { type: typeof INGREDIENTS_LOAD_REQUEST }
    | { type: typeof INGREDIENTS_LOAD_SUCCESS; payload: { ingredients: TBurgerIngredient[] } }
    | { type: typeof INGREDIENTS_LOAD_FAILED; payload: string }
    | { type: typeof CLEAN_INGREDIENTS }

interface IngredientsState {
    items: { ingredients: TBurgerIngredient[] }
    loading: boolean
    error: string | null
}

const initialState: IngredientsState = {
    items: { ingredients: [] },
    loading: false,
    error: null,
}

export const ingredientsReducer = (state = initialState, action: IngredientsAction): IngredientsState => {
    switch (action.type) {
        case INGREDIENTS_LOAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case INGREDIENTS_LOAD_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false,
                error: null
            }
        case INGREDIENTS_LOAD_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAN_INGREDIENTS:
            return {
                items: { ingredients: [] },
                loading: false,
                error: null,
            }
        default:
            return state
    }
}

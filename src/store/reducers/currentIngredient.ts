import {TBurgerIngredient} from "../../helpers/types/burgerTypes";
import {
    CURRENT_INGREDIENT_CLEAN,
    CURRENT_INGREDIENT_SET
} from "../actions/currentIngredient";

interface CurrentIngredientState {
    info: TBurgerIngredient | null
}

const initialState: CurrentIngredientState = {
    info: null,
}

export const currentIngredientReducer = (state = initialState, action: any): CurrentIngredientState => {
    switch (action.type) {
        case CURRENT_INGREDIENT_SET:
            return {
                info: action.payload,
            }
        case CURRENT_INGREDIENT_CLEAN:
            return initialState
        default:
            return state
    }
}

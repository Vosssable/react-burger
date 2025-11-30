import { combineReducers } from 'redux'
import { ingredientsReducer } from './reducers/ingredients'
import { constructorReducer } from './reducers/constructor'
import { currentIngredientReducer } from './reducers/currentIngredient'
import { orderReducer } from './reducers/order'
import { userReducer } from './reducers/user'

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer,
    user: userReducer,
})

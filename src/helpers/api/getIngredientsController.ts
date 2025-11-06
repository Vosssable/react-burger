import getIngredients from "./getIngredients"
import {store} from "../../store"
import {
    cleanIngredients,
    loadIngredients,
    loadIngredientsFailed,
    loadIngredientsSuccess
} from "../../store/actions/ingredients"
import {TBurgerIngredient} from "../types/burgerTypes";
import {addBun} from "../../store/actions/constructor";

const getIngredientsController = async () => {
    try {
        store.dispatch(loadIngredients())
        const ingredientsResponse = await getIngredients()
        if (ingredientsResponse && 'data' in ingredientsResponse) {
            store.dispatch(loadIngredientsSuccess(ingredientsResponse.data))
            store.dispatch(addBun(ingredientsResponse.data.find((item: TBurgerIngredient) => item.type === 'bun')))
        } else {
            store.dispatch(loadIngredientsSuccess([]))
        }
    } catch (error: unknown) {
        if (error instanceof Error && 'status' in error) {
            if (error.status === 404) {
                store.dispatch(loadIngredientsFailed('Неверный адрес!'))
                console.error(error)
            } else if (error.status === 500) {
                store.dispatch(loadIngredientsFailed('Ошибка на сервере, звони в яндекс!'))
                console.error(error)
            } else {
                store.dispatch(loadIngredientsFailed('Непредвиденная ошибка!'))
                console.error(error)
            }
            store.dispatch(cleanIngredients())
        }
    }
}

export default getIngredientsController

import {store} from "../../store"
import {cleanOrder, loadOrderFailed, loadOrderRequest, loadOrderSuccess} from "../../store/actions/order";
import postOrders from "./postOrders";

const getIngredientsController = async (ingredientIds: string[]) => {
    try {
        store.dispatch(loadOrderRequest())
        const response = await postOrders(ingredientIds)
        if (response.success) {
            store.dispatch(loadOrderSuccess({order: response.order.number, name: response.name}))
        } else {
            store.dispatch(loadOrderSuccess({name: '', order: 0}))
        }
    } catch (error: unknown) {
        if (error instanceof Error && 'status' in error) {
            if (error.status === 404) {
                store.dispatch(loadOrderFailed('Неверный адрес!'))
                console.error(error)
            } else if (error.status === 500) {
                store.dispatch(loadOrderFailed('Ошибка на сервере, звони в яндекс!'))
                console.error(error)
            } else {
                store.dispatch(loadOrderFailed('Непредвиденная ошибка!'))
                console.error(error)
            }
            store.dispatch(cleanOrder())
        }
    }
}

export default getIngredientsController

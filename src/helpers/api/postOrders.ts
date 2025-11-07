import {customFetch} from "../utils/apiHelper";

async function postOrders(ingredients: string[]) {
    return customFetch('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: ingredients
        })
    })
}

export default postOrders

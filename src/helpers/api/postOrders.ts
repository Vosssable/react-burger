import {customFetch} from "../utils/apiHelper";

async function postOrders(ingredients: string[], accessToken?: string | null) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if (accessToken) {
        headers['Authorization'] = accessToken;
    }

    return customFetch('/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            ingredients: ingredients
        })
    })
}

export default postOrders

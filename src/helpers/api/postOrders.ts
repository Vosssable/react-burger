async function postOrders(ingredients: string[]) {
    return fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: ingredients
        })
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
    })
}

export default postOrders

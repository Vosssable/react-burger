async function getIngredients() {
    return fetch(`${process.env.REACT_APP_API_URL}/ingredients`, {
        method: 'GET'
    }).then(res => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка ${res.status}`)
    })
}

export default getIngredients

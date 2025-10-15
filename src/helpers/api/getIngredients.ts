async function getIngredients() {
    return fetch(`${process.env.REACT_APP_API_URL}/ingredients`, {
        method: 'GET'
    }).then(res => {
        if (res.status === 404) {
            alert('Неверный адрес!');
            console.error(res)
            return []
        } else if (res.status === 500) {
            alert('Ошибка на сервере, звони в яндекс!');
            console.error(res)
            return []
        } else if (res.status !== 200) {
            alert('Непредвиденная ошибка!')
            console.error(res)
        } else {
            return res.json()
        }
    }).catch(err => {
        alert('Непредвиденная ошибка!')
        console.error(err)
        return []
    })
}

export default getIngredients

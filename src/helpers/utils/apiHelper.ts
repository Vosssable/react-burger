function checkResponse(res: Response) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
}

export async function customFetch(url: string, options: RequestInit) {
    const res = await fetch(`${process.env.REACT_APP_API_URL + url}`, options)
    return checkResponse(res)
}

import { API_URL } from './constants'

function checkResponse(res: Response) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
}

export async function customFetch(url: string, options: RequestInit) {
    const fullUrl = `${API_URL}${url}`;
    const res = await fetch(fullUrl, options)
    return checkResponse(res)
}

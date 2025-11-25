import {customFetch} from "../utils/apiHelper";

export async function requestPasswordReset(email: string) {
    return customFetch('/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    })
}

export async function resetPassword(password: string, token: string) {
    return customFetch('/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            token: token
        })
    })
}


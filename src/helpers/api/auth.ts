import { AuthResponse, LoginRequest, LogoutResponse, RegisterRequest, TokenResponse, UpdateUserRequest, UserResponse } from "../types/authTypes"
import {customFetch} from "../utils/apiHelper"

export async function register(data: RegisterRequest): Promise<AuthResponse> {
    return customFetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
    return customFetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export async function logout(token: string): Promise<LogoutResponse> {
    return customFetch('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
}

export async function refreshToken(token: string): Promise<TokenResponse> {
    return customFetch('/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
}

export async function getUser(accessToken: string): Promise<UserResponse> {
    return customFetch('/auth/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
}

export async function updateUser(data: UpdateUserRequest, accessToken: string): Promise<UserResponse> {
    return customFetch('/auth/user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        },
        body: JSON.stringify(data)
    })
}


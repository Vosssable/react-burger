import { 
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILED,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAILED,
    USER_GET_REQUEST,
    USER_GET_SUCCESS,
    USER_GET_FAILED,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILED,
    USER_REFRESH_TOKEN_REQUEST,
    USER_REFRESH_TOKEN_SUCCESS,
    USER_REFRESH_TOKEN_FAILED,
    USER_CLEAR
} from '../actions/user'

export interface LoginRequestAction {
    type: typeof USER_LOGIN_REQUEST
}

export interface LoginSuccessAction {
    type: typeof USER_LOGIN_SUCCESS
    payload: {
        user: { email: string; name: string }
        accessToken: string
        refreshToken: string
    }
}

export interface LoginFailedAction {
    type: typeof USER_LOGIN_FAILED
    payload: string
}

export interface RegisterRequestAction {
    type: typeof USER_REGISTER_REQUEST
}

export interface RegisterSuccessAction {
    type: typeof USER_REGISTER_SUCCESS
    payload: {
        user: { email: string; name: string }
        accessToken: string
        refreshToken: string
    }
}

export interface RegisterFailedAction {
    type: typeof USER_REGISTER_FAILED
    payload: string
}

export interface LogoutRequestAction {
    type: typeof USER_LOGOUT_REQUEST
}

export interface LogoutSuccessAction {
    type: typeof USER_LOGOUT_SUCCESS
}

export interface LogoutFailedAction {
    type: typeof USER_LOGOUT_FAILED
    payload: string
}

export interface GetUserRequestAction {
    type: typeof USER_GET_REQUEST
}

export interface GetUserSuccessAction {
    type: typeof USER_GET_SUCCESS
    payload: {
        user: { email: string; name: string }
        accessToken: string
    }
}

export interface GetUserFailedAction {
    type: typeof USER_GET_FAILED
    payload: string
}

export interface UpdateUserRequestAction {
    type: typeof USER_UPDATE_REQUEST
}

export interface UpdateUserSuccessAction {
    type: typeof USER_UPDATE_SUCCESS
    payload: {
        user: { email: string; name: string }
    }
}

export interface UpdateUserFailedAction {
    type: typeof USER_UPDATE_FAILED
    payload: string
}

export interface RefreshTokenRequestAction {
    type: typeof USER_REFRESH_TOKEN_REQUEST
}

export interface RefreshTokenSuccessAction {
    type: typeof USER_REFRESH_TOKEN_SUCCESS
    payload: {
        accessToken: string
        refreshToken: string
    }
}

export interface RefreshTokenFailedAction {
    type: typeof USER_REFRESH_TOKEN_FAILED
    payload: string
}

export interface UserClearAction {
    type: typeof USER_CLEAR
}

export type UserAction = 
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailedAction
    | RegisterRequestAction
    | RegisterSuccessAction
    | RegisterFailedAction
    | LogoutRequestAction
    | LogoutSuccessAction
    | LogoutFailedAction
    | GetUserRequestAction
    | GetUserSuccessAction
    | GetUserFailedAction
    | UpdateUserRequestAction
    | UpdateUserSuccessAction
    | UpdateUserFailedAction
    | RefreshTokenRequestAction
    | RefreshTokenSuccessAction
    | RefreshTokenFailedAction
    | UserClearAction


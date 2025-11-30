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
    USER_CLEAR,
} from "../actions/user";

interface UserState {
    user: {
        email: string;
        name: string;
    } | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

export const userReducer = (state = initialState, action: any): UserState => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
        case USER_LOGOUT_REQUEST:
        case USER_GET_REQUEST:
        case USER_UPDATE_REQUEST:
        case USER_REFRESH_TOKEN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                loading: false,
                error: null,
                isAuthenticated: true,
            };

        case USER_GET_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                loading: false,
                error: null,
                isAuthenticated: true,
            };

        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                loading: false,
                error: null,
            };

        case USER_REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                loading: false,
                error: null,
            };

        case USER_LOGOUT_SUCCESS:
        case USER_CLEAR:
            return {
                ...initialState,
            };

        case USER_LOGIN_FAILED:
        case USER_REGISTER_FAILED:
        case USER_LOGOUT_FAILED:
        case USER_GET_FAILED:
        case USER_UPDATE_FAILED:
        case USER_REFRESH_TOKEN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

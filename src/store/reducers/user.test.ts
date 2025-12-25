import { userReducer } from './user'

type UserState = ReturnType<typeof userReducer>
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
} from '../actions/user'

describe('user reducer', () => {
    const initialState: UserState = {
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: null,
        isAuthenticated: false,
    }

    const mockUser = {
        email: 'test@example.com',
        name: 'Test User',
    }

    const mockTokens = {
        accessToken: 'access-token-123',
        refreshToken: 'refresh-token-123',
    }

    it('should return the initial state', () => {
        expect(userReducer(undefined, { type: 'UNKNOWN_ACTION' } as any)).toEqual(initialState)
    })

    describe('request actions', () => {
        const requestActions = [
            USER_LOGIN_REQUEST,
            USER_REGISTER_REQUEST,
            USER_LOGOUT_REQUEST,
            USER_GET_REQUEST,
            USER_UPDATE_REQUEST,
            USER_REFRESH_TOKEN_REQUEST,
        ]

        requestActions.forEach((actionType) => {
            it(`should handle ${actionType}`, () => {
                const action = { type: actionType } as any
                const expectedState: UserState = {
                    ...initialState,
                    loading: true,
                    error: null,
                }
                expect(userReducer(initialState, action)).toEqual(expectedState)
            })
        })
    })

    describe('success actions', () => {
        it('should handle USER_LOGIN_SUCCESS', () => {
            const action = {
                type: USER_LOGIN_SUCCESS,
                payload: {
                    user: mockUser,
                    ...mockTokens,
                },
            } as const
            const expectedState: UserState = {
                user: mockUser,
                ...mockTokens,
                loading: false,
                error: null,
                isAuthenticated: true,
            }
            expect(userReducer(initialState, action)).toEqual(expectedState)
        })

        it('should handle USER_REGISTER_SUCCESS', () => {
            const action = {
                type: USER_REGISTER_SUCCESS,
                payload: {
                    user: mockUser,
                    ...mockTokens,
                },
            } as const
            const expectedState: UserState = {
                user: mockUser,
                ...mockTokens,
                loading: false,
                error: null,
                isAuthenticated: true,
            }
            expect(userReducer(initialState, action)).toEqual(expectedState)
        })

        it('should handle USER_GET_SUCCESS', () => {
            const action = {
                type: USER_GET_SUCCESS,
                payload: {
                    user: mockUser,
                    accessToken: mockTokens.accessToken,
                },
            } as const
            const expectedState: UserState = {
                user: mockUser,
                accessToken: mockTokens.accessToken,
                refreshToken: null,
                loading: false,
                error: null,
                isAuthenticated: true,
            }
            expect(userReducer(initialState, action)).toEqual(expectedState)
        })

        it('should handle USER_UPDATE_SUCCESS', () => {
            const stateWithUser: UserState = {
                ...initialState,
                user: { email: 'old@example.com', name: 'Old User' },
                ...mockTokens,
                isAuthenticated: true,
            }
            const action = {
                type: USER_UPDATE_SUCCESS,
                payload: {
                    user: mockUser,
                },
            } as const
            const expectedState: UserState = {
                ...stateWithUser,
                user: mockUser,
                loading: false,
                error: null,
            }
            expect(userReducer(stateWithUser, action)).toEqual(expectedState)
        })

        it('should handle USER_REFRESH_TOKEN_SUCCESS', () => {
            const stateWithUser: UserState = {
                ...initialState,
                user: mockUser,
                accessToken: 'old-access-token',
                refreshToken: 'old-refresh-token',
                isAuthenticated: true,
            }
            const action = {
                type: USER_REFRESH_TOKEN_SUCCESS,
                payload: mockTokens,
            } as const
            const expectedState: UserState = {
                ...stateWithUser,
                ...mockTokens,
                loading: false,
                error: null,
            }
            expect(userReducer(stateWithUser, action)).toEqual(expectedState)
        })
    })

    describe('failed actions', () => {
        const failedActions: readonly string[] = [
            USER_LOGIN_FAILED,
            USER_REGISTER_FAILED,
            USER_LOGOUT_FAILED,
            USER_GET_FAILED,
            USER_UPDATE_FAILED,
            USER_REFRESH_TOKEN_FAILED,
        ]

        failedActions.forEach((actionType) => {
            it(`should handle ${actionType}`, () => {
                const errorMessage = 'Error message'
                const action = {
                    type: actionType,
                    payload: errorMessage,
                } as any
                const expectedState: UserState = {
                    ...initialState,
                    loading: false,
                    error: errorMessage,
                }
                expect(userReducer(initialState, action)).toEqual(expectedState)
            })
        })
    })

    describe('clear actions', () => {
        it('should handle USER_LOGOUT_SUCCESS', () => {
            const stateWithUser: UserState = {
                user: mockUser,
                ...mockTokens,
                loading: false,
                error: null,
                isAuthenticated: true,
            }
            const action = { type: USER_LOGOUT_SUCCESS } as const
            expect(userReducer(stateWithUser, action)).toEqual(initialState)
        })

        it('should handle USER_CLEAR', () => {
            const stateWithUser: UserState = {
                user: mockUser,
                ...mockTokens,
                loading: false,
                error: null,
                isAuthenticated: true,
            }
            const action = { type: USER_CLEAR } as const
            expect(userReducer(stateWithUser, action)).toEqual(initialState)
        })
    })
})


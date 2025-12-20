import { Middleware } from 'redux'
import { WS_CONNECTION_START, WS_FEED_CONNECTION_SUCCESS, WS_PROFILE_CONNECTION_SUCCESS, WS_FEED_CONNECTION_ERROR, WS_PROFILE_CONNECTION_ERROR, WS_FEED_CONNECTION_CLOSED, WS_PROFILE_CONNECTION_CLOSED, WS_FEED_GET_MESSAGE, WS_PROFILE_GET_MESSAGE, WS_CONNECTION_CLOSED, WS_SEND_MESSAGE, JSONSerializable } from '../actions/wsActions'

type WSConnectionOptions = {
    url: string
    type: 'feed' | 'profile'
    accessToken?: string | null
}

export interface IWSMessage {
    success: boolean
    orders: IOrder[]
    total: number
    totalToday: number
}

export interface IOrder {
    _id: string
    ingredients: string[]
    status: 'created' | 'pending' | 'done' | 'cancelled'
    name: string
    createdAt: string
    updatedAt: string
    number: number
}

interface WSConnectionStartAction {
    type: typeof WS_CONNECTION_START
    payload: WSConnectionOptions
}

interface WSFeedConnectionSuccessAction {
    type: typeof WS_FEED_CONNECTION_SUCCESS
}

interface WSProfileConnectionSuccessAction {
    type: typeof WS_PROFILE_CONNECTION_SUCCESS
}

interface WSFeedConnectionErrorAction {
    type: typeof WS_FEED_CONNECTION_ERROR
    payload: string
}

interface WSProfileConnectionErrorAction {
    type: typeof WS_PROFILE_CONNECTION_ERROR
    payload: string
}

interface WSFeedConnectionClosedAction {
    type: typeof WS_FEED_CONNECTION_CLOSED
}

interface WSProfileConnectionClosedAction {
    type: typeof WS_PROFILE_CONNECTION_CLOSED
}

interface WSFeedGetMessageAction {
    type: typeof WS_FEED_GET_MESSAGE
    payload: IWSMessage
}

interface WSProfileGetMessageAction {
    type: typeof WS_PROFILE_GET_MESSAGE
    payload: IWSMessage
}

interface WSConnectionClosedAction {
    type: typeof WS_CONNECTION_CLOSED
}

interface WSSendMessageAction {
    type: typeof WS_SEND_MESSAGE
    payload: JSONSerializable
}

type WSAction = WSConnectionStartAction | WSFeedConnectionSuccessAction | WSProfileConnectionSuccessAction | WSFeedConnectionErrorAction | WSProfileConnectionErrorAction | WSFeedConnectionClosedAction | WSProfileConnectionClosedAction | WSFeedGetMessageAction | WSProfileGetMessageAction | WSConnectionClosedAction | WSSendMessageAction

export const socketMiddleware = (): Middleware => {
    return (store) => {
        let feedSocket: WebSocket | null = null
        let profileSocket: WebSocket | null = null
        let feedReconnectTimer: NodeJS.Timeout | null = null
        let profileReconnectTimer: NodeJS.Timeout | null = null

        return (next) => (action: unknown) => {
            const wsAction = action as WSAction
            const { dispatch } = store

            if (wsAction.type === WS_CONNECTION_START) {
                const { url: wsUrl, type, accessToken } = wsAction.payload
                let finalUrl = wsUrl
                const socketType = type

                if (accessToken && type === 'profile') {
                    finalUrl = `${wsUrl}?token=${accessToken.replace('Bearer ', '')}`
                }

                const socket = socketType === 'feed' ? feedSocket : profileSocket

                if (socket) {
                    const readyState = socket.readyState
                    if (readyState === WebSocket.CONNECTING || readyState === WebSocket.OPEN) {
                        return next(wsAction)
                    }
                }

                const newSocket = new WebSocket(finalUrl)

                if (socketType === 'feed') {
                    feedSocket = newSocket
                } else {
                    profileSocket = newSocket
                }

                newSocket.onopen = () => {
                    dispatch({
                        type: socketType === 'feed' ? WS_FEED_CONNECTION_SUCCESS : WS_PROFILE_CONNECTION_SUCCESS
                    })
                }

                newSocket.onerror = (event) => {
                    const errorMessage = event.type || 'WebSocket connection error'
                    dispatch({
                        type: socketType === 'feed' ? WS_FEED_CONNECTION_ERROR : WS_PROFILE_CONNECTION_ERROR,
                        payload: errorMessage
                    })
                }

                newSocket.onmessage = (event) => {
                    try {
                        const data: IWSMessage = JSON.parse(event.data)
                        if (data.success && Array.isArray(data.orders)) {
                            dispatch({
                                type: socketType === 'feed' ? WS_FEED_GET_MESSAGE : WS_PROFILE_GET_MESSAGE,
                                payload: data
                            })
                        }
                    } catch (error) {
                        console.error('WebSocket message parse error:', error)
                    }
                }

                newSocket.onclose = () => {
                    dispatch({
                        type: socketType === 'feed' ? WS_FEED_CONNECTION_CLOSED : WS_PROFILE_CONNECTION_CLOSED
                    })

                    if (socketType === 'feed') {
                        feedSocket = null
                        if (feedReconnectTimer) {
                            clearTimeout(feedReconnectTimer)
                        }
                        feedReconnectTimer = setTimeout(() => {
                            dispatch({
                                type: WS_CONNECTION_START,
                                payload: { url: wsUrl, type: socketType, accessToken: null }
                            })
                        }, 3000)
                    } else {
                        profileSocket = null
                        if (profileReconnectTimer) {
                            clearTimeout(profileReconnectTimer)
                        }
                        profileReconnectTimer = setTimeout(() => {
                            dispatch({
                                type: WS_CONNECTION_START,
                                payload: { url: wsUrl, type: socketType, accessToken }
                            })
                        }, 3000)
                    }
                }
            }

            if (wsAction.type === WS_SEND_MESSAGE) {
                const message = wsAction.payload
                if (feedSocket && feedSocket.readyState === WebSocket.OPEN) {
                    feedSocket.send(JSON.stringify(message))
                }
                if (profileSocket && profileSocket.readyState === WebSocket.OPEN) {
                    profileSocket.send(JSON.stringify(message))
                }
            }

            if (wsAction.type === WS_CONNECTION_CLOSED) {
                if (feedSocket) {
                    const readyState = feedSocket.readyState
                    if (readyState === WebSocket.OPEN) {
                        feedSocket.close(1000, 'Connection closed by user')
                    }
                    feedSocket = null
                    if (feedReconnectTimer) {
                        clearTimeout(feedReconnectTimer)
                        feedReconnectTimer = null
                    }
                    dispatch({ type: WS_FEED_CONNECTION_CLOSED })
                }
                if (profileSocket) {
                    const readyState = profileSocket.readyState
                    if (readyState === WebSocket.OPEN) {
                        profileSocket.close(1000, 'Connection closed by user')
                    }
                    profileSocket = null
                    if (profileReconnectTimer) {
                        clearTimeout(profileReconnectTimer)
                        profileReconnectTimer = null
                    }
                    dispatch({ type: WS_PROFILE_CONNECTION_CLOSED })
                }
            }

            return next(wsAction)
        }
    }
}


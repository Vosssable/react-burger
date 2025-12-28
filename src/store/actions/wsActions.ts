export type JSONSerializable = string | number | boolean | null | JSONSerializable[] | { [key: string]: JSONSerializable }

export const WS_CONNECTION_START = 'WS_CONNECTION_START'
export const WS_FEED_CONNECTION_SUCCESS = 'WS_FEED_CONNECTION_SUCCESS'
export const WS_PROFILE_CONNECTION_SUCCESS = 'WS_PROFILE_CONNECTION_SUCCESS'
export const WS_FEED_CONNECTION_ERROR = 'WS_FEED_CONNECTION_ERROR'
export const WS_PROFILE_CONNECTION_ERROR = 'WS_PROFILE_CONNECTION_ERROR'
export const WS_FEED_CONNECTION_CLOSED = 'WS_FEED_CONNECTION_CLOSED'
export const WS_PROFILE_CONNECTION_CLOSED = 'WS_PROFILE_CONNECTION_CLOSED'
export const WS_FEED_GET_MESSAGE = 'WS_FEED_GET_MESSAGE'
export const WS_PROFILE_GET_MESSAGE = 'WS_PROFILE_GET_MESSAGE'
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED'
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE'

export const wsConnectionStart = (url: string, type: 'feed' | 'profile', accessToken?: string | null) => ({
    type: WS_CONNECTION_START,
    payload: { url, type, accessToken }
})

export const wsConnectionClosed = () => ({
    type: WS_CONNECTION_CLOSED
})

export const wsSendMessage = (message: JSONSerializable) => ({
    type: WS_SEND_MESSAGE,
    payload: message
})


import {configureStore} from '@reduxjs/toolkit'
import {rootReducer} from './rootReducer'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import {socketMiddleware} from './middleware/socketMiddleware'

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware()),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

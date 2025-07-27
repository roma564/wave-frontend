import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../lib/features/counter/counterSlice'
import { messageSlice } from './features/api/messageSlice'




export const makeStore = () => {
  return configureStore({
    reducer: {
       counter: counterReducer,
       [messageSlice.reducerPath]: messageSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messageSlice.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
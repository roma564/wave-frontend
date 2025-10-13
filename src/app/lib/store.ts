import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../lib/features/counter/counterSlice'
import { messageSlice } from './features/api/messageSlice'
import { chatSlice } from './features/api/chatSlice'

import { modeSlice } from './features/chatMode/modeSlice'
import modeReducer from '../lib/features/chatMode/modeSlice'
import { userSlice } from './features/api/userSlice'
import { modeApi } from './features/chatMode/modeApi'




export const makeStore = () => {
  return configureStore({
    reducer: {
       counter: counterReducer,
       mode: modeReducer,
       [messageSlice.reducerPath]: messageSlice.reducer,
       [chatSlice.reducerPath]: chatSlice.reducer,
       [userSlice.reducerPath]: userSlice.reducer,
       [modeApi.reducerPath]: modeApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messageSlice.middleware, chatSlice.middleware, userSlice.middleware, modeApi.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
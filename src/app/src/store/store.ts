import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit'
import {RootStateOrAny} from 'react-redux'
import { userReducer } from './user/reducer'
import {homeReducer} from './home/reducer'
import {projectReducer} from './project/reducer'

const appReducer = combineReducers({
    user: userReducer,
    home: homeReducer,
    project: projectReducer
})

const rootReducer = (state: RootStateOrAny, action: AnyAction) => {
    // todo: dirty
    if (action.type === 'onLogout/fulfilled') {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
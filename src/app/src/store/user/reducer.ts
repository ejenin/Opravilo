import {IUserState} from './types'
import {createReducer} from '@reduxjs/toolkit'
import {fetchUserInfo, onLogout, tryLogin, tryRegister, tryVkLogin} from './thunks'
import Cookies from 'js-cookie'

const initialState: IUserState = {
    displayName: null,
    fetching: false,
    errors: []
}

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, {payload}) => {
        return {...state, displayName: payload, fetching: false}
    }) 
    builder.addCase(fetchUserInfo.pending, (state) => {
        return {...state, fetching: true}
    }) 
    builder.addCase(fetchUserInfo.rejected, (state) => {
        return {...state, fetching: false}
    })
    builder.addCase(tryLogin.pending, (state) => {
        return {...state, fetching: true}
    })
    builder.addCase(tryLogin.fulfilled, (state, {payload}) => {
        if (!payload.isSuccess) {
            return {...state, errors: [...payload.errors], fetching: false}
        }
        return {...state, errors: [], fetching: false}
    })
    builder.addCase(tryVkLogin.pending, (state) => {
        return {...state, fetching: true}
    })
    builder.addCase(tryVkLogin.fulfilled, (state, {payload}) => {
        if (!payload.isSuccess) {
            return {...state, errors: [...payload.errors], fetching: false}
        }
        return {...state, errors: [], fetching: false}
    })
    builder.addCase(tryRegister.pending, (state) => {
        return {...state, fetching: true}
    })
    builder.addCase(tryRegister.fulfilled, (state, {payload}) => {
        if (!payload.isSuccess) {
            return {...state, registrationErrors: [...payload.errors], fetching: false}
        }
        return {...state, registrationErrors: [], fetching: false}
    })
    builder.addCase(onLogout.pending, (state) => {
        Cookies.remove('X-AUTH-STATE')
        return {...state, fetching: false, displayName: null}
    })
})
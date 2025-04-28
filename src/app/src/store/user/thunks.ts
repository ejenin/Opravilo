import {createAsyncThunk} from '@reduxjs/toolkit'
import {getClient} from '../../api/BaseClient'
import {ITryLoginArgs, ITryRegisterArgs} from './types'
import {LoginRequest, RegistrationRequest} from '../../api/client'

const client = getClient()

export const tryLogin = createAsyncThunk(
    'tryLogin',
    async (credentials: ITryLoginArgs) => {
        const request: LoginRequest = new LoginRequest({
            login: credentials.login,
            password: credentials.password
        })
        return await client.login(request)
    }
)

export const tryRegister = createAsyncThunk(
    'tryRegister',
    async (credentials: ITryRegisterArgs) => {
        const request: RegistrationRequest = new RegistrationRequest({
            login: credentials.login,
            password: credentials.password,
            displayName: credentials.displayName
        })
        return await client.register(request)
    }
)

export const tryVkLogin = createAsyncThunk(
    'tryVkLogin',
    async (code: string) => {
        return await client.loginVK(code)
    }
)

export const onLogout = createAsyncThunk(
    'onLogout',
    async () => {
        await client.logout()
    }
)

export const fetchUserInfo = createAsyncThunk(
    'fetchUserInfo',
    async () => {
        return await client.displayName()
    }
)
import axios from 'axios'
import {Client} from './client'

async function tryRefreshToken(): Promise<boolean> {
    const axiosClient = axios.create({withCredentials: true})
    const client = new Client(undefined, axiosClient)
    try {
        const res = await client.refresh()
        return res.isSuccess
    } catch(e) {
        console.log(e)
        return false
    }
}

let refreshTokenPromise: Promise<boolean>

export function getClient(): Client {
    // todo: check npm packet axios-auth-refresh
    const client = axios.create({withCredentials: true})
    
    client.interceptors.response.use((success) => {
        return success
    }, async (err) => {
        const original = err.config
        if (err.response.status === 401 && !err.config.__isRetryRequest) {
            
            if (!refreshTokenPromise) {
                console.log('nothing in progress. refreshing...')
                refreshTokenPromise = tryRefreshToken()
                const success = await refreshTokenPromise

                if (!success) {
                    window.location.href = '/'
                }
                // else {
                //     console.log('refresh done, go original')
                //     return axios.request(original)
                // }
            } else {
                console.log('pending refreshing')
                // return refreshTokenPromise.then(() => {
                //     console.log('refresh done, go original FROM PROMISE')
                //     refreshTokenPromise = null
                //     return axios.request(original)
                // })
            }
            return refreshTokenPromise.then(() => {
                console.log('refresh done, go original FROM PROMISE')
                refreshTokenPromise = null
                return axios.request(original)
            })
        }
    })
    return new Client(undefined, client)
}
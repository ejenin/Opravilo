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

export function getClient(): Client {
    // todo: check npm packet axios-auth-refresh
    const client = axios.create({withCredentials: true})
    
    client.interceptors.response.use((success) => {
        return success
    }, async (err) => {
            const original = err.config
            if (err.response.status === 401 && !err.config.__isRetryRequest) {
                const success = await tryRefreshToken()

                if (!success) {
                    window.location.href = '/'
                }
                else {
                    return axios.request(original)
                }
            }
    })
    return new Client(undefined, client)
}